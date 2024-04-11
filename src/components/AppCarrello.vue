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
      },
      removeToCart(piatto) {
        const j = this.piattiAggiunti.indexOf(piatto);
        if (j !== -1) {
          this.piattiAggiunti.splice(j, 1);
          this.totale = this.calcoloPrezzo();
        }
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

        <!--INIZIO CORPO CARRELLO-->
        <div class="offcanvas-body d-flex align-content-between flex-wrap" style="background-image: url(./src/assets/img/undraw_shopping_app_flsj.png); 
                                          background-size: contain;
                                          background-position: center;
                                          background-repeat: no-repeat;"> 
                
                <div class="container-list-group">
                  <ul class="plates-list p-0">
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
                              <div class="d-flex justify-content-between">
                                <span>
                                  <p class="card-text">
                                    {{ piatto.descrizione }}
                                  </p>
                                </span>
                                <span>
                                  <button @click="addToCart(piatto)" class="add-btn">
                                      +
                                  </button>
                                </span>
                              </div>
                          </div>
                      </li>

                      
                      <h5 class="text-center my-4">
                        Stai acquistando:
                      </h5>
                      <li v-for="(piatto, index) in piattiAggiunti" :key="'added_' + index" class="card">
                          
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
                              <div class="d-flex justify-content-between">
                                <span>
                                  <button @click="removeToCart(piatto)" class="remove-btn">
                                      -
                                  </button>
                                </span>
                                <span>
                                  <p class="card-text">
                                    {{ piatto.descrizione }}
                                  </p>
                                </span>
                                <span>
                                  <button @click="addToCart(piatto)" class="add-btn">
                                      +
                                  </button>
                                </span>
                              </div>
                        </div>

                      </li>

                  </ul>
                </div>

                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Devi pagare un totale di: </h5>
                    <p class="card-text tot-pay">
                      {{ totale }}
                    </p>
                    <a href="/carrello" class="card-link text-decoration-none">
                      <button class="btn payment-btn d-flex">
                        vai al pagamento
                      </button>
                    </a>
                  </div>
                </div>
        </div>
        <!--FINE CORPO CARRELLO-->


    </div>
    <!--END FLOATING BUTTON-->
</template>

<style lang="scss" scoped>
    @import "../assets/scss/partials/footer.scss";
    @import "../assets/scss/partials/AppCarrello.scss";

</style>