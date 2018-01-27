<template>
    <div id="switch" @click="switchValue">
        <input type="checkbox" class="switch_input" ref="input" @change="handleChange">
        <span v-if="inactiveText" class="switch_label switch_label_left" :class="{textactive: !checked}">{{inactiveText}}</span>
        <span class="switch_code" ref="core">
            <span class="switch_button" :class="{hasactive: checked}"></span>
        </span>
        <span v-if="activeText" class="switch_label switch_label_right" :class="{textactive: checked}">{{activeText}}</span>
    </div>
</template>
<script type="text/javascript">
    export default {
        props: {
            value: {
                type: Boolean
            },
            activeValue: {
                type: [Boolean, String, Number],
                default: true
            },
            inactiveValue: {
                type: [Boolean, String, Number],
                default: false
            },
            activeColor: {
                type: String
            },
            inactiveColor: {
                type: String
            },
            activeText: {
                type: String
            },
            inactiveText: {
                type: String
            }
        },
        data() {
            return {

            }
        },
        created() {
            if (!~[this.activeValue, this.inactiveValue].indexOf(this.value)) {
                this.$emit('input', this.inactiveValue);
            }
        },
        computed: {
            checked() {
                return this.value === this.activeValue;
            }
        },
        watch: {
            checked() {
                this.$refs.input.checked = this.checked;
                if(this.activeColor || this.inactiveColor) {
                    this.setBackgroundColor()
                }
            }
        },
        methods: {
            switchValue() {
                //改变选择的值
                this.$refs.input.click();
            },
            setBackgroundColor() {
                const newColor = this.checked ? this.activeColor : this.inactiveColor;
                this.$refs.core.style.backgroundColor = newColor;
                this.$refs.core.style.borderColor = newColor;
            },
            handleChange(event) {
                //提交相反的值
                this.$emit('input', this.checked ? this.inactiveValue : this.activeValue);
                this.$emit('change',  this.checked ? this.inactiveValue : this.activeValue)
            }
        },
        mounted() {
            if(this.activeColor || this.inactiveColor) {
                this.setBackgroundColor()
            }
            this.$refs.input.checked = this.checked
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #switch
        .switch_input
            width: 0
            height: 0
            options: 0
            position: 0
            margin: 0
        .switch_code
            width: 40px
            height: 20px
            position: relative
            border: 1px solid #dcdfe6
            border-radius: 10px
            background: #dcdfe6
            cursor: pointer
            vertical-align: middle
            display: inline-block
            transition: border-color .3s, background-color .3s
        .switch_button
            width: 20px
            height: 20px
            border-radius: 50%
            background-color: #fff
            position: absolute
            top: -1px
            left: -1px
            transition: left .3s
        .hasactive
            left: 20px
        .switch_label
            cursor: pointer
            color: #303133
            transition: color .3s
            &.switch_label_left
                padding-right: 10px
            &.switch_label_right
                padding-left: 10px
        .textactive
            color: #409eff
</style>