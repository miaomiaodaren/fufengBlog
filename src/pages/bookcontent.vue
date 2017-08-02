<template>
    <div id="bookcontent">
        <h2 v-if="aa.zview">{{aa.zview.title}}</h2>
        <div class="lc"><span>上一章</span><span @click="gozlist">返回目录</span><span>下一章</span></div>
        <div class="xscon" v-if="aa.zview" v-html="aa.zview.content"></div>
    </div>
</template>
<script>
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
                    console.log(this.aa);
                } catch (err) {
                    console.log(err);
                }
            },
            gozlist() {
                this.$router.push({path: '/books/bookzlist/' + this.type._id})
            }
        },
        created() {
            this.getData(this.type.id, this.type._id)
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #bookcontent
        .xscon
            width: 1200px
            margin: 0 auto
            text-align: left
        .lc
            height: 50px
            span
                padding: 0 50px
                cursor: pointer
</style>
