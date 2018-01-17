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
        <canvas width="100" height="100" ref="canvas" style="border: 1px solid #ddd">
            我们在设置 canvas 之前需要首先监测用户电脑是否支持 canvas
        </canvas>
        <canvas width="100" height="100" ref="canvas1" style="border: 1px solid #ddd">
            我们在设置 canvas 之前需要首先监测用户电脑是否支持 canvas
        </canvas>
        <canvas width="100" height="100" ref="canvas2" style="border: 1px solid #ddd">
            我们在设置 canvas 之前需要首先监测用户电脑是否支持 canvas
        </canvas>
        <canvas width="200" height="200" ref="canvas3" style="border: 1px solid #ddd">
            我们在设置 canvas 之前需要首先监测用户电脑是否支持 canvas
        </canvas>
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
            canvassjx() {
                //制作三角形
                const canvas_1 = this.$refs.canvas1, ctx = canvas_1.getContext("2d");
                ctx.beginPath();
                ctx.moveTo(25, 0);
                ctx.lineTo(10, 40);
                ctx.lineTo(40, 40);
                ctx.lineJoin = "bevel";
                ctx.closePath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = "red";
                ctx.stroke();
                ctx.fillStyle = "ffff00";
                ctx.fill();
            },
            canvaszfx() {
                //制作正方形or长方形
                const canvas_1 = this.$refs.canvas2, ctx = canvas_1.getContext("2d");
                // 设置填充颜色
                ctx.fillStyle = '#f00';
                // 填充一个矩形
                    // strokeRect(float x,float y,float width,float height)  绘制一个矩形边框
                    // fillRect(float x,float y,float width,float height)  填充一个矩形边框
                ctx.lineWidth = 3;
                ctx.fillRect(10,10,30,30);    
                ctx.strokeRect(10,10,20,20);
            },
            canvastext() {
                //制作文字与文字描边
                // fillText(String Text, float x, float y, [float maxWidth])  填充字符串
                // strokeText(String Text, float x, float y, [float maxWidth]) 绘制字符串边框
                // textAlign 设置绘制字符串的水平对齐方式(start、end、left、right、center等)
                //textBaseAlign  设置绘制字符串的垂直对齐方式(top、hanging、middle、alphabetic、idecgraphic、bottom 等)
                const canvas_1 = this.$refs.canvas3, ctx = canvas_1.getContext("2d");
                // ctx.fillStyle = '#f00';
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#000';
                ctx.font = 'bold 35px 宋体';
                ctx.textAlign = 'start';
                ctx.textBaseline = "idecgraphic";
                // 设置阴影的模糊程度
                ctx.shadowBlur = 5.6;
                // 设置阴影的颜色
                ctx.shadowColor = '#222';
                // 设置阴影在 X,Y 方向的偏移
                ctx.shadowOffsetX = 10;
                ctx.shadowOffsetY = -6;
                ctx.strokeText('喵喵', 10, 50, 190);
                ctx.fillText('喵喵', 10, 90, 190);
            }
        },
        components: {
            headertop,
        },
        mounted() {
            this.getBook();
            this.canvassjx();
            this.canvaszfx();
            this.canvastext();
            // console.info(this);
            const canvas_1 = this.$refs.canvas,
                ctx = canvas_1.getContext("2d");
            // 开始绘制
            ctx.beginPath();
            //设置绘制起点
            ctx.moveTo(0,0);
            //设置绘制下一个点
            ctx.lineTo(40,40);
            //结束绘制
            ctx.closePath();
            //lineJoin 设置返回所创建边角的类型，当两条线交汇时。  有三种属性(bevel创建斜角, round创建圆角, miter默认，创建尖角)
            ctx.lineJoin = "round";
            //lineWidth()  //设置笔触线条的宽度(要放在绘制的前面)
            ctx.lineWidth = 3;
            //strokeStyle() 设置绘制 canvas 路径的填充风格  fillStyle() 设置填充 canvas 路径所使用的填充风格  
            // 符合颜色格式的字符串值，表示使用纯色填充   三个参数
            // CanvasGradient，表明使用渐变填充
            // CanvasPattern，表明使用位图填充
            ctx.strokeStyle = "red";
            //填充 canvas 当前路径绘制边框    fill()填充 canvas 当前路径
            ctx.stroke();
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #books
        padding-top: 30px
</style>
