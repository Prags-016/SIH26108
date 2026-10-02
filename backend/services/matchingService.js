const Standard = require('../models/Standard');
const AppError = require('../utils/AppError');
const { detectLanguage } = require('./language');
const {
  DOMAINS,
  isForcedNoMatch,
  detectDomains,
  explicitStandardIds,
  multiSummary
} = require('./domains');
const {
  toRecommendationCard,
  toAlliedCard,
  toCertification,
  dedupeCertifications,
  buildRecommendation,
  emptyRecommendation
} = require('./presenters');

const MATCH_TEXT_LIMIT = 20000;

async function loadByIds(ids) {
  if (!ids.length) return [];
  const docs = await Standard.find({ id: { $in: ids } }).maxTimeMS(8000).lean();
  const byId = new Map(docs.map((doc) => [doc.id, doc]));
  return ids.map((id) => byId.get(id)).filter(Boolean);
}

async function assertCatalogue() {
  const count = await Standard.countDocuments().maxTimeMS(8000);
  if (count === 0) {
    throw new AppError(
      'NO_MATCH_FOUND',
      'No Indian Standards are loaded yet. Seed the catalogue and try again.',
      404
    );
  }
  return count;
}

function cardsFor(docs, mapper) {
  return docs.map((doc, index) => mapper(doc, index + 1));
}

function certificationsFor(docs, includeCert) {
  if (!includeCert) return [];
  const mandatory = [];
  const optional = [];
  for (const doc of docs) {
    const cert = toCertification(doc);
    if (!cert) continue;
    if (cert.mandatory === 'Yes') mandatory.push(cert);
    else optional.push(cert);
  }
  return dedupeCertifications(mandatory.length ? mandatory : optional);
}

function bundleFromDocs(primaryDocs, alliedDocs, includeAllied, includeCert) {
  return {
    primaryCards: cardsFor(primaryDocs, toRecommendationCard),
    alliedCards: includeAllied ? cardsFor(alliedDocs, toAlliedCard) : [],
    certifications: certificationsFor(primaryDocs, includeCert)
  };
}

function translatedQueryFor(query, language, domainKeys) {
  if (language.code === 'en') return null;
  if (domainKeys.length === 1 && domainKeys[0] === 'jewellery' && language.code === 'hi' && DOMAINS.jewellery.translated_query) {
    return DOMAINS.jewellery.translated_query;
  }
  return `Query received in ${language.name}. Matching used bilingual keywords against the Indian Standards catalogue.`;
}

async function bundleForDomain(key, options) {
  const domain = DOMAINS[key];
  const primaryDocs = await loadByIds(domain.primaryIds);
  if (primaryDocs.length === 0) {
    await assertCatalogue();
    throw new AppError(
      'NO_MATCH_FOUND',
      'The matching standards are not in the catalogue. Re-run the seed script and try again.',
      404
    );
  }
  const alliedDocs = options.includeAllied ? await loadByIds(domain.alliedIds) : [];
  const packed = bundleFromDocs(primaryDocs, alliedDocs, options.includeAllied, options.includeCert);
  const multi = options.compact === true;
  return {
    ...packed,
    summary: multi ? domain.item_summary : domain.summary,
    clause: multi ? domain.item_clause : domain.clause,
    warnings: multi ? domain.item_warnings : domain.warnings,
    versionWarning: typeof domain.versionWarning === 'function' ? domain.versionWarning(options.query) : null,
    item_name: domain.item_name
  };
}

function genericClause(cards) {
  const list = cards.map((card) => `${card.is_number} (${card.latest_version})`).join(', ');
  return `The goods supplied under this contract shall conform to the following Indian Standard(s): ${list}. Where a Quality Control Order applies, the goods shall bear the relevant BIS Standard Mark or Compulsory Registration and the bidder shall submit the valid licence or registration with the technical bid.`;
}

/**
 * Semantic / LLM matching seam.
 *
 * `rankCandidates` is the only function a later embedding or chat ranker
 * needs to replace. It must return MongoDB standard documents, best match
 * first. The 30 second response budget still applies, so any model call
 * has to finish well inside that limit and must not receive raw file bytes.
 *
 * The current implementation is lexical: domain rules, explicit IS numbers,
 * then a MongoDB text score. No external model is called.
 */
function textSearchString(query) {
  return String(query || '')
    .replace(/IS[\s-]*(\d{3,5})/gi, 'IS $1')
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 400);
}

async function rankCandidates(query) {
  const explicit = explicitStandardIds(query);
  if (explicit.length) {
    let docs = await loadByIds(explicit);
    if (!docs.length) {
      const prefixes = explicit.filter((id) => /^IS-\d+$/.test(id));
      if (prefixes.length) {
        docs = await Standard.find({
          $or: prefixes.map((id) => ({ id: new RegExp(`^${id}-`) }))
        }).maxTimeMS(8000).lean();
      }
    }
    const usable = docs.filter((doc) => doc.role !== 'reference' && doc.status !== 'superseded' && doc.status !== 'withdrawn');
    if (usable.length) return { docs: usable, mode: 'explicit' };
  }

  const search = textSearchString(query);
  let textDocs = [];
  if (search) {
    try {
      textDocs = await Standard.find(
        { $text: { $search: search }, role: { $ne: 'reference' } },
        { score: { $meta: 'textScore' } }
      )
        .sort({ score: { $meta: 'textScore' } })
        .limit(8)
        .maxTimeMS(8000)
        .lean();
    } catch (err) {
      console.error(err);
      textDocs = [];
    }
  }

  const primaries = textDocs.filter((doc) => doc.role === 'primary');
  if (primaries.length) return { docs: primaries, mode: 'text' };
  if (textDocs.length) return { docs: textDocs.slice(0, 3), mode: 'text' };
  return { docs: [], mode: 'none' };
}

