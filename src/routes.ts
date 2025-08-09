import {createRouter, createWebHistory} from "vue-router";
import HomePage from "./components/HomePage.vue";
import {User} from "./Models/User.ts";
import SignIn from "./components/SignIn.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'HomePage',
            path: '/',
            component: HomePage,
            props: {
                user: User
            }
        },
        {
            name: 'SignIn',
            path: '/signIn',
            component: SignIn,
            props: {
                allUsers: 1
            }
        }
    ]
})