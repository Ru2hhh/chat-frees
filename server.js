

const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname+"/src")));

io.on("connection", function(socket){
    socket.on("send_chat", (data) => {
        socket.broadcast.emit("chat_on", data)
    })
    // socket.on("user_join", (data) => {
    //     io.emit("join", `${data} joined the conversation`)
    // })
});

server.listen(8000);