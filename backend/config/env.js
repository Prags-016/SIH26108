const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

function intFromEnv(name, fallback) {
  const raw = process.env[name];
  if (raw === undefined || raw === '') return fallback;
  const value = Number(raw);
  if (!Number.isFinite(value)) {
    throw new Error(`${name} must be a number`);
  }
  return value;
}

const specOrigin = 'http://localhost:5173';
const configuredOrigins = (process.env.CORS_ORIGINS || `${specOrigin},http://localhost:3000`)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!configuredOrigins.includes(specOrigin)) {
  configuredOrigins.unshift(specOrigin);
}

const requestTimeoutMs = intFromEnv('REQUEST_TIMEOUT_MS', 30000);
if (requestTimeoutMs <= 0 || requestTimeoutMs > 30000) {
  throw new Error('REQUEST_TIMEOUT_MS must be between 1 and 30000');
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: intFromEnv('PORT', 8000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/is_standards_engine',
  corsOrigins: configuredOrigins,
  requestTimeoutMs,
  dataLastSynced: process.env.DATA_LAST_SYNCED || '2026-09-25',
  rateLimitWindowMs: intFromEnv('RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000),
  rateLimitMax: intFromEnv('RATE_LIMIT_MAX', 60),
  maxUploadBytes: 10 * 1024 * 1024,
  queryMin: 10,
  queryMax: 5000
};
