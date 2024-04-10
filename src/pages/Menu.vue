<script>
export default {
    
}
</script>

<template>
    <div class="container pt-4 pb-4">
        <div class="container-menu">
            
            <!--INFORMAZIONI RISTORANTE-->
            <div class="row info-risto first-page">
                <div class="col-4">
                    <img src="./assets/img/esempio-img-progetto.jpg" alt="#" style="width: 400px;">
                </div>
                <div class="col-8 btn-info-restaurant">
                    <h2 class="text-left">
                        Menu le tre posate
                    </h2>
                    <small>
                        35 min
                    </small>
                    <br>
                    <span class="badge badge-secondary">Premium</span>
                    <small>
                        Consegna gratuita se hai il premium
                    </small>
                    <br>
                    <div class="btn-group dropend">
                        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Intolleranza?
                        </button>
                        <ul class="dropdown-menu">
                            <li class="bg-danger">
                                Glutine
                            </li>
                            <li>
                                Lattosio
                            </li>
                        </ul>
                    </div>
                    <p>
                        SIAMO UN RISTORANTE,....

                    </p>
                </div>
                <div class="col-8 btn-info-restaurant-second">
                    <button class="btn btn-primary">
                        sdf
                    </button>
                </div>
            </div>

            <!--navbar-->

            <div class="row navbar-menu second-page">
                <div class="col-1 p-3">
                    <button class="btn">
                       <a href="#">Novità</a>
                    </button>
                </div>
                <div class="col-1 p-3">
                    <button class="btn">
                       <a href="#">Novità</a>
                    </button>
                </div>
                <div class="col-1 p-3">
                    <button class="btn">
                       <a href="#">Novità</a>
                    </button>
                </div>
                <div class="col-1 p-3">
                    <button class="btn">
                       <a href="#">Novità</a>
                    </button>
                </div>
                <div class="col-1 p-3">
                    <button class="btn">
                       <a href="#">Novità</a>
                    </button>
                </div>
                <div class="col-1 p-3">
                    <button class="btn">
                       <a href="#">Novità</a>
                    </button>
                </div>
                <div class="col-1 p-3">
                    <button class="btn">
                       <a href="#">Novità</a>
                    </button>
                </div>
                <div class="col-1 p-3">
                    <button class="btn">
                       <a href="#">Novità</a>
                    </button>
                </div>
                <div class="col-1 p-3">
                    <button class="btn">
                       <a href="#">Novità</a>
                    </button>
                </div>
                <div class="col-1 p-3">
                    <button class="btn">
                       <a href="#">Novità</a>
                    </button>
                </div>
                <div class="col-1 p-3">
                    <button class="btn">
                       <a href="#">Novità</a>
                    </button>
                </div>

                

            </div>

            <!--fine navbar-->

            <!--I VARI PIATTI E AGGIUNGERLI-->
            <h3 class="my-5 text-center">
                I nostri Primi piatti
            </h3>
            <p class="my-5 text-center" style="font-size: 70px;">
                io scorrerò finiti i primi e passerò ai secondi, ai contorni....
            </p>
            <div class="row">
                <div class="col-lg-3 col-md-4 col-sm-1 text-center">
                    <div class="card mb-3">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="../src/assets/img/margherita-pizza.jpg" style="width: 600px;  height: 400px;" class="rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body bg-white">
                                    <h5 class="card-title">Primo piatto</h5>
                                    <p class="card-text text-black">Primo piatto1, primo piatto 2. Finiti, scorre sui secondi, ecc. ecc.</p>
                                </div>
                            </div>
                        </div>  
                    </div>
                    
                </div>
                
            </div>
            <!--fine row-->
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
@import "../assets/scss/partials/menu.scss";
</style>