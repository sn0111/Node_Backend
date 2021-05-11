const { Router } = require("express");
const { PhoneOtp } = require("../models/reg");
const jwt = require('jsonwebtoken')
const { User} = require("../models/user");
const auth = require("./auth");
const bcrypt = require('bcryptjs')
const router = Router()


router.get("/users",auth,async (req,res)=>{
    res.status(201).send({user:req.user})
})

router.post("/register",async (req,res)=>{
    const phoneverify = await PhoneOtp.findOne({userphone:req.body.userphone})
    const msg = {}
    const user =new User(req.body)
    try{
        // if(!phoneverify){
        //     res.send('you need to verify your mobile');
        // }
        // else{
        //     if(!phoneverify.verify)
        //         res.send('you need to verify otp')
        //     else{
        //         const token = jwt.sign({_id:user._id.toString()},'this is basic encryption')
        //         user.tokens = user.tokens.concat({token})
        //         await user.save()
        //         res.send(user)
        //     }
        // }
        await user.save()
        const token = await user.generateToken()
        // const userObject = await user.removeObjects()
        res.send({user,token})
    }catch(e){
        res.send(e)
    }
    // res.json(msg)
})
router.post('/account',async (req,res)=>{
    
})
router.post('/login',async (req,res)=>{
    const user = await User.findOne({userphone:req.body.userphone})
    if(user){
        try{
            const check =await bcrypt.compare(req.body.password,user.password)
            if(!check){
                res.send('login failed')
            }
            else{
                const token =await user.generateToken()
                res.send({user,token})
            }
        }catch(e){
            res.send(e)
        }
    }else{
        res.send('wrong userphone or password')
    }
})
module.exports = router