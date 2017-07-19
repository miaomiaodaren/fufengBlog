<template>
    <div id="userlist">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="_id" width="180">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row._id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户名">
                <template scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label="密码">
                <template scope="scope">
                    {{ scope.row.psw }}
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
</template>
<script>
    export default {
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            handleDelete() {
                console.log('22');
            },
            handleEdit() {
                console.log('33');
            },
            GetData() {
                this.getAjax('/users/GetAllUser', {}, 'POST').then(res => {
                    this.tableData = res.data;
                    console.log(this.tableData);
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        mounted() {
            this.GetData();
        }
    }
</script>
