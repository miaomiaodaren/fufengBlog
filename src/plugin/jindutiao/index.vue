<template>
    <div class="propress_warp"  :style="{width: `${width}px`, height: type === 'circular' ? `${width}px` : ''}" :class="{propress_cir: type === 'circular'}">
        <template v-if="type === 'line'">
            <span class="progress progress_active" :style="{width: `${value}%`}">
                <span class="progress progress_active2" :class="{progre_type}" :style="{backgroundColor: topcolor}"></span>
            </span>
            <span class="progress progress_bg" :style="{backgroundColor: btmcolor}"></span>
        </template>
        <template v-else>
            <span class="pro_cir progress_active">
                <span class="progress progress_active2" :class="{progre_type}" :style="{borderColor: topcolor}"></span>
            </span>
            <span class="pro_cir progress_bg" :style="{backgroundColor: btmcolor}"></span>
        </template>
    </div>
</template>
<script type="text/javascript">
    export default {
        props: {
            value: {
                type: [Number, String],
                default: 0
            },
            type: {
                type: String,
                default: 'line'             //line or circular
            },
            topcolor: {
                type: String,
                default: '#67c23a'
            },
            btmcolor: {
                type: String,
                default: '#ebeef5'
            },
            width: {
                type: Number,
                default: 400
            }
        },
        watch: {
            value(val) {
                if(val > 100) return 100;
                if(val < 0) return 0;
            }
        },
        data() {
            return {
                progre_type: this.type === 'line' ? 'progre_line' : 'progre_cir',
                initVal: 0
            }
        },
        mounted() {
            if(this.initVal === this.value) return
            this.$nextTick(()=> {
                this.initVal = this.value;
            }) 
        },
        created() {
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    .propress_warp
        width: px2rem(400)
        position: relative
        margin: 0 auto
        display: block
        height: px2rem(15)
        .progress
            display: inline-block
            position: absolute
            left: 0
            top: 0
            height: 100%
            border: 1px solid #ddd
            border-radius: 100px
            margin: 0 auto
        .progress_active
            z-index: 1001
            transition: width .3s
            .progress_active2
                width: 0
                animation: progre 2s 1 forwards
        .progress_bg
            width: 100%
        &.propress_cir
            .pro_cir
                display: inline-block
                position: absolute
                left: 0
                top: 0
                height: 100%
                border-radius: 50%
                margin: 0 auto
                background-color: #fff
    @keyframes progre
        from 
            width: 0
        to 
            width: 100%
</style>