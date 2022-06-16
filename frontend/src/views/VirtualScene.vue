<template>
  <div>
    <canvas class="webgl" id="container" ref="container"></canvas>
    <!--搞个聊天窗口-->
    <div id="chat-panel">
      <div id="chat-content">
        <h1>Chat Room</h1>
        <el-scrollbar>
          <p v-for="msg in chatMsgList" :key="msg.index">
            <span>{{ msg.username }}:</span>
            {{ msg.msg }}
          </p>
        </el-scrollbar>
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
import {store} from "@/store"
import {Game} from "@/rawjs/Game.js"
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

    // 监听所有人发送的消息，包括自己的
    socket.on("chat-send", (args) => {
      console.log("Receive chat:" + args.msg)
      chatMsgList.value.push(args)
    })

    return {
      socket, inputMsg, chatMsgList
    }
  },
  mounted() {
    let game = new Game()
    game.init()
    game.start()
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
  width: 95%;
  height: 100%;
  padding: 0;
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
