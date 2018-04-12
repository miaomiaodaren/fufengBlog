<template>
    <label :class="{'is-disable': disabled}">
        <span class="ff-radio-outside">
            <span class="ff-radio-radius" :class="{'is-active': model === label}">
                <input type="radio" 
                    :value="label"
                    v-model="model"
                    :disabled = "disabled"
                    @focus="focus = true"
                    @blur="focus = false"
                    @change="hanleChange"
                >
            </span>
        </span>
        <span v-if="$slots.default">
            <slot></slot>{{model}}
        </span>
    </label>
</template>
<script>
    import Emitter from '../../src/mixins/emitter'
    export default {
        name: 'ffRadio',
        componentName: 'FFRadio',
        mixins: [Emitter],
        props: {
            value: {
                type: [String, Number, Boolean],
            },
            label: {
                type: [String, Number, Boolean],
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            model: {
                get() {
                    return this.isGroup ? this.$parent.value : this.value
                },
                set(val) {
                    if(this.isGroup) {
                        this.dispatch('FFRadioGroup', 'input', [val]);
                    } else {
                        this.$emit('input', val);
                    }
                }
            },
            //查找父级元素,判断是否外层是 group。
            isGroup() {
                let $parent = this.$parent;
                while($parent) {
                    if($parent.$options.componentName === "FFRadioGroup") {
                        return true
                    } else {
                        $parent = $parent.$parent
                    }
                }
                return false
            }
        },
        data() {
            return {
                
            }
        },
        methods: {
            hanleChange(v) {
                this.$nextTick(() => {
                    this.isGroup ? this.dispatch('FFRadioGroup', 'change', this.model) : this.$emit('change', this.model)
                })
            }
        },
        mounted() {

        }
    }
</script>
<style lang="less" type="text/less">
    .ff-radio-outside{
        position: relative;
        .ff-radio-radius{
            border: 1px solid #ddd;
            border-radius: 50%;
            display: inline-block;
            height: 15px;
            width: 15px;
            &.is-active{
                background-color: #409eff;
                border-color: #409eff;
                position: relative;
                &::before {
                    content: '';
                    position: absolute;
                    z-index: 10;
                    width: 5px;
                    height: 5px;
                    left: 4px;
                    top: 4px;
                    background-color: #fff;
                    border-radius: 50%;
                }
            }
        }
        input[type='radio'] {
            opacity: 0;
        }
    }
    .is-disable{
        border-color: #e4e7ed;
        background-color: #f5f7fa;
        color: #c0c4cc;
        cursor: not-allowed;
    }
</style>

