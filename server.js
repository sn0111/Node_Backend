const express = require('express')
const bcrypt = require('bcryptjs')
const userRouter = require('./api/users')
const User = require('./models/user')
const { regRouter } = require('./api/registration')

require('./db/database')
const app = express()
const port = process.env.port | 3000

app.use(express.json())
app.use(userRouter)
app.use(regRouter)
app.listen(port,()=>{
    console.log("Finance server is running...........")
})


