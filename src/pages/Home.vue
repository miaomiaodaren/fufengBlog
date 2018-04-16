<template>
    <div id="Home">
        <div class="main">
            <div class="content">
                <toprefresh :top-load-method="refresh" @top-state-change="stateChange" :bottom-load-method="loadmore" @bottom-state-change="stateChange" 
                :otherfun="stickyfun">
                    <template slot="top-block" scope="props">
                        <div class="top-load-wrapper">
                            <div :class="{'el-icon-arrow-down': props.state === 'trigger', 'el-icon-loading': props.state === 'loading'}" style="margin: 0 auto">
                            </div>
                            <span v-html="props.stateText"></span>
                        </div>
                    </template> 
                    <h3 class="pageTitle">博客</h3>
                    <Sticky ref="stickys" :stickyTop="Number(navheight)">
                        <div class="search">
                            <div class="mm_input">
                                <input class="searchinput"
                                    v-model="searchcon"
                                    @focus="startSearch"
                                    @blur="isfocus = false"
                                    :class="{searchfocus: isfocus}"
                                    @input="debounceHandleInput"
                                    ref="searchinput"
                                >
                                <i class="el-icon-search searchicon" @click="hassearch(searchcon)"></i>
                                <div class="searchdata" v-if="searchcon.length >= 1 || isfocus">
                                    <p v-if="serchdata.length > 0">
                                        <router-link :to="{ path: '/question/' + n._id}"
                                            v-for="(n, index) in serchdata" 
                                            :key="index" 
                                            class="lists"
                                        >
                                            <i class="el-icon-search"></i>
                                            {{n.title}}
                                        </router-link>
                                    </p>
                                    <p v-else>暂无搜索记录</p>
                                </div>
                            </div>
                        </div>
                    </Sticky>
                    <div class="content_left" ref="content_left">
                        <ul>
                            <li v-for="(n, index) in newList" :key="index">
                                <span class="feet" @click="GetNews(1, 2, n.type)">来自模块 {{n.type}}</span>
                                <h2 @click="question(n._id)">{{n.title}}</h2>
                            </li>
                        </ul>
                    </div>
                    <template slot="bootom-block" scope="props">
                        <div class="bottom-load-wrapper" style="text-align: center;">
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
    import { mapGetters } from 'vuex'
    import { 
        clears, 
        delHtmlTag, 
        unescape, 
        getByteLen, 
        getTabsCon, 
        newfind, 
        delArr, 
        each, 
        clearflase, 
        debounce, 
        throttle, 
        on, 
        delay, Attr, multiply, css,
        isEmptyObject, copyObj, animationFrame, compact, countBy, gettype, parseJSON, isWeixin, toggleClass, assign } from '@/assets/util.js'
    import moment from '@/assets/monent.js'
    //下拉刷新插件
    import toprefresh from '@/plugin/loadmore/index'

    import { GetProList, minApi, hasSearch } from '@/service/index'

    import EInputNumber from 'element-ui/packages/input-number/src/input-number.vue';
    //顶点吸附插件
    import Sticky from '@/plugin/sticky/index.vue'
    import seamless from '@/assets/seamless'
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
                asdf: '',
                inputnum: 2,
                debouncess: '',
                stickyfun: {},       //srcoll冲突的时候使用的一个小技巧
                navheight: ''
            }
        },
        watch: {
        },
        computed: {
            ...mapGetters(['typecount'])
        },
        methods:{
            //第一个参数传2, 显示type模板的所有内容
            async GetNews(page, type, ...con) {
                try {
                    const params = {
                        page: page,
                        type: type && type === 2 ? con[0] : '',
                    };
                    let res = await GetProList(clearflase(params, true), type);
                    let datainfo = res.data.information;
                    datainfo.map((v, n) => {
                        v.addtime = moment().formart('yyyy-MM-dd HH:mm:ss', v.addtime);
                    });
                    this.$nextTick(()=> {
                        if(page === 1) {
                            this.newList = datainfo;
                        } else {
                            if(datainfo.length) {
                                this.newList = this.newList.concat(datainfo);
                            } else {
                                this.isinBottom = false;
                            }
                        }
                    })
                    // this.page ++ 
                } catch(err) {
                    console.log(err)
                }
            },
            async hassearch(val) {
                val = Object.prototype.toString.call(val) === '[object InputEvent]' ? val.target.value : val;
                try{
                    let res = await hasSearch({value: val}, 'POST');
                    if(res.data.code == 1) {
                        this.serchdata = [];
                    } else {
                        res.data.map((v, n) => {
                            v.addtime = moment().formart('yyyy-MM-dd HH:mm:ss', v.addtime);
                            v.content = unescape(delHtmlTag(v.content));
                        });
                        this.serchdata = res.data;
                    }
                } catch (err) {
                    this.$message('2222');
                }
            },
            startSearch() {
                //当搜索框获得焦点时,进入搜索模式
                let sheight = this.$refs.searchinput.getBoundingClientRect().height,
                    scroEl = document.getElementsByClassName('scroll-container')[0];
                if(scroEl.scrollTop < sheight + 20) {
                    document.getElementsByClassName('scroll-container')[0].scrollTop = sheight + 50;
                }
            },
            getMore(id) {
                let refest = this.newList.filter((v) => {
                    return v._id == id
                });
                this.showall = true;
            },
            question(id) {
                this.$router.push({path: '/question/' + id})
            },
            getLenht(c) {
                const h = getTabsCon(c);
                return delHtmlTag(h)
            },
            refresh(loaded) {
                //上拉刷新
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
                    this.page ++;
                    setTimeout(() => {
                        this.GetNews(this.page);
                        loaded('done');
                    }, 3000);
                }
            }
        },
        components: {
            headers,
            page,
            toprefresh,
            Sticky
        },
        created() {
            //这边使用了防抖,会对搜索进行延迟处理，减少服务器压力
            this.debounceHandleInput = debounce(this.hassearch, 500, true);
        },
        mounted() {
            this.GetNews(this.page);
            this.stickyfun = this.$refs.stickys.handleScroll;   //在载入的时候把这个scroll方法记录下来
            this.navheight = this.$refs.stickys.$el.getBoundingClientRect().height;

            console.info(assign({name: 'fuifdsa', age: 12}, {bz: 'wojiaofufeng', name: 'fufeng'}), 7777);
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
            background-color: #fff
            display: block
            padding-bottom: px2rem(90)
            height: 100%
            .content 
                width: 100%
                margin: 0 auto
                text-align: left
                height: 100%
                .pageTitle
                    @include font-dpr(30px)
                    margin: px2rem(20) px2rem(26)
                    font-weight: normal
                    display: block
                .content_left
                    width: 100%
                    // float: left
                    ul
                        li
                            padding: px2rem(32) px2rem(40)
                            position: relative
                            margin-bottom: 10px
                            background-color: #fff
                            // border: 1px solid #e7eaf1
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
                                // color: $mainColor
                                color: #000
                                display: table
                                padding: px2rem(20) 0
                            .times
                                display: block
                                text-align: right
                                @include font-dpr(14px)
                            .con_text
                                text-indent: each-line
                                @include font-dpr(14px)
                                line-height: 2
                                overflow: hidden
                                padding-top: px2rem(10)
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
                                @include font-dpr(14px)
                                text-align: right
                                display: block
                .search
                    height: px2rem(90)
                    // background-color: $mainColor
                    display: block
                    width: 100%
                    flex-grow: 2
                    position: relative
                    z-index: 2
                    padding: 0 px2rem(25) 0 px2rem(25)
                    margin-bottom: px2rem(12)
                    // background-color: #fff
                    .mm_input
                        width: 100%
                        height: px2rem(80)
                        position: relative
                        margin: 0 auto
                        // margin: px2rem(12) 0 px2rem(12) px2rem(100)
                        .searchinput
                            width: 100%
                            height: 100%
                            border-radius: 10px
                            @include font-dpr(16px)
                            box-shadow: inset 0 1px 3px rgba(0, 0, 0, .2) 0 1px 0 rgba(255, 255, 255, .1)
                            outline: 0
                            border: 1px solid #ebebeb
                            padding-left: px2rem(76)
                            background-color: #ddd
                            -webkit-appearance: none        //消除ios 的input边框阴影样式
                        .searchicon
                            color: #fff
                            @include font-dpr(20px)
                            position: absolute
                            margin-top: px2rem(20)
                            z-index: 1001
                            top: 0
                            left: px2rem(20)
                    .searchfocus
                        // width: px2rem(630)
                        // transition: width .7s
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
                        .lists
                            overflow: hidden
                            white-space: nowrap
                            text-overflow: ellipsis 
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
        // line-height: px2rem(40)
        display: table-cell
        vertical-align: middle
        text-align: center
        height: px2rem(90)
        width: 3.5%
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
