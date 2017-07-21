<template>
    <div id="types">
        <div class="exit">
            <el-button type="primary" @click="isshow=true">添加类别</el-button>
        </div>
        <div class="main">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="_id" width="180">
                    <template scope="scope">
                        <span style="margin-left: 10px">{{ scope.$index }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="类名">
                    <template scope="scope">
                        {{ scope.row.name }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="isshow"
            size="tiny"
            :before-close="handleClose">
            <span>
                <el-input v-model="addtype.name" class="addstyle" placeholder="请输入内容"></el-input>
            </span>
            <span>
                <el-input v-model="addtype.sort" class="addstyle" placeholder="请输入排序"></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isshow = false">取 消</el-button>
                <el-button type="primary" @click="addtypes">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                isshow: false,
                addtype: {
                    name: '',
                    sort: 0
                }
            }
        },
        methods: {
            handleEdit() {

            },
            handleDelete(v, row) {
                this.getAjax('/types/RemoveTypes', {id: row._id}, 'POST').then(res => {
                    this.$message(res.data.message);
                    this.GetType();
                })
            },
            GetType() {
                this.getAjax('/types/GetTypes', {}, 'GET').then(res => {
                    this.tableData = res.data
                })
            },
            handleClose() {
                this.isshow = false
            },
            addtypes() {
                this.getAjax('/types/addTypes', this.addtype, 'POST').then(res => {
                    if(res.data.code == 1) {
                        this.$message(res.data.message);
                        this.isshow = false;
                        this.GetType();
                    } else {
                        this.$message(res.data.message);
                    }
                })
            }
        },
        mounted() {
            this.GetType()
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #types
        .mian
            width: 1200px
            margin: 0 auto
        .addstyle
            width: 250px
            height: 45px
            display: block
            text-align: center
            margin: 0 auto
</style>
