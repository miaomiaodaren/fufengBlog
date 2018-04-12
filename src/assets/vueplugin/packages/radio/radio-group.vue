<template>
    <div class="radiogroup">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'ffRadioGroup',
        componentName: 'FFRadioGroup',
        props: {
            value: {
                type: [String, Number, Boolean]   
            }
        },
        watch: {
        },
        methods: {
            
        },
        mounthd() {
            
        }
    }
</script>
