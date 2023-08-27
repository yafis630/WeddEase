// routes/register.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const SelectedData = require('../models/SelectedData');

const authenticateToken=require('../middlewares/authenticateToken');


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


router.post('/hiredWorker', authenticateToken, async (req, res) => {
  try {
    const { selectedDates, formData,workersEmail,workersName } = req.body;
    const { usersName, usersEmail, phoneNo  } = formData;
    console.log(workersEmail);

    const selectedData = new SelectedData({
      selectedDates,
      usersName,
      usersEmail,
      workersEmail,
      workersName,
      phoneNo
    });

    await selectedData.save();

    res.json(selectedData);
  } catch (error) {
    console.error('Error saving selected data', error);
    res.status(500).json({ error: 'Failed to save selected data' });
  }
});



  router.get('/updates', authenticateToken ,async (req, res) => {
    try {
      const selectedData = await SelectedData.find({usersEmail:req.email.email }); 
      res.json(selectedData);
   
    } catch (error) {
      console.error('Error fetching worker', error);
      res.status(500).json({ error: 'Failed to fetch worker' });
    }
  });


  router.get('/userhome', authenticateToken ,async (req, res) => {
  try {
    const users = await User.find({ email:req.email.email }); 
    res.json(users);

  } catch (error) {
    console.error('Error fetching user', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
  
});

router.post("/putuser", authenticateToken, async(req,res)=>{
  const {name, phoneNumber, } = req.body;
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
    console.log(changed)
    res.send(true);
  });

module.exports = router;

