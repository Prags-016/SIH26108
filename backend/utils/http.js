const ARRAY_FIELDS = new Set([
  'primary_standards',
  'recommended_standards',
  'allied_standards',
  'certifications',
  'mandatory_certifications',
  'warnings',
  'items',
  'amendments',
  'version_history',
  'normative_references',
  'detected_items',
  'keywords'
]);

function sanitizePayload(value, key = '') {
  if (ARRAY_FIELDS.has(key) && (value == null)) {
    return [];
  }
  if (Array.isArray(value)) {
    return value.map((item) => sanitizePayload(item));
  }
  if (value && typeof value === 'object' && !(value instanceof Date)) {
    const out = {};
    for (const [childKey, childValue] of Object.entries(value)) {
      out[childKey] = sanitizePayload(childValue, childKey);
    }
    return out;
  }
  return value;
}

function sendJson(res, statusCode, body) {
  const payload = sanitizePayload(body);
  res.status(statusCode);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.send(JSON.stringify(payload));
}

function sendError(res, statusCode, code, message) {
  res.status(statusCode);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.send(JSON.stringify({
    error: {
      code,
      message,
      details: null
    }
  }));
}

module.exports = {
  ARRAY_FIELDS,
  sanitizePayload,
  sendJson,
  sendError
};
