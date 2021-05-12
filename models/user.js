const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    userphone:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(value.length!=10){
                throw new Error("phone number should be equal to 10")
            }
        }
    },
    useremail:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid format')
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    is_staff:{
        type:Boolean,
        default:false
    },
    is_active:{
        type:Boolean,
        default:false
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    office:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Office'
    }
})

UserSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})
UserSchema.methods.toJSON = function(){
    const user= this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}
UserSchema.methods.generateToken = async function(){
    const user=this
    const token = jwt.sign({_id:user._id.toString()},'this is basic encryption')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = mongoose.model('User',UserSchema)

// const user=new User({username:"n",useremail:"nani@gmail.com",password:"kdk"})
// user.save((err)=>{
//     console.log(err)
// })
module.exports = {
    User,
    UserSchema
}
