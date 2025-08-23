import {createRouter, createWebHistory} from "vue-router";
import HomePage from "../components/HomePage.vue";

export const MainRouter = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'HomePage',
            path: '/',
            component: HomePage,

        },
        // {
        //     name: 'NotFoundPages',
        //     path: '/:pathMatch(.*)*',
        //     component: HomePage,
        // },
    ]
})