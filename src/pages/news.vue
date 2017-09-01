<template>
    <div id="news">
        <div class="news_header">
            <div class="news_header_item">id</div>
            <div class="news_header_item">标题</div>
            <div class="news_header_item">类别</div>
            <div class="news_header_item">操作</div>
        </div>
        <div class="news_main">
            <ul>
                <li class="news_header" v-for="(n, index) in tableData">
                    <div class="news_header_item">{{index + 1}}</div>
                    <div class="news_header_item">{{n.title}}</div>
                    <div class="news_header_item">{{n.type}}</div>
                    <div class="news_header_item">
                        <el-button size="mini" @click="handleEdit(index)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(index)">删除</el-button>
                    </div>
                </li>
            </ul>
        </div>
        <headers></headers>
    </div>
</template>
<script>
    import headers from '@/include/header.vue'
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
        components: {
            headers,
        },
        mounted() {
            this.getData();
        }
    }
</script>

<style lang="sass" scoped type="text/sass">
    #news
        width: 100%
        overflow: hidden
        .news_header
            display: flex
            margin-bottom: px2rem(30)
            .news_header_item
                flex: 1
                text-align: center
                height: px2rem(90)
                line-height: px2rem(90)
                border-bottom: 1px solid #ddd
</style>
