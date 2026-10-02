const mongoose = require('mongoose');
const env = require('./env'); // Pulls from your env.js file

mongoose.set('strictQuery', true);

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Never print the full URI: Atlas strings contain the database password.
  const safeUri = String(env.MONGODB_URI).replace(/\/\/([^:@/]+):([^@]+)@/, '//$1:****@');
  console.log('Connecting to MongoDB ->', safeUri);

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
