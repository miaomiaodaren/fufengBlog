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
        <p contenteditable="true">这是一段可编辑的段落。请试着编辑该文本。</p>
        <canvas width="100" height="100" ref="canvas" style="border: 1px solid #ddd">我们在设置 canvas 之前需要首先监测用户电脑是否支持 canvas</canvas>
        <canvas width="100" height="100" ref="canvas1" style="border: 1px solid #ddd">我们在设置 canvas 之前需要首先监测用户电脑是否支持 canvas</canvas>
        <canvas width="100" height="100" ref="canvas2" style="border: 1px solid #ddd">我们在设置 canvas 之前需要首先监测用户电脑是否支持 canvas</canvas>
        <canvas width="200" height="200" ref="canvas3" style="border: 1px solid #ddd">我们在设置 canvas 之前需要首先监测用户电脑是否支持 canvas</canvas>
        <canvas width="200" height="200" ref="canvas4" style="border: 1px solid #ddd">我们在设置 canvas 之前需要首先监测用户电脑是否支持 canvas</canvas>
        <canvas ref="canvas5" >我们在设置 canvas 之前需要首先监测用户电脑是否支持 canvas</canvas>
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
                },
                warea : {
                    x:null,
                    y:null,
                    max:20000
                },
                dots: [],
                canvasd: {
                    ctx: '',
                    width: '',
                    height: ''
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
            },
            canvasyq() {
                //实现画圆圈
                // arc(float x,float y,float radius,float startAngle,float endAngle,boolean counterclockwise)
                // 向 canvas 的当前路径上添加一段弧。绘制以 x ， y 为圆心，radius 为半径，从 startAngle 角度开始，到 endAngle 角度结束的圆弧。startAngle 和 endAngle 以角度为单位。
                // arcTo(float x1,float x2,float y1,float y2,float radius)   向 canvas 的当前路径上添加一段弧。与上一个方法不同的地方只是定义弧的方式不同。
                // function getAngle(arc) {   //将角度转换成弧度函数，
                //     return Math.PI * (arc / 180);  
                // }
                // startAngle 圆的三点钟方向是开始角也就是0  每四分之一是 0.5* PI
                const canvas_1 = this.$refs.canvas4, ctx = canvas_1.getContext("2d");
                ctx.beginPath();
                ctx.arc(100, 100, 30, 0, Math.PI * (2), true);
                ctx.moveTo(20,10);
                ctx.lineTo(130,10);
                ctx.arcTo(150, 10, 150, 70, 20); // 创建弧      找对二个点比较重要  需要找到那个直角的坐标为1  终点的座标为2
                ctx.lineTo(150,70);
                ctx.arcTo(150, 90, 130, 90, 20); // 创建弧    
                ctx.lineTo(20, 90);
                ctx.arcTo(0, 90, 0, 70, 20); // 创建弧    
                ctx.lineTo(0, 30);
                ctx.arcTo(0, 10, 20, 10, 20); // 创建弧   
                ctx.closePath();
                ctx.strokeStyle = 'rgba(255,0,255,'+ (10 - 1) * 0.1 + ')';
                ctx.stroke();
            },
            canvasend() {
                const canvas_1 = this.$refs.canvas5;
                this.canvasd.ctx = canvas_1.getContext("2d");
                canvas_1.width = 500 || window.innerWidth || 
                    document.getElement.clientWidth || 
                    document.body.clientWidth;
                canvas_1.height = 500 || (window.innerHeight || 
                    document.getElement.clientHeight || 
                    document.body.clientHeight) - 200;
                this.canvasd.width = canvas_1.width;
                this.canvasd.height = canvas_1.height;
                //为了在底部留出一段距离
                for(let i = 0; i < 100; i++) {
                    let x = Math.random() * this.canvasd.width,
                        y = Math.random() * this.canvasd.height,
                        xa = Math.random() * 2 - 1,
                        ya = Math.random() * 2 -1;
                    this.dots.push({x, y, xa, ya, max: 6000})
                }
                setTimeout(() => {
                    this.canvasanimate();
                }, 100);
            }, 
            canvasanimate() {
                //将整个画布清空掉
                this.canvasd.ctx.clearRect(0, 0, this.canvasd.width, this.canvasd.height);
                // 将鼠标坐标添加进去，产生一个用于比对距离的点数组
                var ndots  = [this.warea].concat(this.dots);
                this.dots.forEach((dot) => {
                    // 粒子位移
                    dot.x += dot.xa;
                    dot.y += dot.ya;
                    // 遇到边界将加速度反向
                    dot.xa *= (dot.x > this.canvasd.width || dot.x < 0)? -1:1;
                    dot.ya *= (dot.y > this.canvasd.height || dot.y < 0)? -1:1;
                    // 绘制点
                    this.canvasd.ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);

                    for(let i = 0; i < ndots.length; i++) {
                        let d2 = ndots[i];
                        if (dot === d2 || d2.x === null || d2.y === null){
                            continue;
                        }
                        var xc = dot.x - d2.x;
                        var yc = dot.y - d2.y;
                        // 两个粒子之间的距离
                        var dis = xc * xc + yc * yc;
                        // 距离比
                        var ratio;
                        if(dis < d2.max){
                            // 如果是鼠标，则让粒子向鼠标的位置移动
                            if (d2 === this.warea && dis > (d2.max / 2)) {
                                dot.x -= xc * 0.03;
                                dot.y -= yc * 0.03;
                            }
                            // 计算距离比
                            ratio = (d2.max - dis) / d2.max;

                            // 画线
                            this.canvasd.ctx.beginPath();
                            this.canvasd.ctx.lineWidth = ratio/2;
                            this.canvasd.ctx.strokeStyle = 'rgba(0,0,0,' + (ratio + 0.2) + ')';
                            this.canvasd.ctx.moveTo(dot.x , dot.y);
                            this.canvasd.ctx.lineTo(d2.x , d2.y);
                            this.canvasd.ctx.stroke();
                        }
                    }

                    // 将已经计算过的粒子从数组中删除
                    ndots.splice(ndots.indexOf(dot), 1);
                });
                var RAF = (() => {
                    return window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame||
                        window.mozRequestAnimationFrame||
                        window.oRequestAnimationFrame || 
                        window.msRequestAnimationFrame || 
                        function (callback) {
                            window.setTimeout(callback, 1000 / 60);
                        }
                    })();
                RAF(this.canvasanimate);
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
            this.canvasyq();
            this.canvasend();
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

            window.onmousemove = (e) => {
                const c5 = this.$refs.canvas5.getBoundingClientRect();
                e = e || window.event;
                if((e.clientX > c5.left && e.clientX < (c5.left + c5.width)) && (e.clientY >= c5.top && e.clientY <= (c5.top + c5.height))) {
                    this.warea.x = e.clientX - c5.left;
                    this.warea.y = e.clientY - c5.top;
                }
            }
            window.onmouseout = e =>{ 
                this.warea.x = null;
                this.warea.y = null;
            }
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #books
        padding-top: 30px
</style>
