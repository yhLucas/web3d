<template>
  <div style="width: 100%;height: 100%">
    <iframe src="/ThreeJs/index.html" id="game-frame"
            :name="character"></iframe>
  </div>
</template>
<script>

import router from "@/router";

export default {
  name: "VirtualScene",
  setup() {
    let character = "Random"
    if (router.currentRoute.value.query.character) {
      character = router.currentRoute.value.query.character
    }
    return {
      router, character
    }
  }
}
</script>
<style scoped>
#game-frame {
  overflow-scrolling: unset;
  width: 98%;
  height: 98%;
  padding: 0;
  margin: 0;
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