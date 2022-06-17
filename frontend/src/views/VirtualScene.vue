<template>
  <div>
    <canvas class="webgl" id="canvas" ref="canvas"></canvas>
    <!--搞个聊天窗口-->
    <div id="chat-panel">
      <div id="chat-content">
        <el-scrollbar ref="chatScroll" style="margin: 0;padding: 0">
          <p v-for="msg in chatMsgList" :key="msg.index" style="margin: 0;font-size: 24px">
            <span>{{ msg.username }}:</span>
            {{ msg.msg }}
          </p>
        </el-scrollbar>
      </div>
      <div id="chat-input">
        <input
            placeholder="Please input" type="text"
            v-model="inputMsg"
            id="input-box"
            style="font-size: 24px; height: 100%;width: 100%"
        >
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

import {ref, reactive} from "vue";

export default {
  setup() {
    const {io} = require("socket.io-client")
    let socket = io("localhost:4040")
    let inputMsg = ref("")
    let chatMsgList = reactive([])
    let isChatOpen = ref(false)
    let chatScroll = reactive(null)

    return {
      socket, inputMsg, chatMsgList,
      isChatOpen,
      chatScroll
    }
  },
  mounted() {
    const inputBox = document.querySelector('#input-box')
    const chatPanel = document.querySelector("#chat-panel")
    // 监听按键
    document.onkeydown = (e) => {
      let keyNum = e.keyCode        //获取被按下的键值
      if (keyNum === 13) {
        if (this.inputMsg === "") {
          this.isChatOpen = !this.isChatOpen
          if (this.isChatOpen) {
            chatPanel.style.display = "block"
            inputBox.focus()
          } else {
            chatPanel.style.display = "none"
          }
        } else {
          this.chatSend()
        }
      }
    }

    // 监听socket
    this.socket.on("chat-send", (args) => {
      this.chatMsgList.push(args)
      this.chatScroll.setScrollTop(Number.MAX_SAFE_INTEGER)
    })

    let game = new Game(store.getters.getUsername, this.socket)
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
      })
      // IO
      this.inputMsg = ""
    }
  },
}
</script>
<style scoped>
#canvas {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  position: fixed;
  bottom: 0;
}

#chat-panel {
  width: 100%;
  height: 20%;
  padding: 0;
  margin: 0;
  position: fixed;
  bottom: 0;
  background-color: beige;
  display: none;
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
