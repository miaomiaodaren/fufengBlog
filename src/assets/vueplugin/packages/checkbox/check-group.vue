<template>
    <div class="ff-checkbox-group">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'ffCheckboxGroup',
        componentName: 'ffCheckboxGroup',
        data() {
            return {
                
            }
        },
        props: {
            value: {},
            min: {
                type: Number
            },
            max: {
                type: Number
            }
        },
        mounted() {
            console.info(this.min ,this.max);
        }
    }
</script>

