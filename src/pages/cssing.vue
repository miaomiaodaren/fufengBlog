<template>
    <div id="cssing">
        <h2>各种CSS3样式汇总</h2>
        <ul class="csslist">
            <li>
                <router-link :to="{ path: '/css/funpage'}" class="lists">全屏滚动</router-link>
            </li>
            <li>
                <router-link :to="{ path: '/css/funpage'}" class="lists">文字延时</router-link>
            </li>
            <li>
                <router-link :to="{ path: '/css/funpage'}" class="lists">抽奖转盘</router-link>
            </li>
            <li>
                <router-link :to="{ path: '/css/funpage'}" class="lists">抽奖老虎机</router-link>
            </li>
        </ul>
        <headers></headers>
    </div>
</template>
<script>
    import headers from '@/include/header.vue'
    export default {
        data() {
            return {

            }
        },
        components: {
            headers
        }
    }
</script>
<style lang="sass" lang="sass" scoped type="text/sass">
    #cssing
        h2
            @include font-dpr(18px)
            line-height: px2rem(80)
            margin-bottom: px2rem(40)
        .csslist
            margin: 0 px2rem(40)
            display: flex
            li
                min-width: px2rem(160)
                flex: 1
                display: inline-block
                .lists
                    cursor: pointer
                    height: px2rem(80)
                    line-height: px2rem(80)
                    text-align: center
                    display: inline-block
                    color: #333
                    background: #ccc
                    min-width: px2rem(160)
                    padding: 0 px2rem(20)
                    transition: all .4s
                    margin-rigth: px2rem(30)
                    &:hover
                        transform: scale(.9)
</style>