<script>
import axios from "axios";


export default {

data() {
  return {
  piatti: [{
      nome: "Carbonara",
      descrizione: "Pasta con le uova e guanciale, aggiunta pepe nero",
      prezzo: "$15"
              },
              {
      nome: "Amatriciana",
      descrizione: "Pasta sugo",
      prezzo: "£20"
              },
              {
      nome: "Crudo di pesce",
      descrizione: "Pesce crudo",
      prezzo: "£25"
              },
              {
      nome: "Tagliata di manzo",
      descrizione: "Tagliata di manzo",
      prezzo: "£35"
              },
          ]
      };
    },
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
                      <button @click="add(); AumentaNumeroPiatti()" class="add-btn px-3">
                          Aggiungi +
                      </button>
                  </ul>
                </div>
              </div>
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