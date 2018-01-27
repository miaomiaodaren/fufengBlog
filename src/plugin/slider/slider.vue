<template>
    <div id="slider">
        <div class="slider_warp" ref="slider" @click="onSliderClick">
            <!-- 选中部分 -->
            <div class="slider_action"></div>
            <!-- 圆点部分 -->
            <slider-button v-model="firstValue" ref="button1"></slider-button>
        </div>
    </div>
</template>
<script type="text/javascript">
    import SliderButton from './button'
    export default {
        data() {
            return {
                sliderSize: 1,
                firstValue: null
            }
        },
        props: {
            value: {
                type: Number,
                default: 0
            },
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 100
            },
            step: {
                type: Number,
                default: 1
            }
        },
        components: {
            SliderButton
        },
        methods: {
            onSliderClick(event) {
                //注释一下原理, 1.根据getBoundingClientRect得到DOM的left，然后再根据clientX 得到鼠标在X轴的位置，得出的差值，就是你点击了多少距离
                //getBoundingClientRect 与 clientWidth 的区别 借鉴  https://segmentfault.com/q/1010000008301208 
                //2. 把这个值的百分比，传过去
                this.resetSize();
                const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;
                this.setPosition((event.clientX - sliderOffsetLeft) / this.sliderSize * 100)
            },
            resetSize() {
                if(this.$refs.slider) {
                    this.sliderSize = this.$refs.slider[`clientWidth`];
                }
            },
            setPosition(percent) {
                this.$refs.button1.setPosition(percent)
            }
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #slider
        position: relative
        width: px2rem(400)
        height: px2rem(60)
        margin: 0 auto
        .slider_warp
            width: 100%
            height: px2rem(12)
            margin: px2rem(24) 0
            background-color: #e4e7ed
            border-radius: 3px
            position: relative
            cursor: pointer
            vertical-align: middle
            .slider_action
                height: 6px
                background-color: #409eff
                border-top-left-radius: 3px
                border-bottom-left-radius: 3px
                position: absolute
</style>