const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


server.listen(3000, () => {
  console.log('listening on port 3000');
});

io.on('connection', (socket) => {
    io.emit('chat message', "new user joined");
    io.emit('new user');

    socket.on('disconnect', () => {
      io.emit('chat message', "user disconnected");
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on("change",(msg)=>{
        io.emit("change",msg)
    })
  });