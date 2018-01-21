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
                <router-link :to="{ path: '/css/cj1'}" class="lists">抽奖转盘</router-link>
            </li>
            <li>
                <router-link :to="{ path: '/css/funpage'}" class="lists">抽奖老虎机</router-link>
            </li>
            <li>
                <router-link :to="{ path: '/css/flextop'}" class="lists">Sticky header</router-link>
            </li>
            <li>
                <router-link :to="{ path: '/css/tabnav'}" class="lists">tabnav</router-link>
            </li>
            <li>
                <router-link :to="{ path: '/css/upload'}" class="lists">上拉刷新</router-link>
            </li>
            <li>
                <router-link :to="{ path: '/css/cj2'}" class="lists">正方形投奖</router-link>
            </li>
            <li>
                <router-link :to="{ path: '/css/cj3'}" class="lists">777抽奖</router-link>
            </li>
        </ul>
        <div class="calcdemo">这个样式用来测试 css3 元素 calc, 可以用来对css的值进行计算</div>
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
            flex-wrap: wrap
            li
                min-width: px2rem(160)
                flex: 1
                display: inline-block
                margin-bottom: px2rem(40)
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
        .calcdemo
            width: calc(66px - 8px * 2)
            width: -webkit-calc(166px + 188px)
            text-align: center
            margin: 0 auto
</style>