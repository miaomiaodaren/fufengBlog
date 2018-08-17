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

import './components/global'

import ffEle from '@/assets/vueplugin/src'
Vue.use(ffEle)


//测试自己的时间插件
import DatePickers from '@/plugin/timepick'
Vue.use(DatePickers)

import exten from '@/pages/other/extend/index.js'
Vue.prototype.isart = exten

// import ff from '@/assets/vueplugin/src'
// console.info(ff, '21312312213123');
// Vue.use(ff);

Vue.prototype.getAjax = GetAjax

Vue.use(ElementUI)
Vue.use(VueQuillEditor)

import $ajax from './components/alert/alert.js';
Vue.prototype.$ajax = $ajax;


Vue.config.productionTip = false

Object.keys(filters).forEach(v => {
    Vue.filter(v, filters[v])
})

//字体图标
import '@/assets/fonts/iconfont.css'
import '@/assets/fonts/iconfont.js'

Vue.prototype.onlyid = 1;

/* eslint-disable no-new */
new Vue({
  	el: '#app',
  	router,
  	store,
  	template: '<App/>',
  	components: { App }
})
