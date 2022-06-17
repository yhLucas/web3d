import * as THREE from "three";
import {Color} from "three";

const NUMBER = 8
const WIDTH = 2

export const OTHER = "Other"
export const ON = "on"
export const ON_OTHER = "onOther"
export const QUEEN = "queen"
export const QUEEN_OTHER = "queenOther"

const stat = {}
stat[ON] = new Color("#8cff69")
stat[ON_OTHER] = new Color("#bbffa6")
stat[QUEEN] = new Color("#9742ff")
stat[QUEEN_OTHER] = new Color("#ba82ff")

export class ChessBoard {
    constructor() {
        this.grids = []
        this.queenIndexes = new Set()
        this.queenOtherIndexes = new Set()
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
                if (i === x || j === y || // 斜角
                    Math.abs(x - i) === Math.abs(y - j)) {
                    res.push([i, j])
                }
            }
        }
        return res
    }

    // 根据玩家位置激发棋盘状态
    localPlayerInteract(player, method = ON) {
        let methodOther = method + OTHER
        let i = Math.floor(player.position.x / WIDTH)
        let j = Math.floor(player.position.z / WIDTH)
        // 目标有效
        if (this.grids[i] && this.grids[i][j]) {
            let index = i * 8 + j
            // queenOther上不让修改，但要排除queen，因为可以取消
            if (!(this.queenIndexes.has(index)) && this.queenOtherIndexes.has(index)) {
                return
            }
            // 玩家要修改棋盘！
            if (method === QUEEN) {
                // 取消逻辑
                if (this.queenIndexes.has(index)) {
                    this.queenIndexes.delete(index)
                } else {
                    // 设置皇后
                    this.queenIndexes.add(index)
                }
            } else {
                let others = ChessBoard.getOthers(i, j)
                for (const other of others) {
                    this.grids[other[0]][other[1]].setColorByMethod(methodOther)
                }
                // 自身
                this.grids[i][j].setColorByMethod(method)
            }
        }
    }

    updateQueenStatus() {
        // 当前皇后集可靠，计算QueenOthers并赋值
        this.queenOtherIndexes = new Set()
        for (const index of this.queenIndexes) {
            let i = Math.floor(index / 8)
            let j = index % 8
            let others = ChessBoard.getOthers(i, j)
            for (const other of others) {
                this.queenOtherIndexes.add(other[0] * 8 + other[1])
            }
        }
        // 先涂queen other
        for (const index of this.queenOtherIndexes) {
            this.grids[Math.floor(index / 8)][index % 8].setColorByMethod(QUEEN_OTHER)
        }
        // 覆盖queen
        for (const index of this.queenIndexes) {
            this.grids[Math.floor(index / 8)][index % 8].setColorByMethod(QUEEN)
        }
    }

    clear() {
        for (const list of this.grids) {
            for (const grid of list) {
                grid.clear()
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

        this.colorBuffer = new Color()
    }

    getMesh() {
        return this.mesh
    }

    // 刷新状态
    clear() {
        this.setColor(this.originalColor)
    }

    setColor(color) {
        this.colorBuffer.copy(color)
    }

    // 根据交互改编颜色
    setColorByMethod(method) {
        this.setColor(stat[method])
    }

    flush() {
        this.material.color.copy(this.colorBuffer)
    }
}