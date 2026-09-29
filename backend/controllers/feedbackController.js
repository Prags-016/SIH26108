const Feedback = require('../models/Feedback');
const AppError = require('../utils/AppError');
const asyncHandler = require('../middleware/asyncHandler');
const { sendJson } = require('../utils/http');

const REQUEST_ID = /^[A-Za-z0-9._:-]{1,80}$/;

function resolveRating(body) {
  if (body.rating === 'helpful' || body.rating === 'not_helpful') return body.rating;
  if (body.helpful === true || body.helpful === 'true') return 'helpful';
  if (body.helpful === false || body.helpful === 'false') return 'not_helpful';
  return null;
}

const submitFeedback = asyncHandler(async (req, res) => {
  const body = req.body || {};
  const requestId = typeof body.request_id === 'string' ? body.request_id.trim() : '';
  if (!REQUEST_ID.test(requestId)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'A valid request_id is required to record feedback.',
      400
    );
  }

  const rating = resolveRating(body);
  if (!rating) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Rating must be "helpful" or "not_helpful".',
      400
    );
  }

  let standardId = null;
  if (body.standard_id !== undefined && body.standard_id !== null && body.standard_id !== '') {
    if (typeof body.standard_id !== 'string' || body.standard_id.trim().length > 64) {
      throw new AppError('VALIDATION_ERROR', 'standard_id is not a valid standard identifier.', 400);
    }
    standardId = body.standard_id.trim();
  }

  const comment = body.comment === undefined || body.comment === null ? '' : String(body.comment);
  if (comment.length > 5000) {
    throw new AppError('VALIDATION_ERROR', 'Comments must be 5000 characters or fewer.', 400);
  }

  const category = body.category === undefined || body.category === null ? '' : String(body.category).slice(0, 80);

  await Feedback.create({
    request_id: requestId,
    standard_id: standardId,
    rating,
    comment,
    category
  });

  sendJson(res, 200, { status: 'ok' });
});

module.exports = { submitFeedback };
