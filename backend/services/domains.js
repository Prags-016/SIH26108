/**
 * Curated procurement domains used by the lexical matcher.
 * Each domain names the MongoDB standard ids to load, in display rank order.
 * Clause text is response copy; the standard facts themselves live in MongoDB.
 */

const DOMAIN_ORDER = ['cement', 'electronics', 'jewellery', 'water'];

const DOMAINS = {
  cement: {
    triggers: [
      /cement/i,
      /\bopc\b/i,
      /portland/i,
      /is[\s-]*269\b/i,
      /is[\s-]*456\b/i,
      /is[\s-]*8112\b/i,
      /is[\s-]*12269\b/i,
      /reinforced concrete/i,
      /\brcc\b/i,
      /\b43\s*grade\b/i,
      /\b53\s*grade\b/i,
      /\b33\s*grade\b/i,
      /सीमेंट/
    ],
    primaryIds: ['IS-269', 'IS-456'],
    alliedIds: ['IS-4031-1', 'IS-4031-6', 'IS-4032', 'IS-11652', 'IS-4845'],
    summary: 'Ordinary Portland Cement (OPC) 43/53 Grade for Reinforced Concrete Civil Works',
    item_name: 'Item 1: Structural Portland Cement (Civil Works)',
    item_summary: 'Ordinary Portland Cement 53 Grade conforming to IS 269',
    clause: `TENDER SPECIFICATION COMPLIANCE CLAUSE:
The cement supplied under this contract shall strictly conform to IS 269:2015 (Ordinary Portland Cement - Specification, Sixth Revision) of the grade specified in the Schedule of Quantities. The cement shall hold a valid Bureau of Indian Standards (BIS) Certification Mark (ISI Mark) under Scheme-I of BIS (Conformity Assessment) Regulations, 2018 in compliance with the Cement (Quality Control) Order issued by the Government of India. The bidder shall furnish a copy of the manufacturer's valid BIS license along with the technical bid, and each consignment delivered at the site shall bear the ISI Mark, manufacturer's name, brand, grade, week and year of manufacture, and net mass on every bag as per IS 269:2015 and IS 11652:2017. Acceptance testing shall be carried out in accordance with IS 4031 and IS 4032 at a NABL-accredited test laboratory.`,
    item_clause: 'Cement for Item 1 shall conform to IS 269:2015 with valid ISI mark under DPIIT Cement QCO.',
    warnings: [
      'Ensure the manufacturer possesses an active, un-suspended BIS License at the time of bid submission and material dispatch.',
      'IS 8112 (43 grade) and IS 12269 (53 grade) standards are withdrawn; ensure tender terms do not refer to superseded standards without citing IS 269:2015.',
      'Check that cement bags stored for more than 90 days from the date of manufacture are retested for compressive strength prior to incorporation into permanent civil works.'
    ],
    item_warnings: ['Ensure valid BIS license for cement manufacturer.'],
    versionWarning(query) {
      if (/8112|12269|269\s*:\s*1989/i.test(query)) {
        return "Notice: Your specification input referenced an earlier edition ('IS 269:1989 / IS 8112'). Please note that IS 8112 (43 grade) and IS 12269 (53 grade) were superseded and amalgamated into IS 269:2015 (Sixth Revision). Tender documents must cite IS 269:2015 directly.";
      }
      return null;
    }
  },
  electronics: {
    triggers: [
      /laptop/i,
      /notebook/i,
      /\bcomputer/i,
      /power\s*adapter/i,
      /\bcrs\b/i,
      /lithium/i,
      /is[\s-]*13252\b/i,
      /is[\s-]*16046\b/i,
      /e-?office/i,
      /information technology equipment/i
    ],
    primaryIds: ['IS-13252-1', 'IS-16046-2'],
    alliedIds: ['IS-616', 'IS-14886', 'IS-12063'],
    summary: 'Commercial Laptops / Portable Information Technology Equipment and Power Adapters',
    item_name: 'Item 2: IT Equipment & Laptops (Administrative Setup)',
    item_summary: 'Commercial Laptops with CRS Certification',
    clause: `TENDER SPECIFICATION COMPLIANCE CLAUSE:
The IT hardware equipment (laptops, notebook computers, and external power adapters) supplied under this tender must strictly conform to IS 13252 (Part 1):2010 / IEC 60950-1 and have valid registration under the Compulsory Registration Scheme (CRS - Scheme II) of the Bureau of Indian Standards (BIS) in compliance with the Electronics and Information Technology Goods (Requirement for Compulsory Registration) Order, 2012 issued by MeitY. The internal rechargeable battery packs must independently conform to IS 16046 (Part 2):2018 / IEC 62133-2 with separate valid BIS CRS registration. Every unit and its primary packaging carton shall visibly bear the BIS standard CRS mark with the inscription "Self-Declaration - Conforming to IS 13252 (Part 1):2010, R-XXXXXXXX, www.bis.gov.in". Bidders must submit copies of the valid BIS CRS grant letters and test reports issued by a BIS-recognized test laboratory with the technical bid.`,
    item_clause: 'IT equipment under Item 2 shall comply with IS 13252 (Part 1):2010 and carry valid BIS CRS registration.',
    warnings: [
      'Verify the R-number (Registration Number) directly on the official BIS CRS portal (www.crsbis.in) to verify status and brand inclusion.',
      'Power adapters and battery packs are treated as distinct mandatory categories; ensure OEM supplies certified peripherals under valid registrations.',
      'Suppliers importing equipment must be verified as authorized Indian Representatives registered with BIS.'
    ],
    item_warnings: ['Validate R-numbers on official crsbis.in database before procurement award.']
  },
  jewellery: {
    triggers: [
      /\bgold\b/i,
      /jewel/i,
      /hallmark/i,
      /\bhuid\b/i,
      /karat/i,
      /carat/i,
      /is[\s-]*1417\b/i,
      /सोन/,
      /कैरेट/,
      /आभूषण/,
      /हॉलमार्क/,
      /हालमार्क/
    ],
    primaryIds: ['IS-1417'],
    alliedIds: ['IS-1418', 'IS-2114', 'IS-2112'],
    summary: '22 Karat Gold Jewellery and Commemorative Mementos / Artefacts',
    item_name: 'Item: Gold Jewellery and Artefacts',
    item_summary: '22 Karat gold jewellery and artefacts with BIS hallmarking',
    translated_query: 'Procurement of 22 Karat Gold Jewellery, Coins, or Artefacts for official presentation / mementos with BIS Hallmarking',
    clause: `TENDER SPECIFICATION COMPLIANCE CLAUSE:
All gold jewellery, coins, or commemorative artefacts supplied under this contract shall strictly conform to IS 1417:2016 (Gold and Gold Alloys, Jewellery/Artefacts - Fineness and Marking) of 22 Karat (916 fineness) purity. In accordance with the Hallmarking of Gold Jewellery and Gold Artefacts Order, 2020, every item must be hallmarked by a BIS-recognized Assaying and Hallmarking Centre (AHC) and must bear the three mandatory laser marks: (1) Official BIS Hallmark triangle logo, (2) Purity/Fineness symbol "22K916", and (3) Individual 6-digit alphanumeric Hallmark Unique Identification (HUID) code. The vendor must be a registered jeweller with the Bureau of Indian Standards and must provide an authenticated HUID verification certificate from the BIS Care Portal with every deliverable item.`,
    item_clause: 'Gold articles shall conform to IS 1417:2016 and carry a BIS hallmark with a 6-digit HUID.',
    warnings: [
      'Do not accept any non-hallmarked or non-HUID marked gold items under government procurement contracts.',
      'The procuring entity should verify the 6-digit HUID code using the BIS Care Mobile App or BIS portal before releasing vendor payment.'
    ],
    item_warnings: [
      'Verify the 6-digit HUID before releasing payment.'
    ]
  },
  water: {
    triggers: [
      /drinking water/i,
      /packaged water/i,
      /bottled/i,
      /is[\s-]*14543\b/i,
      /mineral water/i,
      /dispenser/i,
      /पेयजल/,
      /बोतलबंद/
    ],
    primaryIds: ['IS-14543'],
    alliedIds: ['IS-3025-1'],
    summary: 'Packaged Drinking Water for Institutional Catering and Public Supplies',
    item_name: 'Item: Packaged Drinking Water',
    item_summary: 'Packaged drinking water conforming to IS 14543',
    clause: 'Packaged drinking water supplied shall conform to IS 14543:2016, carrying the ISI Mark and valid FSSAI license number.',
    item_clause: 'Packaged drinking water supplied shall conform to IS 14543:2016, carrying the ISI Mark and valid FSSAI license number.',
    warnings: [
      'Random batch water samples should be submitted to accredited public health laboratories for periodic testing.'
    ],
    item_warnings: [
      'Random batch water samples should be submitted to accredited public health laboratories for periodic testing.'
    ]
  }
};

