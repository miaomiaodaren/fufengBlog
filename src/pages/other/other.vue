<template>
    <div id="other">
        <headers></headers>
        <div class="userInfo">
            <h2>
                <router-link to="/admin/login" v-if="!hasLogin">立即登录</router-link>
                <span v-else>{{this.$store.state.users.name}}</span>
            </h2>
        </div>
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
            </ul>
        </div>
    </div>
</template>
<script type="text/javascript">
    import headers from '@/include/header.vue'
    import clerar from '@/assets/seamless'
    export default {
        data() {
            return {
            }
        },
        computed:{
            hasLogin() {
                return !!this.$store.state.users
            }
        },
        mounted() {
            // clerar({
            //     dom: this.$refs.seam
            // })
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
            height: px2rem(180)
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