import {createRouter, createWebHistory} from "vue-router";
import SignIn from "../components/SignIn.vue";

export const PublicRouter = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'SignIn',
            path: '/signIn',
            component: SignIn,
        },
        // {
        //     name: 'NotFoundPages',
        //     path: '/:pathMatch(.*)*',
        //     component: SignIn,
        // },
    ]
})