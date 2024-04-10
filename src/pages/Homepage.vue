<script>
import axios from 'axios';

export default {
  data() {
    return {
            paymentSuccess: this.$route.query.payment === 'success'
        };
    },
    methods: {
        clearMessage() {
            this.paymentSuccess = false;
        }
    },
    mounted() {
        if (this.paymentSuccess) {
            setTimeout(() => {
                this.paymentSuccess = false;
            }, 5000); // Imposta il timeout a 5 secondi
        }
    }
};
</script>

<template>
    <!--SECTION HERO-->
    <div class="container-fluid position-relative">
        <div v-if="paymentSuccess" class="alert alert-success message-payment text-center w-50 mx-auto">
            Pagamento avvenuto con successo!
            <button class="btn" @click="clearMessage">X</button>
        </div>
        <section class="background-header">
            <div class="container d-flex align-items-center justify-content-center fs-1 text-white flex-column">
                <h1>
                    Deliveboo
                </h1>
                <h2>
                    Buono da far paura
                </h2>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    @import "../assets/scss/partials/homepage.scss";
    @import "../assets/scss/partials/variables.scss";

    .message-payment {
        z-index: 1000;
        margin-top: 150px;
        position: fixed;
        width: 100%;
        left: 0;
        right: 0;
    }

    // BOTTONI CATEGORIE

    .categories-container
    {
        a
        {
            text-decoration: none;
            font-weight: 500;
            font-size: 1.1rem;
            padding: 10px 15px;
            border: 2px solid $primary;
            border-radius: 30px;
            color: $primary;
        }

        a:hover
        {
            color: $tertiary;
            border: 2px solid $primary;
            background-color: $primary;
        }
    }


    // CARD

    .cards
    {
        background-color: $secondary;

        .row{
            margin: 0 auto;
            justify-content: space-evenly;
            
            .my-card
            {
                color: $secondary;
                border-radius: 10px;
                background-color: $primary;
                
                a
                {
                    text-decoration: none;
                    color: $secondary;

                    p
                    {
                        margin-bottom: 0;
                    }
                }
                
                a:hover
                {
                    color: $secondary;
                }
            }
        }
    }


    
</style>