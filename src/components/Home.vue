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
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="changeCollapse">
          |||
        </div>
        <!--        侧边栏菜单区域-->
        <el-menu background-color="#000000" text-color="#ffffff" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="currentPath">
          <!--          一级菜单-->
<!--          index只接收字符串，所以要+ ''改成字符串形式-->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.authName }}</span>
            </template>
<!--            二级菜单-->
            <el-menu-item :index="item.path + subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <i class="el-icon-menu"></i>
              <span>{{ subItem.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--      右侧内容主体-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data: function () {
    return {
      isCollapse: false,
      menuList: [{
        id: 101,
        authName: '用户管理',
        path: '/admin',
        icon: 'el-icon-user-solid',
        children: [{
          id: 110,
          authName: '用户列表',
          path: '/users'
        }, {
          id: 111,
          authName: '用户权限',
          path: '/rights'
        }]
      }, {
        id: 102,
        authName: '商品管理',
        path: '/goods',
        icon: 'el-icon-s-goods',
        children: [{
          id: 110,
          authName: '商品列表',
          path: '/list'
        }, {
          id: 111,
          authName: '品牌合作',
          path: '/brand'
        }]
      }]
    }
  },
  computed: {
    currentPath: function () {
      const path = window.location.hash
      return path.slice(1)
    }
  },
  created () {
    // this.getMenuList()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      const result = axios.get('/menus')
      console.log(result)
    },
    changeCollapse () {
      this.isCollapse = !this.isCollapse
    },
    saveCurrentPath (currentPath) {
      window.sessionStorage.setItem('currentPath', currentPath)
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
.home-container {
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

    span {
      margin-left: 20px;
    }
  }

  .logo-img {
    width: 55%;
  }
}

.el-aside {
  background-color: #000000;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #C6E2FF;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
