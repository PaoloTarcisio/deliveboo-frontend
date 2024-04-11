<script>
import axios from "axios";


export default {

data() {
  return {
        piatti: [{
            nome: "Carbonara",
            descrizione: "Pasta con le uova e guanciale, e pepe nero",
            prezzo: 15
                    },
                    {
            nome: "Amatriciana",
            descrizione: "Pasta sugo con guangiale e pepe, possibilmente prendere pomodori pelati da schiacciare",
            prezzo: 20
                    },
                ],
        piattiAggiunti: [],
        totale: 0
      };
    },
    methods: {
      addToCart(piatto) {
        this.piattiAggiunti.push(piatto);
        this.totale = this.calcoloPrezzo();
        console.log("Nuovo carrello:", this.carrello);
      },
      calcoloPrezzo() {
        let totale = 0;
        this.piattiAggiunti.forEach((piatto) => {
          totale += piatto.prezzo;
        });
        return totale;
      }
    }
};
</script>

<template>
    <!--FLOATING BUTTON-->
    <button class="btn-cart" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
        <i class="fa-solid fa-cart-shopping"></i>
    </button>

    <div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
        <div class="offcanvas-header">
          <h3 class="offcanvas-title" id="staticBackdropLabel">CARRELLO</h3>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body" style="background-image: url(./src/assets/img/undraw_shopping_app_flsj.png); 
                                          background-size: contain;
                                          background-position: center;
                                          background-repeat: no-repeat;">   
              <div class="my-5">
                <div class="container-list-group">

                  <ul id="plates-list" class="plates-list">
                      <li v-for="(piatto, i) in piatti" :key="i" class="card">
                          <div class="card-body">
                              
                              <div class="d-flex justify-content-between">
                                <span>
                                  <h5 class="card-title">{{ piatto.nome }}</h5>
                                </span>
                                <span>
                                  <p class="card-text">
                                    {{ piatto.prezzo }}
                                  </p>
                                </span>
                              </div>
                              <p class="card-text">
                                {{ piatto.descrizione }}
                              </p>
                          </div>

                          <button @click="addToCart(piatto)" class="add-btn px-3">
                              Aggiungi al carrello
                          </button>
                      </li>

                      <h3>
                        Questi sono i piatti aggiunti al carrello
                      </h3>
                      <li v-for="(piatto, index) in piattiAggiunti" :key="'added_' + index" class="card">
                          
                          <div class="card-body">
                              <h5 class="card-title">{{ piatto.nome }}</h5>
                              <p class="card-text">{{ piatto.descrizione }}</p>
                              <p class="card-text">{{ piatto.prezzo }}</p>
                          </div>
                      </li>

                  </ul>
                </div>
              </div>
              <p>
                devi pagare un totale di: {{ totale }}
              </p>
              <button class="btn payment-btn d-flex">
                vai al pagamento
              </button>
        </div>
    </div>
    <!--END FLOATING BUTTON-->
</template>

<style lang="scss" scoped>
    @import "../assets/scss/partials/footer.scss";
    @import "../assets/scss/partials/AppCarrello.scss";

</style>