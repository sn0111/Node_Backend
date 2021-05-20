const { Router } = require("express");
const { Office,Account } = require("../models/models");
const { PhoneOtp,EmailVerify } = require("../models/reg");
const { User }= require("../models/user");
const bcrypt = require('bcryptjs')
const auth = require("./auth");
const router = require("./users");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')


const dotenv = require('dotenv');
// const { jwt } = require("twilio");
// const { JsonWebTokenError } = require("jsonwebtoken");

dotenv.config()
const regRouter = Router()

// mail instance creating

const transport = nodemailer.createTransport({

    service:"Gmail",
    auth:{
        user:process.env.user,
        pass:process.env.pass        
    }
})
const sendmail = (subject,email,code)=>{
    transport.sendMail({
        from:process.env.user,
        to:email,
        subject,
        html:`<h1>Email verification</h1>
            <h2>hello</h2>
            <p>please verify your mail <a href=http://localhost:3000/password/confirm/${code}>click here</a></p>`
    }).catch(e=>console.log(e));
}


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
// change the user password
regRouter.post('/password/change',auth, async (req,res)=>{
    try{
        const check = await bcrypt.compare(req.body.old_password,req.user.password)
        if(!check){
            res.status(404).json({error:'old password not matched'})
        }else{
            const user = await User.findById({_id:req.user._id})
            user.password=req.body.password
            await user.save()
            res.status(201).json({success:'password changed successfully'})
        }
    }catch(e){
        res.status(500).send(e)
    }
})
// forgot password send email
regRouter.post('/password/forgot',async (req,res)=>{
    const user =await User.findOne({useremail:req.body.useremail})
    if(!user){
        res.status(404).json({error:'email not exists'})
    }
    else{
        await EmailVerify.find({useremail:req.body.useremail}).remove()
        const date = new Date()
        const created_time = date.setMinutes(date.getMinutes()+5)
        const email = new EmailVerify(req.body)
        email.time=created_time
        const code = jwt.sign({email:req.body.useremail},process.env.secret)
        // console.log(code)
        try{
            sendmail("forgot password",req.body.useremail,code)
            email.save()
            res.status(200).json({error:'mail sent successfully'})
        }catch(e){
            res.status(500).json(e)
        }
    }
})
regRouter.get('/password/confirm/:code',async (req,res)=>{
    const code = req.params.code
    console.log(code)
    const decode = jwt.verify(code,process.env.secret)
    console.log(decode)
    const emailverify = await EmailVerify.findOne({useremail:decode.email})
    console.log(emailverify)
    if(emailverify){
        if(emailverify.time<new Date()){
            emailverify.remove()
            res.status(404).json({error:'session timeout'});
        }else if(emailverify.verify==true){
            res.status(404).json({error:'email already verified'})
        }else{
            emailverify.verify=true
            await emailverify.save()
            res.status(200).send('email verified');
        }
    }else{
        res.status(404).json({error:'invalid code'})
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
    try{
        await office.save();
        await User.findByIdAndUpdate({_id:req.user._id},{office})
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

regRouter.post('/account',auth,async (req,res)=>{
    const account = new Account(req.body)
    try{
        account.office=req.user.office
        await account.save()
        await User.findByIdAndUpdate({_id:req.user._id},{accounts:account})
        // user.accounts = account._id
        // console.log(user.accounts)
        // await user.save()
        res.status(201).send(account)
    }catch(e){
        res.status(500).send(e);
    }
})
regRouter.get('/account',auth,async (req,res)=>{
    const account = await Account.find({office:req.user.office})
    try{
        res.send(account)
    }catch(e){
        res.status(500).send(e);
    }
})
module.exports={
    regRouter
}
