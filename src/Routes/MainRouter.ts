import {
    createRouter,
    createWebHistory
} from "vue-router";
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
            redirect: "/home",
            children: [
                {
                    name: 'Home',
                    path: 'home',
                    component: Home,
                    redirect: '/home/content',
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
                    path: 'user/:id(\\d+)',
                    component: UserProfile,
                    props: true,
                },
            ]
        },

        {
            name: 'NotFound',
            path: '/:notFound(.*)*',
            component: NotFound,
            beforeEnter: (to) => {
                if(to.path === '/signin'){
                    return '/'
                }
                return true
            },
        },
    ]
})