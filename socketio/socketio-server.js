const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require("socket.io")(server, {cors: true})

server.listen(4040, () => {
    console.log('server listening on port: 4040')
})

io.on("connect", () => {
    console.log('A client connected')
})

// io.on("disconnected",()=>{
//     console.log('A client disconnected')
// })

const BROADCAST_EVENTS = [
    'chat-send',
    'game-sync',
]

let players = []

io.on("connection", (socket) => {
    for (const eventName of BROADCAST_EVENTS) {
        socket.on(eventName, (arg) => {
            // console.log(arg)
            io.sockets.emit(eventName, (arg))
        })
    }
    // 有人登陆，记下来
    socket.on('game-login', (arg) => {
        players.push(arg.name)
        console.log(players)
        io.sockets.emit('game-players', (players))
    })
})