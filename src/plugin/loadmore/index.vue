<template>
    <div id="loadmore" :style="{ height: wrapperHeight, transform: `translate3d(0, ${diff}px, 0)` }">
        <div class="action-block" v-if="topLoadMethod" :style="{ height: `${topBlockHeight}px`, marginTop: `${-topBlockHeight}px` }">
            <slot name="top-block" :state="state" :state-text="topText"></slot>
        </div>
        <div class="scroll-container">
            <slot></slot>
        </div>
        <div class="action-block" v-if="bottomLoadMethod" :style="{ height: `${bottomBlockHeight}px`, marginBottom: `${-bottomBlockHeight}px` }">
            <slot name="bootom-block" :state="state" :state-text="bottomText">
                {{ bottomText }}
            </slot>
        </div>
    </div>
</template>
<script>
    import { TOP_DEFAULT_CONFIG, BOTTOM_DEFAULT_CONFIG } from './config';
    import moment from '@/assets/monent.js'
    export default {
        name: 'Vue-loadMore',
        props: {
            distanceIndex: {
                type: Number,
                default: 2
            },
            topBlockHeight: {
                type: Number,
                default: 90
            },
            bottomBlockHeight: {
                type: Number,
                default: 90
            },
            wrapperHeight: {
                type: String,
                default: '100%'
            },
            topLoadMethod: {
                type: Function
            },
            bottomLoadMethod: {
                type: Function
            },
            isThrottleTopPull: {
                type: Boolean,
                default: true
            },
            isThrottleBottomPull: {
                type: Boolean,
                default: true
            },
            isThrottleScroll: {
                type: Boolean,
                default: true
            },
            isTopBounce: {
                type: Boolean,
                default: true
            },
            isBottomBounce: {
                type: Boolean,
                default: true
            },
            topConfig: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            bottomConfig: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            otherfun: {
                type: [Object, Function],
                default: ''
            }
        },
        data() {
            return {
                scrollEl: null,
                startScrollTop: 0,
                startY: 0,
                currentY: 0,
                distance: 0,
                direction: 0,
                diff: 0,
                beforeDiff: 0,
                topText: '',
                bottomText: '',
                state: '',
                bottomReached: false,
                throttleEmitTopPull: null,
                throttleEmitBottomPull: null,
                throttleEmitScroll: null,
                throttleOnInfiniteScroll: null,
                nextrefTime: '' //上一次刷新时间
            }
        },
        computed: {
            _topConfig: ()=> {
                return Object.assign({}, TOP_DEFAULT_CONFIG, this.topConfig);
            },
            _bottomConfig: ()=> {
                return Object.assign({}, BOTTOM_DEFAULT_CONFIG, this.bottomConfig);
            }
        },
        watch: {
            state(val) {
                if (this.direction === 'down') {
                    this.$emit('top-state-change', val);
                } else {
                    this.$emit('bottom-state-change', val);
                }
            }
        },
        methods: {
            throttle(fn, delay, mustRunDelay = 0) {
                let timer = null;
                let tStart;
                return () => {
                    const context = this;
                    const args = arguments;
                    const tCurr = + new Date();
                    clearTimeout(timer);
                    if (!tStart) {
                        tStart = tCurr;
                    }
                    if (mustRunDelay !== 0 && tCurr - tStart >= mustRunDelay) {
                        fn.apply(context, args);
                        tStart = tCurr;
                    } else {
                        timer = setTimeout(()=> {
                            fn.apply(context, args);
                        }, delay);
                    }
                };
            },
            actionPull() {
                const reftime = this.nextrefTime ? `<span style="display: block; line-height: 1">最后更新: ${this.nextrefTime}</span>` : '';
                this.state = 'pull';
                this.direction === 'down'
                    ? this.topText = this._topConfig.pullText + reftime
                    : this.bottomText = this._bottomConfig.pullText;
            },
            actionTrigger() {
                const reftime = this.nextrefTime ? `<span style="display: block; line-height: 1">最后更新: ${this.nextrefTime}</span>` : '';
                this.state = 'trigger';
                this.direction === 'down'
                    ? this.topText = this._topConfig.triggerText + reftime
                    : this.bottomText = this._bottomConfig.triggerText;
            },
            actionLoading() {
                this.state = 'loading';
                if (this.direction === 'down') {
                    this.nextrefTime = moment().formart('yyyy-MM-dd');
                    this.topText = this._topConfig.loadingText;
                    /* eslint-disable no-useless-call */
                    this.topLoadMethod.call(this, this.actionLoaded);
                    this.scrollTo(this._topConfig.stayDistance);
                } else {
                    this.bottomText = this._bottomConfig.loadingText;
                    this.bottomLoadMethod.call(this, this.actionLoaded);
                    this.scrollTo(-this._bottomConfig.stayDistance);
                }
            },
            actionLoaded(loadState = 'done') {
                this.state = `loaded-${loadState}`;
                let loadedStayTime;
                if (this.direction === 'down') {
                    this.topText = loadState === 'done'
                    ? this._topConfig.doneText
                    : this._topConfig.failText;
                    loadedStayTime = this._topConfig.loadedStayTime;
                } else {
                    this.bottomText = loadState === 'done'
                    ? this._bottomConfig.doneText
                    : this._bottomConfig.failText;
                    loadedStayTime = this._bottomConfig.loadedStayTime;
                }
                setTimeout(() => {
                    this.scrollTo(0);
                    // reset state
                    setTimeout(() => {
                        this.state = '';
                    }, 200);
                }, loadedStayTime);
            },
            throttleEmit(delay, mustRunDelay= 0, eventName) {
                const throttleMethod = ()=> {
                    const args = [...arguments];
                    args.unshift(eventName);
                    this.$emit.apply(this, args);
                }
                return this.throttle(throttleMethod, delay, mustRunDelay);
            },
            createThrottleMethods() {
                this.throttleEmitTopPull = this.throttleEmit(200, 300, 'top-pull');
                this.throttleEmitBottomPull = this.throttleEmit(200, 300, 'bottom-pull');
                this.throttleEmitScroll = this.throttleEmit(100, 150, 'scroll');
                this.throttleOnInfiniteScroll = this.throttle(this.onInfiniteScroll, 400);
            },
            checkBottomReached() {
                return this.scrollEl.scrollTop + this.scrollEl.offsetHeight + 1 >= this.scrollEl.scrollHeight;
            },
            scrollTo(y, duration = 200) {
                this.$el.style.transition = `${duration}ms`;
                this.diff = y;
                setTimeout(() => {
                    this.$el.style.transition = '';
                }, duration);
            },
            handleTouchStart(event) {
                this.startY = event.touches[0].clientY;
                this.beforeDiff = this.diff;
                this.startScrollTop = this.scrollEl.scrollTop;
                this.bottomReached = this.checkBottomReached();
            },
            handleTouchMove(event) {
                this.currentY = event.touches[0].clientY;
                this.distance = (this.currentY - this.startY) / this.distanceIndex + this.beforeDiff;
                this.direction = this.distance > 0 ? 'down' : 'up';
                if (this.startScrollTop === 0 && this.direction === 'down' && this.isTopBounce) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.diff = this.distance;
                    this.isThrottleTopPull ? this.throttleEmitTopPull(this.diff) : this.$emit('top-pull', this.diff);
                    if (typeof this.topLoadMethod !== 'function') return;
                    if (this.distance < this._topConfig.triggerDistance &&
                        this.state !== 'pull' && this.state !== 'loading') {
                        this.actionPull();
                    } else if (this.distance >= this._topConfig.triggerDistance &&
                        this.state !== 'trigger' && this.state !== 'loading') {
                        this.actionTrigger();
                    }
                } else if (this.bottomReached && this.direction === 'up' && this.isBottomBounce) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.diff = this.distance;
                    this.isThrottleBottomPull ? this.throttleEmitBottomPull(this.diff) : this.$emit('bottom-pull', this.diff);
                    if (typeof this.bottomLoadMethod !== 'function') return;
                    if (Math.abs(this.distance) < this._bottomConfig.triggerDistance &&
                    this.state !== 'pull' && this.state !== 'loading') {
                        this.actionPull();
                    } else if (Math.abs(this.distance) >= this._bottomConfig.triggerDistance &&
                        this.state !== 'trigger' && this.state !== 'loading') {
                        this.actionTrigger();
                    }
                }
            },
            handleTouchEnd() {
                if (this.diff !== 0) {
                    if (this.state === 'trigger') {
                        this.actionLoading();
                        return;
                    }
                    // pull cancel
                    this.scrollTo(0);
                }
            },
            handleScroll(event) {
                this.isThrottleScroll ? this.throttleEmitScroll(event) : this.$emit('scroll', event);
                this.throttleOnInfiniteScroll();
                if(this.otherfun) {
                    this.otherfun()
                }
            },
            onInfiniteScroll() {
                if (this.checkBottomReached()) {
                    this.$emit('infinite-scroll');
                }
            },
            bindEvents() {
                this.scrollEl.addEventListener('touchstart', this.handleTouchStart);            //手指触碰屏幕
                this.scrollEl.addEventListener('touchmove', this.handleTouchMove);              //手指在屏幕上滑动
                this.scrollEl.addEventListener('touchend', this.handleTouchEnd);                //手指离开屏幕
                this.scrollEl.addEventListener('scroll', this.handleScroll);                    //滚动条滚动事件
            },
            init() {
                this.createThrottleMethods();
                this.scrollEl = this.$el.querySelector('.scroll-container');
                this.bindEvents();
            },
        },
        mounted() {
            this.init();
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #loadmore
        .scroll-container 
            overflow-y: auto
            -webkit-overflow-scrolling: touch
            height: 100%
        .vue-pull-to-wrapper .action-block
            position: relative
            width: 100%
</style>
