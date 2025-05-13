// server.js

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const connectDB = require('./db');
const cors = require('cors');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Import routes
const dataRoutes = require('./routes/dataRoutes');

// Middlewares
app.use(cors());
app.use(express.json()); // To parse JSON from requests
app.use('/api/data', dataRoutes); // API route
app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend

// Define port (use environment variable for deployment)
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  
  // Get network interfaces for local development
  try {
    const networkInterfaces = require('os').networkInterfaces();
    const wifiInterface = networkInterfaces['Wi-Fi'] || 
                          networkInterfaces['wlan0'] || 
                          networkInterfaces['en0']; // Different OS naming
    
    if (wifiInterface) {
      const ipv4Interface = wifiInterface.find(iface => iface.family === 'IPv4');
      if (ipv4Interface) {
        console.log(`✅ Server also accessible at http://${ipv4Interface.address}:${PORT}`);
      }
    }
  } catch (err) {
    console.log(`✅ Server running on port ${PORT}`);
  }
});
