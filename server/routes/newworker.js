// routes/register.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Worker = require('../models/worker');

// Register a new user
router.post('/worker', async (req, res) => {
  try {
    const worker = new Worker(req.body);
    await worker.save();
    console.log(worker);
    res.json(worker);
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

module.exports = router;
