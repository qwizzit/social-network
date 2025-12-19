import {createApp } from 'vue'
import './Styles/style.scss'
import './Styles/Colors.scss'
import './Styles/Sizes.scss'
import './Styles/variables.scss'
import './Styles/transitionComponent.scss'
import App from './components/App.vue'
import {MainRouter} from "./Routes/MainRouter.ts";
import {PublicRouter} from "./Routes/PublicRouter.ts";

async function setupRouter() {
    return localStorage.getItem('token') === null ? PublicRouter : MainRouter
}

setupRouter()
    .then(currentRouter => {
        createApp(App).use(currentRouter).mount('#app')
    })
    .catch(console.error);
