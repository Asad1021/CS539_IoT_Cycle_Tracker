// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/cycletracker', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.error('MongoDB error:', err));
// db.js
// db.js
// db.js
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

// Add the database name "GPSdata" to the connection string
const mongoURI = "mongodb+srv://admin:admin@cluster0.6xaacks.mongodb.net/GPSdata?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Atlas connected successfully');
  } catch (err) {
    console.error(`❌ Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
