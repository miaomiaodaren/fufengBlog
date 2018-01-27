<template>
    <div class="slider_select">
        <div class="slider_radius"></div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {

            }
        },
        computed:{
            max() {
                return this.$parent.max;
            },
            min() {
                return this.$parent.min;
            },
            step() {
                return this.$parent.step;
            },
        },
        methods: {
            setPosition(percent) {
                if(percent === null) return;
                if(percent < 0) {
                    percent = 0;
                } else if(percent > 100) {
                    percent = 100;
                }
                const lengthPerStep = 100 / ((this.max - this.min) / this.step);
                const steps = Math.round(percent / lengthPerStep);
                let value = steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min;
                this.$emit('input', value);
            }
        },
        mounted() {
            console.info(this);
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    .slider_select
        background-color: transparent   //类似于rgba(0, 0, 0, 0) 是全透明黑色(black)的速记法
        width: px2rem(32)
        height: px2rem(32)
        position: absolute
        z-index: 1001
        top: px2rem(-13)
        transform: translateX(-50%)
        text-align: center
        user-select: none  //文本不能被选择
        .slider_radius
            width: px2rem(32)
            height: px2rem(32)
            border: 2px solid #409eff
            background-color: #fff
            transition: .2s
            user-select: none
            border-radius: 50%
</style>