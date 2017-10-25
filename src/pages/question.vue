<template>
    <div id="question">
        <div class="QuestionHeader">
            <div class="main">
                <div class="questiontips">
                    <ul>
                        <li>{{dataview.type}}</li>
                    </ul>
                </div>
                <h3>{{dataview.title}}</h3>
            </div>
        </div>
        <div class="QuestionContent main" v-html="dataview.content">
        </div>
        <headers></headers>
    </div>
</template>
<script>
    import headers from '@/include/header.vue'
    export default {
        name: 'question',
        data() {
            return {
                id: this.$route.params.id,
                dataview: ''
            }
        },
        methods: {
            async getDataById(id) {
                try{
                    let res = await this.getAjax('/news/newslist', {_id: id}, 'POST');
                    this.dataview = res.data[0];
                } catch(err) {
                    console.info(err)
                }
            }
        },
        mounted() {
            this.getDataById(this.id);
        },
        components: {
            headers
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #question
        background-clip: #f3f3f3
        background-color: #fff
        height: 100%
        .QuestionHeader
            background-color: #fff
            padding: px2rem(20)
            box-shadow: 0 1px 3px 0 rgba(0,37,55,.1)
            margin-bottom: px2rem(10)
            .main
                width: 100%
                margin: 0 auto
                text-align: left
                padding-left: px2rem(40)
                .questiontips
                    ul
                        li
                            display: inline-block
                            height: px2rem(60)
                            @include font-dpr(14px)
                            color: #3e7ac2
                            background: #eef4fa
                            border-radius: 100px
                            padding: px2rem(13) px2rem(44)
                h3
                    margin-top: px2rem(24)
                    margin-bottom: px2rem(8)
                    @include font-dpr(22px)
                    font-weight: 700
                    line-height: px2rem(64)
                    color: #1e1e1e
        .QuestionContent
            background-color: #fff
            text-align: left
            padding: px2rem(30) px2rem(50) 0 px2rem(50)
            @include font-dpr(16px)
            line-height: px2rem(50)
            margin-bottom: px2rem(100)
            .question_left
                width: 100%
                float: left

</style>

