import {createRouter, createWebHistory} from "vue-router";
import Main from "../components/Main.vue";
import Messages from "../components/Messages.vue";
import Content from "../components/Content.vue";
import UserProfile from "../components/UserProfile.vue";
import Home from "../components/Home.vue";
import NotFound from "../components/NotFound.vue";

export const MainRouter = createRouter({
    history: createWebHistory(),
    routes: [

        {
            path: '/',
            name: 'Main',
            component: Main,
            // beforeEnter: (to) =>{ // сделать cosnt
            //    if(!to.params.id || to.params.id !== isUser.id()) {
            //         return `/user/${isUser.id()}/home`;
            //     }
            // },
            redirect: "/home/content",
            children: [
                {
                    name: 'Home',
                    path: 'home',
                    component: Home,
                    children: [
                        {
                            name: 'Content',
                            path: 'content',
                            component: Content,
                        },
                        {
                            name: 'Messages',
                            path: 'messages',
                            component: Messages,
                        }
                    ]

                },
                {
                    name: 'Profile',
                    path: 'user/:id',
                    component: UserProfile,
                    props: true,
                },
            ]
        },

        {
            name: 'NotFound',
            path: '/:notFound(.*)*',
            component: NotFound,
            // redirect: () => {
            //     if(isUser.isAuthenticated()) {
            //         return `/home/content`;
            //     }
            //     return '' // редирект на home и от
            // },
        },
    ]
})