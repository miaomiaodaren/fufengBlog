<template>
    <div id="tabs">
        <div class="tabs-header">
            <div class="tabs-head-item" v-for="(n, index) in labels" :key="index" @click="changItem(index)">
                {{n}}
            </div>
        </div>
        <div class="tabs-main">
            <slot></slot>    
        </div>
    </div>
</template>
<script>
    export default {
        name: 'tabs',
        data() {
            return {
                vidv: 12,
                labels: {},
            }
        },
        props: {
            value: [String, Number],
        },
        methods: {
            addLabel(item, name) {
                if(!this.labels[name]) {
                    this.labels[name] = item;
                }
                console.info(this.labels);
            },
            changItem(val) {
                this.$emit('input', val)
            }
        },
        watch: {
            labels() {
                console.info(this.labels);
            }
        },
        mounted() {
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #tabs
        width: px2rem(594)
        .tabs-head-item
            display: inline-block
            padding: px2rem(20) px2rem(20)
</style>