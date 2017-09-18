<template>
    <div id="loadmore">
        <div class="loadmore_content" :style="{ 'transform': 'translate3d(0, ' + translate + 'px, 0)' }">
            <slot name="top">
                <div class="load-more-top">
                    loading.........
                    <span>{{ topText }}</span>
                </div>
            </slot>
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                translate: 0
            }
        },
        methods: {
            init() {
                this.scrollEventTarget = this.getScrollEventTarget(this.$el);
                this.bindTouchEvents();
            },
            getScrollEventTarget(element) {
                let currentNode = element;
                while(currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
                    let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
                    if(overflowY === 'scroll' || overflowY === 'auto') {
                        return currentNode;
                    }
                    currentNode = currentNode.parentNode;
                }
                return window;
            },
            bindTouchEvents() {
                this.$el.addEventListener('touchstart', this.handleTouchStart);
                this.$el.addEventListener('touchmove', this.handleTouchMove);
                this.$el.addEventListener('touchend', this.handleTouchEnd);
            },
            handleTouchStart() {
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
