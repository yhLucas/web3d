<template>
  <el-menu
      :default-active="this.$route.path"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
  >
    <el-menu-item index="/">Home</el-menu-item>
    <el-menu-item index="/User/Center">UserCenter</el-menu-item>
    <el-menu-item index="/VirtualScene">VirtualScene</el-menu-item>
    <el-menu-item index="/User/Login">Login</el-menu-item>
    <el-menu-item index="/User/Register">Register</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "HeadNavigator",
  components: {}

}
</script>

<style scoped>

</style>