<template>
    <div id="books">
        <headertop></headertop>
        <div class="books_head">喵喵小说</div>
        <div class="books_main">
            <template v-for="(data, index) in bList">
                <div class="book_title">
                    <router-link :to="{path: '/books/bookzlist/' + data._id}">{{index + 1}} - {{data.title}}</router-link>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    import headertop from '@/include/header.vue';
    import { isArrayLislk } from '@/assets/util'
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
            }
        },
        methods: { 
            //把小说列表存在内存中，在切换的时候是不需要再次调用接口
            async BookList() {
                await this.$store.dispatch('Get_BOOK_NAME');
            } 
        },
        computed: {
            ...mapGetters({
                bList: 'booklist'
            })
        },
        components: {
            headertop
        },
        mounted() {
            if(!this.bList.length) {
                this.BookList()
            }
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #books
        .books_head
            height: px2rem(90)
            border-bottom: 1px solid #ddd
            line-height: px2rem(90)
            @include font-dpr(18px)
        .books_main
            margin-top: px2rem(20)
            display: flex
            flex-wrap: wrap
            width: 100%
            height: px2rem(90)
            padding: 0 px2rem(30)
            .book_title
                width: 100%
                height: px2rem(80)
                margin: 15px 10px
                flex-wrap: wrap
                flex-direction: row
                text-align: left
                line-height: px2rem(80)
                @include font-dpr(15px)
                a
                    color: #000
</style>
