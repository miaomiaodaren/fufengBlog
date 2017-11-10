import ffInput from './src/input';

ffInput.install = function(Vue) {
    Vue.component(ffInput.name, ffInput)
};

export default ffInput;