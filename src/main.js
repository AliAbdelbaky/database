import {
    createApp,
} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GStore from '@/store/gstore'
import 'nprogress/nprogress.css'
createApp(App)
    .use(store)
    .use(router)
    .provide('GStore', GStore) // provide this object so others can inject it
    .mount('#app')