<script>
import axios from 'axios';


export default {
    data() {
    return {
        restaurant: [],
        };
    },
    created () {
        axios
            .get('http://127.0.0.1:8000/api/restaurants/' + this.$route.params.id)
            .then(response => {
                this.restaurant = response.data.results;
                this.plates = response.data.results.plates;
                console.log(this.restaurant);
                // console.log(this.plates);
            });
    }
}
</script>

<template>
    <div class="my-container">
    
        <!-- INFORMAZIONI RISTORANTE -->
        
        <section class="section-restourant-detail py-5">
            <div class="restourant-detail">

                <div class="row">
                    <div class="col-lg-4 col-md-5 col-sm-8" >
                        <img :src="restaurant.image" alt="" class="info-restaurant">
                    </div>
                    <div class="col-lg-1 col-md-6 col-sm-0"></div>
                    <div class="col-lg-7 col-md-5 col-sm-8 info-restaurant p-3">
                        <h2 class="text-center pb-3">
                            {{ restaurant.activity_name }}
                        </h2>
                        <p>
                            {{ restaurant.address }}
                        </p>
                        <p>
                            {{ restaurant.description }}
                        </p>
                        <div>
                            <div>
                                <h6>P.iva:</h6>
                                {{ restaurant.VAT_number }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- MENU RISTORANTE 1-->
        <section class="section-menu">
            <h2 class="my-4 text-center">
                Il nostro menù:
            </h2>
            <div class="row card-plate-row my-3">
                <div class="col-lg-2 col-md-4 col-sm-8 card-plate m-3"  v-for="plate in restaurant.plates">
                    <div class="img-card-plate m-3">
                        <img :src="plate.image" alt="" class="info-restaurant">
                    </div>
                    <div class="card-plate-name">
                        <h5 class="text-center">
                            {{ plate.name }}
                        </h5>
                    </div>
                    <div class="card-plate-price">
                        <h6>
                            {{ plate.price }} €
                        </h6>
                    </div>
                    <div class="card-plate-description">
                        {{ plate.description }}
                    </div>
                    <div class="card-plate-ingredients">
                        Ingredienti:
                        {{ plate.ingredients }}
                    </div>
                </div>
            </div>




            <!-- MENU RISTORANTE 2 -->
            <!--<div class="row card-plate-row my-3">
                <div class="col-lg-2 col-md-4 col-sm-8 card-plate m-3 px-5 py-3"  v-for="plate in restaurant.plates">
                    <div class="img-card-plate m-3">
                        <img :src="plate.image" alt="" class="info-restaurant">
                    </div>

                    <div class="card-plate-content">
                        <div class="card-plate-name-price">
                            <div class="card-plate-name">
                                <h4 class="text-center">
                                    {{ plate.name }}
                                </h4>
                            </div>
        
                            <div class="card-plate-price">
                                <h5>
                                    {{ plate.price }} €
                                </h5>
                            </div>
                        </div>
    
                        <div class="card-plate-description-ingredients">
                            <div class="card-plate-description mb-4">
                                {{ plate.description }}
                            </div>
        
                            <div class="card-plate-ingredients">
                                <span class="ingredienti">
                                    Ingredienti:
                                </span>
                                {{ plate.ingredients }}
                        </div>
                    </div>


                    </div>
                </div>
            </div>-->
        </section>
    </div>

</template>

<style lang="scss" scoped>
@import "../assets/scss/partials/variables.scss";


.my-container{
    margin-top: 150px;


    .section-restourant-detail
    {
        background: $tertiary;
        
        
        .restourant-detail
        {
            width: 80%;
            margin: 0 auto;

            .row
            {
                justify-content: space-evenly;

                .info-restaurant{
                    background-color: $primary;
                    color: $secondary;
                    border-radius: 10px;
                }
                
                img {
                    width: 300px;
                    height: 300px;
                }
            }
        

        }
    }

    .section-menu
    {
        text-align: center;


        // STILE MENU 1
        .card-plate-row
        {
            width: 90%;
            margin: 0 auto;
            justify-content: space-evenly;
            .card-plate
            {
                background-color: $primary;
                color: $secondary;
                border-radius: 30px;
                
                
                .img-card-plate{
        
                    
                    img
                    {
                        width: 70%;
                        border-radius: 130px;
                        box-shadow: 3px 3px 10px;
                    }
                }

            
                .card-plate-ingredients{
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                    padding: 1rem;
                    background-color: $secondary;
                    color: $primary;
                    border: 1px solid $secondary;
                    border-radius: 20px;
                }
            }
        }



        //STILE MENU 2
        /*.card-plate-row
        {
            flex-direction: column;
            align-content: center;


            .card-plate
            {
                display: flex;
                justify-content: center;
                width: 70%;
                border-radius: 20px;
                background-color: $primary;
                color: $secondary;
                border-radius: 30px;
                

                .img-card-plate
                {
                    img
                    {
                        width: 15rem;
                        border-radius: 130px;
                        box-shadow: 3px 3px 10px;
                    }
                }

                
                .card-plate-content
                {
                    flex-grow: 1;
                    padding: 1rem;


                    .card-plate-name-price
                    {

                        .card-plate-name
                        {}

                        .card-plate-price
                        {}

                    }

                    
                    .card-plate-description-ingredients
                    {
                        font-size: 1.1rem;
                        .card-plate-description
                        {

                        }

                        .card-plate-ingredients
                        {

                            .ingredienti
                            {
                                font-weight: 700;
                            }
                        }
                    }
                }

            }
        }*/
    }
}

</style>