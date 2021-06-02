<template>
  <el-container class="home-container">
<!--    头部区域-->
    <el-header>
      <div>
        <img class="logo-img" src="../assets/homelogo.jpg" alt="">
        <span>MyConsole</span>
      </div>
      <el-button type="info" @click="logout">Logout</el-button>
    </el-header>
<!--    页面主题区域-->
    <el-container>
<!--      侧边栏-->
      <el-aside width="200px">
<!--        侧边栏菜单区域-->
        <el-menu background-color="#000000" text-color="#ffffff">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="1-1">用户列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
<!--      右侧内容主体-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data: function () {
    return {
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      const result = axios.get('/menus')
      console.log(result)
    }
  }
}
// 测试/admin接口
// const { data: res } = await axios.get('/admin')
// for (let i = 0; i < res.length; i++) {
//   var d = res[i]
//   console.log(d)
// }
// 或者
// const result = await axios.get('/admin')
// for (let i = 0; i < result.data.length; i++) {
//   var d = result.data[i]
//   console.log(d)
// }
</script>

<style lang="less" scoped>
.home-container{
  height: 100%;
}

.el-header {
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  font-size: 20px;
  border: 1px;
  > div {
    display: flex;
    align-items: center;
    span{
      margin-left: 20px;
    }
  }
  .logo-img{
    width: 55%;
  }
}

.el-aside {
  background-color: #000000;
}

.el-main {
  background-color: #C6E2FF;
}
</style>
