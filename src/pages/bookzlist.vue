<template>
    <div id="bookzlist">
        <h2>{{zlist.title}}</h2>
        <p>
            <span>{{zlist.author}}</span>
        </p>
        <p class="books_about">
            <span v-html="zlist.jianjie"></span>
        </p>
        <el-row>
            <el-col :span="24" v-for="(n, index) in zlist.chapter" :key="index">
                <div class="grid-content bg-purple">
                    <router-link :to="{ path: '/books/bookcontent/'+ n.id +'/'+ id }">{{n.title}} </router-link>
                </div>
            </el-col>
        </el-row>
        <headertop></headertop>
    </div>
</template>
<script>
    import headertop from '@/include/header.vue';
    export default {
        data() {
            return {
                id: this.$route.params.id,
                zlist: ''
            }
        },
        methods: {
            async getZlist(id) {
                try {
                    let res = await this.getAjax('/books/getZlist', {id: id}, 'POST');
                    console.log(res);
                    this.zlist = res.data
                } catch (err) {
                    console.log(err)
                }
            }
        },
        components: {
            headertop
        },
        mounted() {
            this.getZlist(this.id)
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #bookzlist
        padding: px2rem(20) px2rem(40)
        text-align: center
        h2
            @include font-dpr(20px)
            margin-bottom: px2rem(20)
        .books_about
            text-align: left
            @include font-dpr(14px)
        .grid-content
            @include font-dpr(16px)
            text-align: left
            line-height: px2rem(70)
            a
                color: #000
</style>