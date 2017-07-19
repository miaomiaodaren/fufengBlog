<template>
    <div class="login">
        <div class="login_main">
            <el-tabs v-model="activeName">
                <el-tab-pane label="登录" name="login">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="form.name" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="psw">
                            <el-input v-model="form.psw" type="password" placeholder="密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onLogin">立即创建</el-button>
                            <el-button @click="onresize('form')">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="registr">
                  <el-form ref="form2" :model="form2" label-width="80px">
                    <el-form-item label="用户名" prop="name">
                      <el-input v-model="form2.name" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="psw">
                      <el-input v-model="form2.psw" type="password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onregistr">立即注册</el-button>
                      <el-button @click="onresize('form2')">取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
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
                    psw: ''
                }
            }
        },
        methods: {
            onLogin() {
                this.getAjax('/users/reginer', this.form, 'POST').then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            },
            onregistr() {
                this.getAjax('/users/Getlogin', this.form2, 'POST').then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            },
            onresize(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    .login
        height: 100%
        .login_main
            width: 300px
            margin: 0 auto
            vertical-align: middle
            display: inline-block
            min-height: 500px
</style>
