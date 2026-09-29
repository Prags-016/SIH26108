function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function canonicalStandardId(param) {
  const raw = decodeURIComponent(String(param || '')).trim();
  if (!raw) return '';

  const partMatch = raw.match(/IS[\s-]*(\d{3,5})(?:[^\d]{0,16}(?:part|section)[^\d]{0,8}(\d{1,2}))?/i);
  if (partMatch) {
    return partMatch[2] ? `IS-${partMatch[1]}-${partMatch[2]}` : `IS-${partMatch[1]}`;
  }

  return raw;
}

function createRequestId() {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `REQ-${y}-${m}${d}-${suffix}`;
}

module.exports = {
  escapeRegex,
  canonicalStandardId,
  createRequestId
};
