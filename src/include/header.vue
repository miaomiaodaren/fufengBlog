<template>
    <div id="header">
        <header class="banner">
            <nav>
                <router-link to="/">首页</router-link>
                <router-link to="/books/index">书城</router-link>
                <router-link to="/music/index">音乐室</router-link>
                <router-link to="/im/index">聊天室</router-link>
                <navs class="more">
                    <navsitem to="/" label="更多" index="1">
                        <router-link to="/abouts">产品介绍</router-link>
                        <router-link to="/css">CSS3样式收集</router-link>
                        <router-link to="/login">登录</router-link>
                        <router-link to="/news">问题列表</router-link>
                        <router-link to="/addnews">发布问题</router-link>
                    </navsitem>
                </navs>
                <!-- <div class="header_right">
                    我要提问
                </div> -->
            </nav>
        </header>
    </div>
</template>
<script>
    import Nav from '@/plugin/nav/nav.vue'
    import navsitem from '@/plugin/nav/nav-item.vue'
    export default{
        data() {
            return {
            }
        },
        components: {
            navs: Nav,
            navsitem: navsitem
        },
        mounted() {
        },
    }
</script>
<style lang="sass" lang="sass" scoped type="text/sass">
    #header
        .banner
            width: 100%
            height: px2rem(86)
            position: fixed
            bottom: 0
            left: 0
            border-top: 1px solid rgba(30,35,42,.06)
            box-shadow: 0 1px 3px 0 rgba(0,34,77,.05)
            background-clip: content-box
            z-index: 100
            background: #fff
            nav
                width: 100%
                margin: 0 auto
                line-height: px2rem(86)
                @include font-dpr(14px)
                text-align: left
                display: flex
                text-align: center
                a, .more
                    color: #000
                    padding-right: 15px
                    flex: 1
                    flex-direction: row
                    flex-wrap: wrap
                    align-content: flex-start
                    white-space: nowrap
                    text-overflow: ellipsis
                .header_right
                    text-align: right
                    display: inline-block
                    float: right
</style>
