<template>
    <div id="books">
        <headertop></headertop>
        <div @click="add">add</div> <div @click="deletes">delete</div>
        <div @click="deltypeAll">deltype</div>
        <el-row>
            <el-col :span="6" v-for="(n, index) in bookss" :key="index">
                <div class="grid-content bg-purple">
                    <router-link :to="{ path: '/books/bookzlist/'+ n._id }">{{n.title}} </router-link>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import headertop from '@/include/header.vue'
    export default {
        data() {
            return {
                bookss: ''
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
            }
        },
        components: {
            headertop
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
