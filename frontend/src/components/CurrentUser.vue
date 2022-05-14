<template>
  <el-dropdown class="dropdown" v-if="store.getters.isLogged">
    <span class="el-dropdown-link current-user">
      {{ store.getters.getUsername }}
      <el-icon color="#000">
        <arrow-down/>
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>

        <el-dropdown-item
            divided
            icon=""
            @click="logout">
          Logout
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import {store} from "@/store";
import router from "@/router";

export default {
  name: "CurrentUser",
  data() {
    return {
      store,
    }
  },
  computed: {},
  methods: {
    logout() {
      console.log('logout')
      store.commit('logout')
      router.replace({
        name: 'Home',
      })
    },
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
  color: black;
  padding: 0 20px 0 20px;
  height: 58px;
  text-align: center;
}

.current-user:hover {
  background: rgb(67, 74, 80);
}
</style>