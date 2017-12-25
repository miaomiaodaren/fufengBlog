<template>
    <div id="regex">
        <div class="regex_main">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        /^(-?[1-8][0-9]|-?[1-9]|-?90|0)$/
                        <br />
                        判断文字是不是在-90 - 90 之间
                    </div>
                </el-col>
                <el-col :span="6"><div class="grid-content bg-purple">22</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">33</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">44</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">11</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">22</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">33</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">44</div></el-col>
            </el-row>
        </div>
        <headers></headers>
    </div>
</template>
<script type="text/javascript">
    import headers from '@/include/header'
    export default {
        data() {
            return {

            }
        },
        components: {
            headers
        }
    }
</script>
<style lang="sass">
    #regex 
        padding: px2rem(80) px2rem(100)
        .el-col 
            margin-bottom: px2rem(40)
        .grid-content
            background-color: #e5e9f2
            height: px2rem(100)
            line-height: px2rem(50)
</style>