const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const env = require('./config/env');
const { connectDB, disconnectDB } = require('./config/db');
const Standard = require('./models/Standard');
const Feedback = require('./models/Feedback');
const routes = require('./routes');
const requestDeadline = require('./middleware/timeout');
const sanitizeBody = require('./middleware/sanitizeBody');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', false);

  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginEmbedderPolicy: false
  }));

  app.use(cors({
    origin(origin, callback) {
      if (!origin || env.corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['RateLimit-Limit', 'RateLimit-Remaining', 'RateLimit-Reset']
  }));

  app.use(requestDeadline);
  app.use(express.json({
    limit: '1mb',
    type: ['application/json', 'application/*+json']
  }));
  app.use(sanitizeBody);

  if (env.nodeEnv !== 'test') {
    app.use((req, res, next) => {
      const started = Date.now();
      res.on('finish', () => {
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - started}ms`);
      });
      next();
    });
  }

  app.use('/api/v1', routes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}

const app = createApp();

async function start() {
  await connectDB();
  await Promise.all([Standard.init(), Feedback.init()]);

  const server = app.listen(env.port, () => {
    console.log(`IS Standards API listening on http://localhost:${env.port}/api/v1`);
  });

  server.requestTimeout = env.requestTimeoutMs;
  server.headersTimeout = env.requestTimeoutMs + 5000;
  server.timeout = env.requestTimeoutMs;
  server.on('error', (err) => {
    console.error(err.message);
    process.exit(1);
  });

  async function shutdown(signal) {
    console.log(`${signal} received. Closing the API.`);
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
  }

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

if (require.main === module) {
  start().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}

module.exports = { app, createApp, start };
