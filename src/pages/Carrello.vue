<script>
import axios from 'axios';

//alert( localStorage.getItem('piatto', 1) );
export default {

  data() {
    return {
        piattoArray: JSON.parse(localStorage.getItem('piatto')) || [],
        costoArray: []
     };
  },
  methods: {
    convertiStringheInNumeri(stringhe) {
      const numeriConvertiti = [];
      stringhe.forEach((stringa) => {
        const numero = parseFloat(stringa);
        if (!isNaN(numero)) {
          numeriConvertiti.push(numero);
        }
      });
      return numeriConvertiti;
    },
    sommaNumeri(numeriConvertiti) {
      let somma = 0;
      for (let i = 0; i < numeriConvertiti.length; i++) {
        somma += numeriConvertiti[i];
      }
      return somma;
    }
  },
  
  created() {
    this.costoArray = this.convertiStringheInNumeri(JSON.parse(localStorage.getItem('costo')) || []);
  }
  /*
  methods: {
    saveArrayToLocalStorage(arrayName, array) {
      localStorage.setItem(arrayName, JSON.stringify(array));
    }
  },
  */
};
</script>

<template>

   <div class="container-checkout" id="app">
    
        <div class="container p-4">
            <div class="row">
                <div class="col-7">
                    <h2 style="font-weight: bold;">
                        INDIRIZZO DI PAGAMENTO
                    </h2>
                    <div class="row">
                        <div class="col-6 my-2">
                            <label for="firstname" class="my-2">
                                <h6>
                                    Nome
                                </h6>
                            </label>
                            <input type="text" class="form-control">
                        </div>
                        <div class="col-6 my-2">
                            <label for="lastname" class="my-2">
                                <h6>
                                    Cognome
                                </h6>
                            </label>
                            <input type="text" class="form-control">
                        </div>
                        <div class="col-12 my-2">
                            <label for="email" class="my-2">
                                <h6>
                                    Email
                                </h6>
                            </label>
                            <div class="input-group">
                                <span class="input-group-text">
                                    @
                                </span>
                                <input type="text" class="form-control" id="username">
                            </div>
                        </div>
                        <div class="col-12 my-2">
                            <label for="order" class="form-label">
                                <h6>
                                    Dettagli dell'ordine
                                </h6>
                            </label>
                            <input type="text" id="order" class="form-control text-muted" placeholder="Es: Campanello rotto, chiamare al telefono, ecc. ecc.">
                        </div>
                        <div class="col-12 text-center my-2 p-2">
                            <select name="form-control" id="fork" class="p-2 silverware">
                                <option>Con posate</option>
                                <option>Senza posate</option>
                            </select>
                        </div>
                        
                    </div>
                    <hr>
                    <h4>
                        Pagamenti
                    </h4>
                    <div class="form-check m-2">
                        <input type="radio" class="form-check-input" name="" id="">
                        <label class="form-check-label">Consegna standard</label>
                    </div>
                    <div class="form-check m-2">
                        <input type="radio" class="form-check-input" name="" id="">
                        <label class="form-check-label">Consegna Premium</label>
                    </div>
                    <div class="row">
                        <div class="col-12 my-3">
                            <label for="creditcard" class="form-label">Numero carta</label>
                            <input type="text" id="creditcard" class="form-control">
                        </div>
                        <div class="col-5">
                            <label for="creditcard" class="form-label">Nome titolare</label>
                            <input type="text" id="creditcard" class="form-control">
                        </div>
                        <div class="col-4">
                            <label for="expiration" class="form-label">Data scadenza</label>
                            <input type="text" id="creditcard" class="form-control">
                        </div>
                        <div class="col-3">
                            <label for="creditcard" class="form-label">cvv</label>
                            <input type="text" id="creditcard" class="form-control">
                        </div>
                    </div>
                    <hr>
                    <button type="submit" class="btn btn-submit">
                        Ordina per la consegna
                    </button>
                </div>
                <div class="col-5">
                    <span class="d-flex justify-content-between align-item-center my-2">
                        <h2 style="font-weight: bold;">
                            CARRELLO
                        </h2>
                        <span id="piatti-presenti" class="badge rounded-pill my-2 p-2">
                            ciao
                        </span>
                    </span>
                    <!--RIEPILOGO PIATTI E SOMMA-->
                    <div class="container-list-group row">
                        <ul id="plates-list" class="plates-list col-8">
                            <li v-for="piatto in piattoArray" class="text-primary">
                                {{ piatto }}
                            </li>
                        </ul>
                        <ul id="plates-list" class="plates-list col-4">
                            <li v-for="costo in costoArray" class="text-end">
                                <span class="bg-secondary text-center mb-3 p-2" style="border-radius: 40px;">
                                    {{ costo }}
                                </span>
                            </li>
                            <div class="p-3">
                                la somma totale è di: 
                                    <span class="bg-secondary text-center p-1" style="border-radius: 40px;">
                                        {{ sommaNumeri(costoArray) }}
                                    </span>
                                </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
    @import "../assets/scss/partials/carrello.scss";
</style>