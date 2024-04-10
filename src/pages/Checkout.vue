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
    <div class="mt-5 pt-5">
        <form class="p-5 m-5 bg-success-subtle" @submit.prevent="submitOrder">
            <input type="text" v-model="orderData.name" placeholder="Nome e Cognome" required>
            <input type="text" v-model="orderData.phone" placeholder="Telefono" required>
            <input type="text" v-model="orderData.address" placeholder="Indirizzo" required>
            <textarea class="d-block mt-3" v-model="orderData.notes" placeholder="Note"></textarea>

            <!-- qui dovrebbero esserci i piatti dinamici -->
            
            <div id="dropin-container" class="px-5 pt-5 mt-5"></div>

            <button type="submit" id="submit-button" class="button button--small button--green m-5">Purchase</button>
        </form>
        
    </div>
</template>

<style lang="scss" scoped>
    @import "../assets/scss/partials/checkout.scss";
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