<script>
import axios from 'axios';
import { store } from '../components/store';
import AppModal from '../components/AppModal.vue';


export default {
    data() {
        return {
            totalItem: 0,
            restaurant: { plates: [] },
            cart: [],
            showModal: false,
            pendingPlate: null,
            pendingQuantity: 0
        };
    },
    components: {
        AppModal
    },
    methods: {
        addToCart(plate, quantity = 1) {
            const isNewRestaurant = this.cart.length > 0 && this.cart[0].restaurantId !== plate.restaurant_id;
            if (isNewRestaurant) {
                this.pendingPlate = plate;
                this.pendingQuantity = quantity;
                this.showModal = true;
            } else {
                this.processAddToCart(plate, quantity);
            }
        },
        processAddToCart(plate, quantity) {
            const cartItem = this.cart.find(item => item.plateId === plate.id);
            if (cartItem) {
                cartItem.quantity += quantity;
            } else {
                this.cart.push({
                    plateId: plate.id,
                    restaurantId: plate.restaurant_id,
                    name: plate.name,
                    price: plate.price,
                    quantity: quantity
                });
            }
            this.updateLocalStorage();
            this.calculateTotalItem();
        },
        confirmModal() {
            this.cart = [];
            this.processAddToCart(this.pendingPlate, this.pendingQuantity);
            this.showModal = false;
            this.pendingPlate = null;
            this.pendingQuantity = 0;
        },
        updateLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
            console.log('Carrello aggiornato:', JSON.stringify(this.cart));
        },
        decreaseQuantity(plateId) {
            const cartItem = this.cart.find(item => item.plateId === plateId);
            if (cartItem && cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            } else {
                this.removeFromCart(plateId);
            }
            this.updateLocalStorage();
            this.calculateTotalItem();
        },
        removeFromCart(plateId) {
            this.cart = this.cart.filter(item => item.plateId !== plateId);
            this.updateLocalStorage();
            this.calculateTotalItem();
        },
        getQuantity(plateId) {
            const item = this.cart.find(item => item.plateId === plateId);
            return item ? item.quantity : 0;
        },
        fetchRestaurantData() {
            axios.get(`http://127.0.0.1:8000/api/restaurants/${this.$route.params.id}`)
                .then(response => {
                    this.restaurant = response.data.results;
                })
                .catch(error => {
                    console.error('Error fetching restaurant data:', error);
                });
        },
        loadFromLocalStorage() {
            const storedCart = localStorage.getItem('cart');
            this.cart = storedCart ? JSON.parse(storedCart) : [];
            this.calculateTotalItem();
        },
        calculateTotalItem() {
            this.totalItem = this.cart.reduce((total, item) => total + item.quantity, 0);
            localStorage.setItem('totalItem', this.totalItem);
        },
    },
    created() {
        this.fetchRestaurantData();
        this.loadFromLocalStorage();
        const storedTotalItem = localStorage.getItem('totalItem');
        this.totalItem = storedTotalItem ? parseInt(storedTotalItem) : 0;
    }
}
</script>

