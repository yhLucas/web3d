import * as THREE from 'three'

export class Game {

    constructor(socket = null) {
        this.socket = socket
        this.clock = new THREE.Clock()

        // 设置假随机
        let SEED = 5
        this.random = (max, min) => {
            max = max || 1
            min = min || 0
            SEED = (SEED * 9301 + 49297) % 233280
            let rnd = SEED / 233280.0
            return min + rnd * (max - min)
        }
    }

    start() {
        const game = this

        function animate() {
            game.renderer.render(game.scene, game.camera)
            requestAnimationFrame(animate)
        }

        animate()
    }

    init() {
        this.initScene()
        this.initCamera()
        this.initLight()
        this.initGround()
        this.initRenderer()
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        this.camera.position.z = 5;
    }

    initScene() {
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0xa0a0a0)
        this.scene.fog = new THREE.Fog(0xa0a0a0, 1000, 5000)
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(0, 0, 0)
    }

    initLight() {
        let light = new THREE.HemisphereLight(0xffffff, 0x444444)
        light.position.set(0, 200, 0)
        this.scene.add(light)
        const shadowSize = 200
        light = new THREE.DirectionalLight(0xffffff)
        light.position.set(0, 200, 100)
        light.castShadow = true
        light.shadow.camera.top = shadowSize
        light.shadow.camera.bottom = -shadowSize
        light.shadow.camera.left = -shadowSize
        light.shadow.camera.right = shadowSize
        this.scene.add(light)
        this.sun = light
    }

    initGround() {
        // 物体区域
        let mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(10000, 10000), new THREE.MeshPhongMaterial({
            color: 0x999999,
            depthWrite: false
        }))
        mesh.rotation.x = -Math.PI / 2
        mesh.receiveShadow = true
        this.scene.add(mesh)
    }

    initRenderer() {
        const canvas = document.querySelector('#canvas')
        this.renderer = new THREE.WebGLRenderer({
            canvas, antialias: true
        })
        this.renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
        this.renderer.setPixelRatio(window.devicePixelRatio)
    }
}