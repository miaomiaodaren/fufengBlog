<template>
    <div id="inputnumber">
        <span class="in_setp left_setp" :class="{ismin: rdisbale}" v-repeat-click="setprender">-</span>
            <input type="text" 
                :min="min || -Infinity" 
                :max="max || Infinity" 
                :value="currentValue" 
                :disabled="disabled" 
                :name="name" 
                @input="debounceHandleInput"     
                ref="input"
            >
        <span class="in_setp right_setp" :class="{ismax: adisbale}" v-repeat-click="setpadd">+</span>
    </div>
</template>
<script type="text/javascript">
    import { debounce, throttle, on, once } from '@/assets/util.js'
    export default {
        directives: {
            repeatClick: {
                bind(el, binding, vnode) {
                    let interval = null,
                        starttime;
                    //执行自定义函数后面的方法 
                    //binding.expression  是指自定义指令后面带的参数
                    const handler = () => vnode.context[binding.expression].apply();
                    const clear = () => {
                        if(new Date - starttime < 100) {
                            handler()
                        }
                        clearInterval(interval);
                        interval = null;
                    }
                    //在注册这个指令的时候注册一个鼠标点击时触发的事件。在这个方法中注册了一次性的鼠标松开事件，如果点击了一下
                    //那会马上触发鼠标松开事件，则+1 如果用户一直按着不放，则会触发setinterval,数字会一直加起来
                    on(el, 'mousedown', () => {
                        starttime = new Date;
                        once(document, 'mouseup', clear);
                        clearInterval(interval);
                        interval = setInterval(handler, 100);
                    })
                }
            }
        },
        props: {
            value: {
                type: Number,
                default: 0
            },
            min: {
                type: Number,
                default: -Infinity
            },
            max: {
                type: Number,
                default: Infinity
            },
            setp: {
                type: Number,
                default: 1
            },
            disabled: {
                type: Boolean,
                default: false
            },
            name: {
                type: String,
            }
        },
        data() {
            return {
                currentValue: 0
            }
        },
        computed: {
            rdisbale() {
                return this._decrease(this.value, this.setp) < this.min;
            },
            adisbale() {
                return this._increase(this.value, this.setp) > this.max;
            },
            precision() {
                const { value, setp, getPrecision } = this;
                return Math.max(getPrecision(value), getPrecision(setp));
            }
        },
        watch: {
            value: {
                immediate: true,  //true时立即执行
                handler(value) {
                    let newVal = Number(value);
                    if (isNaN(newVal)) return;
                    if (newVal >= this.max) newVal = this.max;
                    if (newVal <= this.min) newVal = this.min;
                    this.currentValue = newVal;
                    this.$emit('input', newVal);
                }
                // this.adisbale = (val + this.setp > this.max) ? true : false;
                // this.rdisbale = (val - this.setp < this.min) ? true : false;
            }
        },
        methods: {
            toPrecision(num, precision) {
                if (precision === undefined) precision = this.precision;
                return parseFloat(parseFloat(Number(num).toFixed(precision)));
            },
            //处理最小值
            _decrease(val, step) {
                //此处算法为  先用indexOf('.')得出是否为小数，如果是小数,算出小数的位数, 然后乘以10的位次方，再减去setp * 10*N 最好再除以10N次，得到最开始的结果
                if (typeof val !== 'number') return this.currentValue;
                const precisionFactor = Math.pow(10, this.precision);
                return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor);
            },
            _increase(val, step) {
                if (typeof val !== 'number') return this.currentValue;
                const precisionFactor = Math.pow(10, this.precision);
                return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor);
            },
            getPrecision(value) {
                const valueString = value.toString();
                const dotPosition = valueString.indexOf('.');
                let precision = 0;
                if (dotPosition !== -1) {
                  precision = valueString.length - dotPosition - 1;
                }
                return precision;
            },
            setprender() {
                const value = this.value || 0;
                const newVal = this._decrease(value, this.setp);
                if (newVal < this.min) return;
                this.setCurrentValue(newVal);
            },
            setpadd() {
                const value = this.value || 0;
                const newVal = this._increase(value, this.setp);
                if (newVal > this.max) return;
                this.setCurrentValue(newVal);
            },
            isinput(val) {
                console.info(val, 222, arguments);
            },
            setCurrentValue(newVal) {
                const oldVal = this.currentValue;
                if (newVal >= this.max) newVal = this.max;
                if (newVal <= this.min) newVal = this.min;
                if (oldVal === newVal) {
                    // this.$refs.input.setCurrentValue(this.currentValue);
                    this.$refs.input.value = this.currentValue;
                    return;
                }
                this.$emit('change', newVal, oldVal);
                this.$emit('input', newVal);
                this.currentValue = newVal;
            },
            handleInput(e) {
                if(e.target.value === '') {
                    return;
                }
                const newVal = Number(e.target.value);
                if (!isNaN(newVal)) {
                    this.setCurrentValue(newVal)
                } else {
                    this.$refs.input.value(this.currentValue);
                }
            }
        },
        created() {
            //在组件注册的时候,注册一个方法
            //VUE的input 可以使用@input 函数，在值发生变化的时候可以拿到这个dom
            this.debounceHandleInput = debounce(this.handleInput, 300, true);
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #inputnumber
        position: relative;
        display: inline-block;
        width: 180px;
        line-height: 38px;
        margin-top: 10px;
        margin-left: 20px;
        .in_setp
            position: absolute;
            background-color: #ddd
            color: #000
            text-align: center
            line-height: px2rem(45)
            width: px2rem(48)
            user-select: none
            top: 1px
            &.left_setp
                left: 1px
                border: 1px solid #ddd
                border-radius: 4px 0 0 4px
            &.right_setp
                right: 1px
                border: 1px solid #ddd
                border-radius: 0 4px 4px 0
        input
            width: px2rem(250)
            height: px2rem(50)
            text-align: center
            @include font-dpr(14px)
            border: 1px solid #dcdfe6
            border-radius: 4px
            box-sizing: border-box
            padding-left: px2rem(70)
            padding-right: px2rem(70)
            &:hover
                border: 1px solid #00aaff
        .ismax, .ismin
            background-color: #c0c4cc
            cursor: not-allowed
</style>