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
                <img
                    src="https://www.researchgate.net/profile/Curtis-Bright/publication/333815714/figure/fig1/AS:770619155156992@1560741332335/A-visual-representation-of-a-solution-for-the-8-queens-problem-left-and-the-variables.png">
                <div style="padding: 14px">
                  <p class="text-normal">Eight Queens Puzzle</p>
                  <p class="text-small">Played by:{{ playedNumber }} user</p>
                  <p class="text-small">Pass rate:{{ passRate }}%
                    <el-button type="primary" plain @click="toVirtualScene"
                               style="margin-left: 20px;font-size: 20px">Try it now!
                    </el-button>
                  </p>
                </div>
              </el-card>
            </el-collapse-item>
            <el-collapse-item name="4" class="text-title">
              <template #title>
                <h1 class="font-big">History</h1>
              </template>
              <el-table :data="tableData" style="width: 100%; text-align: left" class="font-middle">
                <el-table-column prop="scene" label="Scene" width="360"/>
                <el-table-column prop="time" label="Date" width="360"/>
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
import axios from "axios";
// import {ElMessage} from "element-plus";

export default {
  name: "UserCenter",
  setup() {
    Date.prototype.yyyymmdd = function () {
      let mm = this.getMonth() + 1; // getMonth() is zero-based
      let dd = this.getDate();

      return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
      ].join('/');
    };
    const stat = ref('new')
    const value = ref('Random')
    const options = ['Random', 'BeachBabe', 'BusinessMan', 'Doctor', 'FireFighter', 'Housewife', 'Policeman', 'Prostitute', 'Punk', 'RiotCop', 'Roadworker', 'Robber', 'Sheriff', 'Streetman', 'Waitress']
    const tableData = ref([
      {
        scene: '汉诺塔',
        time: '2016-05-03',
      },
    ])
    let playedNumber = ref(0)
    let passRate = ref(0)
    const toVirtualScene = () => {
      let data = new FormData()
      data.append('token', store.getters.getToken)
      data.append('scene', "Eight Queens Puzzle")
      // 生成历史记录
      axios.post('/api/scene/history', data)
      axios.post('/api/record', data)
      // 发送进入场景的请求
      router.push({
        name: 'VirtualScene',
        query: {
          character: value.value
        }
      })
    }
    return {
      value, options, tableData, stat, playedNumber, passRate,
      store,
      toVirtualScene
    }
  },
  mounted() {
    // 查找历史
    let data = new FormData()
    data.append('token', store.getters.getToken)
    axios.get('/api/scene/history', {
      params: {
        token: store.getters.getToken
      }
    }).then((res) => {
      let data = res.data
      if (data.code === 200) {
        for (let i = 0; i < data.data.length; i++) {
          let date = new Date(data.data[i].time)
          data.data[i].time = date.yyyymmdd()
        }
        this.tableData = data.data
      }
    })
    axios.get('/api/stat/all', {
      params: {
        scene: "Eight Queens Puzzle"
      }
    }).then((res) => {
      let data = res.data
      if (data.code === 200) {
        let str = data.data.data
        this.playedNumber = parseInt(str.substring(1))
        let passNumber = parseInt(str.substring(str.indexOf("人") + 10))
        this.passRate = passNumber / this.playedNumber
        this.passRate = (passNumber / this.playedNumber).toFixed(2)
        console.log(this.playedNumber)
        console.log(this.passRate)
      }
    })
  }
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