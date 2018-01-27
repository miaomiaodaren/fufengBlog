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
            <p style="margin-top: 30px">
                <Progre v-model="jd" topcolor="red" width="300"></Progre>
                <br />
                <Progre v-model="jd" topcolor="red" width="300" type="circular" cirwidth="10"></Progre>
            </p>
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
</style>
