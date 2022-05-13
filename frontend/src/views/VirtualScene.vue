<template>
  <div>
    <canvas class="webgl" id="container"></canvas>
  </div>
</template>
<script>
import * as THREE from 'three'
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
// import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js"

export default {
  mounted() {
    this.initThree()
  },
  setup() {
    // 设置区域
    Math.seed = 5
    // 种子随机
    Math.random = function (max, min) {
      max = max || 1;
      min = min || 0;
      Math.seed = (Math.seed * 9301 + 49297) % 233280;
      let rnd = Math.seed / 233280.0;
      return min + rnd * (max - min);
    }
  },
  methods: {
    initThree() {
      // ThreeJs通用
      let camera, scene, renderer, canvas
      // 自定义
      let floor, objects = []
      // 控制器变量
      let moveW = false, moveS = false, moveA = false, moveD = false
      let onKeyDown = function (e) {
        switch (e.keyCode) {
          case 87://w
            moveW = true
            break
          case 65:
            moveA = true
            break
          case 68:
            moveD = true
            break
          case 83:
            moveS = true
            break
        }
      }
      let onKeyUp = function (e) {
        switch (e.keyCode) {
          case 87://w
            moveW = false
            break
          case 65:
            moveA = false
            break
          case 68:
            moveD = false
            break
          case 83:
            moveS = false
            break
        }
      }
      document.addEventListener('keydown', onKeyDown, false)
      document.addEventListener('keyup', onKeyUp, false)

      canvas = document.querySelector('#container')

      //Scene
      scene = new THREE.Scene()
      scene.background = new THREE.Color('#ffffff')
      scene.fog = new THREE.Fog(0xffffff, 0, 750)

      // 对每个物体，都分成geometry+material->mesh得到最终的物体
      // geometry
      const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)
      // material
      const material = new THREE.MeshStandardMaterial()
      material.metalness = 0.7
      material.roughness = 0.2
      material.color = new THREE.Color(0x292929)
      // mesh
      const sphere = new THREE.Mesh(geometry, material)
      objects.push(sphere)
      scene.add(sphere)

      // floor object
      const floorGeometry = new THREE.PlaneGeometry(2000, 2000, 1, 1)
      floorGeometry.rotateX(-Math.PI / 2);
      const floorMaterial = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors})
      floor = new THREE.Mesh(floorGeometry, floorMaterial)
      scene.add(floor)

      // Lights
      let normalLight = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75)
      scene.add(normalLight)

      // Size
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      // Renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
      })
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      // Camera
      camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
      camera.position.z = 2
      scene.add(camera)

      // Animate
      // const clock = new THREE.Clock()
      let preTime = performance.now()

      function animate() {
        console.log("W:" + moveW + " S:" + moveS + " A:" + moveA + " D:" + moveD)
        // let deltaTime = clock.elapsedTime
        let time = performance.now()
        let deltaTime = (time - preTime) / 1000
        // 处理用户输入
        let direction = new THREE.Vector3()
        let velocity = new THREE.Vector3()
        direction.z = Number(moveW) - Number(moveS)
        direction.x = Number(moveA) - Number(moveD)
        // 计算加速度改变速度
        direction.normalize()
        if (moveW || moveS) velocity.z -= direction.z * 400.0 * deltaTime
        if (moveA || moveD) velocity.x -= direction.x * 400.0 * deltaTime
        // 根据速度改变位置
        console.log(deltaTime)
        console.log(velocity.x, velocity.y, velocity.z)
        let pos = camera.position
        pos.x += velocity.x * deltaTime
        pos.y += velocity.y * deltaTime
        pos.z += velocity.z * deltaTime
        if (pos.y < 0) {
          pos.y = 0
        }
        camera.position.set(pos.x, pos.y, pos.z)

        renderer.render(scene, camera)
        requestAnimationFrame(animate)
        preTime = time
      }

      animate()
    }
  },
}
</script>
<style scoped>
#container {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 60px;
}
</style>
