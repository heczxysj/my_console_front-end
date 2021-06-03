<template>
  <div>
    <!--    面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片区域-->
    <el-card class="box-card">
      <!--      搜索框区域-->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" class="input-with-select"/>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-icon-search" circle></el-button>
        </el-col>
      </el-row>
        <el-table :data="userList" stripe style="width: 100%">
          <el-table-column prop="id" label="id" width="180"></el-table-column>
          <el-table-column prop="username" label="用户名" width="180"></el-table-column>
          <el-table-column prop="password" label="密码" width="180"></el-table-column>
          <el-table-column prop="created_at" label="注册日期"></el-table-column>
          <el-table-column prop="updated_at" label="更新日期"></el-table-column>
          <el-table-column prop="" label="操作">
            <el-button type="warning" plain>修改</el-button>
            <el-button type="danger" plain>删除</el-button>
          </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Users',
  data () {
    return {
      userList: [],
      // 查询条件
      username: '',
      page: '',
      per_page: ''
    }
  },
  methods: {
    async getUserList () {
      const result = await axios.get('/admin')
      if (result.status === 200) {
        this.userList = result.data.res
      } else {
        this.$message.error('获取用户列表失败')
      }
    },
    async deleteUser (id) {
      await axios.delete('/admin/destroy/' + id)
    }
  },
  created () {
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>

</style>
