<template>
  <div>
    <canvas class="webgl" id="container"></canvas>
    <!--搞个聊天窗口-->
    <div id="chat-panel">
      <div id="chat-content">
        <h3>Chat Room</h3>
        <p v-for="msg in chatMsgList" :key="msg.index">
          <span>{{ msg.username }}:</span>
          {{ msg.msg }}
        </p>
      </div>
      <div id="chat-input">
        <el-input
            placeholder="Please input" type="text"
            v-model="inputMsg"
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
import {store} from "@/store";
// import * as THREE from 'three'
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
// import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js"

import {ref} from "vue";

export default {
  setup() {
    const {io} = require("socket.io-client")
    let socket = io("localhost:4040")
    let inputMsg = ref("")
    let chatMsgList = ref([])

    // 设置区域
    Math.seed = 5
    // 种子随机
    Math.random = (max, min) => {
      max = max || 1
      min = min || 0
      Math.seed = (Math.seed * 9301 + 49297) % 233280
      let rnd = Math.seed / 233280.0
      return min + rnd * (max - min)
    }
    // 监听所有人发送的消息，包括自己的
    socket.on("chat-send", (args) => {
      console.log("Receive chat:" + args.msg)
      chatMsgList.value.push(args)
    })

    return {socket, inputMsg, chatMsgList}
  },
  methods: {
    chatSend() {
      console.log("Send:" + this.inputMsg);
      if (this.inputMsg === "") {
        return
      }
      this.socket.emit("chat-send", {
        username: store.getters.getUsername,
        msg: this.inputMsg
      }, (response) => {
        console.log(response)
      })
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
  padding: 8px;
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
