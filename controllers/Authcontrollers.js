const userModel= require('../models/user.model.js')
const express= require('express')
const bcrypt=require('bcrypt')
const {generateToken}=require('../utils/generateToken.js')
const isloggedin=require('../middlewares/IsloggedIn.js')


module.exports.registerUser = async (req, res) => {
    try {
      let cheak= await userModel.findOne({email:req.body.email})
      if(cheak){
        return res.status(400).json({message:"Email already exist"})
      }
      
      const { fullname, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const usercreated = await userModel.create({
        fullname,
        email,
        password: hashedPassword,
      });
      let token= generateToken(usercreated);
      res.cookie('token',token)

    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
    res.redirect('/')
  };
  
  module.exports.login= async (req,res)=>{
    try {
      const {email,password}=req.body;
    
      const user=await userModel.findOne({email:email});
      if(!user){
        return res.status(404).send('User not found ')
         }
         const isMatch=await bcrypt.compare(password,user.password);
         if(!isMatch){
          return res.status(404).send('User not found')
          }
       let token=generateToken(user);
       res.cookie('token',token);
       res.redirect('/')   
      
    } catch (error) {
      
    }
  }

 