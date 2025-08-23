import {createApp } from 'vue'
import './Styles/style.scss'
import './Styles/Colors.scss'
import App from './components/App.vue'
import {MainRouter} from "./Routes/MainRouter.ts";
import {PublicRouter} from "./Routes/PublicRouter.ts";
// Если в localstorage что-то хранится, то загружать publicrouter иначе mainrouter
async function setupRouter() {
    return localStorage.getItem('token') === null ? PublicRouter : MainRouter
}

setupRouter()
    .then(currentRouter => {
        createApp(App).use(currentRouter).mount('#app')
        currentRouter.push(currentRouter.options.routes[0].path)

    })
    .catch(console.error);
