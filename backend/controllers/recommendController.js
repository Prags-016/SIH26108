const env = require('../config/env');
const AppError = require('../utils/AppError');
const asyncHandler = require('../middleware/asyncHandler');
const { createRequestId } = require('../utils/ids');
const { sendJson } = require('../utils/http');
const { matchStandards, MATCH_TEXT_LIMIT } = require('../services/matchingService');
const { extractText } = require('../services/textExtract');
const { assertFileSignature } = require('../middleware/upload');

function parseFlag(value, name, fallback) {
  if (value === undefined || value === null || value === '') return fallback;
  if (value === true || value === 'true' || value === '1' || value === 1) return true;
  if (value === false || value === 'false' || value === '0' || value === 0) return false;
  throw new AppError('VALIDATION_ERROR', `${name} must be true or false.`, 400);
}

function readFlags(body) {
  const source = body || {};
  const language = source.language === undefined || source.language === null || source.language === ''
    ? 'auto'
    : String(source.language).slice(0, 16);
  return {
    language,
    includeAllied: parseFlag(source.include_allied !== undefined ? source.include_allied : source.includeAllied, 'include_allied', true),
    includeCert: parseFlag(source.include_cert !== undefined ? source.include_cert : source.includeCert, 'include_cert', true)
  };
}

function assertQuery(query) {
  if (typeof query !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'Describe the product in the "query" field as text.', 400);
  }
  const trimmed = query.trim();
  if (trimmed.length < env.queryMin || trimmed.length > env.queryMax) {
    throw new AppError(
      'VALIDATION_ERROR',
      `The product description must be between ${env.queryMin} and ${env.queryMax} characters.`,
      400
    );
  }
  return trimmed;
}

function safeFilename(name) {
  return String(name || 'upload').replace(/[\r\n"]/g, '').slice(0, 180);
}

function documentMapping(result) {
  if (Array.isArray(result.items) && result.items.length > 0) {
    return result.items.map((item) => ({
      item_id: item.item_id,
      label: item.item_name,
      matched_standard_ids: (item.primary_standards || []).map((card) => card.id)
    }));
  }
  return [{
    item_id: 'item-1',
    label: result.product_summary || 'Uploaded specification',
    matched_standard_ids: (result.primary_standards || []).map((card) => card.id)
  }];
}

async function handleUpload(req, res) {
  if (!req.file) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Attach a PDF, DOCX, or TXT file in the form field named "file".',
      400
    );
  }

  assertFileSignature(req.file);
  const extracted = await extractText(req.file);
  const sizeBytes = req.file.size || (req.file.buffer ? req.file.buffer.length : 0);
  const filename = safeFilename(req.file.originalname);
  const mimeType = req.file.mimetype || 'application/octet-stream';
  req.file.buffer = Buffer.alloc(0);

  if (extracted.length < env.queryMin) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Not enough readable text was found in this file. Upload a text-based PDF, DOCX, or TXT with at least 10 characters.',
      400
    );
  }

  const flags = readFlags(req.body);
  const requestId = createRequestId();
  const result = await matchStandards({
    query: extracted.slice(0, MATCH_TEXT_LIMIT),
    ...flags,
    requestId
  });

  result.document_info = {
    filename,
    mime_type: mimeType,
    size_bytes: sizeBytes,
    extracted_characters: extracted.length,
    truncated_for_matching: extracted.length > MATCH_TEXT_LIMIT,
    detected_items: documentMapping(result)
  };
  if (!Array.isArray(result.items)) result.items = [];

  sendJson(res, 200, result);
}

const recommendText = asyncHandler(async (req, res) => {
  if (req.file) {
    await handleUpload(req, res);
    return;
  }
  const query = assertQuery(req.body && req.body.query);
  const flags = readFlags(req.body);
  const requestId = createRequestId();
  const result = await matchStandards({ query, ...flags, requestId });
  sendJson(res, 200, result);
});

const recommendUpload = asyncHandler(handleUpload);

module.exports = {
  recommendText,
  recommendUpload
};
