<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 表单区 -->
      <el-form label-width="0px" ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" placeholder="Username" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="el-icon-lock" placeholder="Password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="bts">
          <el-button type="primary" @click="login">Login</el-button>
          <el-button type="info" @click="resetLoginForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data: function () {
    return {
      // 数据绑定
      loginForm: {
        username: '',
        password: ''
      },
      // 表单验证规则
      loginFormRules: {
        username: [{ required: true, message: 'Please input your username', trigger: 'blur' }, { min: 6, max: 10, message: 'Must longer than 3 character', trigger: 'blur' }],
        password: [{ required: true, message: 'Please input your password', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 重置表单方法
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      const that = this
      this.$refs.loginFormRef.validate(async function (valid) {
        // 根据表单验证结果觉得valid为true或false
        if (!valid) return
        const result = await axios.post('/session', { username: that.loginForm.username, password: that.loginForm.password })
        console.log(result)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #C6E2FF;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.bts {
  display: flex;
  justify-content: flex-end;
}

</style>
