<template>
    <div id="plugin">
        <div class="warp">
            <p>
                <inputnumber v-model="inputnum" :setp="1" :max="10" :min="2"></inputnumber>
            </p>
            <p>
                <switcher v-model="switcher1" active-color="#13ce66" inactive-color="#ff4949" active-text="开" inactive-text="关"></switcher>
            </p>
            <p>
                <Slider v-model="slidervalue" :min="2" :step="2"></Slider>
            </p>
            <p>
                <DatePickers type="date"></DatePickers>
            </p>
            <!-- <p style="margin-top: 30px">
                <Progre v-model="jd" topcolor="red" width="300"></Progre>
                <br />
                <Progre v-model="jd" topcolor="red" width="300" type="circular" cirwidth="10"></Progre>
            </p> -->
            <div style="width: 200px; height: 200px; background-color: #000; position: relative;">
                <div class="css3-loader">
                    <div class="loader-inner pacman">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
        <headers></headers>
    </div>
</template>
<script type="text/javascript">
    import headers from '@/include/header.vue' 
    import inputnumber from '@/plugin/InputNumber/index'
    import switcher from '@/plugin/swich/switch'
    import Slider from '@/plugin/slider/slider'
    import Progre from '@/plugin/jindutiao'
    export default {
        data() {
            return {
                inputnum: 1,
                switcher1: true,
                slidervalue: 20,
                jd: 50,
                jd1: 80,
                jd2: 20
            }
        },
        components: {
            headers,
            inputnumber,
            switcher,
            Slider,
            Progre
        }
    }
</script>
<style lang="sass" type="text/sass" scoped>
    .warp
        margin-top: px2rem(30)
    .css3-loader
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        .pacman
            position: relative
        .pacman > div:nth-child(2) 
            -webkit-animation: pacman-balls 1s 0s infinite linear
            animation: pacman-balls 1s 0s infinite linear
        .pacman > div:nth-child(3)
            -webkit-animation: pacman-balls 1s 0.33s infinite linear
            animation: pacman-balls 1s 0.33s infinite linear
        .pacman > div:nth-child(4)
            -webkit-animation: pacman-balls 1s 0.66s infinite linear
            animation: pacman-balls 1s 0.66s infinite linear
        .pacman > div:nth-child(5)
            -webkit-animation: pacman-balls 1s 0.99s infinite linear
            animation: pacman-balls 1s 0.99s infinite linear
        .pacman > div:first-of-type
            width: 0px
            height: 0px
            border-right: 25px solid transparent
            border-top: 25px solid #fff
            border-left: 25px solid #fff
            border-bottom: 25px solid #fff
            border-radius: 25px
            -webkit-animation: rotate_pacman_half_up 0.5s 0s infinite
            animation: rotate_pacman_half_up 0.5s 0s infinite
        .pacman > div:nth-child(2)
            width: 0px
            height: 0px
            border-right: 25px solid transparent
            border-top: 25px solid #fff
            border-left: 25px solid #fff
            border-bottom: 25px solid #fff
            border-radius: 25px
            -webkit-animation: rotate_pacman_half_down 0.5s 0s infinite
            animation: rotate_pacman_half_down 0.5s 0s infinite
            margin-top: -50px
        .pacman > div:nth-child(3), .pacman > div:nth-child(4), .pacman > div:nth-child(5), .pacman > div:nth-child(6)
            background-color: #fff
            width: 15px
            height: 15px
            border-radius: 100%
            margin: 2px
            width: 10px
            height: 10px
            position: absolute
            -webkit-transform: translate(0, -6.25px)
            -ms-transform: translate(0, -6.25px)
            transform: translate(0, -6.25px)
            top: 25px
            left: 100px
    @keyframes rotate_pacman_half_down
        0%
            transform: totate(90deg)
        50%
            transform: rotate(0deg)
        100%
            transform: rotate(90deg)
    @keyframes rotate_pacman_half_up
        0%
            transform: totate(270deg)
        50%
            transform: rotate(360deg)
        100%
            transform: rotate(270deg)
    @keyframes pacman-balls
        75%
            opacity: 0.7
        100%
            transform: translate(-100px, -6.25px)        
</style>
