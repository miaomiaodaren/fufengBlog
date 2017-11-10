// var Input = require('../packages/input/index.js');
import Input from '../packages/input/index.js';
const components = [
    Input
];
const install = function(Vue, opt = {}) {
    components.map(c => {
        console.info(c, '3123123123123');
        Vue.component(c.name, c)
    })
    console.info(Vue);
}

if(typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const ff = {
    install,
    Input,
    version: '1.0.0'
}

export default ff

// module.exports = ff
