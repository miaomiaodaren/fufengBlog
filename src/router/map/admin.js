const Home2 = resolve => require(['@/pages/Home2'], resolve);
const Login = resolve => require(['@/pages/admin/Login'], resolve);

export default {
    path: '/admin',
    name: '后台登录',
    component: Home2,
    redirect: '/admin/index',
    children: [{
        path: 'index',
        name: '后台首页',
        components: {page: Login}, 
    }, {
        path: 'login',
        name: '后台登录',
        components: {page: Login}, 
    }]
}