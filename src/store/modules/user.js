import Vue from 'vue'

const users = {
    state: {
        users: JSON.parse(sessionStorage.getItem('user')) || '',
    },
    mutations: {
        LoginSuccess (state, user) {
            sessionStorage.setItem('user', JSON.stringify(user));
            object.assign(state.users, user);
        }
    },
    actions: {
        LoginSuccess ({commit}, userinfos) {
            commit('LoginSuccess', userinfos)
        }
    }
}


export default users