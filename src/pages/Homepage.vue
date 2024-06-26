<script>
import axios from 'axios';

export default {
  data() {
    return {
            paymentSuccess: this.$route.query.payment === 'success',
            totalItem: 0,
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
        },
        
        loadFromLocalStorage() {
            const storedCart = localStorage.getItem('cart');
            this.cart = storedCart ? JSON.parse(storedCart) : [];
        },
        calculateTotalItem() {
            this.totalItem = this.cart.reduce((total, item) => total + item.quantity, 0);
            localStorage.setItem('totalItem', this.totalItem);
        }
    },
    
    created () {
        
        this.getRestaurants(this.currentPage);
        this.loadFromLocalStorage();
        const storedTotalItem = localStorage.getItem('totalItem');
        this.totalItem = storedTotalItem ? parseInt(storedTotalItem) : 0;

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

    <!--POPUP-->
    <div v-if="totalItem > 0" class="badge-counter">
        <div class="pop-up">
            {{ totalItem }}
        </div>
    </div>
    <!--FINE POPUP-->

    <!-- JUMBO -->
    <div class="jumbo">
        <div v-if="paymentSuccess" class="alert alert-success message-payment text-center w-50 mx-auto d-flex">
            
            <div class="message px-3 py-3 ms-3 col">
                Pagamento avvenuto con successo! <br>
                Un nostro collaboratore sta procedendo a preparare il tuo Ordine!
            <div class="speechBubble text-center pt-3">
                <div class="thanks-bg"></div>
                <h3 data-text="Grazie per averci scelto!" class="pp">
                    Grazie per averci scelto!
                </h3>
            </div> 
            </div>
            <div class="text-right"><button class="btn" @click="clearMessage"><i class="fa-solid fa-x"></i></button></div>
  

        </div>

        <section class="background-header">
            <img src="/src/assets/img/jumbotron.png" alt="jumbotron" class="w-100">
        </section>
    </div>
    <!--end jumbo-->

    <!--parte dell'homepage che contiene LE CATEGORIE-->

    <div class="categories-container p-3">
        <div class="container">
            <h2 class="text-center mb-3 fw-bold fs-1 py-2">Guarda i Ristoranti in base ai tuoi gusti!</h2>
            <div class="row">
                <div class="col-lg-2 col-md-4 col-sm-4 col-4 py-1" v-for="type in types">
                    <button type="button" @click="selectType(type.id)"
                            class="types d-flex flex-column align-items-center justify-content-center"
                            :class="{ 'active': selectedTypes.includes(type.id) }">
                        <div class="type-icon w-50">
                            <img class="w-100 img-fluid d-none d-md-block" :src="type.icon" alt="type.name">
                        </div>
                        <div class="fs-sm-7">
                            {{ type.name }}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <section class="cards pb-5">
        <div class="row px-4 restaurants" style="max-height: 1000px; overflow-x: hidden; overflow-y: auto;"> 
            <div v-if="filteredRestaurants.length != 0" class="col-lg-3 col-md-6 g-3" v-for="restaurant in filteredRestaurants">
                <router-link class="btn btn-primary card my-card p-0 border-0 h-100" :to="{ name: 'restaurants.show', params: { id: restaurant.id } }">

                    <img :src="restaurant.image" class="card-img-top" alt="restaurant.activity_name">

                    <div class="my-card-body">
                        <div class="my-card-title p-2">
                            <h5>{{ restaurant.activity_name }}</h5>
                        </div>
                        <div class="my-card-description p-3">
                            <p>{{ restaurant.description }}</p>
                        </div>
                        <p class="d-inline px-1" v-for="type in restaurant.types">
                            <span class="badge rounded-4 text-primary bg-secondary fs-6 mb-2">{{type.name}}</span>
                        </p>
                    </div>
                </router-link>
            </div>

            <div v-else class="text-center text-primary">
                <div class="text-center mb-3">
                    <p class="fw-bolder fs-1">Nessun ristorante disponibile</p>
                    <button class="badge rounded-5 fs-3 p-4 text-secondary bg-primary" @click="emptySelectedType()">Torna ai ristoranti</button>
                </div>

                <img src="/src/assets/img/restaurants-not-found.png" alt="restaurants-not-found" class="rounded-3">
            </div>
        </div>
    </section>

       <!--Fine Card-->
</template>

<style lang="scss" scoped>
    @import "../assets/scss/partials/homepage.scss";
    @import "../assets/scss/partials/variables.scss";
    @import "../assets/scss/partials/popup.scss";

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
        background-color: $secondary;

                h2 {
                color: $primary;
            }
        .types
        {
            text-decoration: none;
            font-weight: 500;
            font-size: 1.1rem;
            padding: 10px 15px;
            border: 2px solid $primary;
            border-radius: 30px;
            color: $secondary;
            background-color: $primary;
        }

        .types:hover, .types.active
        {
            color: $primary;
            border: 2px solid $primary;
            background-color: $tertiary;
            
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
                border-radius: 20px;
                background-color: $primary;
                
                img
                {
                    border-top-left-radius: 20px;
                    border-top-right-radius: 20px;
                }
            }

            .my-card:hover
            {
                scale: 1.015;
                box-shadow: 3px 3px 15px black;
                transition: 0.3s;
            }
        }
    }


    // scrollbar
    .restaurants {
    --sb-track-color: #FF8732;
    --sb-thumb-color: #502314;
    --sb-size: 10px;
    }

    .restaurants::-webkit-scrollbar {
    width: var(--sb-size)
    }

    .restaurants::-webkit-scrollbar-track {
    background: var(--sb-track-color);
    border-radius: 5px;
    }

    .restaurants::-webkit-scrollbar-thumb {
    background: var(--sb-thumb-color);
    border-radius: 5px;
    
    }

    @supports not selector(::-webkit-scrollbar) {
    .restaurants {
        scrollbar-color: var(--sb-thumb-color)
                        var(--sb-track-color);
    }
    }


    .thanks-bg{
    min-height: 300px;
    background-image: url("../assets/img/thanks.png");
    background-position:center;
    background-size:contain;
    background-repeat: no-repeat;
}
.speechBubble{
    text-align: end;
    min-height: 60px;
}

/*
.pp{
    position: relative;
    color: white;
    -webkit-text-stroke: 1px black;
}
/*
.pp::before{
    content: attr(data-text);
    position: absolute;
    left: 0;
    width: 0;
    height: 100%;
    color: $primary;
    -webkit-text-stroke: 1px $primary;
    overflow: hidden;
    animation: animate 6s linear infinite;
}
@keyframes animate
{
    0%,10%,100%
    {
        width: 0;
    }
    70%,90%
    {
        width: 100%;
    }
}
@keyframes loop {
    0%{
      transition: 3s;
    }
    50%{
      transition: 5s;
      background-color: $primary;
      color: $secondary;
    }
    0%{
        transition: 3s;
      }
  }
*/ 
</style>