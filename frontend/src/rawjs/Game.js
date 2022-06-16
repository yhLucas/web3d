import * as THREE from 'three'
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {LocalPlayer} from "@/rawjs/Player.js"
import {ChessBoard} from "@/rawjs/ChessBoard";
// import {Color} from "three";

// import {Vector3} from "three";

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
            // game.controls.update()
            game.renderer.render(game.scene, game.camera)
            game.localPlayer.animate()
            game.chessBoard.animate()
            requestAnimationFrame(animate)
        }

        animate()
    }

    init() {
        this.initScene()
        this.initLight()
        this.initGround()
        this.initRenderer()
        this.initPlayer()

        this.chessBoard = new ChessBoard()
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.scene.add(this.chessBoard.grids[i][j].getMesh())
            }
        }
    }

    initScene() {
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0xa0a0a0)
        this.scene.fog = new THREE.Fog(0xa0a0a0, 1000, 5000)
    }

    initPlayer() {
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.localPlayer = new LocalPlayer(this.camera)
        this.localPlayer.init()
        this.scene.add(this.localPlayer.mesh)
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
    }

    initGround() {
        // 物体区域
        let mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(10000, 10000), new THREE.MeshPhongMaterial({
            color: 0x448899,
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