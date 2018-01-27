<template>
    <m-input 
        v-model="aa" 
        placeholder="请输入日期" 
        @focus="handleFocus"
        @keydown.native="handleKeydown"
    >
    </m-input>
</template>
<script type="text/javascript">
    import MInput from '../input/index'
    const HAVE_TRIGGER_TYPES = [
        'date',
        'datetime',
        'time',
        'time-select',
        'week',
        'month',
        'year',
        'daterange',
        'timerange',
        'datetimerange'
    ];
    export default {
        props: {
            // type: {
            //     type: 'String',
            //     defalut: 'date'
            // }
        },
        data() {
            return {
                aa: '2',
                pickerVisible: false
            }
        },
        watch: {
            pickerVisible(val) {
                val ? this.showPicker() : this.hidePicker();
            }
        },
        methods: {
            handleKeydown(event) {
                //输入的时候触发
                console.info(event, 77);
            },
            handleFocus() {
                const type = this.type;
                if(HAVE_TRIGGER_TYPES.indexOf(type) !== -1 && !this.pickerVisible) {
                    this.pickerVisible = true
                }
            },
            showPicker() {
                if(!this.picker) {
                    this.mountPicker();
                }
            },
            hidePicker() {
                
            },
            mountPicker() {
                
            }
        },
        components: {
            MInput
        },
        mounted() {
            console.info(this, 88);
        }
    }
</script>