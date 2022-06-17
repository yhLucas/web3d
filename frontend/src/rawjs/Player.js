// import * as THREE from 'three'
import {BoxGeometry, Clock, Mesh, Vector3} from "three"
import * as THREE from "three";

const ROTATION_SENSITIVITY = 100
const SPEED = 25
const CAMERA_OFFSET = 30

// 用于同步，渲染其他玩家的形象
export class Player {
    constructor() {
        this.position = new Vector3()
        this.direction = new Vector3()
    }
}

// 本体是camera，可以提取出供同步用的信息
export class LocalPlayer extends Player {
    constructor(camera) {
        super()
        camera.rotation.order = 'YXZ'
        this.camera = camera
        this.velocity = new Vector3()
        // 记录运动状态，前后左右
        this.keyStates = {}
        this.clock = new Clock()
        this.position = new Vector3(1, 1, 1)
        this.collider = new BoxGeometry(1, 1, 1)
        this.mesh = new Mesh(this.collider, new THREE.MeshPhongMaterial({
            color: 0x444444,
        }))
        this.collider.translate(0, 1, 0)
    }

    init() {
        const canvas = document.querySelector('#canvas')

        document.addEventListener('keydown', (event) => {
            this.keyStates[event.key] = true;
            switch (event.key) {
                case "q":
                    canvas.requestPointerLock()
                    break
            }
        });

        document.addEventListener('keyup', (event) => {
            this.keyStates[event.key] = false;
        });

        document.addEventListener('mousemove', (e) => {
            let rx = this.camera.rotation.x - e.movementY * ROTATION_SENSITIVITY / 100000
            this.camera.rotation.y -= e.movementX * ROTATION_SENSITIVITY / 100000
            rx = Math.min(rx, -0.1)
            rx = Math.max(rx, -Math.PI / 2)
            this.camera.rotation.x = rx
        })
    }

    move(deltaTime) {
        const delta = deltaTime * SPEED
        let deltaVector = new Vector3()
        if (this.keyStates['w']) {
            deltaVector = this.getForwardVector().multiplyScalar(delta)
        }
        if (this.keyStates['s']) {
            deltaVector = this.getForwardVector().multiplyScalar(-delta)
        }
        if (this.keyStates['a']) {
            deltaVector = this.getSideVector().multiplyScalar(-1.5 * delta)
        }
        if (this.keyStates['d']) {
            deltaVector = this.getSideVector().multiplyScalar(1.5 * delta)
        }
        this.collider.translate(deltaVector.x, deltaVector.y, deltaVector.z)
        this.position.add(deltaVector)
        let vector = new Vector3().copy(this.position)
        vector.add(this.getCameraVector().multiplyScalar(-CAMERA_OFFSET))
        this.camera.position.copy(vector)
    }

    getCameraVector() {
        let vector = new Vector3()
        this.camera.getWorldDirection(vector)
        vector.normalize()
        return vector
    }

    getForwardVector() {
        let vector = new Vector3()
        this.camera.getWorldDirection(vector)
        vector.y = 0
        vector.normalize()
        return vector
    }

    getSideVector() {
        let vector = new Vector3()
        this.camera.getWorldDirection(vector)
        vector.y = 0
        vector.normalize()
        vector.cross(this.camera.up)
        return vector
    }

    animate() {
        this.move(this.clock.getDelta())
    }
}

