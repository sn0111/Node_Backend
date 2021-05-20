const { User } = require("../models/user")
const {ObjectId} = require("mongodb")
const account_check = (accounts,account_id)=>{
    // callback(accounts,account_id)
    var v = false;
    accounts.forEach(account => {
        if(account.equals(ObjectId(account_id))){
            v = true
        }
    });
    return v;
}

// const value=account_check([1,2,3],1,(accounts,account_id)=>{
//     accounts.forEach(account => {
//         if(account===account_id)
//             return true
//     });
// })

// console.log(value)
module.exports=account_check

