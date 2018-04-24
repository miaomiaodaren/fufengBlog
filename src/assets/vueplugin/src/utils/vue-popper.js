import Vue from 'vue';

const PopperJS = Vue.prototype.$isServer ? function() {} : require('./popper').Popper;
const stop = e => e.stopPropagation();

export default {
    props: {
        placement: {
            type: String,
            default: 'bottom'
        },
        value: Boolean,
        appendToBody: {
            type: Boolean,
            default: true
        },
        popperOptions: {
            type: Object,
            default() {
                return {
                    gpuAcceleration: false,
                    placement: 'top',
                };
            }
        },
        offset: {
            default: 0
        },
        popper: {},
        reference: {},
    },
    data() {
        return {
            showPopper: false,
            currentPlacement: ''
        }
    },
    methods: {
        createPopper() {
            const options = this.popperOptions;
            const popper = this.popperElm = this.popperElm || this.popper || this.$refs.popper;
            let reference = this.referenceElm = this.referenceElm || this.reference || this.$refs.reference;
            if (this.appendToBody) document.body.appendChild(this.popperElm);
            console.info(reference, popper, options, 99);
            this.PopperJS = new PopperJS(reference, popper, options);
            console.info(this.PopperJS, 22);
            this.PopperJS.onCreate(_ => {
                this.$nextTick(this.updatePopper);
            });
            if (typeof options.onUpdate === 'function') {
                this.PopperJS.onUpdate(options.onUpdate);
            }
            this.popperElm.addEventListener('click', stop);
        },
        updatePopper() {
            this.PopperJS ? this.PopperJS.update() : this.createPopper();
        },
        doDestroy() {
            this.PopperJS.destroy();
            this.PopperJS = null;
        },
        beforeDestroy() {
            this.doDestroy();
            if (this.popperElm && this.popperElm.parentNode === document.body) {
                this.popperElm.removeEventListener('click', stop);
                document.body.removeChild(this.popperElm);
            }
        }
    }
}