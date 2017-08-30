import Vue from 'vue'
import Vuex from 'vuex'
import keys from './modules/keys'
import getters from './getter';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        keys,
    },
    getters
});

export default store