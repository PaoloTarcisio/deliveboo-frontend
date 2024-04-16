<script>
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import AppFooter from './components/AppFooter.vue';
import AppCarrello from './components/AppCarrello.vue';

import axios from 'axios';
// IMPORTAZIONE DELLO STORE
import { store } from './components/store.js'



export default {
    data() {
        return {

            restaurants:[]
        };
    },
    components: {
        AppHeader,
        AppMain,
        AppFooter,
        AppCarrello
    },  
    methods: {
    },
    computed: {
        isCarrello() {
        return this.$route.path === '/carrello';
        }
    }
}
</script>

<template>
    <AppHeader />

    <AppMain />

    <AppFooter />

    <AppCarrello v-if="!isCarrello" />
</template>

<style lang="scss">
@use "assets/scss/main" as *;
@import "assets/scss/partials/reset";

@import "assets/scss/partials/variables.scss";
.container-app{
    background-color: $tertiary;
}
</style>