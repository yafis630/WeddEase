// routes/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Worker = require('../models/worker');

// User login
router.post('/workerlogin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const worker = await Worker.findOne({ email });

    if (worker && await bcrypt.compare(password, worker.password)) {
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
