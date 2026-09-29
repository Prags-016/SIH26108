// 1. MUST BE THE ABSOLUTE FIRST LINE OF CODE RUNNING IN YOUR BACKEND ENVIRONMENT

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db'); // Points to your database utility file
const env = require('./config/env');          // Points to your environment mapper file

const app = express();

// Global Middleware Configs
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Initialize Database Lifecycle Hook
connectDB()
  .then(() => console.log('🚀 System Sync Notice: MongoDB Atlas Layer Connection Active.'))
  .catch((err) => {
    console.error('❌ Critical Database Connection Intercepted:', err.message);
    process.exit(1); // Safely terminate application lifecycle loop on boot failure
  });

// Automated System Health Check Endpoint (Required by Section 5.5 of your Handoff Spec)
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    data_last_synced: '2026-09-25'
  });
});

// App Startup Orchestration
const PORT = env.port || 8000;
app.listen(PORT, () => {
  console.log(`📡 Server Engine online and listening on network address: http://localhost:${PORT}`);
});
