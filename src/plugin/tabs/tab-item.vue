<template>
    <div class="tab-item-main" v-show="name === pname">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'tabsitem',
        componentName: 'tabsitem',
        data() {
            return {
                // pname: this.$parent.$parent.activeName
            }
        },
        props: {
            label: [String, Number],
            name: [String, Number],
            test: [String, Number],
        },
        computed: {
            pname: {
                get() {
                    return this.$parent.$parent.activeName
                }
            }
        },
        // render(h) {
        //     let {
        //         label,
        //         name
        //     } = this;
        //     return h('div', {class: 'tab-item-main'}, this.$slots.default)
        // },
        methods: {

        },
        mounted() {
            this.$parent.addLabel(this.label, this.name);
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
.tab-item-main
    display: inline-block
    width: 100%
    input
        width: px2rem(594)
        box-shadow: 0 0 0 30px #fff inset
        padding: px2rem(25)
        @include font-dpr(14px)
        position: relative
        z-index: 1
        display: inline-block
        width: calc(100% - 2px)
        vertical-align: top
        border: 0
</style>