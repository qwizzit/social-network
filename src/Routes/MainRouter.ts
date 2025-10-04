import {createRouter, createWebHistory} from "vue-router";
import Main from "../components/Main.vue";
import MessagesPage from "../components/MessagesPage.vue";
import HomePage from "../components/HomePage.vue";
import {AccessApi} from "../Api/AccessApi.ts";
import {isUser} from "../composition/metods.ts";

export const MainRouter = createRouter({
    history: createWebHistory(),
    routes: [

        {
            path: '/user/:id',
            name: 'Main',
            component: Main,
            beforeEnter: (to) =>{ // сделать cosnt
               if(!to.params.id || to.params.id !== isUser.id()) {
                    return `/user/${isUser.id()}/home`;
                }
            },
            children: [
                {
                    name: 'Home',
                    path: 'home',
                    component: HomePage,

                },
                {
                    name: 'MessagesPage',
                    path: 'messages',
                    component: MessagesPage,
                    // children: [
                    //     {
                    //         name: 'MyMessagesPage',
                    //         path: 'my',
                    //         component: MessagesPage,
                    //     }
                    // ]
                },
            ]
        },
        {
            path: '/:notFound(.*)*',
            redirect: () => {
                if(isUser.isAuthenticated()) {
                    return `/user/${isUser.id()}/home`;
                }
                return '' // редирект на home и от
            },
        },
    ]
})