import {createRouter, createWebHistory} from "vue-router";
import Main from "../components/Main.vue";
import MessagesPage from "../components/MessagesPage.vue";
import HomePage from "../components/HomePage.vue";

export const MainRouter = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Main,
            children: [
                {
                    name: 'home',
                    path: '/',
                    component: HomePage,

                },
                {
                    name: 'MessagesPage',
                    path: '/messages',
                    component: MessagesPage,
                },
                {
                    name: 'MessagesPage',
                    path: '/messages',
                    component: MessagesPage,
                },
                {
                    name: 'MessagesPage',
                    path: '/messages',
                    component: MessagesPage,
                },
                {
                    name: 'MessagesPage',
                    path: '/messages',
                    component: MessagesPage,
                },
                {
                    name: 'MessagesPage',
                    path: '/messages',
                    component: MessagesPage,
                },
            ]
        },

    ]
})