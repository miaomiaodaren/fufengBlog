<template>
    <div class="tab-item-main" v-show="name === pname">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                pname: this.$parent.value
            }
        },
        props: {
            label: [String, Number],
            name: [String, Number],
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
        height: px2rem(60)
        border-radius: 10px
        margin-bottom: px2rem(40)
</style>