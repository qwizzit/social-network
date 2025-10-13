import {createRouter, createWebHistory} from "vue-router";
import PublicComponent from "../components/PublicComponent.vue";
import NotFound from "../components/NotFound.vue";

export const PublicRouter = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'PublicComponent',
            path: '/signin',
            component: PublicComponent,
            meta: { requiresAuth: false },
        },
        {
            path: '/:notFound(.*)*',
            name: 'NotFound',
            component: NotFound,
        },
    ]
})