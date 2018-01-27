// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import GetAjax from '@/http/index'
import * as filters from '@/filter/index'
import store from '@/store/index'

import VueQuillEditor from 'vue-quill-editor'

import moment from '@/assets/monent.js'

import '@/assets/base.css'

import ffEle from '@/assets/vueplugin/src'
console.info(ffEle);
Vue.use(ffEle)


//测试自己的时间插件
import DatePickers from '@/plugin/timepick'
Vue.use(DatePickers)


// import ff from '@/assets/vueplugin/src'
// console.info(ff, '21312312213123');
// Vue.use(ff);

Vue.prototype.getAjax = GetAjax

Vue.use(ElementUI)
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

Object.keys(filters).forEach(v => {
    Vue.filter(v, filters[v])
})

Vue.prototype.onlyid = 1;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
