<template>
    <div id="Home">
        <header class="banner">
            <nav>
                <router-link to="/">首页</router-link>
                <router-link to="/">问答</router-link>
                <router-link to="/books/index">书城</router-link>
                <router-link to="/music/index">音乐室</router-link>
                <router-link to="/im/index">聊天室</router-link>
            </nav>
        </header>
        <div class="main">
            <div class="content">
                <div class="content_left">
                    <ul>
                        <li v-for="(n, index) in newList" :key="index">
                            <span class="feet">来自模块 {{n.type}}</span>
                            <h2>{{n.title}}</h2>
                            <p class="con_text">{{n.content.substring(0, 300)}}
                                <span v-if="n.content.length > 300">...阅读全文</span>
                            </p>
                            <span class="times">{{n.addtime}}</span>
                        </li>
                    </ul>
                </div>
                <div class="content_right">22</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                newList: [],
            }
        },
        methods:{
            async GetNews() {
                try {
                    let res = await this.getAjax('/news/newslist', {}, 'GET');
                    this.newList = res.data;
                }
                catch(err) {
                    console.log(err)
                }
            },
            async aa() {
                try {
                    let res = await  this.getAjax('/news/aa', {}, 'GET');
                    console.log(res);  console.log('2222');
                } catch (err) {
                    console.log(err)
                }
            }
        },
        mounted() {
            this.GetNews();
            this.aa();
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #Home
        width: 100%
        height: 100%
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
        .main
            background-color: #f7f8fa
            display: block
            padding-top: 65px
            .content
                width: 1200px
                margin: 0 auto
                text-align: left
                .content_left
                    width: 900px
                    float: left
                    ul
                        li
                            padding: 16px 20px
                            position: relative
                            margin-bottom: 10px
                            background-color: #fff
                            border: 1px solid #e7eaf1
                            border-radius: 2px
                            box-shadow: 0 1px 3px rgba(0,37,55,.05)
                            box-sizing: border-box
                            span
                                color: #8590a6
                                line-height: 1
                            h2
                                font-size: 18px
                                font-weight: 700
                                line-height: 1.6
                            .times
                                display: block
                                text-align: right
                            .con_text
                                height: 150px
                                overflow: hidden
                                text-indent: each-line
                                font-size: 16px
                                line-height: 2
                .content_right
                    width: 250px
                    float: right
</style>
