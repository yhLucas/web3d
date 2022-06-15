const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app, {cors: true});

server.listen(4040, () => {
    console.log('socket io listening on port: 4040')
})