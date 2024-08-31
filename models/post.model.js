const mongoose=require('mongoose')

const posts= mongoose.Schema({
  JobTitle:String,
  company:{
    type:String,
  },
  location:{
    type:String,
  },
  salary:String,
  jobDescription:String,
});

let post= mongoose.model('post',posts );
module.exports=post;