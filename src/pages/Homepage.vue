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
            selectedType: '',
        };
    },
    methods: {
        clearMessage() {
            this.paymentSuccess = false;
        },
        getRestaurantsByType(id, page){
            axios
                .get('http://127.0.0.1:8000/api/restaurants/types/' + id, {
                    params: {
                        page: page
                    }
                })
                .then(response => {
                    this.restaurants = response.data.results.data;
                    this.currentPageFiltered = response.data.results.current_page;
                    this.lastPageFiltered = response.data.results.last_page;
                    console.log(response);
                });
        },
        getRestaurants(page){
            axios
                .get('http://127.0.0.1:8000/api/restaurants', {
                    params: {
                        page: page
                    }
                })
                .then(response => {
                    this.restaurants = response.data.results.data;
                    this.currentPage = response.data.results.current_page
                    this.lastPage = response.data.results.last_page
                    console.log(response.data);
                });
        },
        selectType(typeId){

            // selectedType corrisponde al tipo cliccato? Se no... imposta il nuovo valore... se si mettilo a stringa vuota
            this.selectedType = this.selectedType !== typeId ? typeId : '';
    
            // Fai partire la chiamata API per i ristoranti filtrati
            if (this.selectedType) {
                this.getRestaurantsByType(typeId, this.currentPageFiltered);
            } else {
                // Altrimenti parte la chiamata api per tutti i ristoranti
                this.getRestaurants(this.currentPage);
            }
        },
        nextPage() {
            // Se selectedType è vuoto controllo le pagine di tutti i ristoranti
            if (this.selectedType == '') {
                if (this.currentPage < this.lastPage) {
                    this.getRestaurants(this.currentPage + 1);
                }
            // Altrimenti controllo le pagine filtrate
            } else {
                if (this.currentPageFiltered < this.lastPageFiltered) {
                    this.getRestaurantsByType(this.selectedType, this.currentPageFiltered + 1);
                }
            }           
        },
        prevPage() {
            if (this.selectedType == '') {
                if (this.currentPage > 1) {
                    this.getRestaurants(this.currentPage - 1);
                }
            } else {
                if (this.currentPageFiltered > 1) {
                    this.getRestaurantsByType(this.selectedType, this.currentPageFiltered - 1);
                }
            }
        },
    },
    mounted() {
        if (this.paymentSuccess) {
            setTimeout(() => {
                this.paymentSuccess = false;
            }, 5000); // Imposta il timeout a 5 secondi
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
    }
};
</script>

<template>
    <!-- JUMBO -->
    <div class="container-fluid">
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
                        <button class="types" @click="selectType(type.id)">
                            {{ type.name }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section class="cards">
        <div class="row p-4">
            <div class="my-card col-lg-3 col-md-5 p-3 m-2" v-for="restaurant in restaurants">
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
                    </div>
                </router-link>
            </div>
        </div>

        <div class="container box-buttons d-flex justify-content-around">
            <button @click="prevPage()" class="btn btn-primary" type="submit">Indietro</button>
            <button @click="nextPage()" class="btn btn-primary" type="submit">Avanti</button>
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

        .types:hover
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