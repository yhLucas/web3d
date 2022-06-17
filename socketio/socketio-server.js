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

io.on("connection", (socket) => {
    // 客户端发送chat
    socket.on("chat-send", (arg, callback) => {
        console.log(arg)
        callback("got it")
        // 广播给所有客户端
        io.sockets.emit("chat-send", (arg))
    })

    socket.on("test", (arg) => {
        console.log(arg)
    })
})