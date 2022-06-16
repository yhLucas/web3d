import * as THREE from "three";

const WIDTH = 2

export class ChessBoard {
    constructor() {
        this.grids = []
        for (let i = 0; i < 8; i++) {
            this.grids.push([])
            for (let j = 0; j < 8; j++) {
                this.grids[i].push(new ChessGrid(i, j))
            }
        }
    }

    animate() {
        for (const list of this.grids) {
            for (const grid of list) {
                grid.animate()
            }
        }
    }
}

export class ChessGrid {
    constructor(i, j) {
        this.stats = ""


        this.geometry = new THREE.BoxGeometry(WIDTH, 0.01, WIDTH);
        this.geometry.translate(i * WIDTH, 0, j * WIDTH)
        this.originalColor = 0x000000
        if ((i + j) % 2 === 1) {
            this.originalColor = 0xffffff
        }
        this.material = new THREE.MeshBasicMaterial({color: this.originalColor});
        this.material.needsUpdate = true
        this.mesh = new THREE.Mesh(this.geometry, this.material)
    }

    getMesh() {
        return this.mesh
    }

    setColor(color) {
        this.material.color.copy(color)
    }

    // 根据状态改变颜色
    animate() {

    }
}