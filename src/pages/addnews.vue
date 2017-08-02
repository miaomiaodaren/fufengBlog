<template>
    <div id="addnews">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="文章标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="文章类别">
                <el-select v-model="form.type" placeholder="请选择活动区域">
                    <el-option v-for="(t, index) in types" :label="t.name" :value="t.name" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章内容">
                <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    title: '',
                    type: '',
                    content: ''
                },
                types: []
            }
        },
        methods: {
            async onSubmit() {
                try{
                    let res = await this.getAjax('/news/addNews', this.form, 'POST');
                    if(res.data.code == 1) {
                        this.$message(res.data.message);
                        Object.keys(this.form).forEach(v => {
                            this.form[v] = ''
                        })
                    }
                }
                catch (err) {
                    console.log(err);
                }
            },
            async getType() {
                try {
                    let res = await this.getAjax('/types/GetTypes', {}, 'GET');
                    this.types = res.data;
                }
                catch(err) {
                    console.log(err)
                }
            }
        },
        mounted() {
            this.getType();
        }
    }
</script>
