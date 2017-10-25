<template>
    <div id="Home">
        <div class="main">
            <div class="content">
                <div class="search">
                    <!-- <minput v-model="searchcon" type="number" icon="search" :on-icon-click="hassearch"></minput> -->
                    <div class="mm_input">
                        <input class="searchinput"
                            v-model="searchcon"
                            @focus="isfocus= true"
                            @blur="isfocus = false"
                            :class="{searchfocus: isfocus}"
                        >
                        <i class="el-icon-search searchicon" @click="hassearch(searchcon)"></i>
                        <div class="searchdata" v-if="searchcon.length >= 1 || isfocus">
                            <p v-if="serchdata.length > 0">
                                <router-link :to="{ path: '/question/' + n._id}"
                                    v-for="(n, index) in serchdata" 
                                    :key="index" 
                                    class="lists"
                                >
                                    {{n.title}}
                                </router-link>
                            </p>
                            <p v-else>暂无搜索记录</p>
                        </div>
                    </div>
                </div>
                <!-- 右侧滑动删除组件 -->
                <!-- <tabdel></tabdel> -->
                <toprefresh :top-load-method="refresh" @top-state-change="stateChange" :bottom-load-method="loadmore"  @bottom-state-change="stateChange">
                    <template slot="top-block" scope="props">
                        <div class="top-load-wrapper">
                            <div :class="{'el-icon-arrow-down': props.state === 'trigger', 'el-icon-loading': props.state === 'loading'}" style="margin: 0 auto">
                            </div>
                            {{props.stateText}}
                        </div>
                    </template> 
                    <div class="content_left">
                        <ul>
                            <li v-for="(n, index) in newList" :key="index">
                                <span class="feet" @click="GetNews(1, 2, n.type)">来自模块 {{n.type}}</span>
                                <h2 @click="question(n._id)">{{n.title}}</h2>
                                <p class="con_text">
                                    <!-- 会有一个问题就是在300字并且的代码或图片的时候，这边应该把前三百个字代码前面的字显示出来 -->
                                    <span ref="conter" v-html="showall ? n.content : getLenht(n.content).length > 300 ? n.content.substring(0, 300) : n.content"></span>
                                    <span v-if="getLenht(n.content).length > 300 && !showall">
                                        ...<em @click="getMore(n._id)"  class="hascheck sdown">阅读全文</em>
                                    </span>
                                    <span v-if="getLenht(n.content).length > 300 && showall" @click="showall = false" class="hascheck sup">
                                        收起
                                    </span>
                                </p>
                                <!-- <span class="times">{{Date.parse(n.addtime)/ 1000 | timeFormat}}</span> -->
                                <span class="times">{{n.addtime}}</span>
                            </li>
                        </ul>
                        <!-- 分页组件 -->
                        <!-- <page :total="50" @pagechange="pchange" :gopage="false"></page> -->
                    </div>
                    <template slot="bootom-block" scope="props">
                        <div class="bottom-load-wrapper">
                            <div :class="{'el-icon-arrow-top': props.state === 'trigger', 'el-icon-loading': props.state === 'loading'}" style="margin: 0 auto">
                            </div>
                            {{ props.stateText }}
                        </div>
                    </template>
                </toprefresh>
            </div>
        </div>
        <headers></headers>
    </div>
