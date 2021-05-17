const e = require('express')
const { Router } = require('express')
const { Customer } = require('../models/customers')
const { Account } = require('../models/models')
const auth = require('./auth')


custRouter = Router()
custRouter.post('/customers/:account_id',auth,async (req,res)=>{
    const account_id= req.params.account_id
    const account = Account.findById({_id:account_id})
    if(!account){
        res.send({error:'invalid account id'})
    }
    const customer = new Customer(req.body);
    try{
        customer.accounts=account_id
        console.log(customer)
        await customer.save()
        res.status(200).send(customer)
    }catch(e){
        res.status(400).send(e)
    }
})
custRouter.put('/customers/:customer_id',auth,async (req,res)=>{
    const customer_id= req.params.customer_id
    try{
        const customer = await Customer.findByIdAndUpdate({_id:customer_id},req.body)
        await customer.save()
        res.status(200).send(customer)
    }catch(e){
        res.status(400).send(e)
    }

})
custRouter.get('/customers/:account_id',auth,async (req,res)=>{
    const account_id= req.params.account_id
    // Customer.find({accounts:account_id}).exec()
    // .then((res)=>{
    //     console.log(res)
    // }).catch((err)=>console.log(err))
    try{
        const customers = await Customer.find({accounts:account_id})
        res.status(200).json(customers)
    }catch(e){
        console.log("error")
        res.status(400).json(e)
    }
})


module.exports={
    custRouter
}
