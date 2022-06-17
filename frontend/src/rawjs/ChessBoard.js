import * as THREE from "three";
import {Color} from "three";

const NUMBER = 8
const WIDTH = 2

export class ChessBoard {
    constructor() {
        this.grids = []
        for (let i = 0; i < NUMBER; i++) {
            this.grids.push([])
            for (let j = 0; j < NUMBER; j++) {
                this.grids[i].push(new ChessGrid(i, j))
            }
        }
    }

    // 输入坐标，返回被皇后影响范围内的所有坐标
    static getOthers(x, y) {
        let res = []
        for (let i = 0; i < NUMBER; i++) {
            for (let j = 0; j < NUMBER; j++) {
                // 同行或列
                if (i === x ||
                    j === y ||
                    // 斜角
                    Math.abs(x - i) === Math.abs(y - j)) {
                    res.push([i, j])
                }
            }
        }
        return res
    }

    // 根据玩家位置激发棋盘状态
    localPlayerInteract(player, method = "on") {
        let methodOther = method + "Other"
        let i = Math.floor(player.position.x / WIDTH)
        let j = Math.floor(player.position.z / WIDTH)
        // 目标有效
        if (this.grids[i] && this.grids[i][j]) {
            let others = ChessBoard.getOthers(i, j)
            console.log(others)
            for (const other of others) {
                this.grids[other[0]][other[1]].interact(methodOther)
            }
            // 自身
            this.grids[i][j].interact(method)
        }
    }

    fresh() {
        for (const list of this.grids) {
            for (const grid of list) {
                grid.fresh()
            }
        }
    }

    flush() {
        for (const list of this.grids) {
            for (const grid of list) {
                grid.flush()
            }
        }
    }
}

export class ChessGrid {
    static stat = {
        on: new Color("#8cff69"),
        onOther: new Color("#bbffa6"),
        queen: new Color("#9742ff"),
        queenOther: new Color("#ba82ff")
    }


    constructor(i, j) {
        this.geometry = new THREE.BoxGeometry(WIDTH, 0.01, WIDTH);
        this.geometry.translate(i * WIDTH, 0, j * WIDTH)
        this.originalColor = new Color("#000000")
        if ((i + j) % 2 === 1) {
            this.originalColor = new Color("#ffffff")
        }
        this.material = new THREE.MeshBasicMaterial({color: this.originalColor});
        this.material.needsUpdate = true
        this.mesh = new THREE.Mesh(this.geometry, this.material)

        this.isQueen = false
        this.isQueenOther = false

        this.colorBuffer = new Color()
    }

    getMesh() {
        return this.mesh
    }

    setColor(color) {
        this.colorBuffer.copy(color)
    }

    fresh() {
        if (this.isQueenOther) {
            this.setColor(ChessGrid.stat.queenOther)
        } else if (this.isQueen) {
            this.setColor(ChessGrid.stat.queen)
        } else {
            this.setColor(this.originalColor)
        }
    }

    interact(method) {
        if (method in ChessGrid.stat) {
            this.setColor(ChessGrid.stat[method])
        }
    }

    flush() {
        this.material.color.copy(this.colorBuffer)
    }
}