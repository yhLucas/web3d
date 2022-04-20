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
    <el-menu-item index="/VirtualScene" v-if="store.getters.isLogged">VirtualScene</el-menu-item>
    <el-menu-item index="/User/Center" v-if="store.getters.isLogged">UserCenter</el-menu-item>
    <el-menu-item index="/User/Login" class="flex" v-if="!store.getters.isLogged">Login</el-menu-item>
    <el-menu-item index="/User/Register" class="flex" v-if="!store.getters.isLogged">Register</el-menu-item>
    <current-user/>
  </el-menu>
</template>

<script>
import CurrentUser from "@/components/CurrentUser";
import {store} from "@/store";

export default {
  name: "HeadNavigator",
  components: {CurrentUser},
  data() {
    return {
      store,
    }
  },
}
</script>
<style scoped>
.flex {
  margin-left: auto;
}
</style>