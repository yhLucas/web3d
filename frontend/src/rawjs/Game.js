import * as THREE from 'three'
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {LocalPlayer, Player} from "@/rawjs/Player.js"
import {ChessBoard, QUEEN} from "@/rawjs/ChessBoard";
// import {Color} from "three";

// import {Vector3} from "three";

export class Game {
    constructor(name, socket = null) {
        this.socket = socket
        this.clock = new THREE.Clock()
        console.log(name)
        this.name = Math.random()
        this.players = {}
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
            // 玩家位置与镜头更新
            game.localPlayer.animate()
            // 清除cover
            game.chessBoard.clear()
            // 赋予cover，处理皇后交互
            game.chessBoard.localPlayerInteract(game.localPlayer, "on")
            // 将棋盘缓冲的颜色写入
            game.chessBoard.updateQueenStatus()
            game.chessBoard.flush()

            // 同步玩家位置
            game.playerSyncSend()

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
        this.socketLogin()

        this.chessBoard = new ChessBoard()
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.scene.add(this.chessBoard.grids[i][j].getMesh())
            }
        }

        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case "j":
                    this.chessBoard.localPlayerInteract(this.localPlayer, QUEEN)
                    break
            }
        });

        // socket监听处理
        // 有人加入，服务器广播所有玩家
        this.socket.on('game-players', (args) => {
            console.log(args)
            for (const playerName of args) {
                console.log(playerName)
                // 跳过已经有的和自己
                if (this.players[playerName] || playerName === this.name) continue
                // 生成新加入的玩家
                let player = new Player()
                this.players[args.name] = player
                this.scene.add(player.mesh)
            }
        })

        this.socket.on('game-sync', (args) => {
            if (args.name === this.name) return
            // 更新其他玩家位置
            if (this.players[args.name]) {
                this.players[args.name].moveTo(args.playerPosition)
            }
        })
    }

    // 告知服务器有人加入
    socketLogin() {
        this.socket.emit('game-login', {
            name: this.name
        })
    }

    playerSyncSend() {
        this.socket.emit('game-sync', {
            name: this.name,
            playerPosition: this.localPlayer.position
        })
    }

    initScene() {
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0xa0a0a0)
        this.scene.fog = new THREE.Fog(0xa0a0a0, 1000, 5000)
    }

    initPlayer() {
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
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