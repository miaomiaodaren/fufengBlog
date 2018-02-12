import Vue from 'vue'

const LoginSuccess = 'LoginSuccess'
const users = {
    state: JSON.parse(sessionStorage.getItem('user')) || '',
    mutations: {
        LoginSuccess (state, user) {
            sessionStorage.setItem('user', JSON.stringify(user) || '');
            Object.assign(state, user);
        }
    },
    actions: {
        LoginSuccess ({commit}, userinfos) {
            commit('LoginSuccess', userinfos)
        }
    }
}


export default users