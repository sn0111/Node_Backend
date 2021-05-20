const { Router } = require("express");
const { Payment } = require("../models/customers");
const auth = require("./auth");
const account_check = require('./permission')

payRouter = Router();

payRouter.post('/payments',auth,async (req,res)=>{
    if(!req.account){
        res.status(400).send({error:'account id is required'})
    }
    var v = account_check(req.user.accounts,req.account)
    if(!v){
        res.status(400).send({error:'account not found'})
    }else{
        const payment = new Payment(req.body)
        try{
            payment.account=req.account
            payment.user=req.user._id
            console.log(payment)
            await payment.save()
            res.status(200).json(payment)
        }catch(e){
            res.status(400).json(e)
        }
    }
})


payRouter.get('/payments',auth,async (req,res)=>{
    if(!req.account){
        res.status(400).send({error:'account id is required'})
    }
    var v = account_check(req.user.accounts,req.account)
    if(!v){
        res.status(400).send({error:'account not found'})
    }
    else{
        try{
            const payments =await Payment.find({account:req.account})
            res.status(200).json(payments)
        }catch(e){
            res.status(400).json(e)
        }
    }
})

module.exports = payRouter