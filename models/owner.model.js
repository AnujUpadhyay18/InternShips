const mongoose=require('mongoose')


const ownerSchema= mongoose.Schema({
   fullname:String,
   email:String,
   password: String,
   conatct:Number,
   
});

const owner =  mongoose.model('owner', ownerSchema);

module.exports = owner;