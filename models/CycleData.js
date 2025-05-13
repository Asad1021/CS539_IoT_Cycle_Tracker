// const mongoose = require('mongoose');

// const cycleDataSchema = new mongoose.Schema({
//   macAddress: String,
//   latitude: Number,
//   longitude: Number,
//   timestamp: Date
// });

// models/cycleData.js or similar file
const mongoose = require('mongoose');

const cycleDataSchema = new mongoose.Schema({
  macAddress: String,
  latitude: Number,
  longitude: Number,
  timestamp: Date
  // Your schema fields here (macAddress, latitude, longitude, timestamp, etc.)
}, {
  collection: 'cycledatas' // Explicitly set the collection name
});

const CycleData = mongoose.model('CycleData', cycleDataSchema);

module.exports = CycleData;


