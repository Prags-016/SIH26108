const AppError = require('../utils/AppError');

function normalizeText(text) {
  return String(text || '')
    .replace(/\u0000/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function extractPdf(buffer) {
  let pdfParse;
  try {
    pdfParse = require('pdf-parse');
  } catch (err) {
    console.error(err);
    throw new AppError(
      'INTERNAL_ERROR',
      'PDF reading is unavailable on this server. Upload a TXT or DOCX file instead.',
      500
    );
  }
  const parsed = await pdfParse(buffer);
  return parsed && parsed.text ? parsed.text : '';
}

async function extractDocx(buffer) {
  const mammoth = require('mammoth');
  const parsed = await mammoth.extractRawText({ buffer });
  return parsed && parsed.value ? parsed.value : '';
}

async function extractText(file) {
  const name = String(file.originalname || '').toLowerCase();
  let raw = '';

  try {
    if (name.endsWith('.txt')) {
      raw = file.buffer.toString('utf8');
    } else if (name.endsWith('.pdf')) {
      raw = await extractPdf(file.buffer);
    } else if (name.endsWith('.docx')) {
      raw = await extractDocx(file.buffer);
    } else {
      throw new AppError(
        'UNSUPPORTED_FILE_TYPE',
        'This file type is not supported. Upload a PDF, DOCX, or TXT file up to 10 MB.',
        415
      );
    }
  } catch (err) {
    if (err instanceof AppError) throw err;
    console.error(err);
    throw new AppError(
      'VALIDATION_ERROR',
      'Text could not be read from this file. Use a text-based PDF, DOCX, or TXT document.',
      400
    );
  }

  return normalizeText(raw);
}

module.exports = {
  normalizeText,
  extractText
};
