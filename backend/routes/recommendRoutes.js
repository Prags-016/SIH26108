const express = require('express');
const rateLimit = require('express-rate-limit');
const env = require('../config/env');
const upload = require('../middleware/upload');
const sanitizeBody = require('../middleware/sanitizeBody');
const AppError = require('../utils/AppError');
const { recommendText, recommendUpload } = require('../controllers/recommendController');

const router = express.Router();

const recommendLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  limit: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  handler(req, res, next) {
    next(new AppError(
      'RATE_LIMITED',
      'Too many recommendation requests were sent in a short time. Please wait a few minutes and try again.',
      429
    ));
  }
});

function uploadIfMultipart(req, res, next) {
  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('multipart/form-data')) {
    next();
    return;
  }
  upload.single('file')(req, res, next);
}

router.post('/upload', recommendLimiter, upload.single('file'), sanitizeBody, recommendUpload);
router.post('/', recommendLimiter, uploadIfMultipart, sanitizeBody, recommendText);

module.exports = router;
