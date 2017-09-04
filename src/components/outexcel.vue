<template>
    <div id="outexcel">
        12312
        <div class="dow" @click="outexcel">导出excel</div>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                dataList: [
                    {id: 1, title: '标题1', author: 'ff1'},
                    {id: 2, title: '标题2', author: 'ff2'},
                    {id: 3, title: '标题3', author: 'ff3'},
                    {id: 4, title: '标题4', author: 'ff4'},
                    {id: 5, title: '标题5', author: 'ff5'},
                    {id: 6, title: '标题6', author: 'ff6'},
                    {id: 7, title: '标题7', author: 'ff7'},
                ]
            }
        },
        methods: {
            outexcel() {
                require.ensure([], () => {
                    // const { export_json_to_excel } = require('../../static/vendor/Export2Excel')
                    const tHeader = ['序号', '文章标题', '作者']
                    const filterVal = ['id', 'title', 'author']
                    const list = this.dataList
                    const data = this.formatJson(filterVal, list)
                    export_json_to_excel(tHeader, data, '列表excel')
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            }
        }
    }
</script>