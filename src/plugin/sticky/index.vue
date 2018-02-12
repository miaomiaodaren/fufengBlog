<template>
    <div :style="{height: height+'px', zIndex: zIndex}">
        <div :class="className" style="transform: translateZ(0); -webkit-transform: translateZ(0);"
            :style="{top: stickyTop + 'px', zIndex: zIndex, position: position, width: width, height: height + 'px'}">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import { on, off } from '@/assets/util'
    export default{
        name: 'Sticky',
        props: {
            stickyTop: {
                type: Number,
                default: 0
            },
            zIndex: {
                type: Number,
                default: 1011   
            },
            className: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                active: false,
                position: '',
                currentTop: '',
                width: undefined,
                height: undefined,
                child: null,
                stickyHeight: 0
            }
        },
        methods: {
            sticky() {
                if (this.active) {
                    return
                }
                this.position = 'fixed';
                this.active = true;
                this.width = this.width + 'px';
            },
            reset() {
                if (!this.active) {
                    return
                }
                this.position = '';
                this.width = 'auto'
                this.active = false
            },
            handleScroll() {
                this.width = this.$el.getBoundingClientRect().width;
                const offsetTop = this.$el.getBoundingClientRect().top + this.height;
                if (offsetTop < this.stickyTop) {
                    this.sticky();
                    return
                }
                this.reset()
            }
        },
        mounted() {
            this.height = this.$el.getBoundingClientRect().height;
            on(window, 'scroll', this.handleScroll);
        },
        destroyed() {
            off(window, 'scroll', this.handleScroll);
        }
    }
</script>