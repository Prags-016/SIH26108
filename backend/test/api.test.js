const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const { detectLanguage } = require('../services/language');
const { detectDomains, isForcedNoMatch } = require('../services/domains');
const { labelAmendments, buildRecommendation } = require('../services/presenters');
const { sanitizePayload } = require('../utils/http');
const errorHandler = require('../middleware/errorHandler');
const AppError = require('../utils/AppError');
const { assertFileSignature } = require('../middleware/upload');
const { app } = require('../server');

function invokeError(err) {
  return new Promise((resolve) => {
    const res = {
      statusCode: 200,
      headers: {},
      body: null,
      headersSent: false,
      status(code) {
        this.statusCode = code;
        return this;
      },
      setHeader(name, value) {
        this.headers[name] = value;
      },
      send(payload) {
        this.body = JSON.parse(payload);
        resolve(this);
      }
    };
    errorHandler(err, {}, res, () => resolve(res));
  });
}

function request(method, path, { body, headers } = {}) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      const req = http.request({
        hostname: '127.0.0.1',
        port,
        path,
        method,
        headers: headers || {}
      }, (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          server.close(() => {
            const raw = Buffer.concat(chunks).toString('utf8');
            resolve({
              status: res.statusCode,
              headers: res.headers,
              body: raw ? JSON.parse(raw) : null
            });
          });
        });
      });
      req.on('error', (err) => {
        server.close(() => reject(err));
      });
      if (body) req.write(body);
      req.end();
    });
  });
}

test('language auto-detection reads Devanagari as Hindi and Latin as English', () => {
  const hindi = detectLanguage('22 कैरेट सोने के आभूषण', 'auto');
  assert.equal(hindi.name, 'Hindi');
  assert.equal(detectLanguage('ordinary portland cement for rcc', 'auto').name, 'English');
  assert.equal(detectLanguage('ordinary portland cement', 'hi').name, 'Hindi');
});

test('domain detection covers the portal example queries', () => {
  const cement = 'Procurement of Ordinary Portland Cement 43 Grade (referencing earlier IS 8112 / IS 269) for heavy structural reinforced concrete bridge foundation';
  assert.deepEqual(detectDomains(cement), ['cement']);

  const laptop = 'Supply of 500 commercial laptops and notebook computers with 65W power adapters and internal lithium-ion battery packs';
  assert.deepEqual(detectDomains(laptop), ['electronics']);

  const gold = '22 कैरेट सोने के स्मृति सिक्के एवं आभूषणों की खरीद';
  assert.deepEqual(detectDomains(gold), ['jewellery']);

  const water = 'Annual rate contract for supply of 1-litre bottled packaged drinking water';
  assert.deepEqual(detectDomains(water), ['water']);

  const multi = 'Tender for comprehensive project package including civil construction with 53 grade cement and office digitization with commercial laptops.';
  assert.deepEqual(detectDomains(multi), ['cement', 'electronics']);
  assert.equal(isForcedNoMatch('quantum flux capacitor for a lab'), true);
});

test('recommendation payload never leaves list fields null', () => {
  const body = buildRecommendation({
    requestId: 'REQ-2026-0929-1000',
    detectedLanguage: 'English',
    productSummary: 'Cement',
    primaryCards: [],
    alliedCards: null,
    certifications: null,
    warnings: null,
    items: null
  });
  const safe = sanitizePayload(body);
  for (const key of ['primary_standards', 'recommended_standards', 'allied_standards', 'certifications', 'mandatory_certifications', 'warnings', 'items']) {
    assert.ok(Array.isArray(safe[key]), key);
  }
  assert.equal(labelAmendments([]), 'Nil');
  assert.equal(labelAmendments([{ number: 'Amendment No. 1' }, { number: 'Amendment No. 2' }]), 'Amendments 1, 2');
});

test('error middleware uses the handoff envelope', async () => {
  const validation = await invokeError(new AppError('VALIDATION_ERROR', 'The product description must be between 10 and 5000 characters.', 400));
  assert.deepEqual(validation.body, {
    error: {
      code: 'VALIDATION_ERROR',
      message: 'The product description must be between 10 and 5000 characters.',
      details: null
    }
  });
  assert.equal(validation.statusCode, 400);

  const leaked = await invokeError(new Error('MongoServerError secret'));
  assert.equal(leaked.body.error.code, 'INTERNAL_ERROR');
  assert.equal(leaked.body.error.details, null);
  assert.equal(JSON.stringify(leaked.body).includes('secret'), false);
});

test('upload signatures reject a renamed file', () => {
  assert.throws(
    () => assertFileSignature({ originalname: 'spec.pdf', buffer: Buffer.from('not a pdf') }),
    (err) => err.code === 'UNSUPPORTED_FILE_TYPE'
  );
  assert.doesNotThrow(() => assertFileSignature({
    originalname: 'spec.txt',
    buffer: Buffer.from('Ordinary Portland Cement 43 grade for bridge work.')
  }));
});

test('health, validation, and unknown routes stay inside the JSON contract', async () => {
  const health = await request('GET', '/api/v1/health', {
    headers: { Origin: 'http://localhost:5173' }
  });
  assert.equal(health.status, 200);
  assert.deepEqual(health.body, { status: 'ok', data_last_synced: '2026-09-25' });
  assert.equal(health.headers['access-control-allow-origin'], 'http://localhost:5173');
  assert.equal(health.headers['access-control-allow-credentials'], 'true');
  assert.match(health.headers['content-type'], /application\/json;\s*charset=utf-8/i);

  const tooShort = await request('POST', '/api/v1/recommend', {
    headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:5173' },
    body: JSON.stringify({ query: 'cement' })
  });
  assert.equal(tooShort.status, 400);
  assert.equal(tooShort.body.error.code, 'VALIDATION_ERROR');
  assert.equal(tooShort.body.error.details, null);

  const missing = await request('GET', '/api/v1/does-not-exist');
  assert.equal(missing.status, 404);
  assert.equal(missing.body.error.code, 'VALIDATION_ERROR');
  assert.equal(missing.body.error.details, null);
});

