<template>
    <div id="inputnumber">
        <span class="in_setp" :class="{ismin: rdisbale}" v-repeat-click="setprender">-</span>
            <input type="text" 
                :min="min || -Infinity" 
                :max="max || Infinity" 
                :value="currentValue" 
                :disabled="disabled" 
                :name="name" 
                @input="debounceHandleInput"
            >
        <span class="in_setp" :class="{ismax: adisbale}" v-repeat-click="setpadd">+</span>
    </div>
</template>
<script type="text/javascript">
    import { debounce, throttle } from '@/assets/util.js'
    export default {
        directives: {
            repeatClick: {
                
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
                rdisbale: false,
                adisbale: false,
                currentValue: 0
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
            setps(type) {
                if(type === 'add') {
                    !this.adisbale ? this.$emit('input', Number(this.value) + Number(this.setp)) : '';
                } else {
                    !this.rdisbale ? this.$emit('input', Number(this.value) - Number(this.setp)) : '';
                }
            },
            setprender() {

            },
            setpadd() {

            },
            isinput(val) {
                console.info(val, 222, arguments);
            },
            setCurrentValue(newVal) {
                const oldVal = this.currentValue;
                if (newVal >= this.max) newVal = this.max;
                if (newVal <= this.min) newVal = this.min;
                if (oldVal === newVal) {
                    this.$refs.input.setCurrentValue(this.currentValue);
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
                    this.$refs.input.setCurrentValue(this.currentValue);
                }
            }
        },
        created() {
            //在组件注册的时候,注册一个方法
            this.debounceHandleInput = debounce(this.handleInput, 300, true)
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #inputnumber
        .in_setp
            display: inline-block
            background-color: #ddd
            color: #000
            text-align: center
            line-height: px2rem(50)
            width: px2rem(50)
            user-select: none
        input
            width: px2rem(250)
            height: px2rem(50)
        .ismax, .ismin
            background-color: #f0f0f0
</style>