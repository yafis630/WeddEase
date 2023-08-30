// routes/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Token =require( "../models/token");
const generateAccessToken=require('../helpers/generateAccessToken')
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

    // Generate a reset token and save it in the database
    const resetToken = generateToken();
    const token = new Token({
      userId: user._id,
      token: resetToken,
    });
    await token.save();

    // Send an email to the user containing the reset token
    // (You'll need to use a library to send emails, like Nodemailer)

    res.json({ success: true, message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error initiating password reset', error);
    res.status(500).json({ error: 'Failed to initiate password reset' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    // Find the token in the database
    const tokenEntry = await Token.findOne({ token });
    if (!tokenEntry) {
      return res.json({ success: false, message: 'Invalid token' });
    }

    // Check if the token is expired
    if (tokenEntry.expiresAt < Date.now()) {
      return res.json({ success: false, message: 'Token has expired' });
    }

    // Find the user associated with the token and update the password
    const user = await User.findById(tokenEntry.userId);
    user.password = password;
    await user.save();

    // Invalidate the token
    await tokenEntry.remove();

    res.json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

module.exports = router;
