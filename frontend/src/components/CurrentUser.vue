<template>
  <el-dropdown class="dropdown">
    <span class="el-dropdown-link current-user">
      Username
      <el-icon color="#ffffff">
        <arrow-down/>
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          修改密码
        </el-dropdown-item>
        <el-dropdown-item
            divided
            icon=""
            @click="logout">
          登出
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>

export default {
  name: "CurrentUser",
  data() {
    return {
      user: '',
    }
  },
  created() {
    // this.user = this.$getUser()
  },
  methods: {
    logout() {
      console.log('logout')
      window.localStorage.removeItem('user')
      this.$router.replace({
        name: 'Login',
        query: {redirect: window.location.pathname}
      })
    }
  }
}
</script>

<style scoped>
.dropdown {
  margin-left: auto;
}

.current-user {
  display: flex;
  align-items: center;
  color: white;
  padding: 0 20px 0 20px;
  height: 58px;
  text-align: center;
}

.current-user:hover {
  background: rgb(67, 74, 80);
}
</style>