const express = require('express')
const cors = require('cors')
// const socket = require("socket.io")
const bcrypt = require('bcryptjs')
const path = require('path')
const bodyparser = require('body-parser')
const userRouter = require('./api/users')
const User = require('./models/user')
const { regRouter } = require('./api/registration')
const { custRouter } = require('./api/customers')

require('./db/database')
const app = express()
const server = require("http").createServer(app);
const io=require("socket.io")(server,{cors:{origin:"*"}},);
app.use(cors())
app.use(express.json())
const port = process.env.port | 3000
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname,'./build')));
app.use(userRouter)
app.use(custRouter)
app.use(regRouter)
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./build/index.html'))
})
server.listen(3000,()=>{
    console.log("Finance 3000 server is running...........")
})
// io = socket(server);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User Joined Room: " + data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});


