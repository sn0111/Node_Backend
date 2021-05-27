const { Router } = require("express");
const { Bidding } = require("../models/customers");
const auth = require("./auth");
const account_check = require("./permission");

bidRouter = Router()

bidRouter.post('/bidding',auth,async (req,res)=>{
    console.log(req.account)
    // res.send(req.user)
    if(!req.account){
        res.status(400).send({error:'account id is required'})
    }
    var v = account_check(req.user.accounts,req.account)
    if(!v){
        res.status(400).send({error:'account not found'})
    }else{
        const bidding = new Bidding(req.body)
        try{
            bidding.account=req.account
            bidding.user=req.user
            console.log(bidding)
            await bidding.save()
            res.send(bidding)
        }catch(e){
            res.send(e)
        }
    }
})

bidRouter.get('/bidding',auth,async (req,res)=>{
    if(!req.account){
        res.status(400).send({error:'account id is required'})
    }
    var v = account_check(req.user.accounts,req.account)
    if(!v){
        res.status(400).send({error:'account not found'})
    }else{
        const bidding = await Bidding.find({account:req.account})
        try{
            res.send(bidding)
        }catch(e){
            res.send(e)
        }
    }
})

module.exports= bidRouter