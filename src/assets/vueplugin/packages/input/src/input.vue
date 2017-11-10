<template>
    <div class="ff-input" :class="{'ff-icon-before': suffixIcon || $slots.suffix, 'ff-icon-after': prefixIcon || $slots.prefix}">
        <template v-if="type !== 'textarea'">
            <slot name="prepend" v-if="$slots.prepend"></slot>
            <input ref="input" type="text" :value="value" :placeholder="placeholder" :disabled="disabled">
            <slot name="append" v-if="$slots.append"></slot>
        </template>
        <!-- 通过 $props 将父组件的 props 一起传给子组件 -->
        <textarea v-else :value="value" v-bind="$props" ref="textarea"></textarea>
    </div>
</template>
<script>
export default {
    name: 'ffInput',
    componentName: 'ffInput',
    props: {
        placeholder: String,
        value: {
            type: [String, Number]
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        suffixIcon: String,
        prefixIcon: String,
        type: {
            type: String,
            defalut: 'text',
        },
        rows: {
            type: Number,
            default: 3
        },
    },
    data() {
        return {
            textareaCalcStyle: {}
        }
    },
    methods: {
    },
    mounted() {
    }
}
</script>
<style>
    .ff-input{ display: block; }
    .ff-input input{ width: 250px; height: 40px; border: 1px solid #ddd; border-radius: 3px; font-size: 14px; padding-left: 10px; line-height: 40px; }
    .ff-input textarea { display: block; }
</style>
