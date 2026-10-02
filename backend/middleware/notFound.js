const AppError = require('../utils/AppError');

function notFound(req, res, next) {
  next(new AppError(
    'VALIDATION_ERROR',
    'That API address is not part of this service.',
    404
  ));
}

module.exports = notFound;
