const express= require('express')
const post=require('../models/post.model')
const Resume = require('../models/resume_model');
const ownerModel=require("../models/owner.model")
const router= express.Router();
const bcrypt=require('bcrypt')
router.post('/job', async(req,res)=>{
    const {JobTitle,location,company,salary,jobDescription}=req.body;
    await post.create({
        JobTitle,
        location,
        salary,
        company,
        jobDescription

    })
    res.redirect('/')

})
router.post("/signup", async (req,res)=>{
   let {fullname, email, password,contact}=req.body;
   let user = await ownerModel.findOne({email});
   if(user){
    res.send('already exist');
   }
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
  await ownerModel.create({
    fullname,
    email,
    password:hashedPassword,
    contact,
  })
res.send('created owner')
})

router.get('/adminLogin',(req,res)=>{
    res.render('adminLogin')

})
router.post('/login',async (req,res)=>{
    try {
        const {email,password}=req.body;
      
        const user=await ownerModel.findOne({email:email});
        if(!user){
          return res.status(404).send('User not found ')
           }
           const isMatch=await bcrypt.compare(password,user.password);
           if(!isMatch){
            return res.status(404).send('User not found')
            }
         res.render('admin')   
        
      } catch (error) {
        
      }

})
router.get('/resumes', async (req, res) => {
    try {
        const resumes = await Resume.find(); 
        res.render('resumesCart', { resumes }); 
    } catch (error) {
        res.status(500).send('Error fetching resumes');
    }
});

router.get('/download/:id', async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).send('Resume not found');
        }

        res.setHeader('Content-Type', resume.resume.contentType);
        res.setHeader('Content-Disposition', `attachment; filename=resume_${resume.name}.pdf`);
        res.send(resume.resume.data); 
    } catch (error) {
        console.error('Error downloading resume:', error);
        res.status(500).send('Error downloading resume');
    }
});



module.exports=router;