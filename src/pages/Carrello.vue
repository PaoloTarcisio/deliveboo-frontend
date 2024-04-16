<script>
import axios from 'axios';

export default {
    name: 'OrderPaymentComponent',
    data() {
        return {
        cart: [],
        totalItem: 0,
        orderData: {
                name: '',
                phone: '',
                address: '',
                payment_status: 'Completato',
                notes: '',
                plates: []
            },
        dropinInstance: null,
        };
    },

    methods: {
        addToCart(item, quantity = 1) {
            const cartItem = this.cart.find(i => i.plateId === item.plateId);
            if (cartItem) {
                cartItem.quantity += quantity;
            } else {
                this.cart.push({...item, quantity: quantity});
            }
            this.updateLocalStorage();
            this.calculateTotalItem();
        },

        decreaseQuantity(plateId) {
            const item = this.cart.find(i => i.plateId === plateId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                this.removeFromCart(plateId);
            }
            this.updateLocalStorage();
            this.calculateTotalItem();
        },

        removeFromCart(plateId) {
            const index = this.cart.findIndex(item => item.plateId === plateId);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
            this.updateLocalStorage();
            this.calculateTotalItem();
        },

        updateLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },

        loadFromLocalStorage() {
            const storedCart = localStorage.getItem('cart');
            this.cart = storedCart ? JSON.parse(storedCart) : [];
            this.calculateTotalItem();
        },

        calculateTotal() {
            return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
        },
        svuotaCarrello() {
            this.cart.splice(0, this.cart.length);
            this.calculateTotalItem();
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        calculateTotalItem() {
            this.totalItem = this.cart.reduce((total, item) => total + item.quantity, 0);
            localStorage.setItem('totalItem', this.totalItem);
        },

        setupBraintree() {
            braintree.dropin.create({
                authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
                container: '#dropin-container'
            }, (error, instance) => {
                if (error) {
                console.error('Braintree setup error:', error);
                return;
                }
            this.dropinInstance = instance;
            });
        },

        submitPayment() {
            if (!this.dropinInstance) {
                console.error('Drop-in UI non inizializzata.');
                return;
            }
            this.orderData.plates = this.cart.map(item => ({
                id: item.plateId,
                quantity: item.quantity
            }));
            this.dropinInstance.requestPaymentMethod((error, payload) => {
                if (error) {
                console.error('Errore nella richiesta del metodo di pagamento:', error);
                return;
                }
                this.submitOrder(payload.nonce);
            });
        },

        async submitOrder(paymentNonce) {
        this.orderData.payment_nonce = paymentNonce;
        try {
            const response = await axios.post('http://localhost:8000/api/orders', this.orderData, {
            headers: {'Content-Type': 'application/json'}
            });
            console.log('Order submitted successfully:', response.data);
            this.cart = [];
            this.updateLocalStorage();
            this.$router.push({ path: '/', query: { payment: 'success' } });
        } catch (error) {
            console.error('Failed to submit order:', error);
        }
        }
    },
   mounted() {
     this.setupBraintree();
     this.loadFromLocalStorage();
   }
};
</script>


<template>
    <div class="checkout-page">
        <div class="card p-2">
            <h2 class="text-center">
                Carrello
            </h2>

          <div class="row">
            
            <div class="cart-resume col-7">
                <div v-for="item in cart" :key="item.plateId">
                    <div class=" border d-flex justify-content-evenly my-3">

                        <span class="btn-plus-minus">
                            <br>
                            <br>
                            <button class="btn-checkout" @click="decreaseQuantity(item.plateId)">-</button>
                        </span>

                        <span>
                            <p>
                            {{ item.name }} <span v-if="item.quantity > 1" class="item-quantity-cont">x{{ item.quantity }}</span>
                            <br>
                            Prezzo per prodotto: 
                            {{ item.price }} €
                            
                            </p>
                            <p class="text-center">
                                <button class="btn-checkout" @click="svuotaCarrello"><i class="fa-solid fa-trash"></i></button>
                            </p>
                        </span>

                        <span>
                            <br>
                            <br>
                            <button class="btn-checkout" @click="addToCart(item, 1)">+</button>
                            <!--
                                <button class="btn-checkout" @click="removeFromCart(item.plateId)"><i class="fa-solid fa-trash"></i></button>
                            -->
                        </span>

                    </div>
                    
                </div>
                <div class="text-center my-4">
                        <h3>
                            Totale: {{ calculateTotal() }} €
                        </h3>
                    </div>
                
            </div>


            <div class="col-5 d-flex flex-column">
                <div class="speechBubble">
                    <p data-text="Grazie per averci scelto!" class="pp">
                        Grazie per averci scelto!
                    </p>
                </div>
            </div>

          </div>
        </div>
 
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="submitPayment">
              <div class="mb-3">
                <label for="name" class="form-label">Nome e Cognome</label>
                <input type="text" class="form-control" id="name" v-model="orderData.name" placeholder="Inserisci il tuo nome e cognome" required>
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Telefono</label>
                <input type="text" class="form-control" id="phone" v-model="orderData.phone" placeholder="Inserisci il tuo telefono" required>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Indirizzo</label>
              <input type="text" class="form-control" id="address" v-model="orderData.address" placeholder="Inserisci il tuo indirizzo" required>
            </div>
            <div class="mb-3">
              <label for="notes" class="form-label">Note</label>
              <textarea class="form-control" id="notes" v-model="orderData.notes" placeholder="Note aggiuntive" rows="3"></textarea>
            </div>
            <div id="dropin-container"></div>
            <button type="submit" class="btn btn-primary">Procedi con l'ordine</button>
          </form>
        </div>
      </div>
    </div>
</template>



<style lang="scss" scoped>
    @import "../assets/scss/partials/carrello.scss";
</style>