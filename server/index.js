const express = require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose =require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wedease');
    console.log('db connected')
}
const registrationSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true
    },
    phoneNumber:{
      type:Number,
      required:true,
      min:10,
    },
    gender:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true,
      min: 6
  }
  });
  const User = mongoose.model('User', registrationSchema);

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.post('/wedease/register',async (req,res)=>{

    let user=new User();
    user.name=req.body.name;
    user.email=req.body.email;
    user.phoneNumber=req.body.phoneNumber;
    user.gender=req.body.gender;
    user.password=req.body.password;
    const doc = await user.save()
   console.log(doc)
   res.json(doc);
});


server.post('/wedease/login',async(req,res)=>{
  const { email, password } = req.body;
  console.log(req.body);


// check if the email exists in the database
const users = await User.findOne({ email });


  if(users.password === password){
    console.log('matched');
  return res.json({ success: true, message: 'login successfull' });
}
 else return res.json({success: false, message: 'Invalid email or password'})
});
server.listen(8080,()=>{
console.log('server started');
})