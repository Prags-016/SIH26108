const mongoose = require('mongoose');
const env = require('./env'); // Pulls from your env.js file

mongoose.set('strictQuery', true);

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // CHANGED: Using env.MONGODB_URI instead of env.mongoUri to match your env.js file exactly!
  console.log("ℹ️ Database Triage: Attempting connection link to target URI ->", env.MONGODB_URI); 

  await mongoose.connect(env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000, 
    maxPoolSize: 10                  
  });

  return mongoose.connection;
}

async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

module.exports = { connectDB, disconnectDB };
