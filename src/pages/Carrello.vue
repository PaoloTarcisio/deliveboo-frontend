<script>
import axios from 'axios';

export default {
  data() {
    return {
        piattoCostoArray: [],
        counter: {},
        totalePiattiCounter: 0,
        PrezzoFinale: 0
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
    elaboraPiattoCostoArray() {
        const piattoArray = JSON.parse(localStorage.getItem('piatto')) || [];
        const costoArray = this.convertiStringheInNumeri(JSON.parse(localStorage.getItem('costo')) || []);
        
        
        for (let i = 0; i < piattoArray.length; i++) {
            const piatto = piattoArray[i];
            const costo = costoArray[i];
            this.aggiungiPiattoCosto(piatto, costo);
        }
        
        
        this.counter = {};
        const piattoCostoMap = {}; 
        for (let i = 0; i < this.piattoCostoArray.length; i++) {
            const { piatto, costo } = this.piattoCostoArray[i];
            if (!piattoCostoMap[piatto]) {
                piattoCostoMap[piatto] = costo;
            } else {
                piattoCostoMap[piatto] += costo;
            }
            this.counter[piatto] = (this.counter[piatto] || 0) + 1;
        }
        
      
        this.piattoCostoArray = Object.keys(piattoCostoMap).map(piatto => ({
            piatto,
            costo: piattoCostoMap[piatto]
        }));

        this.totalePiattiCounter = piattoArray.length;

        this.PrezzoFinale = this.calcolaPrezzoFinale();


    },
    aggiungiPiattoCosto(piatto, costo) {
        this.piattoCostoArray.push({ piatto, costo });
    },
    calcolaPrezzoFinale() {
        let sum = 0;
        for (let i = 0; i < this.piattoCostoArray.length; i++) {
            sum += this.piattoCostoArray[i].costo;
        }
        return sum;
    },


    
    ResetCarrello(array,prezzi) {

        // ------------- RESETTO IL CARRELLO --------------
        
        array = "";
        prezzi = "";
        // console.log(array);
        console.log(prezzi);
        localStorage.setItem("piattiDaCarrello", array);
        localStorage.setItem("prezziDaCarrello", prezzi);
    }
    },
    created() {
        this.elaboraPiattoCostoArray();

        // ------------- PRENDO I PIATTI DA MENU --------------

        let piattiArrivati = localStorage.getItem("PiattiDalMenu").split(",");
            // console.log(piattiArrivati);
            localStorage.setItem('piattiDaCarrello', piattiArrivati);

        // ------------- PRENDO I PREZZI DA MENU --------------

        let prezziArrivati = localStorage.getItem("prezziDalMenu");
            console.log(prezziArrivati);
            localStorage.setItem('prezziDaCarrello', prezziArrivati);

    },
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
                            {{ totalePiattiCounter }}
                        </span>
                    </span>
                    <!--RIEPILOGO PIATTI E SOMMA-->
                    <div class="container-list-group p-4 d-flex flex-column" style="height: 400px;">
                        <div class="text-black d-flex justify-content-between" v-for="(item, index) in piattoCostoArray" :key="index">

                            <!--Doppio span annidato per fare in modo da far comparire il counter del numero di piatti di fianco al piatto-->
                            <span>
                                {{ item.piatto }}
                                <span class="bg-danger" v-if="counter[item.piatto] > 1">
                                    x {{ counter[item.piatto] }}
                                </span>
                                <span v-else class="" style="visibility: hidden;">
                                </span>
                            </span>
                            <!--Fine doppio span-->
                            <span>{{ item.costo }}</span>
                            
                        </div>

                        <div class=" d-flex align-items-end text-end text-danger">
                            <span class="mt-auto">
                                {{ PrezzoFinale }}
                            </span>
                        </div>

                        <button @click="ResetCarrello(piattiArrivati, prezziArrivati)">
                            RESET CARRELLO
                        </button>
                    </div>
                    <!--FINE RIEPILOGO PIATTI E SOMMA-->
                </div>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
    @import "../assets/scss/partials/carrello.scss";
</style>