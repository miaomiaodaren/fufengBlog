<template>
    <div id="userlist">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="_id" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row._id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户名">
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label="密码">
                <template slot-scope="scope">
                    {{ scope.row.psw }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="修改用户信息" :visible.sync="usershow" size="tiny"  :before-close="userClose">
            <div class="exit">
                <label>
                    帐号：{{showData.name}}
                </label>
                <label>
                    密码：
                    <input type="text" name="password" v-model="showData.psw">
                </label>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="usershow = false">取 消</el-button>
                <el-button type="primary" @click="userUpdate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                usershow: false,
                showData: {}
            }
        },
        methods: {
            handleDelete(v, row) {
                this.getAjax('/users/RemoveUser', {id: row._id}, 'POST').then(res => {
                    if(res.data.code == 1) {
                        this.$message(res.data.message);
                        this.GetData();
                    }
                })
            },
            handleEdit(v, row) {
                this.showData = row;
                this.usershow = true;

            },
            GetData() {
                this.getAjax('/users/GetAllUser', {}, 'POST').then(res => {
                    this.tableData = res.data;
                    console.log(this.tableData);
                }).catch(err => {
                    console.log(err);
                })
            },
            userUpdate() {
                this.getAjax('/users/UpdateUser', this.showData, 'POST').then(res => {
                    this.$message(res.data.message);
                    this.usershow =false;
                    this.GetData();
                })
            },
            userClose() {
                this.usershow = false
            }
        },
        mounted() {
            this.GetData();
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #userlist
        .exit
            label
                display: block
                margin-bottom: 20px
                text-align: left
                padding-left: 100px
                input
                    height: 35px
                    width: 250px
                    line-height: 35px
</style>
