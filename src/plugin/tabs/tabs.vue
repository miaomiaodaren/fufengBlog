<template>
    <div id="tabs">
        <div class="tabs-header">
            <div class="tabs-head-item" :class="{'is-active': (nowtabs || tabcount[0]) === tabcount[index] ? true : false}" v-for="(n, index) in labels" :key="index" @click="changItem(index)">
                {{n}}
            </div>
        </div>
        <div class="tabs-main">
            <slot test="woshishabi"></slot>    
        </div>
    </div>
</template>
<script>
    export default {
        name: 'tabs',
        componentName: 'tabs',
        data() {
            return {
                vidv: 12,
                labels: [],
                tabcount: [],
                nowtabs: ''
            }
        },
        props: {
            value: [String, Number],
        },
        methods: {
            addLabel(item, name) {
                if(!this.labels.includes(item)) {
                    this.labels.push(item);
                    this.tabcount.push(name);
                }
            },
            changItem(val) {
                this.$emit('input', this.tabcount[val]);
                this.nowtabs = this.tabcount[val];
                // this.dispatch('tabsitem', 'pname', [this.tabcount[val]]);
            }
        },
        watch: {
            labels() {
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
            @include font-dpr(16px)
            color: #555
            &.is-active
                color: #00aaff
</style>3
