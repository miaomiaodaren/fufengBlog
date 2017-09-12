<template>
    <div class="login">
        <div class="login_main">
<!--             <el-tabs v-model="activeName">
                <el-tab-pane label="登录" name="login">
                    <el-form ref="form" :model="form">
                        <el-form-item label="" prop="name">
                            <el-input v-model="form.name" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="psw">
                            <el-input v-model="form.psw" type="password" placeholder="密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onLogin">立即创建</el-button>
                            <el-button @click="onresize('form')">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="registr">
                    <el-form ref="form2" :model="form2">
                        <el-form-item label="" prop="name">
                            <el-input v-model="form2.name" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="psw">
                            <el-input v-model="form2.psw" type="password" placeholder="密码"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="imgcode">
                            <el-input v-model="form2.imgcode" type="password" class="imgcode" placeholder="验证码"></el-input>
                            <img src="" ref="imgss" class="msgcode" @click="changeimg">
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onregistr">立即注册</el-button>
                            <el-button @click="onresize('form2')">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane> 
            </el-tabs> -->
            <tabs v-model="activeName">
                <tabitem label="登录" name="login">
                    <span class="inputs inputs-madoka">
                        <input type="text" name="name" @focus="hasfocus" @blur="removefocus" class="input__field input__field--madoka" v-model="form.name" id="login_name" placeholder="请输入用户名">
                        <label class="input__label input__label--madoka" for="login_name">
                            <svg class="graphic graphic--madoka" width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">
                                <path d="m0,0l404,0l0,77l-404,0l0,-77z"/>
                            </svg>
                        </label>
                    </span>
                    <span class="inputs inputs-madoka">
                        <input type="password" class="input__field input__field--madoka" name="psw" v-model="form.psw" placeholder="请输入密码">
                        <label class="input__label input__label--madoka" for="input-31">
                            <svg class="graphic graphic--madoka" width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">
                                <path d="m0,0l404,0l0,77l-404,0l0,-77z"/>
                            </svg>
                        </label>
                    </span>
                    <button class="loginbtn" @click="onLogin">立即创建</button>
                </tabitem>
                <tabitem label="注册" name="registr">
                    <input type="text" name="name" v-model="form2.name" placeholder="请输入用户名">
                    <input type="password" name="psw" v-model="form2.psw" placeholder="请输入密码">
                    <input type="text" name="imgcode" v-model="form2.imgcode" placeholder="请输入图形验证码">
                </tabitem>
            </tabs>
        </div>
        <headers></headers>
    </div>
</template>
<script>
    import tabs from '@/plugin/tabs/tabs.vue'
    import tabitem from '@/plugin/tabs/tab-item.vue'
    import * as uts from '@/assets/util.js'
    import headers from '@/include/header.vue'
    export default {
        data() {
            return {
                activeName: 'login',
                form: {
                    name: 'admin',
                    psw: '123456'
                },
                form2: {
                    name: '',
                    psw: '',
                    imgcode: ''
                },
                imgsrc: api + '/users/GetImgCode?'
            }
        },
        methods: {
            // aa() {
            //     return new Promise(resolve => {
            //         resolve('aaaa')
            //     })
            // },
            // async bb() {
            //     let cc = await this.aa();
            //     console.log(cc)
            // }
            hasfocus(e) {
                // event.currentTarget  获取元素dom
                uts.addClass(event.currentTarget.parentNode, 'input--filled')
            },
            removefocus() {
                uts.removeClass(event.currentTarget.parentNode, 'input--filled')
            },
            async onLogin() {
                try{
                    let res = await this.getAjax('/users/reginer', this.form, 'POST');
                    if(res.data.code === 1) {
                        if(res.data.code === 1) {
                            this.$message('登录成功!');
                            this.$router.push({path: '/'});
                        } else {
                            this.$message(res.data.message);
                        }
                    }
                }catch (err) {
                    this.$message(err)
                }
            },
            // onregistr() {
            //     this.getAjax('/users/Getlogin', this.form2, 'POST').then(res => {
            //         if(res.data.code === 1) {
            //             this.$message(res.data.message);
            //         } else {
            //             this.$message(res.data.message);
            //             Object.keys(this.form2).forEach(v => {
            //                 this.form2[v] = ""
            //             })
            //             this.changeimg();
            //         }
            //     }).catch(err => {
            //         this.$message(err.data.message);
            //     })
            // },
            // onresize(formName) {
            //     this.$refs[formName].resetFields();
            // },
            // changeimg() {
            //     this.$refs.imgss.src = this.imgsrc + uniqueId();
            // }
        },
        components: {
            tabs,
            tabitem,
            headers,
        },
        mounted() {
            // this.changeimg();
            alert(this.imgsrc);
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    .login
        background-color: #f7fafc
        .login_main
            width: px2rem(600)
            margin: 0 auto
            vertical-align: middle
            display: inline-block
            // display: flex
            // justify-content: center
            // align-items: center
            margin-top: 30%
            min-height: px2rem(800)
            height: 100%
            .loginbtn
                width: 100%
                background: #0f88eb
                box-shadow: none
                border: 0
                border-radius: 3px
                line-height: 41px
                color: #fff
                line-height: px2rem(80)
                @include font-dpr(16px)
        .msgcode
            cursor: pointer
        .imgcode
            width: px2rem(240)
            margin-right: px2rem(10)
    .inputs-madoka 
        margin-bottom: px2rem(50)
    .input__label--madoka 
        position: absolute
        width: 100%
        height: 106%
        color: #7A7593
        text-align: left
        cursor: text
    .graphic--madoka 
        -webkit-transform: scale3d(1, -1, 1)
        transform: scale3d(1, -1, 1)
        -webkit-transition: stroke-dashoffset 0.3s
        transition: stroke-dashoffset 0.3s
        pointer-events: none
        stroke: $mainColor
        stroke-width: 4px
        stroke-dasharray: 962
        stroke-dashoffset: 558
    .input__field--madoka:focus + .input__label--madoka,
    .input--filled .input__label--madoka 
        cursor: default
        pointer-events: none
    
    .input__field--madoka:focus + .input__label--madoka .graphic--madoka,
    .input--filled .graphic--madoka 
        stroke-dashoffset: 0
</style>
