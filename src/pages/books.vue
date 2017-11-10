<template>
    <div id="books">
        <headertop></headertop>
        <ffInput placeholder="请输入内容" v-model="fv" :disabled="false">
            <template slot="prepend">Http:/</template>
            <template slot="append">Http:/1/</template>
            <!-- <i slot="suffix"></i> -->
        </ffInput>
        <p @click="fv='11111'">312312321</p>
        <div @click="add">add</div> <div @click="deletes">delete</div>
        <div @click="deltypeAll">deltype</div>
        <!-- <el-row>
            <el-col :span="6" v-for="(n, index) in bookss" :key="index">
                <div class="grid-content bg-purple">
                    <router-link :to="{ path: '/books/bookzlist/'+ n._id }">{{n.title}} </router-link>
                </div>
            </el-col>
        </el-row> -->
        <!-- ele图像上传 -->
        <el-upload
            class="upload-demo"
            drag
            :action="upUrl"
            multiple
            :data= isData
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>
<script>
    import headertop from '@/include/header.vue';
    import { huploader } from '@/service'
    export default {
        data() {
            return {
                bookss: '',
                fv: '222',
                upUrl: huploader,
                isData: {
                    name: '22',
                    title: '33'
                }
            }
        },
        methods: {
            
            async getBook() {
                let res = await this.getAjax('/books/showbook', {}, 'GET');
                console.log(res.data);
                this.bookss = res.data;
            },
            async add() {
                let res = await this.getAjax('/books/addBook', {}, 'GET');
                alert('add success')
            },
            async deletes() {
                let res = await this.getAjax('/books/deleteBook', {}, 'GET');
                alert('删除成功！');
            },
            async deltypeAll() {
                let res = await this.getAjax('/books/delBookTypeList', {}, 'GET');
                console.info(res, '22222');
            },
        },
        components: {
            headertop,
        },
        mounted() {
            this.getBook();
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #books
        padding-top: 30px
</style>
