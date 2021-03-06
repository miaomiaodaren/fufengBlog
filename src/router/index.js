import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import news from '@/router/map/new'
import iscss from '@/router/map/css'
import admin from '@/router/map/admin'
import { resolve } from 'path';

const Home = resolve => require(['@/pages/Home'], resolve);
const Home2 = resolve => require(['@/pages/Home2'], resolve);
const Login = resolve => require(['@/pages/Login'], resolve);
const userList = resolve => require(['@/pages/userlist'], resolve);
const typeinfo = resolve => require(['@/pages/types'], resolve);
const addnews = resolve => require(['@/pages/addnews'], resolve);
const newslist = resolve => require(['@/pages/news'], resolve);
const books = resolve => require(['@/pages/books'], resolve);
const bookzlist = resolve => require(['@/pages/bookzlist'], resolve);
const bookcontent = resolve => require(['@/pages/bookcontent'], resolve);
const chating = resolve => require(['@/pages/chating'], resolve);
const question = resolve => require(['@/pages/question'], resolve);

//other
const others = resolve => require(['@/pages/other/other'], resolve);

// css
const cssing = resolve => require(['@/pages/cssing'], resolve);
const choujiang1 = resolve => require(['@/pages/choujiang1'], resolve);
const outexcel = resolve => require(['@/components/outexcel'], resolve);

const Reget = resolve => require(['@/pages/regex/index'], resolve);

//plugin
const swiper = resolve => require(['@/pages/explame/swiper'], resolve);
const Plugin = resolve => require(['@/pages/plugin'], resolve);

const Elements = resolve => require(['@/pages/other/element'], resolve);

Vue.use(Router)

export default new Router({
    // mode: 'history',   //default hash
    routes: [
        {
            path: '/',
            name: '首页',
            component: Home,
            meta: {
                active: 'index',
            },
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
        },
        {
            path: '/addnews',
            name: '增加文章',
            component: addnews
        },
        {
            path: '/news',
            name: '文章列表',
            component: newslist
        },
        {
            path: '/question/:id',
            name: '文章详情',
            component: question
        },
        {
            path: '/books',
            name: '书城',
            component: Home2,
            redirect: '/books/index', //页面重定向(新增)
            children: [{
                path: 'index',
                name: '书名',
                components: {
                    page: books
                },
                meta: {
                    active: 'books',
                },
            },
            {
                path: 'bookzlist/:id',
                name: '小说章节',
                components: {
                    page: bookzlist
                },
                meta: {
                    active: 'books',
                },
            },
            {
                path: 'bookcontent/:_id/:id',
                name: '小说内容',
                components: {
                    page: bookcontent
                },
                meta: {
                    active: 'books',
                },
            }]
        },
        {
            path: '/music',
            name: '聊天室',
            component: Home2,
            redirect: '/music/index',
            children: [{
                path: 'index',
                name: '聊天室',
                components: {
                    page: chating
                },
                meta: {
                    active: 'chat',
                },
            }]
        },
        iscss,
        {
            path: '/outexcel',
            name: '导出excel',
            component: outexcel,
        },
        admin,
        {
            path: '/plugin/swiper',
            name: '轮播动画插件案例',
            component: swiper
        },{
            path: '/regex',
            name: '正则收集',
            component: Reget
        },{
            path: '/plugin',
            name: '组件集合',
            component: Plugin
        },{
            path: '/other',
            name: '更多',
            component: Home2,
            redirect: '/other/index',
            children: [{
                path: 'index',
                name: '更多首页',
                components: {
                    page: others,
                    page1: cssing
                },
                meta: {
                    active: 'other'
                },
                children: [
                    {path: '/', component: cssing}
                ]
            }]
        }, {
            path: '/element',
            name: 'Vue-Element 插件',
            component: Elements
        }
    ]
})
