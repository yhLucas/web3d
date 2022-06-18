<template>
  <div class="common-layout el-card">
    <el-container>
      <el-header height="60px">
        <p class="text-title">UserCenter</p>
      </el-header>
      <br/>
      <el-main>
        <div class="box-card el-card">
          <el-collapse :model-value="['1','2','3','4']">
            <el-collapse-item name="1" class="font-big">
              <template #title>
                <h1 class="font-big">Information</h1>
              </template>
              <div class="text-normal">
                Email:{{ store.getters.getUsername }}
              </div>
            </el-collapse-item>
            <el-collapse-item name="2" class="font-big">
              <template #title>
                <h1 class="font-big">VirtualFigure</h1>
              </template>
              <div class="text-normal">
                Choose your character!
              </div>
              <el-select v-model="value" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="item in options"
                    :key="item"
                    :label="item"
                    :value="item"
                />
              </el-select>
            </el-collapse-item>
            <el-collapse-item title="VirtualScenes" name="3" class="font-big">
              <template #title>
                <h1 class="font-big">VirtualScenes</h1>
              </template>
              <el-card style="width: 460px">
                }
                <img
                    src="https://www.researchgate.net/profile/Curtis-Bright/publication/333815714/figure/fig1/AS:770619155156992@1560741332335/A-visual-representation-of-a-solution-for-the-8-queens-problem-left-and-the-variables.png">
                <div style="padding: 14px">
                  <p class="text-normal">Eight Queens Problem</p>
                  <p class="text-small">Hits:18</p>
                  <p class="text-small">Pass rates:20%
                    <el-button type="primary" plain @click="toVirtualScene"
                    style="margin-left: 20px;font-size: 20px">Try it now!</el-button></p>
                </div>
              </el-card>
            </el-collapse-item>
            <el-collapse-item name="4" class="text-title">
              <template #title>
                <h1 class="font-big">Records</h1>
              </template>
              <el-table :data="tableData" style="width: 100%; text-align: left" class="font-middle">
                <el-table-column prop="scene" label="Scene" width="180"/>
                <el-table-column prop="time" label="Date" width="180"/>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {store} from "@/store"
import {ref} from 'vue'
import router from "@/router";
// import axios from "axios";
// import {ElMessage} from "element-plus";

export default {
  name: "UserCenter",
  setup() {
    const stat = ref('new')
    const value = ref('Random')
    const options = ['Random', 'BeachBabe', 'BusinessMan', 'Doctor', 'FireFighter', 'Housewife', 'Policeman', 'Prostitute', 'Punk', 'RiotCop', 'Roadworker', 'Robber', 'Sheriff', 'Streetman', 'Waitress']
    const tableData = [
      {
        scene: '汉诺塔',
        time: '2016-05-03',
      },
    ]
    const toVirtualScene = () => {
      // 发送进入场景的请求
      console.log(value.value)
      router.push({
        name: 'VirtualScene',
        query: {
          character: value.value
        }
      })
    }
    return {
      value, options, tableData, stat,
      store,
      toVirtualScene
    }
  },
}
</script>

<style scoped>
.text-title {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 12px;
}

.text-normal {
  font-size: 26px;
  padding: 8px;
  margin: 0;
  text-align: left;
}

.text-small {
  font-size: 20px;
  padding: 12px;
  margin: 0;
  text-align: left;
}

.font-big {
  font-size: 32px;
  padding: 8px;
}

.font-middle {
  font-size: 20px;
  padding: 8px;
}

.item {
  padding: 18px 0;
}

.box-card {
  margin: auto;
}
</style>