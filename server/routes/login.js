// routes/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      console.log('Login successful');
      return res.json({ success: true, message: 'Login successful' });
    } else {
      console.log('Invalid email or password');
      return res.json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

module.exports = router;