</template>
<script>
    import headers from '@/include/header.vue'
    import page from '@/plugin/Pagination.vue'
    import {clears, delHtmlTag, unescape, getByteLen, getTabsCon} from '@/assets/util.js'
    import moment from '@/assets/monent.js'
    import minput from '@/plugin/input/index'
    //右滑删除插件
    import tabdel from '@/plugin/tabdel/index'
    //下拉刷新插件
    import toprefresh from '@/plugin/loadmore/index'

    import { GetProList, minApi, hasSearch } from '@/service/index'
    export default {
        data() {
            return {
                newList: [],
                showall: false,
                name: '2222',
                total: 0,
                searchcon: '',
                isfocus: false,
                serchdata: '',
                iconLink: '',      //加载图标
                page: 1,
                isinBottom: true,
            }
        },
        watch: {
            searchcon(value, oldval) {
                if(value != oldval && value.length >= 1) {
                    this.hassearch(value);
                } else {
                    this.serchdata = '';
                }
                return value
            }
        },
        methods:{
            //第一个参数传2, 显示type模板的所有内容
            async GetNews(page, type, ...con) {
                try {
                    const params = {
                        page: page,
                        type: type && type === 2 ? con[0] : '',
                    };
                    let res = await GetProList(params, type);
                    res.data.map((v, n) => {
                        v.addtime = moment().formart('yyyy-MM-dd HH:mm:ss', v.addtime);
                        // v.content = unescape(delHtmlTag(v.content));
                        //实现取第一张图片做为缩略图
                    });
                    //如果传入的是第一页，则直接赋值，否则就合并数据
                    this.$nextTick(()=> {
                        if(page === 1) {
                            this.newList = res.data;
                        } else {
                            if(res.data.length) {
                                this.newList = this.newList.concat(res.data);
                            } else {
                                this.isinBottom = false;
                            }
                        }
                    })
                    this.page ++ 
                } catch(err) {
                    console.log(err, '23423423423')
                }
            },
            async aa() {
                try {
                    let res = await minApi();
                    console.info(res);
                } catch (err) {
                    console.log(err)
                }
            },
            async hassearch(val) {
                try{
                    let res = await hasSearch({value: val}, 'POST');
                    res.data.map((v, n) => {
                        v.addtime = moment().formart('yyyy-MM-dd HH:mm:ss', v.addtime);
                        v.content = unescape(delHtmlTag(v.content));
                    });
                    console.info(res);
                    this.serchdata = res.data;
                } catch (err) {
                    this.$message(err);
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
            getLenht(c) {
                const h = getTabsCon(c);
                return delHtmlTag(h)
            },
            refresh(loaded) {
                setTimeout(() => {
                    this.GetNews(1);
                    loaded('done');
                }, 2000)
            },
            stateChange(state) {
                if (state === 'pull' || state === 'trigger') {
                    this.iconLink = '#icon-arrow-bottom';
                } else if (state === 'loading') {
                    this.iconLink = '#icon-loading';
                } else if (state === 'loaded-done') {
                    this.iconLink = '#icon-finish';
                }
            },
            loadmore(loaded) {
                if(this.isinBottom) {
                    setTimeout(() => {
                        this.GetNews(this.page);
                    }, 2000);
                }
                loaded('done');
            }
        },
        components: {
            headers,
            page,
            minput,
            tabdel,
            toprefresh
        },
        mounted() {
            const obj = [1,2,3,4,5];
            clears(obj);
            this.GetNews(this.page);
            this.aa();
            // console.info(moment(1503559089).formart('yyyy-MM-dd HH:mm:ss EE')); 
            // console.info(moment().tiemrdeff('1992.07.14').defftime);
            // console.info(moment().tiemrdeff('1992-07-14', '2017-8-24').deffmart('y:M:d'));
            // console.info(moment('2017/8/24 14:48:13').subtract(2, 'H').formart('yyyy-MM-dd HH:mm:ss')); console.log('222');
            console.info(this);
            //使用fetch跨域的实现
            // fetch('http://127.0.0.1:3000/news/newslist', { 
            //     methods: 'GET',
            //     headers: {
            //         'Accept': 'application/json, text/javascript, */*; q=0.01',
            //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            //     },
            //     mode: 'cors',
            //     credentials: 'credentials',
            //     cache: 'default'
            // }).then(res => res.json()).then(data => {
            //     console.info(data, '333333');
            // }).catch(err => console.log(err, '3232323'))
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
            padding-bottom: px2rem(146)
            height: 100%
            .content 
                width: 100%
                margin: 0 auto
                text-align: left
                height: 100%
                .content_left
                    width: 100%
                    // float: left
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
                                line-height: px2rem(40)
                            h2
                                @include font-dpr(16px)
                                font-weight: 700
                                line-height: 1.6
                                color: $mainColor
                                display: table
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
                                    color: $mainColor
                                .sup
                                    display: block
                                    text-align: right
                            .feet
                                // font-size: px2rem(60)
                                @include font-dpr(16px)
                .search
                    height: px2rem(90)
                    background-color: $mainColor
                    display: block
                    width: 100%
                    flex-grow: 2
                    position: relative
                    z-index: 2
                    // padding-top: px2rem(14)
                    .searchinput
                        width: px2rem(500)
                        height: px2rem(66)
                        border-radius: 3px
                        margin: px2rem(12) 0 px2rem(12) px2rem(100)
                        @include font-dpr(16px)
                        box-shadow: inset 0 1px 3px rgba(0, 0, 0, .2) 0 1px 0 rgba(255, 255, 255, .1)
                        outline: 0
                        border: 1px solid $mainColor
                        padding-left: px2rem(20)
                        // transition: width .5s
                        padding-right: px2rem(80)
                    .searchfocus
                        // width: px2rem(630)
                        // transition: width .7s
                    .searchicon
                        color: #ddd
                        @include font-dpr(20px)
                        position: relative
                        margin-top: px2rem(20)
                        z-index: 99
                    .searchdata
                        width: 100%
                        height: auto
                        background-color: #fff
                        padding: px2rem(20)
                        position: absolute
                        z-index: 100
                        top: px2rem(90)
                        left: 0
                        @include font-dpr(16px)
                        p, a
                            line-height: px2rem(80)
                            border-bottom: 1px solid #ddd
                            display: block
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


    .top-load-wrapper 
        line-height: 90px
        text-align: center
    .icon-arrow 
        transition: .2s
        transform: rotate(180deg)
    .icon-loading 
        transform: rotate(0deg)
        animation-name: loading
        animation-duration: 3s
        animation-iteration-count: infinite
        animation-direction: alternate
    @keyframes loading
        from 
            transform: rotate(0deg)
        to 
            transform: rotate(360deg)
</style>
