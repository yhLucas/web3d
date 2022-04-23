<template>
  <div class="common-layout el-card">
    <el-container>
      <el-header height="60px" class="">
        <p class="text-title">UserCenter</p>
      </el-header>
      <br/>
      <el-main>
        <div class="box-card el-card">
          <el-collapse :model-value="['1','2','3','4']">
            <el-collapse-item title="Information" name="1" class="text-title">
              <div class="text-normal">
                Email:{{ store.getters.getUsername }}
              </div>
            </el-collapse-item>
            <el-collapse-item title="VirtualFigure" name="2" class="text-title">
              <div class="text-normal">
                此处编辑虚拟形象
              </div>
            </el-collapse-item>
            <el-collapse-item title="VirtualScenes" name="3" class="text-title">
              <div class="text-normal">
                此处选择虚拟场景入口
              </div>
            </el-collapse-item>
            <el-collapse-item title="History" name="4" class="text-title">
              <div>
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="scene" label="Date" width="180"/>
                  <el-table-column prop="time" label="Name" width="180"/>
                </el-table>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {store} from "@/store";

export default {
  name: "UserCenter",
  data() {
    return {
      store,
      tableData: [
        {
          scene: '汉诺塔',
          time: '2016-05-03',
        },
        {
          scene: '五子棋',
          time: "2010-12-12"
        },
      ]
    }
  },
}
</script>

<style scoped>
.item {
  padding: 18px 0;
}

.box-card {
  margin: auto;
}
</style>