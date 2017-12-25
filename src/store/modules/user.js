import Vue from 'vue'

const LoginSuccess = 'LoginSuccess'
const users = {
    state: JSON.parse(sessionStorage.getItem('user')) || '',
    mutations: {
        LoginSuccess (state, user) {
            console.info(user, '我是user');
            sessionStorage.setItem('user', JSON.stringify(user) || '');
            object.assign(state, user);
        }
    },
    actions: {
        LoginSuccess ({commit}, userinfos) {
            console.info(userinfos, '我是userinfos');
            commit('LoginSuccess', userinfos)
        }
    }
}


export default users