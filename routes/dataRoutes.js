// routes/dataRoutes.js

const express = require('express');
const router = express.Router();
const CycleData = require('../models/cycleData'); // Import your Mongoose model here

// POST endpoint to receive and store data from ESP32 nodes
// router.post('/', async (req, res) => {
//   try {
    
//     const { macAddress, latitude, longitude, timestamp } = req.body;

//     const newEntry = new CycleData({
//       macAddress,
//       latitude,
//       longitude,
//       timestamp
//     });

//     await newEntry.save();
//     res.status(201).json({ message: 'Data saved successfully' });
//   } catch (err) {
//     console.error('Error saving data:', err);
//     res.status(500).json({ error: 'Failed to save data' });
//   }
// });

router.post('/', async (req, res) => {
  try {
    const { macAddress, latitude, longitude, seq_num } = req.body;
    
    // Find existing document for this MAC
    const existingData = await CycleData.findOne({ macAddress });
    
    // Only update if no existing data or new sequence number is higher
    if (!existingData || seq_num > existingData.seq_num) {
      const result = await CycleData.findOneAndUpdate(
        { macAddress },
        { macAddress, latitude, longitude, seq_num },
        { upsert: true, new: true }
      );
      res.status(200).json(result);
    } else {
      res.status(200).json({ message: "Ignored older sequence number" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET endpoint to fetch all data (used by frontend)
// router.get('/', async (req, res) => {
//   try {
//     const allData = await CycleData.find().sort({ timestamp: -1 });
//     res.json(allData);
//   } catch (err) {
//     console.error('Error fetching data:', err);
//     res.status(500).json({ error: 'Failed to fetch data' });
//   }
// });

// Get all data
router.get('/', async (req, res) => {
  try {
    console.log('Fetching data from MongoDB Atlas...');
    const data = await CycleData.find();
    console.log(`Found ${data.length} records`);
    res.json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
