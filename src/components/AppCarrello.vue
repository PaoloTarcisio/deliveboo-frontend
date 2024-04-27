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
        // console.log('Carrello caricato:', this.cart);
      },
      
      calculateTotalItem() {
            this.totalItem = this.cart.reduce((total, item) => total + item.quantity, 0);
        },
    },
    mounted() {
     this.loadFromLocalStorage();
   },
};
</script>

<template>
    <!--FLOATING BUTTON-->
    <a class="btn-cart" type="button" href="/carrello">
        <i class="fa-solid fa-cart-shopping"></i>
    </a>

    <div class="badge-counter">
    </div>
 
</template>

<style lang="scss" scoped>
    @import "../assets/scss/partials/footer.scss";
    @import "../assets/scss/partials/AppCarrello.scss";

</style>