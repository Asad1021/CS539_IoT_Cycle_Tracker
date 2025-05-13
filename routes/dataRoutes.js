// routes/dataRoutes.js

const express = require('express');
const router = express.Router();
const CycleData = require('../models/CycleData'); // ✅ Import your Mongoose model here

// POST endpoint to receive and store data from ESP32 nodes
router.post('/', async (req, res) => {
  try {
    const { macAddress, latitude, longitude, timestamp } = req.body;

    const newEntry = new CycleData({
      macAddress,
      latitude,
      longitude,
      timestamp
    });

    await newEntry.save();
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// GET endpoint to fetch all data (used by frontend)
router.get('/', async (req, res) => {
  try {
    const allData = await CycleData.find().sort({ timestamp: -1 });
    res.json(allData);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = router;
