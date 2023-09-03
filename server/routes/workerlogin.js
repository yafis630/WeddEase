// routes/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Worker = require('../models/worker');
const Token =require( "../models/token.js");
const generateAccessToken=require('../helpers/generateAccessToken')
const authenticateToken=require('../middlewares/authenticateToken')
const nodemailer = require('nodemailer');

// worker login
router.post('/workerlogin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const worker = await Worker.findOne({ email });

    if (worker && await bcrypt.compare(password, worker.password)) {
      const accessToken = generateAccessToken(email);
      const token = new Token({
        token: accessToken,
      });
      await token.save();
      res.send({accessToken,success:true, role:"worker" });
      console.log('worker Login successful');
    } else {
      res.send({success: false});
      console.log('Invalid email or password');
    }
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

router.post('/forgot-password-worker', async (req, res) => {
  try {
    const { email } = req.body;
    const worker = await Worker.findOne({ email });
    if (!worker) {
      return res.json({ success: false, message: 'worker not found' });
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
      text: `http://localhost:3000/reset-password-worker/${worker._id}/${resetToken}`,
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


  router.post('/reset-password-worker/:id/:token', authenticateToken, async (req, res) => {
    try {
      const token= req.params.token;
      const userId = req.params.id;
      const worker = await Worker.findById(userId);
      if (!worker) {
        return res.status(404).json({ message: 'worker not found' });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10); 
      await Worker.updateOne({ _id: userId }, { password: hashedPassword });
      const del = await Token.deleteOne({ token });
      res.status(200).json( {success:true});
    } catch (error) {
      console.error('Error resetting password', error);
      res.status(500).json( {success:false});
    }
  });

module.exports = router;
