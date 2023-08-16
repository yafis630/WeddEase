
const express = require('express');
const router = express.Router();
const authenticateToken=require('../middlewares/authenticateToken');
const Token = require('../models/token.js');


router.delete('/log', authenticateToken, async (req, res) => {
    console.log('hi')
    const authHeader = req.headers['authentication'];
    const token = authHeader && authHeader.split(' ')[1];
    const del = await Token.deleteOne({ token });
    if (del) res.send(true);
  });
  module.exports = router;