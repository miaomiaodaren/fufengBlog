<template>
    <div id="Home">
        <headers></headers>
        <div class="main">
            <div class="content">
                <div class="content_left">
                    <ul>
                        <li v-for="(n, index) in newList" :key="index">
                            <span class="feet">来自模块 {{n.type}}</span>
                            <h2 @click="question(n._id)">{{n.title}}</h2>
                            <p class="con_text">
                                <span ref="conter">{{showall ? n.content : n.content.substring(0, 300)}}</span>
                                <span v-if="n.content.length > 300 && !showall">...<em @click="getMore(n._id)"  class="hascheck">阅读全文</em></span>
                                <span v-if="n.content.length > 300 && showall" @click="showall = false" class="hascheck">收起</span>
                            </p>
                            <span class="times">{{Date.parse(n.addtime)/ 1000 | timeFormat}}</span>
                        </li>
                    </ul>
                    <page :total="50" @pagechange="pchange" :gopage="false"></page>
                </div>
                <div class="content_right">22</div>
            </div>
        </div>
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
            }
        },
        components: {
            headers,
            page
        },
        mounted() {
            this.GetNews();
            this.aa();
        }
    }
</script>
<style lang="scss" scoped type="text/scss">
    #Home{
        width: 100%;
        height: 100%;
        .banner{
            width: 100%;
            height: 53px;
            position: fixed;
            top: 0;
            left: 0;
            border-bottom: 1px solid rgba(30,35,42,.06);
            box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);
            background-clip: content-box;
            z-index: 100;
            background: #fff;
        }
        nav{
            width: 1200px;
            margin: 0 auto;
            line-height: 53px;
            padding-left: 30px;
            font-size: 16px;
            text-align: left;
            a {
                color: #000;
                padding-right: 15px;
            }
        }
        .main{
            background-color: #f7f8fa;
            display: block;
            padding-top: 65px;
            .content {
                width: 1200px;
                margin: 0 auto;
                text-align: left;
                .content_left{
                    width: 900px;
                    float: left;
                    ul{
                        li{
                            padding: 16px 20px;
                            position: relative;
                            margin-bottom: 10px;
                            background-color: #fff;
                            border: 1px solid #e7eaf1;
                            border-radius: 2px;
                            box-shadow: 0 1px 3px rgba(0,37,55,.05);
                            box-sizing: border-box;
                            span{
                                color: #8590a6;
                                line-height: 1;
                            } 
                            h2{
                                font-size: 18px;
                                font-weight: 700;
                                line-height: 1.6;
                            }
                            .times{
                                display: block;
                                text-align: right;
                            }
                            .con_text{
                                text-indent: each-line;
                                font-size: 16px;
                                line-height: 2;
                                span{
                                    &:first-child{
                                        height: auto;
                                        animation: appear 1s;
                                    }  
                                }
                                .hascheck{
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
                .content_right{
                    width: 250px;
                    float: right;
                }
            }
        }
    }
    @mixin keyframes($a) { 
        @-webkit-keyframes #{$a} {
            @content }
        @-moz-keyframes #{$a} {
            @content }
        @keyframes #{$a} {
            @content }
    }
    @include keyframes(appear) {
        0% {
            opacity: 0;
        }
        100% { 
            opacity: 1;
        } 
    }
</style>
