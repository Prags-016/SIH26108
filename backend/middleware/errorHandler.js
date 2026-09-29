const multer = require('multer');
const mongoose = require('mongoose');
const AppError = require('../utils/AppError');
const { sendError } = require('../utils/http');

const ALLOWED_CODES = new Set([
  'VALIDATION_ERROR',
  'FILE_TOO_LARGE',
  'UNSUPPORTED_FILE_TYPE',
  'NO_MATCH_FOUND',
  'RATE_LIMITED',
  'INTERNAL_ERROR'
]);

const STATUS_BY_CODE = {
  VALIDATION_ERROR: 400,
  FILE_TOO_LARGE: 413,
  UNSUPPORTED_FILE_TYPE: 415,
  NO_MATCH_FOUND: 404,
  RATE_LIMITED: 429,
  INTERNAL_ERROR: 500
};

const FALLBACK_MESSAGE = {
  VALIDATION_ERROR: 'Some of the information sent with this request is missing or not valid.',
  FILE_TOO_LARGE: 'The uploaded file is larger than the 10 MB limit.',
  UNSUPPORTED_FILE_TYPE: 'This file type is not supported. Upload a PDF, DOCX, or TXT file.',
  NO_MATCH_FOUND: 'No matching Indian Standard could be found for this request.',
  RATE_LIMITED: 'Too many requests were sent in a short time. Please wait and try again.',
  INTERNAL_ERROR: 'The service could not complete this request. Please try again shortly.'
};

function normalizeError(err) {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return new AppError(
        'FILE_TOO_LARGE',
        'The uploaded file is larger than the 10 MB limit. Please choose a smaller PDF, DOCX, or TXT file.',
        413
      );
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return new AppError(
        'VALIDATION_ERROR',
        'Attach one file using the form field named "file".',
        400
      );
    }
    return new AppError(
      'VALIDATION_ERROR',
      'The upload could not be read. Check the file and try again.',
      400
    );
  }

  if (err && (err.type === 'entity.parse.failed' || err instanceof SyntaxError) && err.status === 400) {
    return new AppError('VALIDATION_ERROR', 'The request body must be valid UTF-8 JSON.', 400);
  }

  if (err && err.type === 'entity.too.large') {
    return new AppError(
      'VALIDATION_ERROR',
      'The request body is too large. Shorten the description and try again.',
      413
    );
  }

  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    return new AppError(
      'VALIDATION_ERROR',
      'Some of the submitted fields could not be saved. Check the values and try again.',
      400
    );
  }

  if (err instanceof AppError && ALLOWED_CODES.has(err.code)) {
    return err;
  }

  return new AppError('INTERNAL_ERROR', FALLBACK_MESSAGE.INTERNAL_ERROR, 500);
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    next(err);
    return;
  }

  const normalized = normalizeError(err);
  const code = ALLOWED_CODES.has(normalized.code) ? normalized.code : 'INTERNAL_ERROR';
  const statusCode = normalized.statusCode || STATUS_BY_CODE[code] || 500;
  const message = normalized.message || FALLBACK_MESSAGE[code];

  if (code === 'INTERNAL_ERROR') {
    console.error(err);
  }

  sendError(res, statusCode, code, message);
}

module.exports = errorHandler;
