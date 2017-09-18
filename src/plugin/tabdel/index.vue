<template>
    <div id="tabdel">
        <ul>
            <li>
                <div class="content" 
                    @touchstart="startDrag"
                    @touchmove="onDrag" 
                    @touchend="endDrag" 
                    :style="deleteSlider">{{defcon.title}}
                </div>
                <div class="remove" ref="remove" :style="remSlider">删除</div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'tabdel',
        data() {
            return {
                startX: 0,  //触摸位置
                startY: 0,
                endX: 0,    //结束位置
                moveX: 0,   //滑动时的位置
                disX: 0,    //移动距离
                deleteSlider: '',
                remSlider: '',
                defcon: {id: 1, title: 'woshi1'},
                isshow: false
            }
        },
        methods: {
            //touchstart事件：当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发。
            // touchmove事件：当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动。
            // touchend事件：当手指从屏幕上离开的时候触发。
            // touchcancel事件：当系统停止跟踪触摸的时候触发。
            // changedTouches  涉及当前(引发)事件的触摸点的列表 是一个array
            // touches: 当前屏幕上所有触摸点的列表
            // targetTouches  当前对象上所有的触摸点的列表
            startDrag(evt) {
                evt = evt.changedTouches ? evt.changedTouches[0] : evt;
                console.info(evt.pageX, evt);
                //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
                if(evt) {
                    this.startX = evt.pageX;
                    this.startY = evt.pageY;
                }
            },
            onDrag(ev) {
                ev = ev || event;
                //获得删除按钮的宽度
                let wd = this.$refs.remove.offsetWidth;
                if(ev.touches.length == 1) {
                    this.moveX = ev.touches[0].clientX;
                    this.disX = this.startX - this.moveX;
                    //如果是往右滑动的。暂时不做动画效果处理
                    if(this.disX < 0 || this.disX == 0) {
                        this.deleteSlider = "transform: translateX(0px)";
                        this.remSlider = `transform: translate3d(${wd}px, 0px, 0px)`;
                    } else {
                        // 最大也只能等于删除按钮宽度 
                        if (this.disX >= wd / 2) {
                            this.deleteSlider = `transform: translateX(- ${wd} "px)`;
                            this.remSlider = 'transform: translate3d(0px, 0px, 0px)';
                        } else {
                            this.deleteSlider = `transform: translateX(-${this.disX}px)`;
                            this.remSlider = `transform: translate3d(${this.disX}px, 0px, 0px)`;
                        }
                    }
                }
            },
            endDrag(ev) {
                ev = ev || event;
                let wd = this.$refs.remove.offsetWidth;
                if (ev.changedTouches.length == 1) {
                    let endX = ev.changedTouches[0].clientX;
                    this.disX = this.startX - endX;
                    if ((this.disX) <= ( wd / 2)) {
                        this.deleteSlider = "transform: translateX(0px)";
                        this.remSlider = `transform: translate3d(${wd}px, 0px, 0px)`;
                    } else {
                        this.deleteSlider = `transform: translateX(-${wd}px)`;
                        this.remSlider = `transform: translate3d(0px, 0px, 0px)`;
                    }
                }
            }
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #tabdel
        ul
            li
                height: px2rem(100)
                width: 100%
                background-color: #ddd
                line-height: px2rem(100)
                border-bottom: 1px solid #fff
                position: relative
                overflow: hidden
                // user-select: none
                .content
                    width: 100%
                    text-align: center
                    color: #000
                    position: relative
                    z-index: 100
                    transition: transform .15s ease-in-out,-webkit-transform .15s ease-in-out
                .remove
                    width: px2rem(300)
                    height: px2rem(100)
                    background-color: red
                    color: #fff
                    text-align: center
                    @include font-dpr(16px)
                    border-bottom: 1px solid #ddd
                    display: inline-block
                    position: absolute
                    right: 0
                    top: 0
                    z-index: 1
                    // transition: width 1s
                    transform: translate3d(px2rem(300), 0px, 0px)
                    transition: transform .15s ease-in-out,-webkit-transform .15s ease-in-out
</style>
