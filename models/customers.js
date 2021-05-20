const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const customerSchema = new mongoose.Schema({
    customer_phone:{
        type:String,
        required:true
    },
    customer_email:{
        type:String,
        required:true,
    },
    customer_name:String,
    password:{
        type:String,
        required:true
    },
    is_active:{
        type:Boolean,
        default:false
    },
    accounts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account'
    }],
    payments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Payment'
    }]
})
customerSchema.pre('save',async function(next){
    const customer = this
    if(customer.isModified('password')){
        console.log(customer.password)
        customer.password = await bcrypt.hash(customer.password,8)
    }
    next()
})
const Customer = mongoose.model('Customer',customerSchema)

const Payment = mongoose.model('Payment',new mongoose.Schema({
    total_amount:String,
    amount_paid:String,
    paid_date:Date,
    due_date:Date,
    due:Boolean,
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
}))

const Bidding = mongoose.model('Bidding',new mongoose.Schema({
    message:String,
    time:Date,
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
}))

module.exports={
    Customer,
    Payment,
    Bidding
}