const mongoose = require('mongoose')

const Customer = mongoose.model('Customer',new mongoose.Schema({
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
}))

const Payment = mongoose.model('Payment',new mongoose.Schema({
    total_amount:String,
    amount_paid:String,
    paid_date:Date,
    due_date:Date,
    due:Boolean,
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account'
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    }
}))