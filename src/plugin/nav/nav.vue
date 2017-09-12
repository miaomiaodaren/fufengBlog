<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        data() {
            return{
            }
        },
        props: {
            direction: {
                type: String,
                default: 'top'
            }
        },
        methods: {
        },
        mounted() {
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #nav
        position: relative
        .nav_main
            position: absolute
            left: 0
            width: 100%
            height: 100%
            top: 0
            a
                display: block
                width: 100%
                height: px2rem(60)
                line-height: px2rem(60)
                text-align: center
</style>
