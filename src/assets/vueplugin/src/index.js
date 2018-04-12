// var Input = require('../packages/input/index.js');
import Input from '../packages/input/index';
import Button from '../packages/button/index';
import Radio from '../packages/radio/index';
import RadioGroup from '../packages/radio-group/index';
const components = [
    Button,
    Input,
    Radio,
    RadioGroup
];
const install = function(Vue, opt = {}) {
    components.map(c => {
        Vue.component(c.name, c)
    })
}

if(typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const ff = {
    install,
    Button,
    Input,
    Radio,
    RadioGroup,
    version: '1.0.0'
}

export default ff

// module.exports = ff
