function stripOperators(value) {
  if (Array.isArray(value)) {
    return value.map(stripOperators);
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, child] of Object.entries(value)) {
      if (key.startsWith('$') || key.includes('.') || key === '__proto__' || key === 'constructor' || key === 'prototype') {
        continue;
      }
      out[key] = stripOperators(child);
    }
    return out;
  }
  return value;
}

function sanitizeBody(req, res, next) {
  if (req.body && typeof req.body === 'object') {
    req.body = stripOperators(req.body);
  }
  next();
}

module.exports = sanitizeBody;
