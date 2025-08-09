import { createApp } from 'vue'
import './Styles/style.scss'
import './Styles/Colors.scss'
import App from './components/App.vue'
import {createRouter, createWebHistory} from "vue-router";
import SignIn from "./components/SignIn.vue";
import HomePage from "./components/HomePage.vue";
import {User} from "./Models/User.ts";
import {router} from "./routes.ts";

createApp(App).use(router).mount('#app')
