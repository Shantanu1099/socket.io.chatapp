const express = require("express");
const http = require("node:http");
const path = require("path");
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT =  9000;

const folderPath = path.resolve(__dirname, "public");

app.use(express.static(folderPath));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

app.get('/', (req, res) => {
    res.status(200).sendFile(`${folderPath}/hello.html`);
});

server.listen(PORT, () => {
    console.log(`Server listerning at port : ${PORT}`)
});
