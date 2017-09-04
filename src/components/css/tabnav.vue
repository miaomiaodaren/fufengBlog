<template>
    <div id="tabnav">
        <div class="abc" @click="toggleClick">3123123</div>
        <div class="objLeft">
            <transition name="fold">
                <div class="b-sidebar" v-show="isshow">
                    23123123123
                </div>
            </transition>
            <transition name="fade">
                <div class="mask" v-show="isshow" @click="toggleClick"></div>
            </transition>
        </div>
        <headers></headers>
    </div>
</template>
<script>
    import headers from '@/include/header'
    export default{
        data() {
            return {
                isshow: false
            }
        },
        components: {
            headers
        },
        methods: {
            toggleClick() {
                this.isshow = !this.isshow;
            }
        }
    }
</script>
<style lang="sass" lang="sass" scoped type="text/sass">
    #tabnav
        height: 100%
        position: relative
        .b-sidebar
            width: 70%
            height: 100%
            position: fixed
            top: 0
            left: 0
            z-index: 100
            background-color: $mainColor
        .mask
            position: fixed
            top: 0
            left: 0
            height: 100%
            width: 100%
            z-index: 99
            background-color: rgba(7, 17, 27, 0.6)
    .b-sidebar.fold-enter-active,
    .b-sidebar.fold-leave-active 
        transition: all 0.5s
    
    .b-sidebar.fold-enter,
    .b-sidebar.fold-leave-active 
        transform: translate3d(-100%, 0, 0)
    
</style>