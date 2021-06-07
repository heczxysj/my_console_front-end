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
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="4">
          <el-tooltip class="item" effect="dark" content="搜索" placement="right-end" :enterable="false">
            <el-button icon="el-icon-search" circle @click="searchUsers"></el-button>
          </el-tooltip>
        </el-col>
        <el-col :span="1">
        <el-button type="primary" plain style="margin-left: 700px" @click="addFormVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column prop="id" label="id" width="180"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="password" label="密码" width="180"></el-table-column>
        <el-table-column prop="created_at" label="注册日期"></el-table-column>
        <el-table-column prop="updated_at" label="更新日期"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="warning" plain class="el-icon-edit" @click="editUser(scope.row.id)">修改</el-button>
            <el-button type="danger" plain class="el-icon-delete" @click="deleteUser(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--      分页条-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20]"
        :page-size="per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!--    添加用户对话框-->
    <el-dialog title="添加用户" :visible.sync="addFormVisible" width="50%">
      <el-form :label-position="lp" :model="addForm">
        <el-form-item label="用户名">
          <el-input autocomplete="off" style="width: 50%" v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input autocomplete="off" style="width: 50%" v-model="addForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
    </el-dialog>
    <!--    编辑用户对话框-->
    <el-dialog title="修改用户" :visible.sync="editFormVisible" width="50%">
      <el-form :label-position="lp" :model="editForm">
          <el-input autocomplete="off" style="display: none" v-model="editForm.id" disabled></el-input>
        <el-form-item label="用户名">
          <el-input autocomplete="off" style="width: 50%" v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input autocomplete="off" style="width: 50%" v-model="editForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="modifyUser(editForm.id)">确 定</el-button>
  </span>
    </el-dialog>
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
      input: '',
      page: 1,
      per_page: 10,
      total: 0,
      addFormVisible: false,
      editFormVisible: false,
      lp: 'top',
      addForm: {
        username: '',
        password: ''
      },
      editForm: {
        id: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async getUserList () {
      const result = await axios.get('/admin/users?page=' + this.page + '&per_page=' + this.per_page + '&username=' + this.input)
      if (result.status === 200) {
        this.userList = result.data.res
        this.total = result.data.total
      } else {
        this.$message.error('获取用户列表失败')
      }
    },
    async searchUsers () {
      await this.getUserList()
    },
    async deleteUser (id) {
      const result = await axios.delete('/admin/users/' + id)
      if (result.status === 204) {
        this.$message.success('删除成功')
        await this.getUserList()
      }
    },
    handleSizeChange (size) {
      this.per_page = size
      this.getUserList()
    },
    handleCurrentChange (page) {
      this.page = page
      this.getUserList()
    },
    async addUser () {
      const result = await axios.post('/user', { username: this.addForm.username, password: this.addForm.password })
      if (result.status === 200) {
        this.addFormVisible = false
        this.$message.success('添加成功')
        this.addForm.username = ''
        this.addForm.password = ''
        await this.getUserList()
      }
    },
    async editUser (id) {
      this.editFormVisible = true
      const result = await axios.get('/admin/users/' + id)
      if (result.status === 200) {
        this.editForm = result.data.res
      }
    },
    async modifyUser (id) {
      const result = await axios.put('/admin/users/' + id, { password: this.editForm.password })
      if (result.data.msg === 'success') {
        this.editFormVisible = false
        this.$message.success('修改成功')
        await this.getUserList()
      } else {
        this.$message.error('修改失败')
      }
    }
  },
  created () {
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>

</style>
