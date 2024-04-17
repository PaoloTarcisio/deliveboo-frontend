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
        
        <section class="section-restourant-detail">
            <div class="restourant-detail">
                <div class="card mx-5">
                    <div class="row">
                        <div class="col-lg-3 col-md-12 col-sm-12">
                            <div class="restourant-image h-100">
                                <img :src="restaurant.image" alt="" class="img-fluid h-100 w-100">
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-12 col-sm-12 flex-grow-1 py-3">
                            <div class="restourant-text">
                                <div class="restourant-name">
                                    <h2>
                                        {{ restaurant.activity_name }}
                                    </h2>
                                </div>
                                <div class="restourant-address">
                                    <p>
                                        {{ restaurant.address }}
                                    </p>
                                </div>
                                <div class="restourant-description">
                                    <p>
                                        {{ restaurant.description }}
                                    </p>
                                </div>
                                <div class="restourant-vat">
                                    <p>
                                        <span id="Piva">P.Iva:  </span>{{ restaurant.VAT_number }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- MENU RISTORANTE 1-->
        <section class="section-menu py-3">
            <h2 class="py-4 text-center fw-bold">
                Il nostro Menù:
            </h2>

            <div v-if="restaurant.plates.length > 0">


                            <!-- MENU RISTORANTE -->
                <div class="card-plate-row">
                    <div class="card-plate my-3 px-5 py-3"  v-for="plate in restaurant.plates">

                        <div class="row p-0">

                            <div class="col-lg-3 col-md-12 col-sm-12 order-sm-first">
                                <div class="img-card-plate">
                                    <img :src="plate.image" alt="">
                                </div>
                            </div>
    
                            <!-- scritte card piatti -->
                            <div class="col-lg-9 col-md-12 col-sm-12 order-sm-last">
                                <div class="card-plate-content pt-3">

                                    <!-- nome/prezzo -->
                                    <div class="card-plate-name-price">
                                        <div class="card-plate-name">
                                            <h4>
                                                {{ plate.name }}
                                            </h4>
                                        </div>
                    
                                        <div class="card-plate-price">
                                            <h5>
                                                {{ plate.price }} €
                                            </h5>
                                        </div>
                                    </div>
                
                                    <!-- ingredienti/descrizione -->
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
                                        
                                    <!-- bottoni -->
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
                                            <button class="fa-solid fa-trash-can" @click="removeFromCart(plate.id)"></button> 
                                        </div>
                                        <div v-else>
                                            <!-- bottone carrellino-->
                                            <button class="fa-solid fa-cart-plus" @click="addToCart(plate, 1)"></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <!-- immagine card piatti -->

                    </div>
                </div>

            </div>

            <div v-else class="else-category p-3">
                <h3 class="text-center">Non ci sono piatti disponibili nel Menù.</h3>
                <img src="/src/assets/img/dishes-not-found.png" alt="dishes-not-found" class="rounded-3">
            </div>
        </section>
    </div>

</template>

<style lang="scss" scoped>
@import "../assets/scss/partials/variables.scss";
@import "../assets/scss/partials/popup.scss";

.my-container{



    .section-restourant-detail
    {   
        padding: 100px 0 50px 0;
        background-color: $tertiary;

        .card
        {
            border: none;


            .row
            {
                background-color: $primary;
                color: $secondary;
                border-radius: 20px;

                >*
                {
                    padding: 0;
                }
                .restourant-image
                {
                    /*img
                    {
                        width: 100%;
                        border-top-left-radius: 20px;
                        border-bottom-left-radius: 20px;

                    }*/
                

                img {
                    width: 100%;
                    border-radius: 0;
                    @media (min-width: 768px) {
                        border-top-left-radius: 20px;
                        border-top-right-radius: 20px;
                        border-bottom-left-radius: 0;
                        border-bottom-right-radius: 0;
                    }
                    @media (min-width: 992px) {
                        border-top-left-radius: 20px;
                        border-bottom-left-radius: 20px;
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                    }
                }
                }   

                .restourant-text
                {
                    flex-grow: 1;
                    text-align: center;
                    font-size: 1.2rem;

                    >*
                    {
                        padding-bottom: 1.5rem;
                    }

                    #Piva
                    {
                        font-size: 1.1rem;
                        font-weight: 500;
                    }
                }
            }
        }


        
        
        
    }

    // STILE CARD MENU 

    .section-menu
    {
        text-align: center;
        background-color: $secondary;

        h2
        {
            color: $primary;
        }

        h3 {
            color: $primary;
        }
        .card-plate-row
        {


            .card-plate
            {
                width: 70%;
                margin: 0 auto;
                background-color: $primary;
                color: $secondary;
                border-radius: 20px;
                

                .img-card-plate
                {
                    img
                    {
                        width: 17rem;
                        border-radius: 13000px;
                        box-shadow: 3px 3px 10px;
                        margin-bottom: 3rem;
                    }
                }

                
                .card-plate-content
                {
                    width: 60%;
                    margin: 0 auto;
                    text-align: start;


                    .card-plate-name-price
                    {
                        //padding-left: 3.3rem;
                    }
                    .card-plate-description-ingredients
                    {
                        font-size: 1.1rem;
                        //padding-left: 3.3rem;
                        padding-bottom: 1.5rem;
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
                        padding: 14px 14px;

                        
                    }
                    
                    button:hover {
                        background-color: $secondary;
                        color: $primary;
                    }
                    
                    span {
                        padding: 10px 14px;
                        border-top: 2px solid $secondary;
                        border-bottom: 2px solid $secondary;
                    }

                    .fa-plus{
                        border: 2px solid $secondary;
                        border-top-left-radius: 2rem;
                        border-bottom-left-radius: 2rem;
                    }

                    .fa-minus{
                        border: 2px solid $secondary;
                        border-top-right-radius: 2rem;
                        border-bottom-right-radius: 2rem;
                    }

                    .fa-trash-can
                    {
                        border: 2px solid $secondary;
                        border-radius: 2rem;
                        margin-left: 2rem;
                    }

                    .fa-cart-plus{
                        border: 2px solid $secondary;
                        border-radius: 2rem;
                    }
                }
            }
        }
    }
}

</style>