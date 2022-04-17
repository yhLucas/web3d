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
</style>
