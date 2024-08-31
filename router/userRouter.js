const express= require('express')
const resumeModel=require('../models/resume_model')
const router= express.Router();
const {registerUser,login}= require('../controllers/Authcontrollers')
const isloggedin=require('../middlewares/IsloggedIn')
const upload=require('../config/multer_config')
router.post('/register',registerUser)
router.post('/login',login)
router.post('/apply', isloggedin, upload.single('resume'), async (req, res) => {
    try {
        await resumeModel.create({
            
            email: req.user.email,
            resume: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });

         res.redirect('/')
    } catch (error) {
     console.log(error)
        res.status(500).send('Error uploading resume');
    }
});



module.exports=router;