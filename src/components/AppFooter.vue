<script>
export default {
    data() {
        return {

        };
    },
}
</script>

<template>

<!--Card del footer contenenti link ed altro-->
<footer class="bg-dark text-white pb-4 pt-5">
    <div class="container text-center text-md-left justify-content-around">

        <div class="row text-center text-md-left">
            <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h5 class="text-uppercase mb-4 font-weight-bold">
                    Scopri Eatoon
                </h5>
                <p>
                    <a href="#"class="prova">Investitori</a>
               </p>
               <p>
                    <a href="#">Chi siamo</a>
               </p>
               <p>
                    <a href="#">Ristoranti</a>
               </p>
               <p>
                    <a href="#">Altro</a>
               </p>
               <p>
                    <a href="#">Pressroom</a>
               </p>
               <p>
                    <a href="#">Programmazione</a>
               </p>
               <p>
                    <a href="#">Design</a>
               </p>
               <p>
                    <a href="#">Lavora con noi</a>
               </p>
               <p>
                    <a href="#">Diventa nostro partner</a>
               </p>
            </div>

            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h5 class="text-uppercase mb-4 font-weight-bold">
                    note legali
                </h5>
                <p>
                    <a href="#">Termini & Condizioni</a>
                </p>
                <p>
                    <a href="#">Informativa sulla privacy</a>
                </p>
                <p>
                    <a href="#">Cookies</a>
                </p>
                <p>
                    <a href="#">Classificazione dei partner</a>
                </p>
                <p>
                    <a href="#">Richieste da parte delle Autorità Pubbliche</a>
                </p>
            </div>

            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h5 class="text-uppercase mb-4 font-weight-bold">
                    Aiuto
                </h5>
                <p>
                    <a href="#">Contatti</a>
                </p>
                <p>
                    <a href="#">FAQ</a>
                </p>
                <p>
                    <a href="#">Tipi di cucina</a>
                </p>
            </div>

            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h5 class="text-uppercase mb-4 font-weight-bold">
                    Porta Eatoon con te
                </h5>
                <button class="btn btn-primary btn-footer">
                    <div class="logo-footer-container">
                        <img src="../assets/img/googlePlay.png" alt="#">
                        Scarica da google
                    </div>
                </button>
                <button class="btn btn-primary btn-footer">
                    <div class="logo-footer-container">
                        <img src="../assets/img/app-store.png" alt="#">
                        Scarica da apple 
                    </div>
                </button>
            </div>

        </div>

        <hr class="mb-4">

        <div class="row align-items-center">

            <div class="col">
                <p>
                    Copyright
                    <a href="#">
                        <strong>providers</strong>
                    </a>
                </p>
            </div>

        </div>

    </div>
</footer>

</template>

<style lang="scss" scoped>
    @import "../assets/scss/partials/footer.scss";
    
</style>