async function alliedForDomains(domains, includeAllied) {
  if (!includeAllied || domains.length === 0) return [];
  return loadByIds(domains.flatMap((domain) => (DOMAINS[domain] ? DOMAINS[domain].alliedIds : [])));
}

async function fromRankedDocs(query, language, options, requestId, ranked) {
  const primaryHits = ranked.docs.filter((doc) => doc.role === 'primary');
  const domains = primaryHits.length
    ? [...new Set(primaryHits.map((doc) => doc.domain).filter((domain) => DOMAINS[domain]))]
    : [];
  const alliedDocs = await alliedForDomains(domains, options.includeAllied);
  const packed = bundleFromDocs(ranked.docs, alliedDocs, options.includeAllied, options.includeCert);
  const summary = packed.primaryCards[0]
    ? packed.primaryCards[0].title
    : 'Indian Standard matches for the submitted specification';

  return buildRecommendation({
    requestId,
    detectedLanguage: language.name,
    productSummary: summary,
    translatedQuery: translatedQueryFor(query, language, domains),
    userVersionWarning: null,
    ...packed,
    suggestedClause: genericClause(packed.primaryCards),
    warnings: ['Confirm the cited edition is still current on the BIS portal before freezing the tender clause.'],
    items: []
  });
}

async function fromDomains(query, language, domainKeys, options, requestId) {
  if (domainKeys.length === 1) {
    const bundle = await bundleForDomain(domainKeys[0], { ...options, query, compact: false });
    return buildRecommendation({
      requestId,
      detectedLanguage: language.name,
      productSummary: bundle.summary,
      translatedQuery: translatedQueryFor(query, language, domainKeys),
      userVersionWarning: bundle.versionWarning,
      primaryCards: bundle.primaryCards,
      alliedCards: bundle.alliedCards,
      certifications: bundle.certifications,
      suggestedClause: bundle.clause,
      warnings: bundle.warnings,
      items: []
    });
  }

  const bundles = [];
  for (const key of domainKeys) {
    bundles.push({ key, ...(await bundleForDomain(key, { ...options, query, compact: true })) });
  }

  const items = bundles.map((bundle, index) => ({
    item_id: `item-${index + 1}`,
    item_name: bundle.item_name,
    product_summary: bundle.summary,
    primary_standards: bundle.primaryCards,
    recommended_standards: bundle.primaryCards,
    allied_standards: bundle.alliedCards,
    certifications: bundle.certifications,
    mandatory_certifications: bundle.certifications,
    suggested_clause: bundle.clause,
    warnings: bundle.warnings,
    user_version_warning: bundle.versionWarning
  }));

  const primaryCards = items
    .flatMap((item) => item.primary_standards)
    .map((card, index) => ({ ...card, rank: index + 1 }));
  const alliedCards = items
    .flatMap((item) => item.allied_standards)
    .map((card, index) => ({ ...card, rank: index + 1 }));
  const certifications = items.flatMap((item) => item.certifications);
  const warnings = [...new Set(items.flatMap((item) => item.warnings))];

  const versionWarning = items.map((item) => item.user_version_warning).find(Boolean) || null;

  return buildRecommendation({
    requestId,
    detectedLanguage: language.name,
    productSummary: multiSummary(domainKeys),
    translatedQuery: translatedQueryFor(query, language, domainKeys),
    userVersionWarning: versionWarning,
    primaryCards,
    alliedCards,
    certifications: dedupeCertifications(certifications),
    suggestedClause: items.map((item) => item.suggested_clause).filter(Boolean).join('\n\n'),
    warnings,
    items
  });
}

async function matchStandards({
  query,
  language = 'auto',
  includeAllied = true,
  includeCert = true,
  requestId
}) {
  const text = String(query || '').slice(0, MATCH_TEXT_LIMIT);
  const detected = detectLanguage(text, language);

  if (isForcedNoMatch(text)) {
    return emptyRecommendation({
      requestId,
      detectedLanguage: detected.name,
      productSummary: text
    });
  }

  const domainKeys = detectDomains(text);
  const options = { includeAllied, includeCert, query: text };

  try {
    if (domainKeys.length) {
      return await fromDomains(text, detected, domainKeys, options, requestId);
    }

    const ranked = await rankCandidates(text);
    if (!ranked.docs.length) {
      await assertCatalogue();
      return emptyRecommendation({
        requestId,
        detectedLanguage: detected.name,
        productSummary: text
      });
    }
    return await fromRankedDocs(text, detected, options, requestId, ranked);
  } catch (err) {
    if (err instanceof AppError) throw err;
    console.error(err);
    throw new AppError(
      'INTERNAL_ERROR',
      'The standards catalogue could not be searched right now. Please try again shortly.',
      500
    );
  }
}

module.exports = {
  matchStandards,
  rankCandidates,
  MATCH_TEXT_LIMIT
};
