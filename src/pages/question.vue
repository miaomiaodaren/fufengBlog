<template>
    <div id="question">
        <div style="display: block">
            <headers></headers>
        </div>
        <div class="QuestionHeader">
            <div class="main">
                <div class="questiontips">
                    <ul>
                        <li>前端开发</li>
                        <li>VUE开发</li>
                    </ul>
                </div>
                <h3>南非世界杯城区城区四方达要</h3>
            </div>
        </div>
        <div class="QuestionContent main">
            <div class="question_left">
                <ul>
                    <li>3123123123</li>
                </ul>
            </div>
            <div class="question_right">
            </div>
        </div>
    </div>
</template>
<script>
    import headers from '@/include/header.vue'
    export default {
        name: 'question',
        data() {
            return {
                id: this.$route.params.id
            }
        },
        mounted() {
            
        },
        components: {
            headers
        }
    }
</script>
<style lang="scss" scoped type="text/scss">
    #question{
        background-clip: #f3f3f3;
        .QuestionHeader{
            margin-top: 65px;
            background-color: #fff;
            padding: 10px;
            height: 160px;
            box-shadow: 0 1px 3px 0 rgba(0,37,55,.1);
            .main{
                width: 1200px;
                margin: 0 auto;
                text-align: left;
                padding-left: 20px;
                .questiontips{
                    ul{
                        li{
                            display: inline-block;
                            height: 30px;
                            font-size: 14px;
                            color: #3e7ac2;
                            background: #eef4fa;
                            border-radius: 100px;
                            padding: 5px 22px;
                        }
                    }
                }
                h3{
                    margin-top: 12px;
                    margin-bottom: 4px;
                    font-size: 22px;
                    font-weight: 700;
                    line-height: 32px;
                    color: #1e1e1e;
                }
            }
        }
        .QuestionContent{
            .question_left{
                width: 900px;
                float: left;
                ul{
                    margin-top: 10px;
                    li{
                        min-height: 50px;
                        background-color: #fff;
                    }
                }
            }
        }
        .main{
            width: 1200px;
            margin: 0 auto;
        }
    }
</style>

