<script>
import axios from "axios";

export default {

data() {
  return {
      cart: [],
      totalItem: 0
      };

    },
    methods: {
      loadFromLocalStorage() {
        const storedCart = localStorage.getItem('cart');
        this.cart = storedCart ? JSON.parse(storedCart) : [];
        this.calculateTotalItem();
        console.log('Carrello caricato:', this.cart);
      },
      
      calculateTotalItem() {
            this.totalItem = this.cart.reduce((total, item) => total + item.quantity, 0);
        },
    },
    mounted() {
     this.loadFromLocalStorage();
   }
};
</script>

<template>
    <!--FLOATING BUTTON-->
    <button class="btn-cart" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
        <i class="fa-solid fa-cart-shopping"></i>
    </button>

    <div class="badge-counter">
    </div>

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
                
                <!---->
                <div class="container-list-group">
                  <ul class="plates-list p-0">
                      <li class="card">
                          <div class="card-body">
                              <div class="d-flex justify-content-between">
                                m
                              </div>
                          </div>
                      </li>

                      
                      <h5 class="text-center h5-cart my-4">
                        Stai acquistando:
                      </h5>
                      <li class="card">
                          
                        <div class="card-body">
                              <div class="d-flex justify-content-between">
                                <span>
                                  <h5 class="card-title"></h5>
                                </span>
                                <span class="span-price">
                                  <p class="card-text">
                                    €  
                                  </p>
                                </span>
                              </div>
                              <div class="d-flex justify-content-between">
                                <span>
                                  <button class="remove-btn">
                                      -
                                  </button>
                                </span>
                                <span>
                                  <p class="card-text">
                                  </p>
                                </span>
                                <span>
                                  <button class="add-btn">
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
                    <h5 class="card-title h5-cart">Devi pagare un totale di: </h5>
                    <p class="card-text tot-pay">
                      € 
                    </p>
                    <a href="/carrello" class="card-link text-decoration-none">
                      <button class="btn payment-btn d-flex">
                        vai al pagamento
                      </button>
                    </a>
                  </div>
                </div>
        </div>


    </div>
</template>

<style lang="scss" scoped>
    @import "../assets/scss/partials/footer.scss";
    @import "../assets/scss/partials/AppCarrello.scss";

</style>