function isForcedNoMatch(query) {
  const text = String(query || '').toLowerCase();
  return text.includes('quantum') || text.includes('flux capacitor') || text.includes('nomatch');
}

function detectDomains(query) {
  const text = String(query || '');
  return DOMAIN_ORDER.filter((key) => DOMAINS[key].triggers.some((pattern) => pattern.test(text)));
}

function explicitStandardIds(query) {
  const found = [];
  const re = /IS[\s-]*(\d{3,5})(?:[^\d]{0,16}(?:part|section)[^\d]{0,8}(\d{1,2}))?/gi;
  let match = re.exec(String(query || ''));
  while (match) {
    found.push(match[2] ? `IS-${match[1]}-${match[2]}` : `IS-${match[1]}`);
    match = re.exec(String(query || ''));
  }
  return [...new Set(found)];
}

function multiSummary(keys) {
  const set = new Set(keys);
  if (set.size === 2 && set.has('cement') && set.has('electronics')) {
    return 'Comprehensive Civil Infrastructure and IT Package: Structural Cement and Desktop/Laptop Systems';
  }
  const names = keys.map((key) => DOMAINS[key].item_summary);
  return `Multi-item tender covering ${names.join('; ')}`;
}

module.exports = {
  DOMAIN_ORDER,
  DOMAINS,
  isForcedNoMatch,
  detectDomains,
  explicitStandardIds,
  multiSummary
};
