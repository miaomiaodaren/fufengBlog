import Vue from 'vue';
import Tem from './tem.vue'

function extenddeom () {
    let tentex = Vue.extend(Tem);
    let inters = new tentex({age: 12}).$mount();
    console.info(inters, 'isinters');
    document.body.appendChild(inters.$el);
}

export default extenddeom;
