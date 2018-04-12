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
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                typeList: ['Button', 'Radio'],
                defaultVal: 'Button',
                eleModel: {
                    raidoVal: "2",
                    reidoVal2: '3'
                }
            }
        },
        methods: {
            radioChange(v) {
                console.info(v, 'ischange');
            }
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
