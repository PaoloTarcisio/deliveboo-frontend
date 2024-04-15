<script>
import axios from 'axios';

export default {
  data() {
    return {
            paymentSuccess: this.$route.query.payment === 'success',
            restaurants:[],
            types:[],
            currentPage: 1,
            lastPage: 1,
            currentPageFiltered: 1,
            lastPageFiltered: 1,
            selectedTypes: [], 
        };
    },
    methods: {
        clearMessage() {
            this.paymentSuccess = false;
        },
        
        selectType(typeId) {
            const index = this.selectedTypes.indexOf(typeId);
            if (index === -1) {
                this.selectedTypes.push(typeId);
            } else {
                this.selectedTypes.splice(index, 1);
            }
        },
        getRestaurants(page){
            axios
                .get('http://127.0.0.1:8000/api/restaurants')
                .then(response => {
                    this.restaurants = response.data.results;
                    // console.log(this.restaurants);
                });
        },
        emptySelectedType(){
            this.selectedTypes = [];
        }
    },
    
    created () {
        
        this.getRestaurants(this.currentPage);

        axios
            .get('http://127.0.0.1:8000/api/types')
            .then(response => {
                this.types = response.data.results;
                // console.log(this.types);
            });
    },
    computed: {
        
        filteredRestaurants() {
            if (!this.selectedTypes.length) {
            return this.restaurants; // Se non ci sono tipi selezionati, mostra tutti
            }

            return this.restaurants.filter(restaurant =>
            this.selectedTypes.every(typeId =>
                restaurant.types.some(type => type.id === typeId)
            )
            );
        },
    }
};
</script>

<template>
    <!-- JUMBO -->
    <div class="container-fluid">

        <div v-if="paymentSuccess" class="alert alert-success message-payment text-center w-50 mx-auto">
            Pagamento avvenuto con successo!
            <button class="btn" @click="clearMessage">X</button>
        </div>

        <section class="background-header">
            <div class="container d-flex align-items-center justify-content-center fs-1 text-white flex-column">
                <h1>
                    Deliveboo
                </h1>
                <h2>
                    Buono da far paura
                </h2>
            </div>
        </section>
    </div>
    <!--end jumbo-->

    <!--parte dell'homepage che contiene LE CATEGORIE-->

    <div class="categories-container p-4">
        <div class="container">
            <div class="container">
                <h1 class="text-center text-black">Guarda i ristoranti in base ai tuoi gusti!</h1>
                <div class="row">
                    <div class="col-2 pt-4" v-for="type in types">
                        <button type="button" @click="selectType(type.id)" class="types d-flex flex-column align-items-center justify-content-center" :class="{ 'active': selectedTypes.includes(type.id) }">
                            <div style="width: 60%; min-width: 50px;">
                                <img class="w-100" :src="type.icon" alt="#">
                            </div>
                            
                            <div>
                                {{ type.name }}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section class="cards">
        <div class="row p-4" style="max-height: 1000px; overflow-x: hidden; overflow-y: auto;"> 
            <div v-if="filteredRestaurants.length != 0" class="my-card col-lg-3 col-md-5 p-3 m-2" v-for="restaurant in filteredRestaurants">
                <router-link class="btn btn-primary" :to="{ name: 'restaurants.show', params: { id: restaurant.id } }">
                    <div class="card-img">
                        <img :src="restaurant.image" alt="restaurant.activity_name">
                    </div>

                    <div class="my-card-body">
                        <div class="my-card-title p-2">
                            <h5>{{ restaurant.activity_name }}</h5>
                        </div>
                        <div class="my-card-description p-3">
                            <p>{{ restaurant.description }}</p>
                        </div>
                        <p v-for="type in restaurant.types">
                            <span class="badge rounded-4 text-primary bg-secondary fs-5 mb-2">{{type.name}}</span>
                        </p>
                    </div>
                </router-link>
            </div>

            <h1 v-else class="text-center text-primary fs-1">
                <p>Nessun ristorante disponibile</p>
                <button class="badge rounded-5 p-4 text-secondary bg-primary" @click="emptySelectedType()">Torna ai ristoranti</button>
            </h1>
        </div>
    </section>

       <!--Fine Card-->
</template>

<style lang="scss" scoped>
    @import "../assets/scss/partials/homepage.scss";
    @import "../assets/scss/partials/variables.scss";

    .message-payment {
        z-index: 1000;
        margin-top: 150px;
        position: fixed;
        width: 100%;
        left: 0;
        right: 0;
    }

    // BOTTONI CATEGORIE

    .categories-container
    {
        .types
        {
            text-decoration: none;
            font-weight: 500;
            font-size: 1.1rem;
            padding: 10px 15px;
            border: 2px solid $primary;
            border-radius: 30px;
            color: $primary;
        }

        .types:hover, .types.active
        {
            color: $tertiary;
            border: 2px solid $primary;
            background-color: $primary;
            
        }

    }


    // CARD

    .cards
    {
        background-color: $secondary;

        .row{
            margin: 0 auto;
            justify-content: space-evenly;
            
            .my-card
            {
                color: $secondary;
                border-radius: 10px;
                background-color: $primary;
                
                a
                {
                    text-decoration: none;
                    color: $secondary;

                    p
                    {
                        margin-bottom: 0;
                    }
                }
                
                a:hover
                {
                    color: $secondary;
                }
            }
        }
    }


    
</style>