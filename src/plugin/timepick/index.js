import DatePickers from './datapick';

DatePickers.install = function install(Vue) {
    Vue.component(DatePickers.name, DatePickers);
}

export default DatePickers;