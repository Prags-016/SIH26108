const multer = require('multer');
const env = require('../config/env');
const AppError = require('../utils/AppError');

const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.txt'];
const ALLOWED_MIME = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/octet-stream'
]);

function fileFilter(req, file, cb) {
  const name = String(file.originalname || '').toLowerCase();
  const extensionOk = ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext));
  const mimeOk = ALLOWED_MIME.has(file.mimetype);

  if (!extensionOk || !mimeOk) {
    cb(new AppError(
      'UNSUPPORTED_FILE_TYPE',
      'This file type is not supported. Upload a PDF, DOCX, or TXT file up to 10 MB.',
      415
    ));
    return;
  }

  cb(null, true);
}

// Memory storage only. The buffer is discarded after text extraction.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: env.maxUploadBytes,
    files: 1,
    fields: 8,
    fieldSize: 32 * 1024
  },
  fileFilter
});

function assertFileSignature(file) {
  const name = String(file.originalname || '').toLowerCase();
  const buffer = file.buffer || Buffer.alloc(0);

  if (name.endsWith('.pdf')) {
    if (buffer.subarray(0, 5).toString('utf8') !== '%PDF-') {
      throw new AppError(
        'UNSUPPORTED_FILE_TYPE',
        'The file does not look like a readable PDF. Export it again and retry.',
        415
      );
    }
    return;
  }

  if (name.endsWith('.docx')) {
    const isZip = buffer.length >= 4 && buffer[0] === 0x50 && buffer[1] === 0x4b;
    if (!isZip) {
      throw new AppError(
        'UNSUPPORTED_FILE_TYPE',
        'The file does not look like a DOCX document. Save it as .docx and retry.',
        415
      );
    }
    return;
  }

  if (name.endsWith('.txt')) {
    const sample = buffer.subarray(0, Math.min(buffer.length, 4096));
    if (sample.includes(0)) {
      throw new AppError(
        'UNSUPPORTED_FILE_TYPE',
        'The text file appears to contain binary data and cannot be read.',
        415
      );
    }
    return;
  }

  throw new AppError(
    'UNSUPPORTED_FILE_TYPE',
    'This file type is not supported. Upload a PDF, DOCX, or TXT file up to 10 MB.',
    415
  );
}

module.exports = upload;
module.exports.assertFileSignature = assertFileSignature;
