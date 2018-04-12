<template>
    <button type="button" class="ff-button" 
        :class="[type ? `ff-button-${type}` : '', {'is-disabled': disabled}]" 
        :disabled="disabled"
        @click="handleClick"
    >
        <span v-if="$slots.default">
            <slot></slot>
        </span>
    </button>
</template>
<script>
    export default {
        name: 'ffButton',
        props: {
            type: {
                type: String,
                default: 'default'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                
            }
        },
        methods: {
            handleClick(event) {
                this.$emit('click', event)
            }
        },
        mounted() {
            
        }
    }
</script>
<style lang="less" type="text/less">
    .ff-button{
        padding: 10px 20px;
        text-align: center;
        font-size: 14px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        transition: all .5s;
        display: inline-block;
        &:hover{
            border: 1px solid #409eff;
            color: #409eff;
            background-color: rgba(253, 253, 243, 0.8)
        }
        &.ff-button-primary{
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
            &:hover{
                opacity: .8
            }
        }
        &.ff-button-success{
            color: #fff;
            background-color: #67c23a;
            border-color: #67c23a;
        }
        &.ff-button-info{
            color: #fff;
            background-color: #909399;
            border-color: #909399;
        }
        &.ff-button-warning{
            color: #fff;
            background-color: #e6a23c;
            border-color: #e6a23c;
        }
        &.ff-button-danger{
            color: #fff;
            background-color: #f56c6c;
            border-color: #f56c6c;
        }
        &.is-disabled{
            color: #c0c4cc;
            cursor: not-allowed;
            background-image: none;
            background-color: #fff;
            border-color: #ebeef5;
        }
    }
</style>

