<template>
    <div class="login">
        <div class="login_main">
           <!--  <el-tabs v-model="activeName">
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
            </el-tabs>-->
            <tabs v-model="activeName">
                <tabitem label="登录" name="login">213123123</tabitem>
                <tabitem label="注册" name="registr">333333333</tabitem>
            </tabs>
        </div>
    </div>
</template>
<script>
    // import {uniqueId} from '@/assets/util.js'
    import tabs from '@/plugin/tabs/tabs.vue'
    import tabitem from '@/plugin/tabs/tab-item.vue'
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
                imgsrc: 'http://127.0.0.1:3000/users/GetImgCode?'
            }
        },
        methods: {
            // async onLogin() {
            //     try{
            //         let res = await this.getAjax('/users/reginer', this.form, 'POST');
            //         if(res.data.code === 1) {
            //             if(res.data.code === 1) {
            //                 this.$router.push({path: '/'});
            //             } else {
            //                 this.$message(res.data.message);
            //             }
            //         }
            //     }catch (err) {
            //         this.$message(err)
            //     }
            // },
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
            tabitem
        },
        mounted() {
            // this.changeimg();
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    .login
        height: 100%
        background-color: $mainColor
        .login_main
            width: px2rem(600)
            margin: 0 auto
            vertical-align: middle
            display: inline-block
            display: flex
            justify-content: center
            align-items: center
            min-height: px2rem(800)
            height: 100%
        .msgcode
            cursor: pointer
        .imgcode
            width: px2rem(240)
            margin-right: px2rem(10)
</style>
