<template>
<div>
  <el-button type="info" @click="logout">Logout</el-button>
</div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
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

</style>
