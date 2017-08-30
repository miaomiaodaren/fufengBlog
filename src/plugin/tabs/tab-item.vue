<template>
    <div id="aa"></div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        props: {
            label: [String, Number],
            name: [String, Number]
        },
        mounted() {
        },
        // render(createElement) {
        //     let {
        //         label,
        //         name
        //     } = this;
        //     return createElement (
        //         <div class="tab-tiem">12312321</div>
        //     )
        // }
    }
</script>
<style lang="sass" scoped type="text/sass">
.tab-item
    display: inline-block
</style>