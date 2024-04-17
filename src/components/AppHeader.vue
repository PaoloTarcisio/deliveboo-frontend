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
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">               
                <img src="/src/assets/img/deliveboo.png" alt="logo" class="d-none d-lg-block w-75">
                
                <img src="/src/assets/img/deliveboo-icon.png" alt="logo" class="d-block d-lg-none w-50">
            </a>
            
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