<template>
  <div>
    <canvas class="webgl" id="container"></canvas>
    <!--搞个聊天窗口-->
    <div id="chat-panel">
      <div id="chat-content">
        <h3>Chat Room</h3>
        <p><span>YYC:</span>那个啥？</p>
      </div>
      <div id="chat-input">
        <el-input
            placeholder="Please input" type="text" v-model="inputMsg"
        >
          <template #prepend>
            <el-button @click="chatSend">Send</el-button>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
// import * as THREE from 'three'
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
// import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js"

export default {
  mounted() {
  },
  data() {
    return {
      inputMsg: "",
    }
  },
  setup() {
    // 设置区域
    Math.seed = 5
    // 种子随机
    Math.random = function (max, min) {
      max = max || 1
      min = min || 0
      Math.seed = (Math.seed * 9301 + 49297) % 233280
      let rnd = Math.seed / 233280.0
      return min + rnd * (max - min)
    }
  },
  methods: {
    chatSend() {
      console.log("Send:" + this.inputMsg);
      if (this.inputMsg === "") {
        return
      }
      // IO
      this.inputMsg = ""
    }
  },
}
</script>
<style scoped>
#container {
  width: 90%;
  height: 100%;
  position: fixed;
  right: 0;
  top: 60px;
}

#chat-panel {
  width: 100%;
  height: 20%;
  position: fixed;
  bottom: 0;
  border: 2px;
  background-color: beige;
}

#chat-content {
  width: 100%;
  height: 80%;
}

#chat-input {
  width: 100%;
  height: 20%;
}
</style>
