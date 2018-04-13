// var Input = require('../packages/input/index.js');
import Input from '../packages/input/index';
import Button from '../packages/button/index';
import Radio from '../packages/radio/index';
import RadioGroup from '../packages/radio-group/index';
import CheckBox from '../packages/checkbox/index'
import CheckBoxGroup from '../packages/checkbox-group/index'
import Cascader from '../packages/cascader/index'
const components = [
    Button,
    Input,
    Radio,
    RadioGroup,
    CheckBox,
    CheckBoxGroup,
    Cascader
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
    CheckBox,
    CheckBoxGroup,
    Cascader,
    version: '1.0.0'
}

export default ff

// module.exports = ff
