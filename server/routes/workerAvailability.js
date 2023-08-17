const express = require('express');
const router = express.Router();
const Worker = require('../models/worker');

// Update worker availability
router.post('/:workerId/update-unavailable-dates', async (req, res) => {
  try {
    const workerId = req.params.workerId;
    const { unavailableDates } = req.body;

    const worker = await Worker.findByIdAndUpdate(workerId, { $addToSet: { unavailableDates } }, { new: true });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    return res.status(200).json({ message: "Unavailable dates updated successfully", worker });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating unavailable dates" });
  }
});

module.exports = router;
