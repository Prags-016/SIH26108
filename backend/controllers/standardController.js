const Standard = require('../models/Standard');
const AppError = require('../utils/AppError');
const asyncHandler = require('../middleware/asyncHandler');
const { canonicalStandardId, escapeRegex } = require('../utils/ids');
const { sendJson } = require('../utils/http');
const { toStandardProfile } = require('../services/presenters');

const getStandard = asyncHandler(async (req, res) => {
  const canonical = canonicalStandardId(req.params.id);
  const raw = decodeURIComponent(String(req.params.id || '')).trim();

  let doc = null;
  if (canonical) {
    doc = await Standard.findOne({ id: canonical }).maxTimeMS(8000).lean();
  }
  if (!doc && raw && raw !== canonical) {
    doc = await Standard.findOne({ id: raw }).maxTimeMS(8000).lean();
  }
  if (!doc && raw) {
    doc = await Standard.findOne({
      is_number: new RegExp(`^${escapeRegex(raw)}$`, 'i')
    }).maxTimeMS(8000).lean();
  }

  if (!doc) {
    throw new AppError(
      'NO_MATCH_FOUND',
      'No Indian Standard record was found for that identifier. Check the IS number and try again.',
      404
    );
  }

  sendJson(res, 200, toStandardProfile(doc));
});

module.exports = { getStandard };
