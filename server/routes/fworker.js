// routes/worker.js
const express = require('express');
const router = express.Router();
const Worker = require('../models/worker');
const authenticateToken=require('../middlewares/authenticateToken')
// Fetch workers by category
router.get('/workers/:category',authenticateToken, async (req, res) => {
  try {
    let category = req.params.category;
    category=category.substring(9)
    const workers = await Worker.find({ profession:category }); 
    console.log(workers);
    res.json(workers);

  } catch (error) {
    console.error('Error fetching workers', error);
    res.status(500).json({ error: 'Failed to fetch workers' });
  }
});

module.exports = router;