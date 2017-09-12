import Vue from 'vue'
import Vuex from 'vuex'
import keys from './modules/keys'
import users from './modules/user'
import getters from './getter';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        keys,
        users
    },
    getters
});

export default store