const env = require('../config/env');
const { sendError } = require('../utils/http');

function requestDeadline(req, res, next) {
  const timer = setTimeout(() => {
    if (!res.headersSent) {
      sendError(
        res,
        504,
        'INTERNAL_ERROR',
        'The request could not be completed within 30 seconds. Please try again.'
      );
    }
  }, env.requestTimeoutMs);
  timer.unref();

  const clear = () => clearTimeout(timer);
  res.on('finish', clear);
  res.on('close', clear);
  next();
}

module.exports = requestDeadline;
