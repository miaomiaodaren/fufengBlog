<template>
    <span @click="handleClick" ref="reference" v-clickoutside="handleClickoutside">
        <input ref="input" v-model="inputValue" />
    </span>
</template>
<script>
    import FfCascaderMenu from './menu'
    import Vue from 'vue'
    import Popper from '../../src/utils/vue-popper'
    import Clickoutside from '../../src/utils/clickoutside'

    const popperMixin = {
        props: {
            placement: {
                type: String,
                default: 'bottom-start'
            },
            appendToBody: Popper.props.appendToBody,
            offset: Popper.props.offset,
            popperOptions: Popper.props.popperOptions
        },
        methods: Popper.methods,
        data: Popper.data,
        beforeDestroy: Popper.beforeDestroy
    }

    export default {
        name: 'ffCascader',
        mixins: [popperMixin],
        directives: { Clickoutside },
        data() {
            return {
                inputValue: '',
                menuVisible: false,
                menu: null,
                currentValue: this.value || [],
            }
        },
        props: {
            options: {
                required: true,
                type: Array
            },
            value: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        watch: {
            menuVisible(value) {
                value ? this.showMenu() : this.hideMenu();
            },
            value(value) {
                this.currentValue = value;
            }
        },
        methods: {
            initMenu() {
                this.menu = new Vue(FfCascaderMenu).$mount();
                this.menu.options = this.options;
                this.menu.props = this.props;
                this.popperElm = this.menu.$el;
                console.info(this.menu, 'ismenu');
                this.menu.$on('menuLeave', this.doDestroy);
                this.menu.$on('pick', this.handlePick);
            },
            handlePick(value) {
                this.currentValue = value;
                this.$emit('input', value);
                this.$emit('change', value);
                if (close) {
                    this.menuVisible = false;
                } else {
                    this.$nextTick(this.updatePopper);
                }
            },
            handleClick() {
                this.menuVisible = !this.menuVisible;
            },
            hideMenu() {
                this.inputValue = '';
                this.menu.visible = false;
            },
            showMenu() {
                if(!this.menu) {
                    this.initMenu();
                }
                this.menu.value = this.currentValue.slice(0);
                this.menu.visible = true;
                this.menu.options = this.options;
                this.$nextTick(_ => {
                    this.updatePopper();
                });
            },
            handleClickoutside() {
                this.menuVisible = false;
            }
        }
    }
</script>

