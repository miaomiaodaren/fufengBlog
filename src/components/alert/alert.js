import alert from './alert.vue';
import Vue from 'vue';

const $alert = () => {
    let alt = Vue.extend(alert);
    let interns = new alt().$mount();
    document.body.appendChild(interns.$el)
    console.info(interns, 888888888888888)
}

export default $alert