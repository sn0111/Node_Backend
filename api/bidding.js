const { Router } = require("express");
const { Bidding } = require("../models/customers");
const auth = require("./auth");

bidRouter = Router()

bidRouter.get('/bidding',auth,async (req,res)=>{
    if(!req.account){
        res.status(400).send({error:'account id is required'})
    }
    var v = account_check(req.user.accounts,req.account)
    if(!v){
        res.status(400).send({error:'account not found'})
    }else{
        const bidding = await Bidding.find({account:account_id})
        try{
            res.send(bidding)
        }catch(e){
            res.send(e)
        }
    }
})

module.exports= bidRouter