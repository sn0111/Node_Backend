const mongoose = require('mongoose')
const {UserSchema ,User}= require('./user')
require('../db/database')

const brandSchema= new mongoose.Schema({
    brand_name:String,
    brand_type:String,
    location:String,
    stores:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Store'
    }]
});

const Brand = mongoose.model('Brand',brandSchema);

const storeSchema = new mongoose.Schema({
    store_name:String,
    address:String,
    pin_code:String,
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Brand',
        required:true
    }
})
const Store = mongoose.model('Store',storeSchema);

// const brand = new Brand({brand_name:'Santoor',brand_type:'Single',location:'KKD'})
// console.log(brand);
// brand.save((err)=>{
//     if(err) return console.error(err.stack)

//     const store = new Store({store_name:'s1',address:'kdklslkkls',pin_code:'122344',brand:brand._id})
//     store.save()
//     console.log(store);
// });
// Store.findById({_id:'609a4033d1ef5d6b5c8b8ddc'})
// .populate('brand')
// .exec().then((res)=>{
//     console.log(res);
// })
// const store = new Store({store_name:'s1',address:'kdklslkkls',pin_code:'122344'})
// console.log(store)
// store.save()

// const brand = Brand.findByIdAndUpdate({_id:'609a398c64b6d6689a84c205'},{
//     $push:{
//         stores:store
//     }
// })
// // brand.stores.push(store);
// // brand.save();
// console.log(brand);
// Brand.findById({_id:'609a4032d1ef5d6b5c8b8ddb'})
const fun =async ()=>{
    const brand =await Brand.findById({_id:'609a4032d1ef5d6b5c8b8ddb'})
    console.log(brand)
    const store = new Store({store_name:'store1',address:'kdklslkkls',pin_code:'122344',brand})
    console.log(store)
    store.save()
}

// fun()

// const store = new Store({store_name:'store1',address:'kdklslkkls',pin_code:'122344',brand:'609a4032d1ef5d6b5c8b8ddb'})

// Store.find({brand:'609a4032d1ef5d6b5c8b8ddb'},(err,docs)=>{
//     docs.forEach((doc)=>{
//         // console.log(doc)
//         Brand.findByIdAndUpdate(
//             {_id:'609a4032d1ef5d6b5c8b8ddb'},
//             {
//                 $push:{
//                     stores:doc
//                 }
//             },
//             {new:true,useFindAndModify:false}
//         ).then((res)=>{
//             console.log(res)
//         })
//     })
// })
// Brand.findById({_id:'609a4032d1ef5d6b5c8b8ddb'})
// .populate('stores')
// .then((res)=>{
//     console.log(res);
// })