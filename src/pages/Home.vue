<template>
    <div id="Home">
        <div class="main">
            <div class="content">
                <!-- 右侧滑动删除组件 -->
                <!-- <tabdel></tabdel> -->
                <toprefresh :top-load-method="refresh" @top-state-change="stateChange" :bottom-load-method="loadmore" @bottom-state-change="stateChange" 
                :otherfun="stickyfun">
                    <template slot="top-block" scope="props">
                        <div class="top-load-wrapper">
                            <div :class="{'el-icon-arrow-down': props.state === 'trigger', 'el-icon-loading': props.state === 'loading'}" style="margin: 0 auto">
                            </div>
                            <span v-html="props.stateText"></span>
                        </div>
                    </template> 
                    <!-- <inputnumber v-model="inputnum" :setp="1" :max="10" :min="2"></inputnumber>
                    <a href="http://www.baidu.com">2131231</a> -->
                    <!--  <EInputNumber v-model="inputnum"></EInputNumber> -->
                    <!-- 防抖节流测试 -->
                    <!-- <div @click="sdebounces(1000)">213123123</div> -->
                    <!-- <input v-model="debouncess" @change="sbs"> -->
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
                                <!-- 会有一个问题就是在300字并且的代码或图片的时候，这边应该把前三百个字代码前面的字显示出来 -->
                                <p class="con_text">
                                    <span ref="conter" v-html="showall ? n.content : getLenht(n.content).length > 100 ? n.content.substring(0, 100) : n.content"></span>
                                    <!-- <span v-if="getLenht(n.content).length > 50 && !showall">
                                        ...<em @click="getMore(n._id)"  class="hascheck sdown">阅读全文</em>
                                    </span>
                                    <span v-if="getLenht(n.content).length > 50 && showall" @click="showall = false" class="hascheck sup">
                                        收起
                                    </span> -->
                                </p>
                                <!-- <span class="times">{{Date.parse(n.addtime)/ 1000 | timeFormat}}</span> -->
                                <span class="times">{{n.addtime}}</span>
                            </li>
                        </ul>
                        <!-- 分页组件 -->
                        <!-- <page :total="50" @pagechange="pchange" :gopage="false"></page> -->
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
        delay,
        isEmptyObject, copyObj, animationFrame, compact, countBy, gettype, parseJSON, isWeixin } from '@/assets/util.js'
    import moment from '@/assets/monent.js'
    import minput from '@/plugin/input/index'
    //右滑删除插件
    import tabdel from '@/plugin/tabdel/index'
    //下拉刷新插件
    import toprefresh from '@/plugin/loadmore/index'
    import inputnumber from '@/plugin/InputNumber/index'

    import { GetProList, minApi, hasSearch } from '@/service/index'

    import EInputNumber from 'element-ui/packages/input-number/src/input-number.vue';
    //顶点吸附插件
    import Sticky from '@/plugin/sticky/index.vue'

    import seamless from '@/assets/seamless'

    import newPromise from '@/assets/newPromise'

    import doAjax from '@/assets/fajax'

    const datas = [
        {
            "password": "password0",
            "note": "note0"
        },
        {
            "password": "password1",
            "note": "note1"
        },
        {
            "password": "password2",
            "note": "note2"
        },
        {
            "password": "password0",
            "note": "note0"
        },
        {
            "password": "password1",
            "note": "note1"
        }
    ];

    var deaa = debounce(function() {console.info('2222', 3333)}, 1000, true);
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
                txt: '朝秦魂牵梦萦要的一要雪了要工发了民届上厅二楼冰灾乳白色宛荆防颗粒',
                asdf: '',
                inputnum: 2,
                debouncess: '',
                stickyfun: {},       //srcoll冲突的时候使用的一个小技巧
                navheight: ''
            }
        },
        watch: {
            // searchcon(value, oldval) {
            //     if(value != oldval && value.length >= 1) {
            //         this.hassearch(value);
            //     } else {
            //         this.serchdata = '';
            //     }
            //     return value
            // }
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
                    //此处使用了清理空值的属性,暂时先不处理分页的效果
                    let res = await GetProList(clearflase(params, true), type);
                    let datainfo = res.data.information;
                    datainfo.map((v, n) => {
                        v.addtime = moment().formart('yyyy-MM-dd HH:mm:ss', v.addtime);
                        // v.content = unescape(delHtmlTag(v.content));
                        //实现取第一张图片做为缩略图
                    });
                    // this.newList = datainfo;
                    //如果传入的是第一页，则直接赋值，否则就合并数据
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
                // document.body.scrollTop = 0;
                // document.documentElement.scrollTop = 0;
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
            },
            sb() {
                let aa = this.txt, count = this.txt.length, key = 0;
                let st = setInterval(() => {
                    if(key === count) {
                        console.info('222');
                        clearInterval(st);
                    } else {
                        this.asdf = aa.substr(count - key) 
                        key ++
                    }
                }, 100)
            },
            searchchange(val) {

            },
            sdebounces(delay) {
                deaa();
            },
            testpromise() {
                return new newPromise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve('200ms')
                        // reject('200ms')
                    }, 2000)
                })
            },
            testpromise2() {
                return new newPromise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve('300ms')
                    }, 3000)
                })
            },

        },
        components: {
            headers,
            page,
            minput,
            tabdel,
            toprefresh,
            inputnumber,
            EInputNumber,
            Sticky
        },
        created() {
            //这边使用了防抖,会对搜索进行延迟处理，减少服务器压力
            this.debounceHandleInput = debounce(this.hassearch, 500, true);
        },
        mounted() {
            this.$store.dispatch('SetType', this.name).then(res => {
                console.info(this, res, 887);
            }).catch(err => {
                console.info(err);
            })
            this.stickyfun = this.$refs.stickys.handleScroll;   //在载入的时候把这个scroll方法记录下来
            this.navheight = this.$refs.stickys.$el.getBoundingClientRect().height;

            const obj = [1,2,3,4,5], obj1 = { name: 'ff', age: 12, text: 3 };
            each(obj1, (v,i,o) => {
                console.info(v, i, o, 8);
            })
            this.GetNews(this.page);
            this.aa();
            // this.sb();
            console.info(moment('2018-01-19 23:59:59').cfordate(), '213123')
            console.info(moment('2018-01-19 23:59:59'), '2222');
            console.info(moment(1503559089).formart('yyyy-MM-dd HH:mm:ss EE')); 
            // console.info(moment().tiemrdeff('1992.07.14').defftime);
            // console.info(moment().tiemrdeff('1992-07-14', '2017-8-24').deffmart('y:M:d'));
            // console.info(moment('2017/8/24 14:48:13').subtract(2, 'H').formart('yyyy-MM-dd HH:mm:ss')); console.log('222');
            //使用fetch跨域的实现
            // fetch('http://127.0.0.1:3000/news/newslist', { 
            //     methods: 'GET',
            //     headers: {
            //         'Accept': 'application/json, text/javascript, */*; q=0.01',
            //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            //     },
            //     mode: 'cors',
            //     credentials: 'include',   //omit
            //     cache: 'default'
            // }).then(res => res.json()).then(data => {
            //     console.info(data, '333333');
            // }).catch(err => console.log(err, '3232323'))
            // console.info(moment().add({'H': 4, 'd': 3}).formart(), 'monent');
            // console.info(moment().add('H', 4).formart(), 'monent1');
            // console.info(moment().beginning().formart(), 'moment2');
            // console.info(moment().add('d', 1).ending().formart(), 'moment2');

            //测试从数组从中删除 
            const asd = [1,2,3,4,5,2,3,7,5,3];
            console.info(delArr(asd, 3), 44444);
            var lazyLayout = throttle(function() {console.info('22')}, 5000);
            // console.info(lazyLayout, 22);
            window.onresize = function() {
                lazyLayout()
            };
            var nc = false;
            //在进入页面的时候，及离开页面的时候会触发的方法
            on(window, 'pageshow', function() {
                // alert(nc);
            });
            on(window, 'pagehide', function() {
                nc = true
            });
            //用来测试深复制与浅拷贝（只对object有效果）
            var aal = { name: '33', age: '44' }, bbl = aal, asbs = copyObj(true, {}, {name: 2, age: 3}, {name: 'ff', text: '22'}, aal);
            bbl.name = 'woshishabi'; console.info(aal, bbl, asbs, 999);
            //测试animationFrame
            // animationFrame();
            // window.requestAnimationFrame(function() {
            //     console.info('2222221');
            // })
            //测试promise
            let self = this;
            this.testpromise()
            .then(function(data) {
                console.info(data, 99);
                return self.testpromise2()
            })
            .then(function(data) {
                console.info(data, '100');
            })
            // .catch(function(err) {
            //     console.info(err, '8err');
            // })
            delay(function(test) {
                console.info(22, test)
            }, 4000, 'ffshishabi');

            console.info(compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]), 99999);
            console.info(countBy([2, 4, 6, 7, 8], function(v) { if(v > 5) { return true } else {return false} }), 10000);

            // var ffaa = doAjax({
            //     url: `/api/types/GetTypes`,
            //     type: 'GET',
            //     success: function(res, xhr) {
            //         console.info(res, 'niaho', parseJSON(res), '33');
            //     },
            //     error: function(err) {
            //         console.info(err, 'dajiahao');
            //     }
            // })
            // console.info(ffaa, 'woshiffaa');
            console.info(gettype('21312'), 'woshigettype');
            var parff = parseJSON('{"name":"John"}');

            getAjax('/books/newSaveBook').then(res => {
                console.info(res, 'books');
            })
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
                    background-color: #fff
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
