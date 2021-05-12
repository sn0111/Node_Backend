const mongoose = require('mongoose')
// require('../db/database')
const { default: validator } = require('validator')

const PhoneOtp = mongoose.model('PhoneOtp',{
    userphone:{
        type:String,
        trim:true,
        validate(value){
            if(value.length!==10){
                throw new Error("mobile no should be size 10")
            }
        }
    },
    otp:{
        type:String
    },
    verify:{
        type:Boolean,
        default:false
    },
    created_time:{
        type:Date,
    }
})

// const PhoneOtpVerify = mongoose.model('PhoneOtpVerify',PhoneOtpSchema)

// const otp =new PhoneOtp({userphone:9999999999})
// otp.save((err)=>{
//     console.log(err)
// })

const EmailSchema = mongoose.Schema({
    useremail:{
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },
    verify:{
        type:Boolean,
        default:false
    },
    time:{
        type:Date,
    },
    code:String
})
const EmailVerify = mongoose.model('EmailVerify',EmailSchema)

// const E = new EmailVerify({useremail:"nani@gmail.com"})
// E.save((err)=>{
//     console.log(err)
// })
module.exports = {
    EmailVerify,
    PhoneOtp
}