<!--这是项目的根组件-->
<template>
  <div class="common-layout">
    <el-container>
      <el-header id="header">
        <HeadNavigator></HeadNavigator>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import HeadNavigator from "@/components/Navigator";

export default {
  name: 'App',
  components: {
    HeadNavigator,
  }
}
</script>

<style>
html, body, #header {
  margin: 0;
  padding: 0;
}

.text-title {
  text-align: center;
  font-size: 24px;
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
</style>
