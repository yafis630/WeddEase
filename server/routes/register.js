// routes/register.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const authenticateToken=require('../middlewares/authenticateToken');


// Register a new user
router.post('/register', async (req, res) => {
  try {
    console.log(req.body)
    const user = new User(req.body);
    await user.save();
    console.log(user);
    res.json(user);
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

router.get('/userhome', authenticateToken ,async (req, res) => {
  try {
    const users = await User.find({ email:req.email.email }); 
    console.log(users);
    res.json(users);

  } catch (error) {
    console.error('Error fetching user', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
  
});

router.post("/putuser", authenticateToken, async(req,res)=>{
  console.log(req.body)
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const { name, phoneNumber, } = req.body;
   

  const filter={email:req.email.email};
  const update = {
    $set: {
      name: name,
      
      phoneNumber: phoneNumber,
      
    }
  };
  const changed = await User.updateOne(filter,update ,{
    new:true
   }
    );
    console.log(changed);
    res.send(true);
  });

module.exports = router;
