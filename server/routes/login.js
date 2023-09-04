// routes/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Token =require( "../models/token");
const generateAccessToken=require('../helpers/generateAccessToken');
const nodemailer = require('nodemailer');
const authenticateToken=require('../middlewares/authenticateToken')

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(email)

    if (user && await bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken(email);
      const token = new Token({
        token: accessToken,
      });
      await token.save();
      res.send({accessToken,success:true, role:"user"});
      console.log('Login successful');
      
    } else {
      res.send({success: false});
      console.log('Invalid email or password');
     
    }
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    const resetToken = generateAccessToken(email);
    const token = new Token({
      token: resetToken,
    });
    await token.save();
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jasiahassan120@gmail.com',
        pass: 'rtkjvbubweburafj',
      },
    });
    const mailOptions = {
      from: 'jasiahassan120@gmail.com',
      to: email, 
      subject: 'Reset password link',
      text: `http://localhost:3000/reset-password/${user._id}/${resetToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to send password reset email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.json({ success: true, message: 'Password reset email sent' });
      }
    });
  } catch (error) {
    console.error('Error initiating password reset', error);
    res.status(500).json({ error: 'Failed to initiate password reset' });
  }
});


  router.post('/reset-password/:id/:token', authenticateToken, async (req, res) => {
    try {
      const token= req.params.token;
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10); 
      await User.updateOne({ _id: userId }, { password: hashedPassword });
      const del = await Token.deleteOne({ token });
      res.status(200).json( {success:true});
    } catch (error) {
      console.error('Error resetting password', error);
      res.status(500).json( {success:false});
    }
  });
  
  module.exports = router;
  
 
 