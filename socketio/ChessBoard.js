import * as THREE from 'three'

class ChessBoard {
    constructor() {
        this.board = []
        for (let i = 0; i < 8; i++) {
            this.board.push([])
            for (let j = 0; j < 8; j++) {
                this.board[i].push(new ChessGrid(i, j))
            }
        }
    }

}

class ChessGrid {
    constructor(row, col) {
        this.row = row
        this.col = col
    }
}
