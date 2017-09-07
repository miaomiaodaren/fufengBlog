const Home2 = resolve => require(['@/pages/Home2'], resolve);
const cssing = resolve => require(['@/pages/cssing'], resolve);
const choujiang1 = resolve => require(['@/pages/choujiang1'], resolve);
const flextop = resolve => require(['@/components/css/sticky'], resolve);
const tabnav = resolve => require(['@/components/css/tabnav'], resolve);
const upload = resolve => require(['@/components/upload/index'], resolve);

export default {
    path: '/css',
    name: 'css样式收集',
    component: Home2,
    // meta: {
    //     requireAuth: true,
    //     role: ["1","24"]
    // },
    redirect: '/css/index', //页面重定向(新增)
    // icon: 'iconfont icon-caidanlan-huankuanguanli',
    children: [{
        path: 'index',
        name: 'css汇总',
        components: {
            page: cssing
        }
    }, {
        path: 'cj1',
        name: '抽奖转盘',
        components: {
            page: choujiang1
        }
    }, {
        path: 'flextop',
        name: 'Sticky header',
        components: {
            page: flextop
        }
    }, {
        path: 'tabnav',
        name: '左侧切入',
        components: {
            page: tabnav
        }
    }, {
        path: 'upload',
        name: '上拉刷新',
        components: {
            page: upload
        }
    }]
}