// routes/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Seller = require('../models/seller');
const Token =require( "../models/token.js");
const generateAccessToken=require('../helpers/generateAccessToken')
const authenticateToken=require('../middlewares/authenticateToken')
const nodemailer = require('nodemailer');

// seller login
router.post('/sellerlogin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });

    if (seller && await bcrypt.compare(password, seller.password)) {
      const accessToken = generateAccessToken(email);
      const token = new Token({
        token: accessToken,
      });
      await token.save();
      res.send({accessToken,success:true, role:"seller"});
      console.log('seller Login successful');

    } else {
      res.send({success: false});
      console.log('Invalid email or password');
     
    }
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

router.post('/forgot-password-seller', async (req, res) => {
  try {
    const { email } = req.body;
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.json({ success: false, message: 'seller not found' });
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
      text: `http://localhost:3000/reset-password-seller/${seller._id}/${resetToken}`,
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

  router.post('/reset-password-seller/:id/:token', authenticateToken, async (req, res) => {
    try {
      const token= req.params.token;
      const userId = req.params.id;
      const seller = await Seller.findById(userId);
      if (!seller) {
        return res.status(404).json({ message: 'seller not found' });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10); 
      await Seller.updateOne({ _id: userId }, { password: hashedPassword });
      const del = await Token.deleteOne({ token });
      res.status(200).json( {success:true});
    } catch (error) {
      console.error('Error resetting password', error);
      res.status(500).json( {success:false});
    }
  });

module.exports = router;
