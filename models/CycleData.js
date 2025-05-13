const mongoose = require('mongoose');

const cycleDataSchema = new mongoose.Schema({
  macAddress: String,
  latitude: Number,
  longitude: Number,
  timestamp: Date
});

module.exports = mongoose.model('CycleData', cycleDataSchema);
