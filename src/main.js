import {
    createApp,
} from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia'
import GStore from '@/store/gstore'
import 'nprogress/nprogress.css'
createApp(App)
    .use(router)
    .use(createPinia())
    .provide('GStore', GStore) // provide this object so others can inject it
    .mount('#app')