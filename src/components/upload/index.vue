<template>
    <div id="upload">
        <div id="minirefresh" class="minirefresh-wrap">
            <div class="minirefresh-scroll">
                <ul>
                    <li v-for="(n, index) in resDate">
                        {{n.title}}
                    </li>
                </ul>
            </div>
        </div>
        <!-- <headers></headers> -->
    </div>
</template>
<script>
    import headers from '@/include/header.vue'
    import { MiniRefreshTools } from 'minirefresh';
    import 'minirefresh/dist/minirefresh.min.css'
    export default {
        data() {
            return {
                minirefresh: null,
                maxDataSize: 100,
                requestDelayTime: 600,
                counter: 0,
                resDate: []
            }
        },
        methods: {
            newrefresh() {
                let self = this;
                this.minirefresh = new MiniRefresh({
                    container: '#minirefresh',
                    down: {
                        contentdown: '',
                        callback: self.downCallback
                    },
                    up: {
                        isAuto: true,
                        callback: self.upCallback
                    }
                })
            },
            //下拉刷新
            downCallback() {
                setTimeout(() => {
                    this.resDate = this.createTestData(10, true)
                    this.minirefresh.endDownLoading(true);
                }, this.requestDelayTime)
            },
            //上拉加载更多
            upCallback() {
                console.info('222');
                setTimeout(()=> {
                    this.resDate = this.resDate.concat(this.createTestData(10));
                    this.minirefresh.endUpLoading(this.resDate.length >= this.maxDataSize ? true : false);
                }, this.requestDelayTime)
            },
            createTestData(count, isreset) {
                if(isreset) {
                    this.counter = 0;
                }
                var res = [];
                for(var i = 0; i < count; i++) {
                    res.push({
                        title: '测试第【'+ this.counter +'】条新闻'
                    });
                    this.counter++
                }
                return res
            }
        },
        components: {
            headers
        },
        mounted() {
            this.newrefresh()
        }
    }    
</script>
<style lang="sass" lang="sass" scoped type="text/sass">
    #upload
        ul
            li
                width: 100%
                height: px2rem(120)
                border-bottom: 1px solid #ddd
                line-height: px2rem(120)
        .downwrap-tips
            @include font-dpr(16px)
</style>