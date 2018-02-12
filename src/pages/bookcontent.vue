<template>
    <div id="bookcontent">
        <h2 v-if="aa.zview">{{aa.zview.title}}</h2>
        <div class="lc">
            <span>上一章</span>
            <span @click="gozlist">返回目录</span>
            <span>下一章</span>
        </div>
        <div class="xscon" v-if="aa.zview" v-html="aa.zview.content"></div>
        <div class="lc lcb">
            <span>上一章</span>
            <span @click="gozlist">返回目录</span>
            <span>下一章</span>
        </div>
        <headertop></headertop>
    </div>
</template>
<script>
    import headertop from '@/include/header.vue';
    export default {
        data() {
            return {
//                id: this.$route.params.id,
                type: this.$route.params,
                aa: {}
            }
        },
        methods: {
            async getData(v, n) {
                try {
                    let res = await this.getAjax('/books/showcontent', {id: v, _id: n}, 'POST');
                    this.aa = res.data[0];
                } catch (err) {
                    console.log(err);
                }
            },
            gozlist() {
                this.$router.push({path: '/books/bookzlist/' + this.type._id})
            }
        },
        components: {
            headertop
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
</style>
