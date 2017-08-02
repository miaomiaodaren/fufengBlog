<template>
    <div id="news">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="_id" width="180">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row._id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="标题">
                <template scope="scope">
                    {{ scope.row.title }}
                </template>
            </el-table-column>
            <el-table-column label="内容">
                <template scope="scope">
                    {{ scope.row.content }}
                </template>
            </el-table-column>
            <el-table-column label="类别">
                <template scope="scope">
                    {{ scope.row.type }}
                </template>
            </el-table-column>
            <el-table-column label="发布时间">
                <template scope="scope">
                    {{ scope.row.addtime }}
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
            async getData() {
                try {
                    let res = await this.getAjax('/news/newslist', {}, 'GET');
                    this.tableData = res.data;
                }
                catch (err) {
                    console.log(err);
                }
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>
