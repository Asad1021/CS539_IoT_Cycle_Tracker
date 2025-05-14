// // const mongoose = require('mongoose');

// // const cycleDataSchema = new mongoose.Schema({
// //   macAddress: String,
// //   latitude: Number,
// //   longitude: Number,
// //   timestamp: Date
// // });

// // models/cycleData.js or similar file
// const mongoose = require('mongoose');

// const cycleDataSchema = new mongoose.Schema({
//   macAddress: String,
//   latitude: Number,
//   longitude: Number,
//   timestamp: Date
//   // Your schema fields here (macAddress, latitude, longitude, timestamp, etc.)
// }, {
//   collection: 'cycledatas' // Explicitly set the collection name
// });

// const CycleData = mongoose.model('CycleData', cycleDataSchema);

// module.exports = CycleData;

// models/cycleData.js
const mongoose = require('mongoose');

const cycleDataSchema = new mongoose.Schema({
  macAddress: { 
    type: String, 
    required: true, 
    index: true,
    unique: true  // Ensure each MAC address only appears once
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  seq_num: {
    type: Number,
    default: 0
  }
}, {
  collection: 'cycledatas', // Explicitly set the collection name
  timestamps: true  // Adds createdAt and updatedAt fields automatically
});

// Create a compound index for efficient querying
cycleDataSchema.index({ macAddress: 1, seq_num: -1 });

const CycleData = mongoose.model('CycleData', cycleDataSchema);

module.exports = CycleData;
