import { createApp } from 'vue'
import App from './App.vue'

import {createRouter, createWebHashHistory} from 'vue-router';
import HomeCard from './page/HomeCard.vue';
import RestaurantCard from './page/RestaurantCard.vue';


const routes = [
    {path: '/', component : HomeCard},
    {path: '/restaurant', component: RestaurantCard}
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
const VueApp = createApp(App);

VueApp.use(router)

VueApp.mount('#app')
