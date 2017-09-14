<template>
    <div class="mm-input">
        <i class="mm-icon" :class="['el-icon-' + icon]" @click="hassearch()" v-if="icon"></i>
        <input 
            ref="input"
            :type="type"
            :value="value"
            class="mm-input-inner"
        >
    </div>
</template>
<script>
    export default {
        name: 'MInput',
        props: {
            value: [String, Number],
            type: {
                type: String,
                default: 'text'
            },
            icon: String,
            onIconClick: Function
        },
        methods: {
            hassearch() {
                this.onIconClick();
            }
        },
        mounted() {
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    .mm-input
        width: 50%
        margin: 0 auto
        position: relative
    .mm-icon
        position: absolute
        right: 0
        top: 0
        width: px2rem(60)
        height: 100%
        line-height: px2rem(70)
        text-align: center
    .mm-input-inner
        width: 100%
        height: px2rem(66)
        border-radius: 3px
        @include font-dpr(16px)
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, .2) 0 1px 0 rgba(255, 255, 255, .1)
        outline: 0
        border: 1px solid $mainColor
        padding: 0 px2rem(20)
    .mm-icon+.mm-input-inner
        padding-right: px2rem(60)
</style>