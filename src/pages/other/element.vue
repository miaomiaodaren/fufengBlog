<template>
    <div class="element">
        <div class="ele_left">
            <ul class="typeList">
                <li v-for="(name, index) in typeList" 
                    :key="index" 
                    @click="name !== defaultVal ? defaultVal = name : ''"
                    :class="{'active': name === defaultVal}"
                >
                    {{name}}
                </li>
            </ul>
        </div>
        <div class="ele_right">
            <div class="button" v-show="defaultVal === 'Button'">
                <div>
                    <ff-button>默认按钮</ff-button>
                    <ff-button type="primary">主要按钮</ff-button>
                    <ff-button type="success">成功按钮</ff-button>
                    <ff-button type="info">信息按钮</ff-button>
                    <ff-button type="warning">警告按钮</ff-button>
                    <ff-button type="danger">危险按钮</ff-button>
                    <ff-button type="primary" disabled>主要按钮</ff-button>
                </div>
            </div>
            <div class="Radio" v-show="defaultVal === 'Radio'">
                <ff-radio v-model="eleModel.raidoVal" label="1" @change="radioChange">备选项</ff-radio>
                <ff-radio v-model="eleModel.raidoVal" label="2" @change="radioChange">备选项</ff-radio>
                <ff-radio v-model="eleModel.raidoVal" label="3" disabled >备选项</ff-radio>
                <p></p>
                <ff-radio-group v-model="eleModel.raidoVal">
                    <ff-radio label="1">备选项1</ff-radio>
                    <ff-radio label="2">备选项2</ff-radio>
                </ff-radio-group>
                <ff-radio-group v-model="eleModel.reidoVal2" @change="radioChange">
                    <ff-radio label="3">备选项11</ff-radio>
                    <ff-radio label="6">备选项22</ff-radio>
                    <ff-radio label="9">备选项33</ff-radio>
                </ff-radio-group>
            </div>
            <div class="Checkbox" v-show="defaultVal === 'CheckBox'">
                <ff-checkbox v-model="eleModel.checkVal">备选项{{eleModel.checkVal}}</ff-checkbox>
                <ff-checkbox-group v-model="eleModel.checkGroupVal" :max="2" :min="1">
                    <ff-checkbox label="1" @change="handChange">备选项1</ff-checkbox>
                    <ff-checkbox label="2" @change="handChange">备选项2</ff-checkbox>
                    <ff-checkbox label="3" @change="handChange">备选项3</ff-checkbox>
                </ff-checkbox-group>
            </div>
            <div class="Cascader" v-show="defaultVal === 'Cascader'">
                <ff-cascader :options="options" v-model="selectedOptions"></ff-cascader>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                typeList: ['Button', 'Radio', 'CheckBox', 'Cascader'],
                defaultVal: 'Button',
                eleModel: {
                    raidoVal: "2",
                    reidoVal2: '3',
                    checkVal: true,
                    checkGroupVal: ["2"]
                },
                selectedOptions: [],
                options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                    value: 'yizhi',
                    label: '一致'
                    }, {
                    value: 'fankui',
                    label: '反馈'
                    }, {
                    value: 'xiaolv',
                    label: '效率'
                    }, {
                    value: 'kekong',
                    label: '可控'
                    }]
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                    value: 'cexiangdaohang',
                    label: '侧向导航'
                    }, {
                    value: 'dingbudaohang',
                    label: '顶部导航'
                    }]
                }]
                }, {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                    children: [{
                    value: 'layout',
                    label: 'Layout 布局'
                    }, {
                    value: 'color',
                    label: 'Color 色彩'
                    }, {
                    value: 'typography',
                    label: 'Typography 字体'
                    }, {
                    value: 'icon',
                    label: 'Icon 图标'
                    }, {
                    value: 'button',
                    label: 'Button 按钮'
                    }]
                }, {
                    value: 'form',
                    label: 'Form',
                    children: [{
                    value: 'radio',
                    label: 'Radio 单选框'
                    }, {
                    value: 'checkbox',
                    label: 'Checkbox 多选框'
                    }, {
                    value: 'input',
                    label: 'Input 输入框'
                    }, {
                    value: 'input-number',
                    label: 'InputNumber 计数器'
                    }, {
                    value: 'select',
                    label: 'Select 选择器'
                    }, {
                    value: 'cascader',
                    label: 'Cascader 级联选择器'
                    }, {
                    value: 'switch',
                    label: 'Switch 开关'
                    }, {
                    value: 'slider',
                    label: 'Slider 滑块'
                    }, {
                    value: 'time-picker',
                    label: 'TimePicker 时间选择器'
                    }, {
                    value: 'date-picker',
                    label: 'DatePicker 日期选择器'
                    }, {
                    value: 'datetime-picker',
                    label: 'DateTimePicker 日期时间选择器'
                    }, {
                    value: 'upload',
                    label: 'Upload 上传'
                    }, {
                    value: 'rate',
                    label: 'Rate 评分'
                    }, {
                    value: 'form',
                    label: 'Form 表单'
                    }]
                }, {
                    value: 'data',
                    label: 'Data',
                    children: [{
                    value: 'table',
                    label: 'Table 表格'
                    }, {
                    value: 'tag',
                    label: 'Tag 标签'
                    }, {
                    value: 'progress',
                    label: 'Progress 进度条'
                    }, {
                    value: 'tree',
                    label: 'Tree 树形控件'
                    }, {
                    value: 'pagination',
                    label: 'Pagination 分页'
                    }, {
                    value: 'badge',
                    label: 'Badge 标记'
                    }]
                }, {
                    value: 'notice',
                    label: 'Notice',
                    children: [{
                    value: 'alert',
                    label: 'Alert 警告'
                    }, {
                    value: 'loading',
                    label: 'Loading 加载'
                    }, {
                    value: 'message',
                    label: 'Message 消息提示'
                    }, {
                    value: 'message-box',
                    label: 'MessageBox 弹框'
                    }, {
                    value: 'notification',
                    label: 'Notification 通知'
                    }]
                }, {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [{
                    value: 'menu',
                    label: 'NavMenu 导航菜单'
                    }, {
                    value: 'tabs',
                    label: 'Tabs 标签页'
                    }, {
                    value: 'breadcrumb',
                    label: 'Breadcrumb 面包屑'
                    }, {
                    value: 'dropdown',
                    label: 'Dropdown 下拉菜单'
                    }, {
                    value: 'steps',
                    label: 'Steps 步骤条'
                    }]
                }, {
                    value: 'others',
                    label: 'Others',
                    children: [{
                    value: 'dialog',
                    label: 'Dialog 对话框'
                    }, {
                    value: 'tooltip',
                    label: 'Tooltip 文字提示'
                    }, {
                    value: 'popover',
                    label: 'Popover 弹出框'
                    }, {
                    value: 'card',
                    label: 'Card 卡片'
                    }, {
                    value: 'carousel',
                    label: 'Carousel 走马灯'
                    }, {
                    value: 'collapse',
                    label: 'Collapse 折叠面板'
                    }]
                }]
                }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components'
                }, {
                    value: 'sketch',
                    label: 'Sketch Templates'
                }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
                }]
                }],
            }
        },
        methods: {
            radioChange(v) {
                console.info(v, 'ischange');
            },
            handChange(v) {
                console.info(v, 'ischeckchange');
            }
        },
        mounted() {
        }
    }
</script>
<style lang="css" scoped type="text/css">
    .element {
        font-size: 0;
    }
    .element>div {
        font-size: 16px;
    }
    .element .ele_left {
        width: 250px;
        display: inline-block;
        border-right: 1px solid #ddd;
        height: 100%;
        min-height: 600px;
        padding-top: 50px;
        font-size: 16px;
        line-height: 40px;
    }
    .element .ele_left .active {
        color: #409eff;
    }
    .element .ele_left li {
        cursor: pointer;
    }
    .element .ele_right {
        width: 1000px;
        display: inline-block;
        border-left: 1px solid #ddd;
        margin-left: 30px;
    }
</style>
