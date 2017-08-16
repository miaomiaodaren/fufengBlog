<template>
    <div id="header">
        <header class="banner">
            <nav>
                <router-link to="/">首页</router-link>
                <router-link to="/">问答</router-link>
                <router-link to="/books/index">书城</router-link>
                <router-link to="/music/index">音乐室</router-link>
                <router-link to="/im/index">聊天室</router-link>
                <div class="header_right">
                    我要提问
                </div>
            </nav>
        </header>
    </div>
</template>
<script>
    export default{
        data() {
            return {

            }
        }
    }
</script>
<style lang="sass" lang="sass" scoped type="text/sass">
    #header
        .banner
            width: 100%
            height: 53px
            position: fixed
            top: 0
            left: 0
            border-bottom: 1px solid rgba(30,35,42,.06)
            box-shadow: 0 1px 3px 0 rgba(0,34,77,.05)
            background-clip: content-box
            z-index: 100
            background: #fff
            nav
                width: 1200px
                margin: 0 auto
                line-height: 53px
                padding-left: 30px
                font-size: 16px
                text-align: left
                a
                    color: #000
                    padding-right: 15px
                .header_right
                    text-align: right
                    display: inline-block
                    float: right
</style>
