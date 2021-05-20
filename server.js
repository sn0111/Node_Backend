const express = require('express')
const cors = require('cors')
// const socket = require("socket.io")
const bcrypt = require('bcryptjs')
const path = require('path')
const bodyparser = require('body-parser')
const userRouter = require('./api/users')
const jwt = require('jsonwebtoken');

const { regRouter } = require('./api/registration')
const { custRouter } = require('./api/customers')
const payRouter= require('./api/payments')
const bidRouter= require('./api/bidding')
const { Bidding } = require('./models/customers')
const { User } = require('./models/user')

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
app.use(payRouter)
app.use(bidRouter)
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./build/index.html'))
})
server.listen(3000,()=>{
    console.log("Finance 3000 server is running...........")
})
// io = socket(server);

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.emit("socket id",socket.id)

  // socket.on("socket id", (data) => {
  //   // socket.join(data);
  //   // console.log("User Joined Room: " + data);
  // });
const get_id =async (token)=>{
  const decode = jwt.verify(token,'this is basic encryption')
  const user =await User.findOne({_id:decode._id,'tokens.token':token})
  return user.toJSON()
}
  socket.on("send message", (body)=>{
    // console.log(body)
    const user_id = get_id(body.token)
    console.log("user:"+user_id)
    const bidding =new Bidding({
      message:body.message,
      time:Date(),
      account:body.account_id,
    })
    io.emit("message",body)
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});


