const { Router } = require("express");
const { Office,Account } = require("../models/models");
const { PhoneOtp,EmailVerify } = require("../models/reg");
const User = require("../models/user");
const auth = require("./auth");
const router = require("./users");
const regRouter = Router()

const accountSid = 'AC313b03c0ab2d5e23fef3df4c3f515e41';
const authToken = '8209e738ccb70d17fe349e392b8874e3';
const client = require('twilio')(accountSid, authToken);

const sendotp=(userphone,otp)=>{
    return client.messages
    .create({
        body: 'your otp '+otp,
        from: '+14322239107',
        to: '+91'+userphone
    })
}

regRouter.post('/otpsend',async (req,res)=>{
    const userphone = req.body.userphone
    const user = await User.findOne({userphone})
    if(user) res.status(400).json({"error":"User already exists"})
    PhoneOtp.find({userphone},(err,docs)=>{
        docs.forEach((doc)=>doc.remove())
    })
    const date = new Date()
    const created_time = date.setMinutes(date.getMinutes()+5)
    const otp = Math.floor(Math.random() * 1000000) + 1;
    console.log(otp)
    const phoneotp = new PhoneOtp({userphone,created_time,otp})
    console.log(phoneotp)
    try{
        await sendotp(userphone,otp)
        await phoneotp.save()
        res.status(200).json({"succuss":"otp sent successfully"})
    }catch(e){
        if(e.status=='400')
            res.status(400).json({'error':'otp failed to send'})
        else
            res.status(400).json(e)
    }
})

regRouter.post('/otpverify',async (req,res)=>{
    const userphone = req.body.userphone
    const otp = req.body.otp
    const user =await PhoneOtp.findOne({userphone})
    const msg ={}
    if(user){
        if(user.created_time<new Date()){
            user.remove()
            msg.error = "session timeout"
        }
        else if(user.otp!==otp){
            msg.error = 'otp not matched'
        }else{
            if(user.verify==true) 
                msg.error = 'user already verified'
            else{
                user.verify=true
                try{
                    await user.save()
                    msg.succuss='otp verified successfully'
                }catch(e){
                    res.status(400).json(e)
                }
            }
        }
    }
    else{
        msg.error="User not received otp"
    }
    res.send(msg)
})

router.post('/office',auth,async (req,res)=>{
    const office = new Office(req.body)
    office.user=req.user._id
    console.log(office)
    try{
        await office.save();
        res.status(201).json(office);
    }catch(e){
        res.status(500).json(e);
    }
})
router.get('/office',auth,(req,res)=>{
    const office = Office.findOne({user:req.user})
    office.populate('user').then((r)=>{
        res.send(r)
    })
    // try{
    //     office.populate('user')
    //     res.send(office)
    // }catch(e){
    //     res.send(e);
    // }
})
module.exports={
    regRouter
}
