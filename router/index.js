const express= require('express')
const router= express.Router();
const post = require('../models/post.model')
router.get('/', async(req,res)=>{
      let posts= await post.find({});
      let token= req.cookies.token;
      res.render('index',{token,posts})    
})
router.get('/sign', async(req,res)=>{
   res.render('Login')
})


module.exports=router; 