<template>

    <app-modal :show="showModal" @update:show="showModal = $event" @confirm="confirmModal"/>

    <div v-if="totalItem > 0" class="badge-counter">
        <div class="pop-up">
            {{ totalItem }}
        </div>
    </div>

    <div class="my-container">
    
        <!-- INFORMAZIONI RISTORANTE -->
        
        <section class="section-restourant-detail py-5">
            <div class="restourant-detail ">

                <div class="row">
                    <div class="col-lg-4 col-md-5 col-sm-8" >
                        <img :src="restaurant.image" alt="" class="info-restaurant">
                    </div>
                    <div class="col-lg-1 col-md-6 col-sm-0"></div>
                    <div class="col-lg-7 col-md-5 col-sm-8 info-restaurant p-3">
                        <h2 class="text-center p-3">
                            {{ restaurant.activity_name }}
                        </h2>
                        <p>
                            {{ restaurant.address }}
                        </p>
                        <p>
                            {{ restaurant.description }}
                        </p>
                        <div>
                            <div>
                                <h6>P.iva:</h6>
                                {{ restaurant.VAT_number }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- MENU RISTORANTE 1-->
        <section class="section-menu">
            <h2 class="my-4 text-center">
                Il nostro menù:
            </h2>

            <div v-if="restaurant.plates.length > 0">
                            <!-- MENU RISTORANTE 2 -->
                <div class="row card-plate-row my-3">
                    <div class="col-lg-2 col-md-4 col-sm-8 card-plate m-3 px-5 py-3"  v-for="plate in restaurant.plates">
                        <div class="img-card-plate m-3">
                            <img :src="plate.image" alt="" class="info-restaurant">
                        </div>

                        <div class="card-plate-content">
                            <div class="card-plate-name-price">
                                <div class="card-plate-name">
                                    <h4 class="text-center">
                                        
                                        {{ plate.name }}
                                    </h4>
                                </div>
            
                                <div class="card-plate-price">
                                    <h5>
                                        {{ plate.price }} €
                                    </h5>
                                </div>
                            </div>
        
                            <div class="card-plate-description-ingredients">
                                <div class="card-plate-description mb-4">
                                    {{ plate.description }}
                                </div>
            
                                <div class="card-plate-ingredients">
                                    <span class="ingredienti">
                                        Ingredienti:
                                    </span>
                                    {{ plate.ingredients }}
                                </div>
                            </div>
                                  
                            <div class="card-plate-order pt-3">
                                <!-- Condizionale per mostrare i controlli solo se il piatto è già nel carrello -->
                                <div v-if="getQuantity(plate.id) > 0">
                                    <!-- bottone + -->
                                    <button class="fa-solid fa-plus" @click="addToCart(plate, 1)"></button>

                                    <!-- Mostra la quantità -->
                                    <span>{{ getQuantity(plate.id) }}</span> 

                                    <!-- bottone - -->
                                    <button class="fa-solid fa-minus" @click="decreaseQuantity(plate.id)"></button>

                                    <!-- Bottone per rimuovere tutto -->
                                    <button @click="removeFromCart(plate.id)">Rimuovi tutto</button> 
                                </div>
                                <div v-else>
                                    <!-- bottone carrellino-->
                                    <button class="btn btn-success" @click="addToCart(plate, 1)">
                                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div v-else class="p-3">
                <h3 class="text-center">Non ci sono piatti disponibili nel menù.</h3>
                <img src="/src/assets/img/dishes-not-found.png" alt="dishes-not-found" class="rounded-3">
            </div>
        </section>
    </div>

</template>

<style lang="scss" scoped>
@import "../assets/scss/partials/variables.scss";
@import "../assets/scss/partials/popup.scss";


.my-container{
    margin-top: 150px;


    .section-restourant-detail
    {
        background: $tertiary;
        
        
        .restourant-detail
        {
            width: 80%;
            margin: 0 auto;

            .row
            {
                justify-content: space-evenly;

                .info-restaurant{
                    background-color: $primary;
                    color: $secondary;
                    border-radius: 10px;
                }
                
                img {
                    width: 300px;
                    height: 300px;
                }
            }
        

        }
    }



    // STILE CARD MENU 

    .section-menu
    {
        text-align: center;


        .card-plate-row
        {
            flex-direction: column;
            align-content: center;


            .card-plate
            {
                display: flex;
                justify-content: center;
                width: 70%;
                border-radius: 20px;
                background-color: $primary;
                color: $secondary;
                border-radius: 30px;
                

                .img-card-plate
                {
                    img
                    {
                        width: 15rem;
                        border-radius: 130px;
                        box-shadow: 3px 3px 10px;
                    }
                }

                
                .card-plate-content
                {
                    flex-grow: 1;
                    padding: 1rem;


                    .card-plate-name-price
                    {

                        .card-plate-name
                        {}

                        .card-plate-price
                        {}

                    }

                    
                    .card-plate-description-ingredients
                    {
                        font-size: 1.1rem;
                        .card-plate-description
                        {

                        }

                        .card-plate-ingredients
                        {

                            .ingredienti
                            {
                                font-weight: 700;
                            }
                        }
                    }
                }

                .card-plate-order
                {
                    text-align: center;

                    

                    align-self: flex-end;
                    color: $secondary;
                    
                    > div {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    button
                    {
                        background-color: transparent;
                        color: $secondary;
                        border: 2px solid $secondary;
                        border-radius: 2rem;
                        padding: 12px 12px;
                    
                    }

                    button:hover {
                        background-color: $secondary;
                        color: $primary;
                    }

                    span {
                        padding: 10px;
                    }
                }
            }
        }
    }
}

</style>