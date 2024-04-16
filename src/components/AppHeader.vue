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
            <span>
                <a class="navbar-brand me-auto d-none d-lg-inline" href="/"><img src="/src/assets/img/deliveboo.png" alt="logo" class="w-75"></a>
            </span>
            <span class="navbar-brand me-auto d-lg-none" >
                <a href="/"><img src="/src/assets/img/deliveboo-icon.png" alt="logo" class="w-75"></a>
            </span>
            
            <span class="text-secondary me-3">
                Sei un Ristoratore?
                <a href="http://127.0.0.1:8000/admin/dashboard" class="login-button">Login</a>
            </span>
            
            
        </div>
    </nav>
    <!--FINE NAVBAR-->
   
</template>

<style lang="scss" scoped>
   @import "../assets/scss/partials/header.scss";
</style>