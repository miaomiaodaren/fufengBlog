<template>
    <div id="sticky">
        <div class="components-container">
            <code>Sticky header 当页面滚动到预设的位置会吸附在顶部</code>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
        </div>
        <Sticky>
            <div class="issticky">我是sticky的头</div>
        </Sticky>
        <div class="components-container">
            <code>Sticky header 当页面滚动到预设的位置会吸附在顶部</code>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
            <div>我是占位</div>
        </div>
        <headers></headers>
    </div>
</template>
<script>
    import Sticky from '@/plugin/sticky/index.vue'
    import headers from '@/include/header.vue'
    export default {
        name: 'Stickyheader',
        props: {
            stickyTop: {
                type: Number,
                default: 0
            },
            zIndex: {
                type: Number,
                default: 1000
            },
            className: {
                type: String
            }
        },
        data() {
            return {
                    
            }
        },
        components: {
            Sticky,
            headers
        },
    }
</script>
<style lang="sass" scoped type="text/sass">
    #sticky
        .issticky
            width: 100%
            height: px2rem(80)
            background-color: $mainColor
            color: #fff
</style>