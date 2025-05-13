const { MongoClient } = require('mongodb');

// Replace with your actual connection string from MongoDB Atlas
// Make sure to replace <password> with your actual password
const uri = "mongodb+srv://admin:admin@cluster0.6xaacks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a new MongoClient
const client = new MongoClient(uri);

// Function to test the connection
async function testConnection() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    
    // Verify connection by pinging the database
    await client.db("admin").command({ ping: 1 });
    
    console.log("✅ Successfully connected to MongoDB Atlas!");
    
    // Access your specific database
    const database = client.db("GPSdata");
    
    // List collections in your database (optional)
    const collections = await database.listCollections().toArray();
    console.log("Collections in GPSdata database:");
    if (collections.length === 0) {
      console.log(" - No collections found (empty database)");
    } else {
      collections.forEach(collection => console.log(` - ${collection.name}`));
    }
    
  } catch (error) {
    console.error("❌ Connection error:", error);
  } finally {
    // Close the connection
    await client.close();
    console.log("Connection closed.");
  }
}

// Run the test
testConnection().catch(console.error);
