<!--这是项目的根组件-->
<template>
  <el-container style="min-height: 100%">
    <el-aside style="width: auto">
      <el-menu v-if="windowWidth>=500"
               :default-active="this.$route.path"
               class="el-menu-vertical-demo"
               :collapse="isCollapse"
               @open="handleOpen"
               @close="handleClose"
               router
               style="height: 100%"
      >
        <el-menu-item>
          <p>{{ isCollapse ? '3D' : 'Web 3D' }}</p>
        </el-menu-item>
        <el-menu-item index="/">
          <el-icon>
            <location/>
          </el-icon>
          <template #title>Home</template>
        </el-menu-item>
        <el-menu-item index="/User/Center" v-if="store.getters.isLogged">
          <el-icon>
            <document/>
          </el-icon>
          <template #title>UserCenter</template>
        </el-menu-item>
        <el-menu-item index="/User/Login" class="flex" v-if="!store.getters.isLogged">
          <el-icon>
            <document/>
          </el-icon>
          <template #title>Login</template>
        </el-menu-item>
        <el-menu-item index="/User/Register" class="flex" v-if="!store.getters.isLogged">
          <el-icon>
            <document/>
          </el-icon>
          <template #title>Register</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-menu
            :default-active="this.$route.path"
            class="el-menu-demo flex-col"
            mode="horizontal"
            background-color="#fff"
            text-color="#545c64"
            router
        >
          <el-menu-item index="/" v-if="windowWidth<500">Home</el-menu-item>
          <el-menu-item index="/VirtualScene" v-if="windowWidth<500&&store.getters.isLogged">VirtualScene</el-menu-item>
          <el-menu-item index="/User/Center" v-if="windowWidth<500&&store.getters.isLogged">UserCenter</el-menu-item>
          <el-menu-item index="/User/Login" class="flex" v-if="windowWidth<500&&!store.getters.isLogged">Login
          </el-menu-item>
          <el-menu-item index="/User/Register" class="flex" v-if="windowWidth<500&&!store.getters.isLogged">Register
          </el-menu-item>
          <current-user/>
<!--          <button @click="store.commit('login',{username:'test',token:123})">测试登录</button>-->
        </el-menu>
      </el-header>
      <el-main id="container">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import CurrentUser from "@/components/CurrentUser";
import {store} from "@/store";

export default {
  name: 'App',
  components: {CurrentUser},
  data() {
    return {
      store,
      isCollapse: false,
      windowWidth: document.documentElement.clientWidth,
    }
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth;
        this.windowWidth = window.fullWidth;
      })()
    };
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
}
</script>

<style>
html, body, #header {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  height: 100%;
}

.text-title {
  text-align: center;
  font-size: 24px;
}

.text-normal {
  text-align: center;
  font-size: 16px;
}

.subtext-title {
  text-align: left;
  font-size: 20px;
  padding-left: 12px;
}

.subtext-normal {
  text-align: left;
  font-size: 14px;
  padding-left: 24px;
}

.p-2 {
  padding: 4px;
}

.p-3 {
  padding: 8px;
}

.m-2 {
  margin: 4px;
}

.m-3 {
  margin: 8px;
}

.flex {
  margin-left: auto;
}

#container {
  padding: 0;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
