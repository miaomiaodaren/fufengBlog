<template>
    <div class="nav-item">
        <div class="nav_title" @click="hasshow = !hasshow">
            {{label}}
        </div>
        <div class="nav_main" v-show="hasshow" :style="notdirection[direction]">
            <slot></slot>
        </div>   
    </div>
</template>
<script>
    export default {
        name: 'nav-item',
        data() {
            return {
                hasshow: false,
                notdirection: {
                    top: {bottom: '100%'},
                    bottom: {top: '100%'}
                }
            }
        },
        props: {
            to: {
                type: String
            },
            label: {
                type: String
            },
            direction: {
                type: String,
                defaule: 'top'
            }
        },
        mounted() {
            console.info(this.direction, '2222');
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    .nav-item
        position: relative
        .nav_title
            padding: 3px 12px
            a
                color: #000
                padding-right: 15px
                flex: 1
                flex-direction: row
                flex-wrap: wrap
                align-content: flex-start
                white-space: nowrap
                text-overflow: ellipsis
        .nav_main
            position: absolute
            right: px2rem(-20)
            width: 150%
            bottom: 100%
            background-color: #fff
            border: 1px solid #ddd
            a
                display: block
                width: 100%
                height: px2rem(80)
                line-height: px2rem(80)
                text-align: center
                border-bottom: 1px solid #ddd
                text-align: center
                padding-left: px2rem(15)
                &:last-child
                    border-bottom: 0
</style>