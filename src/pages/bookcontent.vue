<template>
    <div id="bookcontent">
        <h2 v-if="dataList.zview">{{dataList.zview.title}}</h2>
        <div class="lc">
            <span @click="flip('top')" >上一章</span>
            <span @click="gozlist">返回目录</span>
            <span @click="flip('next')">下一章</span>
        </div>
        <div class="xscon" v-if="dataList.content" v-html="dataList.content"></div>
        <div class="lc lcb" v-show="bottom_isshow">
            <span @click="flip('top')">上一章</span>
            <span @click="gozlist">返回目录</span>
            <span @click="flip('next')">下一章</span>
        </div>
        <headertop></headertop>
    </div>
</template>
<script>
    import headertop from '@/include/header.vue';
    import { Loading } from 'element-ui';
    export default {
        data() {
            return {
//                id: this.$route.params.id,
                type: this.$route.params,
                dataList: {},
                nowchapter: 0,
                bottom_isshow: false
            }
        },
        watch: {
            // nowchapter: {
            //     handler: function(val, odlVal) {
            //         this.nowchapter = this.$store.state.book.nowchapter;
            //         console.info(this.nowchapter, 665, this.$store.state.book.nowchapter)
            //     },
            //     immediate: true
            // }
        },
        methods: {
            async getData(v, n) {
                try {
                    const loading = this.$loading({lock: true})
                    let res = await this.getAjax('/books/showcontent', {id: v, _id: n}, 'POST');
                    this.dataList = res.data;
                    this.bottom_isshow = true;
                    loading.close();
                    this.$store.dispatch('SET_CHAPTER_COUNT', v).then(res => {
                        this.nowchapter = res
                    });
                } catch (err) {
                    console.log(err);
                }
            },
            gozlist() {
                this.$router.push({path: '/books/bookzlist/' + this.type._id})
            },
            flip(edit) {
                if(edit === 'top') {
                    if(this.nowchapter == 0) return false
                    this.$router.push({path: `/books/bookcontent/${this.type._id}/${Number(this.type.id) - 1}`})
                } else {
                    if(this.nowchapter == this.$store.state.chapterCount) return false
                    this.$router.push({path: `/books/bookcontent/${this.type._id}/${Number(this.type.id) + 1}`})
                }
            }
        },
        components: {
            headertop
        },
        mounted() {
        },
        created() {
            this.getData(this.type.id, this.type._id)
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #bookcontent
        padding: px2rem(30) px2rem(50)
        h2
            @include font-dpr(16px)
            margin-bottom: px2rem(30)
        .xscon
            width: 100%
            margin: 0 auto
            text-align: left
            @include font-dpr(14px)
        .lc
            height: px2rem(60)
            @include font-dpr(14px)
            line-height: px2rem(60)
            margin-bottom: px2rem(20)
            span
                padding: 0 50px
                cursor: pointer
        .lcb
            margin-bottom: px2rem(100)
        .textdisable
            color: #eee
</style>
