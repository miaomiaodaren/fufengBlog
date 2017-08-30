<template>
    <div id="tabs">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        props: {
            value: [String, Number],
        },
        mounted() {
            console.info(this.value);
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #tabs
        width: 50%
</style>