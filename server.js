  // server.js

  const express = require('express');
  const mongoose = require('mongoose');
  const path = require('path');

  require('./db'); // Connect to MongoDB

  const app = express();

  const dataRoutes = require('./routes/dataRoutes');

  // Middlewares
  app.use(express.json()); // To parse JSON from requests
  app.use('/api/data', dataRoutes); // API route
  app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend

  // Start server
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`✅ Server also accessible at http://${require('os').networkInterfaces()['Wi-Fi']?.[1]?.address || 'YOUR_LOCAL_IP'}:${PORT}`);
});
