const mongoose=require('mongoose')


const userSchema= mongoose.Schema({
   fullname:String,
   email:String,
   password: String,
   conatct:Number,
   Resume: String,
});

const User =  mongoose.model('User', userSchema);

module.exports = User;