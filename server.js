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
const request = require('request')

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
const get_id =async (token)=>{
  const decode = jwt.verify(token,'this is basic encryption')
  const user =await User.findOne({_id:decode._id,'tokens.token':token})
  var id="";
  // console.log("ddddd:"+user._id)
  var _id=user._id
  console.log(_id)
  return _id;
}
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("socket id",async (token)=>{
    const decode = jwt.verify(token,'this is basic encryption')
    const user =await User.findOne({_id:decode._id,'tokens.token':token})
    console.log(user._id)
    socket.emit("socket id",user._id)
  })

  // socket.on("socket id", (data) => {
  //   // socket.join(data);
  //   // console.log("User Joined Room: " + data);
  // });
  socket.on("send message",(body)=>{
    // console.log(body)
    // var user_id =get_id(body.token)
    setTimeout(()=>{
      // console.log("user:"+user_id)
      // const bidding =new Bidding()
      var bodydata={
        message:body.message,
        time:Date()
      }
      console.log(body.account)
      var headers={
        "accept": "application/json",
        "content-type": "application/json",
        'Authorization':"Bearer "+body.token,
        "account":body.account_id
      }
      request.post({
        url:'http://localhost:3000/bidding',
        json:true,
        body:bodydata,
        headers:headers
      },(error,res,body)=>{
        // console.log(res.body)
      });
      io.emit("message",body)
    },0)
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});


