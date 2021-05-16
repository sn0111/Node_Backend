const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Exdb',{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true
})
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });
// const Example=mongoose.model('Example',{
//     name:String,
//     class:String
// })
// const ex=new Example({name:"nani",class:"E3"})
// console.log(ex);
// ex.save()
// Example.find({},(err,docs)=>{
//     console.log(docs);
// })
