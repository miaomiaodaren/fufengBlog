<template>
    <div id="addnews">
        <el-form ref="form" :model="form" label-width="80px" class="add_form">
            <el-form-item label="文章标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="文章类别">
                <el-select v-model="form.type" placeholder="请选择活动区域">
                    <el-option v-for="(t, index) in typelist" :label="t.name" :value="t.name" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章内容">
                <!-- <el-input type="textarea" v-model="form.content"></el-input> -->
                <!-- <quill-editor ref="myTextEditor" v-model="form.content" :config="editorOption"></quill-editor> -->
                <!-- 经过网上查阅资料,发现有Markdown语法编辑器,所以暂时先找了一个编辑器尝试一下效果 -->
                <markdown-editor
                    v-model="content"
                    :highlight="true"
                    ref="markdownEditor"
                    preview-class="markdown-body"
                    :configs="markdownConfigs"
                    class="markdown"
                >
                </markdown-editor>
                <div class="justHtml" v-html="contentForHtml"></div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        <headers></headers>
    </div>
</template>
<script>
    import headers from '@/include/header.vue'
    import markdownEditor from 'vue-simplemde/src/markdown-editor'   //引入Markdown编辑器
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                form: {
                    title: '',
                    type: '',
                    content: ''
                },
                content: '``` \nconsole.log("lalala") \n```',
                contentForHtml: '',
                editorOption: {
                    //编辑器内容
                },
                markdownConfigs: {
                    //Markdown配置
                }
            }
        },
        computed: {
            simplemde () {
                return this.$refs.markdownEditor.simplemde
            },
            ...mapGetters([
                'typecount',
                'typelist',
            ])
        },
        watch: {
            content() {
                this.handleOutputHTML();
            }
        },
        methods: {
            async onSubmit() {
                try{
                    let res = await this.getAjax('/news/addNews', this.form, 'POST');
                    if(res.data.status === 1) {
                        this.$message(res.data.message);
                        Object.keys(this.form).forEach(v => {
                            this.form[v] = ''
                        });
                        this.$router.push({path: '/'})
                    }
                }
                catch (err) {
                    console.log(err);
                }
            },
            getType() {
                if(!this.typecount) {
                    this.$store.dispatch('SetType').then(res => {
                        console.info('分类数据已经生成', this.typelist, this, this.typecount);       
                    })
                }
                
            },
            handleOutputHTML() {
                this.contentForHtml = this.simplemde.markdown(this.content);
                this.form.content = this.contentForHtml
            },
        },
        components: {
            headers,
            markdownEditor
        },
        mounted() {
            console.info(this.$refs, '123123123', this.typecount, this.typelist);
            // this.$message('2222');
            
            this.$nextTick(() => {
                // this.$refs.markdownEditor.initialize();
            });
        },
        created() {
            this.getType();
        }
    }
</script>
<style type="text/css">
   @import '~highlight.js/styles/atom-one-dark.css';
    @import '~simplemde/dist/simplemde.min.css';
    @import '~github-markdown-css';
    .markdown{
        text-align: left;
        width: 43%;
        display: inline-block;
        vertical-align: top;
    }
    .justHtml{
        width: 43%;
        display: inline-block;
        font-size: 0;
        min-height: 100px;
        margin-left: 50px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 3px;
        text-align: left;
        font-size: 14px;
        padding: 20px;
    }
    .add_form {
        margin-bottom: 100px;
    }
    /*修改代码块背景色及字体颜色*/
    .markdown-body .highlight pre, .markdown-body pre {
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: #f6f8fa;
        border-radius: 3px;
        word-wrap: normal;
    }
</style>