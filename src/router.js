import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Homepage.vue';
import Carrello from './pages/Carrello.vue';
import Menu from './pages/Menu.vue';
import NotFound from './pages/NotFound.vue';
import Checkout from './pages/Checkout.vue';
import TypeRestourant from './pages/TypeRestourant.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/carrello',
            name: 'Carrello',
            component: Carrello
        },

        {
            path: '/restaurants/:id',
            name: 'restaurants.show',
            component: Menu
        },

        {
            path: '/checkout',
            name: 'Checkout',
            component: Checkout
        },

        {
            path: '/restaurants/types/:id',
            name: 'getRestaurantByType',
            component: TypeRestourant
        },

        // NOT FOUND PAGE LINK
        {
            path:'/:pathMatch(.)',
            name: 'error',
            component: NotFound,
        },
    ]
});

export { router };