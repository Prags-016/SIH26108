function labelAmendments(amendments, label) {
  if (label) return label;
  if (!Array.isArray(amendments) || amendments.length === 0) return 'Nil';
  const numbers = amendments.map((item) => {
    const match = String(item.number || '').match(/(\d+)/);
    return match ? match[1] : item.number;
  }).filter(Boolean);
  if (numbers.length === 0) return 'Nil';
  if (numbers.length === 1) return `Amendment ${numbers[0]}`;
  return `Amendments ${numbers.join(', ')}`;
}

function versionMeta(latest) {
  const source = latest || {};
  return {
    designation: source.designation || '',
    year: source.year ?? null,
    reaffirmed_year: source.reaffirmed_year ?? null,
    published_on: source.published_on || null
  };
}

function detailVersion(latest) {
  const source = latest || {};
  if (source.citation) return source.citation;
  if (!source.designation) return '';
  if (source.reaffirmed_year) {
    return `${source.designation} (Reaffirmed ${source.reaffirmed_year})`;
  }
  return source.designation;
}

function toRecommendationCard(doc, rank) {
  const meta = versionMeta(doc.latest_version);
  return {
    rank,
    id: doc.id,
    is_number: doc.is_number,
    part: doc.part || '',
    title: doc.title,
    relevance: doc.relevance_score,
    relevance_score: doc.relevance_score,
    status: doc.status,
    latest_version: meta.designation,
    latest_version_meta: meta,
    amendments: labelAmendments(doc.amendments, doc.amendments_label),
    reason: doc.reason || '',
    scope_summary: doc.scope_summary || '',
    ics_code: doc.ics_code || '',
    superseded_by: doc.superseded_by || null,
    bis_url: doc.bis_url || '',
    relation_type: doc.relation_type || '',
    related_to: doc.related_to || ''
  };
}

function toAlliedCard(doc, rank) {
  const card = toRecommendationCard(doc, rank);
  if (!card.relation_type) card.relation_type = 'Related Standards';
  if (!card.related_to) card.related_to = 'Primary';
  return card;
}

function toCertification(doc) {
  const cert = doc && doc.certification;
  if (!cert || !cert.scheme) return null;
  return {
    scheme: cert.scheme,
    name: cert.name || cert.scheme,
    mandatory: cert.is_mandatory ? 'Yes' : 'No',
    applies_to: cert.applies_to || doc.title,
    basis: cert.basis || cert.regulatory_order || '',
    notes: cert.notes || cert.prohibition_clause || ''
  };
}

function toStandardProfile(doc) {
  const meta = versionMeta(doc.latest_version);
  return {
    id: doc.id,
    is_number: doc.is_number,
    part: doc.part || '',
    title: doc.title,
    relevance_score: doc.relevance_score ?? 0,
    reason: doc.reason || '',
    scope_summary: doc.scope_summary || '',
    scope: doc.scope || doc.scope_summary || '',
    ics_code: doc.ics_code || '',
    status: doc.status,
    latest_version: detailVersion(doc.latest_version),
    latest_version_meta: meta,
    amendments: Array.isArray(doc.amendments) ? doc.amendments : [],
    superseded_by: doc.superseded_by || null,
    bis_url: doc.bis_url || '',
    bis_link: doc.bis_url || '',
    version_history: Array.isArray(doc.version_history) ? doc.version_history : [],
    normative_references: Array.isArray(doc.normative_references) ? doc.normative_references : [],
    certification: doc.certification || null
  };
}

function dedupeCertifications(certs) {
  const seen = new Set();
  const out = [];
  for (const cert of certs) {
    if (!cert) continue;
    const key = `${cert.scheme}|${cert.applies_to}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(cert);
  }
  return out;
}

function buildRecommendation({
  requestId,
  detectedLanguage,
  productSummary,
  translatedQuery = null,
  userVersionWarning = null,
  primaryCards = [],
  alliedCards = [],
  certifications = [],
  suggestedClause = '',
  warnings = [],
  items = [],
  documentInfo
}) {
  const primary = primaryCards;
  const body = {
    request_id: requestId,
    status: primary.length > 0 || (items && items.length > 0) ? 'ok' : 'NO_MATCH_FOUND',
    detected_language: detectedLanguage,
    product_summary: productSummary || '',
    translated_query: translatedQuery,
    user_version_warning: userVersionWarning,
    primary_standards: primary,
    recommended_standards: primary,
    allied_standards: alliedCards,
    certifications,
    mandatory_certifications: certifications,
    suggested_clause: suggestedClause || '',
    warnings,
    items
  };
  if (documentInfo) {
    body.document_info = documentInfo;
  }
  return body;
}

function emptyRecommendation({ requestId, detectedLanguage, productSummary, documentInfo }) {
  const summary = String(productSummary || '').replace(/\s+/g, ' ').trim().slice(0, 280);
  return buildRecommendation({
    requestId,
    detectedLanguage,
    productSummary: summary,
    primaryCards: [],
    alliedCards: [],
    certifications: [],
    suggestedClause: '',
    warnings: ['No direct matching Indian Standards could be identified for this query.'],
    items: [],
    documentInfo
  });
}

module.exports = {
  labelAmendments,
  versionMeta,
  detailVersion,
  toRecommendationCard,
  toAlliedCard,
  toCertification,
  toStandardProfile,
  dedupeCertifications,
  buildRecommendation,
  emptyRecommendation
};
