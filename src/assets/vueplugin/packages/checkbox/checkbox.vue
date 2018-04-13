<template>
    <label class="ff-checkbox">
        <span>
            <span class="ff-checkbox-outside" :class="{'is-active': isChecked}">
                <input type="checkbox" 
                    class="ff-checkbox-input"
                    :value="label"
                    v-model="model"
                    @change="handleChange"
                >
            </span>
        </span>
        <span v-if="$slots.default"><slot></slot></span>
    </label>
</template>
<script>
    import Emitter from '../../src/mixins/emitter'
    export default {
        name: 'ffCheckbox',
        componentName: 'ffCheckbox',
        mixins: [Emitter],
        props: {
            value: {
                type: Boolean,
            },
            label: {
                type: [String, Number, Boolean]
            }
        },
        computed: {
            model: {
                get() {
                    return this.isGroup('ffCheckboxGroup') ? this.$parent.value : this.value;
                },
                set(val) {
                    if(this.isGroup('ffCheckboxGroup')) {
                        let len = val.length, __GroupValue = this.$parent;
                        if(__GroupValue.min <= len && __GroupValue.max >= len) {
                            this.dispatch('ffCheckboxGroup', 'input', [val])
                        }
                    } else {
                        this.$emit('input', val);
                    }
                }
            },
            isChecked() {
                if(Object.prototype.toString.call(this.model) === '[object Boolean]') {
                    return this.model
                } else if(Array.isArray(this.model)) {
                    return this.model.indexOf(this.label) > -1
                }
            }
        },
        methods: {
            handleChange() {
                this.$nextTick(() => {
                    this.$emit('change', this.model);
                })
            }
        },
        data() {
            return {
                
            }
        },
        mounted() {

        }
    }
</script>
<style lang="less" type="less/text">
    .ff-checkbox{
        position: relative;
        .ff-checkbox-outside{
            border: 1px solid #dcdfe6;
            width: 14px;
            height: 14px;
            background-color: #fff;
            display: inline-block;
            transition: border-color .25s, background-color .25s;
            &:hover {
                border-color: #409eff
            }
            &.is-active{
                background-color: #409eff;
                border-color: #409eff;
                position: relative;
                &:after{
                    content: '';
                    border: 1px solid #fff;
                    width: 3px;
                    height: 7px;
                    display: inline-block;
                    position: absolute;
                    top: 2px;
                    left: 4px;
                    border-top: 0px;
                    border-left: 0px;
                    transform: rotate(45deg);
                    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s
                }
            }
        }
        .ff-checkbox-input{
            position: absolute;
            opacity: 0;
            top: 0;
            left: 0;
        }
    }
</style>