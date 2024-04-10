<script>
import axios from 'axios';

export default {
    data() {
    return {
        restaurantsTypes: [],
        allRestaurants: [],
        allTypes: [],
        tipoComune: true,
        };
    },
    methods: {

    },



    created () {

        // Chiamata che restituisce tutti i ristoranti dello stesso tipo
        axios
            .get('http://127.0.0.1:8000/api/restaurants/types/' + this.$route.params.id)
            .then(response => {
                this.restaurantsTypes = response.data.results;
                // console.log(this.restaurants)

            });


        // Chiamata che mostra quale categoria è mostrata in pagina
        axios
            .get('http://127.0.0.1:8000/api/restaurants')
            .then(response => {
                this.allRestaurants = response.data.results.data;
                // console.log(this.restaurants)

        });


        // Chiamata solo dei tipi dei ristoranti
        axios
            .get('http://127.0.0.1:8000/api/types')
            .then(response => {
                this.allTypes = response.data.results;
                console.log(this.allTypes)

        });
    }
}
</script>
<template>


    <!-- se l'id dei tipi corrisponde all'id del tipo del ristorante allora stampi il tipo che corrisponde -->


    <!-- <h2 v-if="i == 0">
        se il singolo tipo è incluso nei tipi del ristorante stampo il nome

        {{  }}
        <div>

        </div>
    </h2> -->

    <!-- per ogni categoria che puo avere un ristorante -->
    <div v-for="(restaurantType, i) in restaurantsTypes" :key="index" class="page-title">

        <!-- per ogni ristorante -->
        <div v-for="singleRest in allRestaurants">

            <!-- se il ristorante è presente tra i ristoranti con un determinato tipo -->
            <div v-if="singleRest.id == restaurantsTypes[i].id ">

                <!-- per ogni tipo all'interno dei ristoranti che hanno un determinato tipo -->
                <div v-for="singleType in singleRest.types">

                    <h2 v-if="i == 0">
                        <!-- se il singolo tipo è incluso nei tipi del ristorante stampo il nome -->
                        {{ singleType.name }}
                    </h2>

                </div>

            </div>

        </div>

    </div>
    <section class="cards">
        <div class="row p-4">
            <div class="my-card col-lg-3 col-md-5 p-3 m-2" v-for="(restaurant, i) in restaurantsTypes" :key="index">

                <div class="row">
                    <a :href="'/menu/' + restaurant.id">
                        <div class="card-img" :id="restaurant">
                            <img :src="restaurant.image" alt="img ristorante">
                        </div>
                        <div class="my-card-body">
                            <div class="my-card-title p-2">
                                <h5>{{ restaurant.activity_name }}</h5>
                            </div>
                            <div class="my-card-description p-3">
                                <p>{{ restaurant.description }}</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>

</template>

<style lang="scss" scoped>

    
    .page-title
    {
        text-align: center;
        background-color: black;
        margin-top: 200px;
    }

    .my-card
    {
        img
        {
            width: 200px;
        }
    }

</style>