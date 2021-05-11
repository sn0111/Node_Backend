const mongoose = require('mongoose');
const { UserSchema } = require('./user');

const officeSchema = new mongoose.Schema({
    office_name:{
        type:String,
        required:true
    },
    office_icon:{
        type:String
    },
    office_type:{
        type:String,
        required:true
    },
    address:String,
    phone_no:{
        type:String,
        required:true
    },
    pin_code:String,
    state:String,
    city:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    accounts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account'
    }],
    createdAt:Date
});
const Office = mongoose.model('Office',officeSchema);

const Account = mongoose.model('Account',new mongoose.Schema({
    account_amount:String,
    total_holders:String,
    required_holders:String,
    pause:Boolean,
    finished:Boolean,
    no_of_payments:String,
    office:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Office',
        required:true
    }
}));

module.exports ={
    Account,
    Office
}