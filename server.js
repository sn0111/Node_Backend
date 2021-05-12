const express = require('express')
const bcrypt = require('bcryptjs')
const path = require('path')
const bodyparser = require('body-parser')
const userRouter = require('./api/users')
const User = require('./models/user')
const { regRouter } = require('./api/registration')

require('./db/database')
const app = express()
const port = process.env.port | 3000

app.use(bodyparser.json())
app.use(express.static(path.join(__dirname,'./build')));
app.use(userRouter)
app.use(regRouter)
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./build/index.html'))
})
app.listen(port,()=>{
    console.log("Finance server is running...........")
})


