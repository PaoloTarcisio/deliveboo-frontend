<script>
import axios from 'axios';

export default {
  name: 'OrderPaymentComponent',
  data() {
    return {
      orderData: {
        name: '',
        phone: '',
        address: '',
        payment_status: 'Completato', // non complichiamoci la vita'
        notes: '',
        plates: [ //per ora statico
          { id: 3, quantity: 2 },
          { id: 4, quantity: 3 }
        ]
      },
      dropinInstance: null,
    };
  },
  mounted() {
    this.setupBraintree();
  },
  methods: {
    setupBraintree() {
      braintree.dropin.create({
        authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
        selector: '#dropin-container',
      }, (error, dropinInstance) => {
        if (error) {
          console.error('Drop-in Error:', error);
          return;
        }
        this.dropinInstance = dropinInstance;
      });
    },
    submitPayment() {
      if (!this.dropinInstance) {
        console.error('Drop-in UI non inizializzata.');
        return;
      }
      
      this.dropinInstance.requestPaymentMethod((error, payload) => {
        if (error) {
          console.error('Errore nella richiesta del metodo di pagamento:', error);
          return;
        }
        
        // Invia i dettagli dell'ordine e il nonce del pagamento al server
        this.submitOrder(payload.nonce);
      });
    },
    async submitOrder(paymentNonce) {
      // Aggiungi il nonce del pagamento ai dati dell'ordine
      this.orderData.payment_nonce = paymentNonce;

      try {
        const response = await axios.post('http://localhost:8000/api/orders', this.orderData, {
          headers: {
            'Content-Type': 'application/json',
            // Aggiungi qui altri header necessari, come quelli per l'autenticazione
          },
        });

        console.log('Order submitted successfully:', response.data);
        
        this.$router.push({ path: '/', query: { payment: 'success' } });
        
      } catch (error) {
        console.error('Failed to submit order:', error);
        // Messaggio di errore
      }
    }
  },
};
</script>

<template>
  <div class="mt-5 pt-5 container">
    <!-- Utilizzo di .card e .card-body per lo stile di Bootstrap -->
    <div class="card p-5 m-5">
      <div class="card-body">

        <div class="d-flex">
                <!-- Form con gestione dell'evento submit -->
            <div class="row mb-3 w-75 p-3">
            <form @submit.prevent="submitOrder">
                

                <div class="col py-3">
                    <label for="name" class="form-label">Nome e Cognome</label>
                    <input type="text" class="form-control" id="name" v-model="orderData.name" placeholder="Inserisci il tuo nome e cognome" required>
                </div>
                <div class="col py-3">
                    <label for="phone" class="form-label">Telefono</label>
            <input type="text" class="form-control" id="phone" v-model="orderData.phone" placeholder="Inserisci il tuo telefono" required>
                </div>
                <div class="col py-3">
                    <label for="address" class="form-label">Indirizzo</label>
            <input type="text" class="form-control" id="address" v-model="orderData.address" placeholder="Inserisci il tuo indirizzo" required>
                </div>
                <div class="col py-3">
                    <label for="notes" class="form-label">Note</label>
            <textarea class="form-control" id="notes" v-model="orderData.notes" placeholder="Note aggiuntive" rows="3"></textarea>
                </div>

                <p class="text-danger">Qui ci dovrebbe andare il repilogo dei piatti presi dinamicamente 
                    sennò non invia il form con i dati giusti con id e quantità (vedi esempio statico nello script)
                </p>

                <p class="text-danger">
                    se si vuole mettere il riepilogo dei piatti nella parte destra bisognerà vedere come fare nel carrello
                    ma l'id dei piatti e la loro quantità devono essere submittate nel form
                </p>
                
                <div id="dropin-container" class="pt-3"></div>

                <!-- Bottone di invio del form con classi Bootstrap per lo styling -->
                <button type="submit" id="submit-button" class="button button--small button--green">Purchase</button>
            </form>
            </div>

            <div class="row mb-3 w-25 m-3 cart rounded-3">

                <!--bisogna vedere come e se metterli qui se servono nel form-->

                Carrello

            </div>
        </div>


      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
    @import "../assets/scss/partials/checkout.scss";

template {
    background-color: $tertiary;
}

.card {
    background-color: $primary;
}

.cart {
    background-color: $tertiary;
}

label {
    color: $secondary;
    font-weight: bold;
}

.button {
  cursor: pointer;
  font-weight: 500;
  left: 3px;
  line-height: inherit;
  position: relative;
  text-decoration: none;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  //-webkit-appearance: none;
  //-moz-appearance: none;
  display: inline-block;
}

.button--small {
  padding: 10px 20px;
  font-size: 0.875rem;
}

.button--green {
  outline: none;
  background-color: #64d18a;
  border-color: #64d18a;
  color: white;
  transition: all 200ms ease;
}

.button--green:hover {
  background-color: #8bdda8;
  color: white;
}
</style>