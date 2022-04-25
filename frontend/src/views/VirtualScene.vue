<template>
  <div>
    <canvas class="webgl" id="container"></canvas>
  </div>
</template>
<script>
import * as THREE from 'three'

export default {
  mounted() {
    this.initThree()
  },

  methods: {
    initThree() {
      const canvas = document.querySelector('#container')
      //Scene
      const scene = new THREE.Scene()
      scene.background = new THREE.Color('#7698ff')
      // Objects
      const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)
      //Materials
      const material = new THREE.MeshStandardMaterial()
      material.metalness = 0.7
      material.roughness = 0.2
      material.color = new THREE.Color(0x292929)
      // Mesh
      const sphere = new THREE.Mesh(geometry, material)
      scene.add(sphere)
      // Lights
      const pointLight = new THREE.PointLight(0xffffff, 0.1)
      pointLight.position.x = 2
      pointLight.position.y = 3
      pointLight.position.z = 4
      const pointLight2 = new THREE.PointLight(0xff0000, 1)
      pointLight2.position.set(1, 1, 1)
      scene.add(pointLight)
      scene.add(pointLight2)
      // Size
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      // Renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
      })
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      // Camera
      const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
      camera.position.x = 0
      camera.position.y = 0
      camera.position.z = 2
      scene.add(camera)

      // Animate
      const clock = new THREE.Clock()

      function animate() {
        const elapsedTime = clock.getElapsedTime()
        sphere.rotation.y = .5 * elapsedTime
        renderer.render(scene, camera)
        window.requestAnimationFrame(animate)
      }

      animate()
    }
  }
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
