const express = require('express')
const app = express();
const connection=require('./config/mongoose.connection')
const userrouter=require('./router/userRouter.js')
const ownerroute=require('./router/owner.js')
const index= require('./router/index.js')
const path= require('path')
const dotenv=require('dotenv')
dotenv.config();
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"public")));
app.use('/user',userrouter)
app.use('/owner',ownerroute)
app.use('/',index)


app.get('/admin',(req,res)=>{
    res.render('admin')
})

app.listen(process.env.PORT||3000);
