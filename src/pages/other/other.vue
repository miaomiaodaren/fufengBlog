<template>
    <div id="other">
        <headers></headers>
        <router-view name="page1" :key="$route.fullPath"></router-view>
        <div class="userInfo">
            <h2>
                <router-link to="/admin/login" v-if="!hasLogin">立即登录</router-link>
                <span v-else>{{this.$store.state.users.name}}</span>
            </h2>
        </div>
        <div @click="gotop">21312312</div>
        <ffInput ref="aa" v-model="countDown"></ffInput>
        <img :src="imgs">
        <input type="text" v-model="test" />
        <div class="seamless">
            <ul class="other_list" ref="seam">
                <li><router-link to="/abouts">产品介绍</router-link></li>
                <li><router-link to="/css">CSS3样式收集</router-link></li>
                <li><router-link to="/regex">正则收集录</router-link></li>
                <li><router-link to="/admin/login">登录</router-link></li>
                <li><router-link to="/news">问题列表</router-link></li>
                <li><router-link to="/addnews">发布问题</router-link></li>
                <li><router-link to="/outexcel">导出excel</router-link></li>
                <li><router-link to="/css/uploader">文件上传</router-link></li>
                <li><router-link to="/plugin">组件集合</router-link></li>
                <li><router-link to="/element">VUE-Element组件文档说明</router-link></li>
                <li>111</li>
                <li>2</li>
                <li>22</li>
                <li>133311</li>
                <li>444</li>
                <li style="height: 3000px">55</li>
                <li>166611</li>
                <li>77777</li>
            </ul>
        </div>
    </div>
</template>
<script type="text/javascript">
    import headers from '@/include/header.vue'
    import GetAjax from '../../http/index'
    //https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable
    import * as zrender from 'zrender';
    import moment from '../../assets/monent'
    import {scrollTop} from '../../assets/util.js'
    export default {
        data() {
            return {
                imgs: '',
                countDown: '222',
                test: 2,
            }
        },
        watch: {
            test(val) {
                if(-1 * Math.abs(val) !== val) {
                    this.test = -1 * val
                }
                return val
            }
        },
        computed:{
            hasLogin() {
                return !!this.$store.state.users
            },
        },
        methods: {
            gotop() {
                scrollTop(200   )
            },
            pro() {
                return new Promise((resolve, reject) => {
                    console.info(44);
                    return '3333'
                })
            },
            async pro1() {
                console.info(2222);
                return '333'
            }
        },
        mounted() {
            // this.pro().then(res => {alert(res)});
            // this.pro1().then(res=> {alert(res)})
            setTimeout(() => {
                console.info(this.pro(), this.pro1())
            }, 1000)
            // GetAjax('/doImg').then(res => {
            //     this.imgs = res.data.url;
            // })
            setTimeout(() => {
                console.info(this, 9999);
                this.isart()
            }, 6000);
        },
        components: {
            headers,
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #other
        padding: px2rem(26)
        background-color: #fff
        height: 100%
        .userInfo
            height: px2rem(100)
            h2
                @include font-dpr(22px)
                line-height: px2rem(50)
                text-align: left
                padding-left: px2rem(40)
                line-height: px2rem(180)
                a
                    color: #000
        .other_list
            width: 100%
            transition: all 0 ease-in
            li
                height: px2rem(100)
                border-bottom: 1px solid #ddd
                line-height: px2rem(100)
                text-align: left
                a
                    color: #000
                    text-indent: 3px
                    padding-left: px2rem(10)
                    @include font-dpr(16px)
                &:last-child
                    border-width: 0
        .seamless
            // height: px2rem(400)
            overflow: hidden
            position: relative
</style>