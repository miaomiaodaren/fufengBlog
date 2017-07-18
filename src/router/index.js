import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import news from '@/router/map/new'

const Home = resolve => require(['@/pages/Home'], resolve);
const Login = resolve => require(['@/pages/Login'], resolve);

Vue.use(Router)


export default new Router({
  // mode: 'history',   default hash
  routes: [
      {
          path: '/',
          name: '首页',
          component: Home
      },
      {
          path: '/login',
          name: '登录',
          component: Login
      }
  ]
})
