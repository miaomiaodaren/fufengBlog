import Vue from 'vue'

const keys = {
    state: {
        keys: false
    },
    mutations: {
        closekeys (state) {
            state.keys = false
        }
    },
    actions: {
        closekeys ({commit}) {
            commit('closekeys')
        }
    }
}


export default keys