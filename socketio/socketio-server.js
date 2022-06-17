const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require("socket.io")(server, {cors: true})

server.listen(4040, () => {
    console.log('server listening on port: 4040')
})

const BROADCAST_EVENTS = [
    'chat-send',
    'game-sync',
    'game-interact'
]

let players = []
let idPlayerMap = new Map()

io.on("connection", (socket) => {
    console.log('A client connected ' + socket.id)
    for (const eventName of BROADCAST_EVENTS) {
        socket.on(eventName, (arg) => {
            io.sockets.emit(eventName, (arg))
        })
    }

    // 有人离开,告知所有客户端删除角色
    socket.on("disconnect", () => {
        console.log('A client disconnected ' + socket.id)
        let leaveName = idPlayerMap.get(socket.id)
        for (let i = 0; i < players.length; i++) {
            if (players[i] === leaveName) {
                players.splice(i, 1)
            }
        }
        idPlayerMap.delete(socket.id)
        io.sockets.emit('game-leave', (leaveName))
    })

    // 有人登录,把完整玩家名单广播给所有客户端，无论新人老人都能同步
    socket.on('game-login', (arg) => {
        players.push(arg.name)
        idPlayerMap.set(socket.id, arg.name)
        io.sockets.emit('game-players', (players))
    })
})