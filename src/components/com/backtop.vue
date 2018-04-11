<template>
    <div id="top" @click="$router.go(-1)"><i class="el-icon-arrow-left"></i>返回</div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
    }
</script>
<style lang="sass" scoped type="text/sass">
    #top
        height: px2rem(90)
        border-bottom: 1px solid #ddd
        margin-bottom: px2rem(16)
        background-color: #fff
        text-align: left
        line-height: px2rem(90)
        @include font-dpr(20px)
        margin-left: px2rem(20)
</style>

