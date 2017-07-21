import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import news from '@/router/map/new'

const Home = resolve => require(['@/pages/Home'], resolve);
const Login = resolve => require(['@/pages/Login'], resolve);
const userList = resolve => require(['@/pages/userlist'], resolve);
const typeinfo = resolve => require(['@/pages/types'], resolve);

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
      },
      {
          path: '/userlist',
          name: '用户列表',
          component: userList
      },
      {
          path: '/typeinfo',
          name: '类表列表',
          component: typeinfo
      }
  ]
})
