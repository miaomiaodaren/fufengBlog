<template>
    <div id="Home">
        <div class="main">
            <div class="content">
                <div class="content_left">
                    <ul>
                        <li v-for="(n, index) in newList" :key="index">
                            <span class="feet" @click="dd">来自模块 {{n.type}}</span>
                            <h2 @click="question(n._id)">{{n.title}}</h2>
                            <p class="con_text">
                                <span ref="conter">{{showall ? n.content : n.content.substring(0, 300)}}</span>
                                <span v-if="n.content.length > 300 && !showall">...<em @click="getMore(n._id)"  class="hascheck">阅读全文</em></span>
                                <span v-if="n.content.length > 300 && showall" @click="showall = false" class="hascheck">收起</span>
                            </p>
                            <!-- <span class="times">{{Date.parse(n.addtime)/ 1000 | timeFormat}}</span> -->
                            <span class="times">{{n.addtime}}</span>
                        </li>
                    </ul>
                    <!-- 分页组件 -->
                    <!-- <page :total="50" @pagechange="pchange" :gopage="false"></page> -->
                </div>
            </div>
        </div>
        <headers></headers>
    </div>
</template>
<script>
    // import Vue from 'vue'
    // Vue.component('redendemo', {
    //     name: 'redendemo',
    //     render: function(createElement) {
    //         return createElement(
    //             'h3',
    //             this.$slots.default
    //         )
    //     }
    // })
    import headers from '@/include/header.vue'
    import page from '@/plugin/Pagination.vue'
    import {clears, delHtmlTag, unescape, getByteLen} from '@/assets/util.js'
    import moment from '@/assets/monent.js'
    export default {
        data() {
            return {
                newList: [],
                showall: false,
                name: '2222',
                total: 0,
            }
        },
        methods:{
            async GetNews() {
                try {
                    let res = await this.getAjax('/news/newslist', {}, 'GET');
                    res.data.map((v, n) => {
                        v.addtime = moment().formart('yyyy-MM-dd HH:mm:ss', v.addtime);
                        v.content = unescape(delHtmlTag(v.content));
                    })
                    this.newList = res.data;
                }
                catch(err) {
                    console.log(err)
                }
            },
            async aa() {
                try {
                    let res = await this.getAjax('/news/aa', {}, 'GET');
                } catch (err) {
                    console.log(err)
                }
            },
            getMore(id) {
                let refest = this.newList.filter((v) => {
                    return v._id == id
                });
                this.showall = true;
            },
            pchange(id) {
                console.log(id);
            },
            question(id) {
                this.$router.push({path: '/question/' + id})
            },
            dd() {
                navigator.vibrate(1000);  //实现手机振动 传入[],可振动多次
            }
        },
        components: {
            headers,
            page
        },
        mounted() {
            const obj = [1,2,3,4,5];
            clears(obj);
            this.GetNews();
            this.aa();
            // console.info(moment(1503559089).formart('yyyy-MM-dd HH:mm:ss EE')); 
            // console.info(moment().tiemrdeff('1992.07.14').defftime);
            // console.info(moment().tiemrdeff('1992-07-14', '2017-8-24').deffmart('y:M:d'));
            // console.info(moment('2017/8/24 14:48:13').subtract(2, 'H').formart('yyyy-MM-dd HH:mm:ss')); console.log('222');
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #Home
        width: 100%
        height: 100%
        .banner
            width: 100% 
            height: px2rem(106)
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
            line-height: px2rem(106)
            padding-left: 30px
            font-size: 16px
            text-align: left
            a 
                color: #000
                padding-right: 15px
        .main
            background-color: #f7f8fa
            display: block
            margin-bottom: px2rem(106)
            .content 
                width: 100%
                margin: 0 auto
                text-align: left
                display: flex
                .content_left
                    width: 100%
                    // float: left
                    flex-grow: 1
                    ul
                        li
                            padding: px2rem(32) px2rem(40)
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
                                @include font-dpr(16px)
                                font-weight: 700
                                line-height: 1.6
                            .times
                                display: block
                                text-align: right
                                @include font-dpr(14px)
                            .con_text
                                text-indent: each-line
                                @include font-dpr(14px)
                                line-height: 2
                                overflow: hidden
                                span
                                    &:first-child
                                        height: auto
                                        animation: appear 1s
                                .hascheck
                                    cursor: pointer
                            .feet
                                // font-size: px2rem(60)
                                @include font-dpr(16px)
    @mixin keyframes($a) 
        @-webkit-keyframes #{$a} 
            @content 
        @-moz-keyframes #{$a} 
            @content 
        @keyframes #{$a} 
            @content 
    @include keyframes(appear) 
        0% 
            opacity: 0
        
        100% 
            opacity: 1
</style>
