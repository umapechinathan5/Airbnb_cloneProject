const express = require('express');
const cors = require('cors');
const mongoose = require ("mongoose");
const bcrypt = require('bcryptjs');
const jst = require('jsonwebtoken');
const User = require('./models/User.js');
require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wd34twdfg";
app.use(express.json());
app.use(cors({
  credentials:true,
  origin:'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL); 



app.get('./test',(req,res)=>{
  res.json('test ok');
});

app.post('/register', async (req,res)=>{
  const {name,email,password} = req.body;

  try{
    const userDoc = await User.create({
      name,
      email,
      password:bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  }
  catch(e){
    res.status(422).json(e);
  }
  
});

app.post('/login', async (req,res) => {
  const {email,password} = req.body;
  const userDoc = await User.findOne({email});
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jst.sign({email:userDoc.email, id:userDoc._id}, jwtSecret, {}, (err,token) => {
       if (err) throw err;
       res.cookie('token', token).json('pass ok');
      });
      
    } else {
     res.status(422).res.json('pass not ok');
    }
   
  } else {
    res.json ('not found');
  }
});

app.get('/profile', (req,res)=>{
  const {token} = req.cookies;
  res.json(token);
})

app.listen(4000,()=>{console.log("Server is running")});


