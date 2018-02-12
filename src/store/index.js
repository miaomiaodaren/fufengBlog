import Vue from 'vue'
import Vuex from 'vuex'
import keys from './modules/keys'
import users from './modules/user'
import getters from './getter';
import Blog from './modules/blog'
import book from './modules/book'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        keys,
        users,
        Blog,
        book
    },
    getters
});

export default store