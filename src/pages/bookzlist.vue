<template>
    <div id="bookzlist">
        <h2>{{zlist.title}}</h2>
        <p>
            <span>{{zlist.author}}</span>
        </p>
        <p>
            <span v-html="zlist.jianjie"></span>
        </p>
        <el-row>
            <el-col :span="4" v-for="(n, index) in zlist.zview" :key="index">
                <div class="grid-content bg-purple">
                    <router-link :to="{ path: '/books/bookcontent/'+ n.id +'/'+ id }">{{n.title}} </router-link>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                id: this.$route.params.id,
                zlist: ''
            }
        },
        methods: {
            async getZlist(v) {
                try {
                    let res = await this.getAjax('/books/getZlist', {id: v}, 'POST');
                    console.log(res);
                    this.zlist = res.data
                } catch (err) {
                    console.log(err)
                }
            }
        },
        mounted() {
            this.getZlist(this.id)
        }
    }
</script>
