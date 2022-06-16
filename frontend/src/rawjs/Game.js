import * as THREE from 'three'

export class Game {
    constructor() {
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

    init() {
        // TODO 随机出生，需要不同的位置
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0xa0a0a0)
        this.scene.fog = new THREE.Fog(0xa0a0a0, 1000, 5000)

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(0, 0, 0)

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

        // 物体区域
        let mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(10000, 10000), new THREE.MeshPhongMaterial({
            color: 0x999999,
            depthWrite: false
        }))
        mesh.rotation.x = -Math.PI / 2
        mesh.receiveShadow = true
        this.scene.add(mesh)

        const canvas = document.querySelector('#container')
        this.renderer = new THREE.WebGLRenderer({
            canvas, antialias: true
        })
        // this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setPixelRatio(window.devicePixelRatio)
        // this.renderer.setSize(window.innerWidth, window.innerHeight)


        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);

        this.camera.position.z = 5;
    }

    start() {
        const game = this

        function animate() {
            game.renderer.render(game.scene, game.camera)
            requestAnimationFrame(animate)
        }

        animate()
    }
}