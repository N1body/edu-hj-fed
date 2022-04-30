<template>
  <div class="login">
    <h1>教育管理系統</h1>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px" class="login-form" label-position="top">
      <el-form-item label="手机号" prop="phone">
        <el-input type="phone" v-model="loginForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="login-btn" :loading="isLoginLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/services/user'
export default {
  name: "LoginIndex",
  data () {
    return {
      loginForm: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          // trigger: 'blur' 为失去焦点时检验
          { required: true, message: '请输入手机号', trigger: 'blur'},
          /* 1开头的11位数字 */
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
      },
      // 防止重复点击
      isLoginLoading: false
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 基础表单验证
        await this.$refs.loginForm.validate()
        // 登录按钮加载状态
        this.isLoginLoading = true
        // 向服务器提交表单数据 接收服务器响应结果
        const { data } = await login(this.loginForm)
        // 处理请求结果
        if (data.state !== 1) {
          // 登录失败 显示错误提示
          this.$message.error(data.message)
        } else {
          // 登录成功 保存登录状态
          // 并且之后在访问需要登录的页面的时候判断是否在登录状态 (使用路由拦截器)
          console.log('此处用vuex容器进行保存')
          // 成功后跳转到首页 或者登录失效前准备跳转的页面
          // 登录失效前准备跳转的页面可以通过拦截器传递query参数来获取
          this.$router.push(this.$route.query.redirect || '/')
          // 提示登录成功
          this.$message.success('登录成功')
        }
      } catch (err) {
        console.log('登录失败', err)
      }
      this.isLoginLoading = false
    }
  }
};
</script>

<style scoped>
.login {
  width: 95%;
  max-width: 22rem;
  margin: 1rem auto;
}
h1 {
  margin: 4.5rem 0 3.5rem;
  text-align: center;
  letter-spacing: .1em;
  color: rgba(0,0,0,.5);
  font-size: 3rem;
  font-weight: 300;
  transition: text-shadow .3s;
}

.login-form{
  width: 300px;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}
.login-btn {
  width: 100%;
  background-color: #40586f;
}
</style>