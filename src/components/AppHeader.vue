<script>


export default {
    data() {
        return {
            
        };
    },
}
</script>

<template>
    <!--NAVBAR-->
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand me-auto" href="#">Logo</a>
            
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Logo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
                        <li class="nav-item">
                            <a class="nav-link mx-lg-2" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mx-lg-2" href="/carrello">Carrello</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mx-lg-2" href="/checkout">Checkout</a>
                        </li>
                    </ul>
                </div>
            </div>
            <span class="text-secondary me-3">Sei un Ristoratore?</span>
            <a href="http://127.0.0.1:8000/admin/dashboard" class="login-button">Login</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
    </nav>
    <!--FINE NAVBAR-->
   
</template>

<style lang="scss" scoped>
   @import "../assets/scss/partials/header.scss";
</style>