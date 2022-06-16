import {
    createStore
} from "vuex";
import userModule from './modules/user'
import eventModule from './modules/event'
export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        userModule,
        eventModule
    },
});