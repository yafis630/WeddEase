const express = require('express');
const router = express.Router();
const Worker = require('../models/worker');

// Update worker availability
router.post('/update-worker-availability', async (req, res) => {
  console.log('hi')
  const { startDate, endDate } = req.body;
  
  // Perform your update logic here, updating the worker's unavailableDates
  try {
    const workerId = req.params.workerId; // Assuming you have worker ID in URL parameters
    const worker = await Worker.findById(workerId);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    
    // Update worker's unavailableDates
    worker.unavailableDates.push(startDate, endDate);
    await worker.save();

    return res.status(200).json({ message: "Availability updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating availability" });
  }
});

module.exports = router;
