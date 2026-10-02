function standard(partial) {
  const latest = partial.latest_version;
  return {
    part: '',
    relevance_score: 0,
    reason: '',
    scope_summary: '',
    scope: partial.scope || partial.scope_summary || '',
    ics_code: '',
    amendments: [],
    amendments_label: 'Nil',
    superseded_by: null,
    version_history: [],
    normative_references: [],
    certification: null,
    keywords: [],
    domain: '',
    role: 'primary',
    relation_type: '',
    related_to: '',
    ...partial,
    scope: partial.scope || partial.scope_summary || '',
    bis_url: partial.bis_url || `https://standardsbis.bsbedge.com/bis_search_detail.aspx?id=${partial.id}`,
    latest_version: {
      citation: latest.reaffirmed_year
        ? `${latest.designation} (Reaffirmed ${latest.reaffirmed_year})`
        : latest.designation,
      ...latest
    }
  };
}

const standards = [
  standard({
    id: 'IS-269',
    is_number: 'IS 269',
    part: 'Section 1',
    title: 'Ordinary Portland Cement — Specification (Sixth Revision)',
    relevance_score: 98,
    reason: 'Primary governing specification for ordinary Portland cement (33, 43 and 53 grades) manufactured in India.',
    scope_summary: 'Specifies chemical composition (lime saturation factor, alumina iron ratio, insoluble residue, magnesia) and physical requirements (fineness, setting time, soundness, compressive strength).',
    scope: 'This standard covers the manufacture and chemical and physical requirements of ordinary Portland cement of 33, 43 and 53 grades. It unifies the earlier separate specifications for 33, 43 and 53 grade cement into a single standard.',
    ics_code: '91.100.10 (Cement. Gypsum. Lime. Mortar)',
    status: 'current',
    latest_version: {
      designation: 'IS 269:2015',
      year: 2015,
      reaffirmed_year: 2020,
      published_on: '2015-12-04',
      citation: 'IS 269:2015 (Reaffirmed 2020)'
    },
    amendments: [
      { number: 'Amendment No. 1', date: 'June 2018', summary: 'Inclusion of composite performance criteria and updated packaging norms.' },
      { number: 'Amendment No. 2', date: 'March 2021', summary: 'Revision of permissible limits for insoluble residue and chloride content.' }
    ],
    amendments_label: 'Amendments 1, 2',
    version_history: [
      { edition: 'Sixth Revision (IS 269:2015)', year: '2015', status: 'current', gazette_date: '2015-12-04', remarks: 'Combined IS 269, IS 8112, and IS 12269.' },
      { edition: 'Fifth Revision (IS 269:1989)', year: '1989', status: 'superseded', gazette_date: '', superseded_by: 'IS 269:2015', remarks: 'Specified 33 grade ordinary Portland cement.' },
      { edition: 'Fourth Revision (IS 269:1976)', year: '1976', status: 'superseded', gazette_date: '', superseded_by: 'IS 269:1989', remarks: 'Standard revision.' }
    ],
    normative_references: [
      { id: 'IS-4031-1', is_number: 'IS 4031 (Part 1)', title: 'Methods of physical tests for hydraulic cement: Part 1 Determination of fineness by dry sieving' },
      { id: 'IS-4031-6', is_number: 'IS 4031 (Part 6)', title: 'Methods of physical tests for hydraulic cement: Part 6 Determination of compressive strength' },
      { id: 'IS-4032', is_number: 'IS 4032', title: 'Method of chemical analysis of hydraulic cement' },
      { id: 'IS-4984', is_number: 'IS 4984', title: 'High density polyethylene pipes for water supply' }
    ],
    certification: {
      is_mandatory: true,
      scheme: 'Scheme-I (ISI Mark)',
      name: 'Bureau of Indian Standards Product Certification Scheme',
      regulatory_order: 'Cement (Quality Control) Order, 2003 as amended',
      authority: 'Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce & Industry',
      prohibition_clause: 'No person shall manufacture, store for sale, sell or distribute cement which does not conform to the Indian Standard and which does not bear the Standard Mark.',
      applies_to: 'All grades of Ordinary Portland Cement (33, 43, 53 Grade)',
      basis: 'Cement (Quality Control) Order, 2003 issued by DPIIT, Ministry of Commerce and Industry',
      notes: 'No consignment shall be accepted without the standard ISI mark and manufacturer\'s valid BIS License Number (CM/L-XXXXXXXXX).'
    },
    keywords: ['cement', 'opc', 'portland', '43 grade', '53 grade', '33 grade', 'सीमेंट', 'is 269'],
    domain: 'cement',
    role: 'primary'
  }),

  standard({
    id: 'IS-456',
    is_number: 'IS 456',
    part: 'Plain and Reinforced Concrete',
    title: 'Plain and Reinforced Concrete — Code of Practice (Fourth Revision)',
    relevance_score: 88,
    reason: 'Mandatory structural design and batching code governing cement grades, water-cement ratios, and durability in RCC foundations.',
    scope_summary: 'Specifies minimum cement content, exposure conditions (mild, moderate, severe, very severe, extreme), and structural requirements.',
    scope: 'Deals with general structural use of plain and reinforced concrete in buildings and civil engineering structures. Does not cover prestressed concrete or special structures like bridges and dams.',
    ics_code: '91.100.30 (Concrete and concrete products)',
    status: 'current',
    latest_version: {
      designation: 'IS 456:2000',
      year: 2000,
      reaffirmed_year: 2021,
      published_on: '2000-07-26',
      citation: 'IS 456:2000 (Reaffirmed 2021)'
    },
    amendments: [
      { number: 'Amendment No. 1 to 5', date: 'Various', summary: 'Durability requirements, mineral admixtures, and design guidelines.' }
    ],
    amendments_label: 'Amendments 1 to 5',
    version_history: [
      { edition: 'Fourth Revision', year: '2000', status: 'current', gazette_date: '2000-07-26', remarks: 'Currently valid general code of practice.' }
    ],
    normative_references: [
      { id: 'IS-269', is_number: 'IS 269', title: 'Ordinary Portland Cement — Specification' },
      { id: 'IS-1786', is_number: 'IS 1786', title: 'High strength deformed steel bars and wires for concrete reinforcement' }
    ],
    certification: {
      is_mandatory: false,
      scheme: 'Code of Practice / Design Guideline',
      name: 'National Building Code adoption of IS 456',
      regulatory_order: 'Adopted under National Building Code of India (NBC 2016)',
      authority: 'Ministry of Housing and Urban Affairs',
      prohibition_clause: 'Normative code required for all public works departments (CPWD, State PWDs, MES).',
      applies_to: 'Plain and reinforced concrete in buildings and civil structures',
      basis: 'National Building Code of India (NBC 2016)',
      notes: 'Normative code required for public works departments. Not a product certification mark.'
    },
    keywords: ['concrete', 'rcc', 'reinforced concrete', 'code of practice', 'is 456'],
    domain: 'cement',
    role: 'primary'
  }),

  standard({
    id: 'IS-4031-1',
    is_number: 'IS 4031 (Part 1)',
    part: 'Part 1: Determination of fineness by dry sieving',
    title: 'Methods of physical tests for hydraulic cement: Part 1 Determination of fineness by dry sieving',
    relevance_score: 85,
    reason: 'Normative physical test for cement fineness cited by IS 269.',
    scope_summary: 'Specifies the method of test for determining the fineness of hydraulic cement by dry sieving on a 90-micron IS Sieve.',
    ics_code: '91.100.10',
    status: 'current',
    latest_version: {
      designation: 'IS 4031 (Part 1):1996',
      year: 1996,
      reaffirmed_year: 2022,
      published_on: '1996-03-15',
      citation: 'IS 4031 (Part 1):1996 (Reaffirmed 2022)'
    },
    version_history: [
      { edition: 'Second Revision', year: '1996', status: 'current', gazette_date: '1996-03-15', remarks: 'Normative test standard.' }
    ],
    normative_references: [
      { id: 'IS-269', is_number: 'IS 269', title: 'Ordinary Portland Cement — Specification' }
    ],
    certification: {
      is_mandatory: false,
      scheme: 'Normative Test Standard',
      name: 'Physical test method for hydraulic cement',
      regulatory_order: 'Referenced within IS 269 mandatory compliance testing',
      authority: 'Bureau of Indian Standards',
      prohibition_clause: '',
      applies_to: 'Fineness testing of hydraulic cement',
      basis: 'Referenced within IS 269 mandatory compliance testing',
      notes: 'Testing laboratory must be NABL accredited or BIS recognized.'
    },
    keywords: ['fineness', 'sieving', 'cement test', 'is 4031'],
    domain: 'cement',
    role: 'allied',
    relation_type: 'Test Methods',
    related_to: 'IS 269'
  }),

  standard({
    id: 'IS-4031-6',
    is_number: 'IS 4031 (Part 6)',
    part: 'Part 6: Determination of compressive strength',
    title: 'Methods of physical tests for hydraulic cement: Part 6 Compressive strength',
    relevance_score: 84,
    reason: 'Normative method for the compressive strength used to accept cement grades under IS 269.',
    scope_summary: 'Specifies preparation of mortar cubes and the method for determining compressive strength of hydraulic cement.',
    ics_code: '91.100.10',
    status: 'current',
    latest_version: {
      designation: 'IS 4031 (Part 6):1988',
      year: 1988,
      reaffirmed_year: 2019,
      published_on: '1988-11-01',
      citation: 'IS 4031 (Part 6):1988 (Reaffirmed 2019)'
    },
    amendments: [
      { number: 'Amendment No. 1', date: '1993', summary: 'Clarification of curing and testing ages for mortar cubes.' }
    ],
    amendments_label: 'Amendment 1',
    version_history: [
      { edition: 'First Revision', year: '1988', status: 'current', gazette_date: '1988-11-01', remarks: 'Compressive strength method cited by IS 269.' }
    ],
    normative_references: [
      { id: 'IS-269', is_number: 'IS 269', title: 'Ordinary Portland Cement — Specification' }
    ],
    keywords: ['compressive strength', 'mortar cube', 'cement test', 'is 4031'],
    domain: 'cement',
    role: 'allied',
    relation_type: 'Test Methods',
    related_to: 'IS 269'
  }),

  standard({
    id: 'IS-4032',
    is_number: 'IS 4032',
    part: 'Chemical analysis',
    title: 'Method of chemical analysis of hydraulic cement',
    relevance_score: 81,
    reason: 'Chemical analysis method for insoluble residue, magnesia, chloride and related limits in IS 269.',
    scope_summary: 'Reference methods for chemical analysis of hydraulic cement, including insoluble residue and chloride content.',
    ics_code: '91.100.10',
    status: 'current',
    latest_version: {
      designation: 'IS 4032:1985',
      year: 1985,
      reaffirmed_year: 2019,
      published_on: '1985-10-01',
      citation: 'IS 4032:1985 (Reaffirmed 2019)'
    },
    amendments: [
      { number: 'Amendment No. 1', date: '1990', summary: 'Updated reagent and calculation notes.' },
      { number: 'Amendment No. 2', date: '2000', summary: 'Alignment of chloride determination procedure.' }
    ],
    amendments_label: 'Amendments 1, 2',
    version_history: [
      { edition: 'First Revision', year: '1985', status: 'current', gazette_date: '1985-10-01', remarks: 'Chemical analysis method for hydraulic cement.' }
    ],
    normative_references: [
      { id: 'IS-269', is_number: 'IS 269', title: 'Ordinary Portland Cement — Specification' }
    ],
    keywords: ['chemical analysis', 'chloride', 'insoluble residue', 'is 4032'],
    domain: 'cement',
    role: 'allied',
    relation_type: 'Test Methods',
    related_to: 'IS 269'
  }),

  standard({
    id: 'IS-11652',
    is_number: 'IS 11652',
    part: 'Packing',
    title: 'High density polyethylene (HDPE) / polypropylene (PP) woven sacks for packing cement — Specification',
    relevance_score: 78,
    reason: 'Packaging specification for cement sacks that must carry the statutory marking with each consignment.',
    scope_summary: 'Requirements for HDPE/PP woven sacks used to pack cement, including fabric, seams, and marking.',
    ics_code: '55.080 (Sacks. Bags)',
    status: 'current',
    latest_version: {
      designation: 'IS 11652:2017',
      year: 2017,
      reaffirmed_year: null,
      published_on: '2017-06-01',
      citation: 'IS 11652:2017'
    },
    amendments: [
      { number: 'Amendment No. 1', date: '2019', summary: 'Marking and sack mass tolerances.' }
    ],
    amendments_label: 'Amendment 1',
    version_history: [
      { edition: 'Third Revision', year: '2017', status: 'current', gazette_date: '2017-06-01', remarks: 'Cement sack specification read with IS 269 marking rules.' }
    ],
    keywords: ['hdpe', 'woven sack', 'packing', 'cement bag', 'is 11652'],
    domain: 'cement',
    role: 'allied',
    relation_type: 'Packaging & Marking',
    related_to: 'IS 269'
  }),

  standard({
    id: 'IS-4845',
    is_number: 'IS 4845',
    part: 'Terminology',
    title: 'Definitions and terminology relating to hydraulic cement',
    relevance_score: 72,
    reason: 'Defines the terms used in cement specifications and test methods.',
    scope_summary: 'Vocabulary for hydraulic cement, including grade, setting, soundness, and related terms.',
    ics_code: '01.040.91 (Construction vocabulary)',
    status: 'current',
    latest_version: {
      designation: 'IS 4845:1990',
      year: 1990,
      reaffirmed_year: null,
      published_on: '1990-04-01',
      citation: 'IS 4845:1990'
    },
    version_history: [
      { edition: 'First Revision', year: '1990', status: 'current', gazette_date: '1990-04-01', remarks: 'Terminology for hydraulic cement.' }
    ],
    keywords: ['terminology', 'definitions', 'hydraulic cement', 'is 4845'],
    domain: 'cement',
    role: 'allied',
    relation_type: 'Terminology',
    related_to: 'IS 269'
  }),

  standard({
    id: 'IS-8112',
    is_number: 'IS 8112',
    part: '43 grade OPC',
    title: '43 grade ordinary Portland cement — Specification',
    relevance_score: 40,
    reason: 'Withdrawn grade-specific cement specification. Requirements now sit inside IS 269:2015.',
    scope_summary: 'Earlier standalone specification for 43 grade ordinary Portland cement.',
    scope: 'This edition specified 43 grade ordinary Portland cement. It was superseded when 33, 43 and 53 grade requirements were amalgamated into IS 269:2015.',
    ics_code: '91.100.10',
    status: 'superseded',
    latest_version: {
      designation: 'IS 8112:2013',
      year: 2013,
      reaffirmed_year: null,
      published_on: '2013-01-01',
      citation: 'IS 8112:2013'
    },
    superseded_by: 'IS 269:2015',
    version_history: [
      { edition: 'IS 8112:2013', year: '2013', status: 'superseded', gazette_date: '', superseded_by: 'IS 269:2015', remarks: 'Amalgamated into IS 269:2015.' }
    ],
    keywords: ['43 grade', 'is 8112', 'superseded cement'],
    domain: 'cement',
    role: 'reference'
  }),

  standard({
    id: 'IS-12269',
    is_number: 'IS 12269',
    part: '53 grade OPC',
    title: '53 grade ordinary Portland cement — Specification',
    relevance_score: 40,
    reason: 'Withdrawn grade-specific cement specification. Requirements now sit inside IS 269:2015.',
    scope_summary: 'Earlier standalone specification for 53 grade ordinary Portland cement.',
    scope: 'This edition specified 53 grade ordinary Portland cement. It was superseded when grade requirements were amalgamated into IS 269:2015.',
    ics_code: '91.100.10',
    status: 'superseded',
    latest_version: {
      designation: 'IS 12269:2013',
      year: 2013,
      reaffirmed_year: null,
      published_on: '2013-01-01',
      citation: 'IS 12269:2013'
    },
    superseded_by: 'IS 269:2015',
    version_history: [
      { edition: 'IS 12269:2013', year: '2013', status: 'superseded', gazette_date: '', superseded_by: 'IS 269:2015', remarks: 'Amalgamated into IS 269:2015.' }
    ],
    keywords: ['53 grade', 'is 12269', 'superseded cement'],
    domain: 'cement',
    role: 'reference'
  }),

  standard({
    id: 'IS-13252-1',
    is_number: 'IS 13252 (Part 1)',
    part: 'Part 1: General Requirements',
    title: 'Information Technology Equipment — Safety: Part 1 General Requirements',
    relevance_score: 97,
    reason: 'Core safety standard notified under MeitY Compulsory Registration Scheme (CRS) for portable notebook computers.',
    scope_summary: 'Covers electrical safety, insulation resistance, touch current, fire retardance of casing, thermal runaways, and power supply safety.',
    scope: 'This standard applies to power-operated or battery-operated information technology equipment, including electrical business equipment and associated equipment, with a rated voltage not exceeding 600 V. Covers safety against electrical shock, fire, and thermal hazards in laptops, servers, and computers.',
    ics_code: '35.020 (Information technology in general); 35.160 (Microprocessor systems)',
    status: 'current',
    latest_version: {
      designation: 'IS 13252 (Part 1):2010',
      year: 2010,
      reaffirmed_year: 2020,
      published_on: '2010-09-07',
      citation: 'IS 13252 (Part 1):2010 / IEC 60950-1:2005 (Reaffirmed 2020)'
    },
    amendments: [
      { number: 'Amendment No. 1', date: 'May 2013', summary: 'Harmonization with IEC Corrigendum 1 and test safety requirements for power supplies.' },
      { number: 'Amendment No. 2', date: 'April 2017', summary: 'Specific labelling requirements for BIS Registration Number and Website link.' }
    ],
    amendments_label: 'Amendments 1, 2',
    version_history: [
      { edition: 'First Edition (IS 13252 (Part 1):2010)', year: '2010', status: 'current', gazette_date: '2010-09-07', remarks: 'Harmonized with IEC 60950-1:2005.' },
      { edition: 'Initial Standard (IS 13252:1992)', year: '1992', status: 'superseded', gazette_date: '', superseded_by: 'IS 13252 (Part 1):2010', remarks: 'Legacy standard.' }
    ],
    normative_references: [
      { id: 'IS-616', is_number: 'IS 616', title: 'Audio, video and similar electronic apparatus — Safety requirements' },
      { id: 'IS-16046-2', is_number: 'IS 16046 (Part 2)', title: 'Secondary cells and batteries containing alkaline or other non-acid electrolytes: Portable lithium systems' }
    ],
    certification: {
      is_mandatory: true,
      scheme: 'Scheme-II (CRS - Compulsory Registration Scheme)',
      name: 'MeitY Electronics and IT Goods (Requirement for Compulsory Registration) Order',
      regulatory_order: 'Electronics and Information Technology Goods (Requirement for Compulsory Registration) Order, 2012 (CRO)',
      authority: 'Ministry of Electronics and Information Technology (MeitY)',
      prohibition_clause: 'No person shall manufacture or store for sale, import, sell or distribute goods specified in the Schedule which do not conform to the Indian Standard and do not bear the words \'Self declaration - Conforming to IS...\' with BIS registration number.',
      applies_to: 'Laptops / Notebook Computers (Item 3) and Power Adapters (Item 5)',
      basis: 'Electronics & IT Goods (Requirement for Compulsory Registration) Order (CRO), 2012 and subsequent amendments issued by MeitY',
      notes: 'Goods must be registered with BIS under CRS and bear the standard registration mark with statement \'Self Declaration - Conforming to IS 13252 (Part 1):2010, R-XXXXXXXX\' and BIS portal link.'
    },
    keywords: ['laptop', 'notebook', 'computer', 'adapter', 'crs', 'it equipment', 'is 13252'],
    domain: 'electronics',
    role: 'primary'
  }),

  standard({
    id: 'IS-16046-2',
    is_number: 'IS 16046 (Part 2)',
    part: 'Part 2: Portable lithium systems',
    title: 'Secondary cells and batteries containing alkaline or other non-acid electrolytes: Portable lithium systems',
    relevance_score: 93,
    reason: 'Mandatory safety requirement for rechargeable internal lithium-ion / polymer battery packs powering laptops.',
    scope_summary: 'Specifies rigorous safety testing including external short circuit, thermal abuse, free fall, crushing, and overcharging protection.',
    scope: 'Safety requirements for portable sealed secondary lithium cells and batteries, including those used in notebook computers.',
    ics_code: '29.220.99 (Other cells and batteries)',
    status: 'current',
    latest_version: {
      designation: 'IS 16046 (Part 2):2018 / IEC 62133-2:2017',
      year: 2018,
      reaffirmed_year: null,
      published_on: '2018-05-01',
      citation: 'IS 16046 (Part 2):2018 / IEC 62133-2:2017'
    },
    amendments: [
      { number: 'Amendment No. 1', date: '2020', summary: 'Alignment of test conditions for portable lithium systems.' }
    ],
    amendments_label: 'Amendment 1',
    version_history: [
      { edition: 'IS 16046 (Part 2):2018', year: '2018', status: 'current', gazette_date: '2018-05-01', remarks: 'Harmonized with IEC 62133-2:2017.' }
    ],
    normative_references: [
      { id: 'IS-13252-1', is_number: 'IS 13252 (Part 1)', title: 'Information Technology Equipment — Safety: Part 1 General Requirements' }
    ],
    certification: {
      is_mandatory: true,
      scheme: 'Scheme-II (CRS - Batteries)',
      name: 'Secondary Cells and Batteries (Lithium)',
      regulatory_order: 'Electronics and Information Technology Goods (Requirement for Compulsory Registration) Order, 2012',
      authority: 'Ministry of Electronics and Information Technology (MeitY)',
      prohibition_clause: 'Sealed secondary lithium cells and batteries notified under the CRO shall not be sold without BIS registration.',
      applies_to: 'Internal Lithium-ion battery packs',
      basis: 'CRO Phase II notified under Gazette notification',
      notes: 'Battery cell/pack must possess distinct R-number registration conforming to IS 16046 (Part 2):2018.'
    },
    keywords: ['lithium', 'battery', 'cell', 'is 16046', 'laptop battery'],
    domain: 'electronics',
    role: 'primary'
  }),

  standard({
    id: 'IS-616',
    is_number: 'IS 616',
    part: 'Audio and video safety',
    title: 'Audio, video and similar electronic apparatus — Safety requirements',
    relevance_score: 82,
    reason: 'Related electrical safety standard for electronic apparatus supplied alongside IT equipment.',
    scope_summary: 'Safety requirements for audio, video and similar electronic apparatus, harmonized with IEC 60065.',
    ics_code: '33.160 (Audio, video and audiovisual engineering)',
    status: 'under_revision',
    latest_version: {
      designation: 'IS 616:2017 / IEC 60065',
      year: 2017,
      reaffirmed_year: null,
      published_on: '2017-03-01',
      citation: 'IS 616:2017 / IEC 60065'
    },
    amendments: [
      { number: 'Amendment No. 1', date: '2018', summary: 'Editorial alignment with the IEC text.' },
      { number: 'Amendment No. 2', date: '2020', summary: 'Marking clarifications.' }
    ],
    amendments_label: 'Amendments 1, 2',
    version_history: [
      { edition: 'IS 616:2017', year: '2017', status: 'under_revision', gazette_date: '2017-03-01', remarks: 'Revision in committee to follow the successor IEC safety series.' }
    ],
    keywords: ['audio', 'video', 'safety', 'is 616'],
    domain: 'electronics',
    role: 'allied',
    relation_type: 'Safety',
    related_to: 'IS 13252 (Part 1)'
  }),

  standard({
    id: 'IS-14886',
    is_number: 'IS 14886',
    part: 'Energy consumption',
    title: 'Methods of measurement for energy consumption of computers',
    relevance_score: 79,
    reason: 'Measurement method when a tender also sets an energy-consumption limit for computers.',
    scope_summary: 'Methods for measuring energy consumption of computers.',
    ics_code: '35.160',
    status: 'current',
    latest_version: {
      designation: 'IS 14886:2000',
      year: 2000,
      reaffirmed_year: null,
      published_on: '2000-01-01',
      citation: 'IS 14886:2000'
    },
    version_history: [
      { edition: 'IS 14886:2000', year: '2000', status: 'current', gazette_date: '2000-01-01', remarks: 'Energy measurement method for computers.' }
    ],
    keywords: ['energy', 'consumption', 'computers', 'is 14886'],
    domain: 'electronics',
    role: 'allied',
    relation_type: 'Test Methods',
    related_to: 'IS 13252 (Part 1)'
  }),

  standard({
    id: 'IS-12063',
    is_number: 'IS 12063',
    part: 'IP Code',
    title: 'Classification of degrees of protection provided by enclosures (IP Code)',
    relevance_score: 74,
    reason: 'Enclosure ingress classification when the tender specifies an IP rating for equipment housings.',
    scope_summary: 'IP Code classification of protection provided by enclosures against contact, foreign bodies, and water.',
    ics_code: '29.100.99',
    status: 'current',
    latest_version: {
      designation: 'IS 12063:1987',
      year: 1987,
      reaffirmed_year: null,
      published_on: '1987-01-01',
      citation: 'IS 12063:1987'
    },
    version_history: [
      { edition: 'IS 12063:1987', year: '1987', status: 'current', gazette_date: '1987-01-01', remarks: 'IP Code classification.' }
    ],
    keywords: ['ip code', 'enclosure', 'ingress', 'is 12063'],
    domain: 'electronics',
    role: 'allied',
    relation_type: 'Packaging & Marking',
    related_to: 'IS 13252 (Part 1)'
  }),

  standard({
    id: 'IS-1417',
    is_number: 'IS 1417',
    part: 'General Specification',
    title: 'Gold and Gold Alloys, Jewellery/Artefacts — Fineness and Marking (Fifth Revision)',
    relevance_score: 99,
    reason: 'Primary national standard governing fineness, hallmarking grades, and stamping of gold artefacts.',
    scope_summary: 'Prescribes requirements of fineness grades (e.g. 22K = 916 fineness, 18K = 750 fineness, 14K = 585 fineness) and official marks.',
    scope: 'This standard covers the requirements of gold and gold alloys, jewellery/artefacts, fineness grades (e.g., 24K, 22K, 18K, 14K), identification markings, and hallmarking symbols issued by Assaying and Hallmarking Centres.',
    ics_code: '39.060 (Jewellery)',
    status: 'current',
    latest_version: {
      designation: 'IS 1417:2016',
      year: 2016,
      reaffirmed_year: 2021,
      published_on: '2016-08-14',
      citation: 'IS 1417:2016 (Reaffirmed 2021)'
    },
    amendments: [
      { number: 'Amendment No. 1', date: 'August 2020', summary: 'Introduction of 6-digit alphanumeric HUID (Hallmark Unique Identification Number).' }
    ],
    amendments_label: 'Amendment 1 (HUID mandate)',
    version_history: [
      { edition: 'Fifth Revision (IS 1417:2016)', year: '2016', status: 'current', gazette_date: '2016-08-14', remarks: 'Prescribed 3 grades: 22K, 18K, and 14K, later amended.' },
      { edition: 'Fourth Revision (IS 1417:1999)', year: '1999', status: 'superseded', gazette_date: '', superseded_by: 'IS 1417:2016', remarks: 'Previous edition.' }
    ],
    normative_references: [
      { id: 'IS-2112', is_number: 'IS 2112', title: 'Silver and silver alloys, jewellery/artefacts — Fineness and marking' },
      { id: 'IS-1418', is_number: 'IS 1418', title: 'Assaying of Gold in Gold Bullion, Gold Alloys and Gold Jewellery/Artefacts by Cupellation (Fire Assay) Method' }
    ],
    certification: {
      is_mandatory: true,
      scheme: 'Hallmarking Scheme',
      name: 'Mandatory BIS Hallmarking for Gold Jewellery & Artefacts',
      regulatory_order: 'Hallmarking of Gold Jewellery and Gold Artefacts Order, 2020',
      authority: 'Department of Consumer Affairs, Ministry of Consumer Affairs, Food & Public Distribution',
      prohibition_clause: 'No jeweller shall sell any gold jewellery or gold artefact unless it is hallmarked in accordance with the provisions of BIS Act, 2016.',
      applies_to: 'All 14K, 18K, 20K, 22K, 23K and 24K Gold Jewellery/Artefacts',
      basis: 'Hallmarking of Gold Jewellery and Gold Artefacts Order, 2020 issued under Section 14, 15 and 16 of the BIS Act, 2016',
      notes: 'Each article must be laser-marked with 3 distinct symbols: (1) BIS Logo, (2) Purity and Fineness (e.g. 22K916), (3) 6-digit alphanumeric Hallmark Unique Identification (HUID) number.'
    },
    keywords: ['gold', 'jewellery', 'hallmark', 'huid', 'karat', 'is 1417', 'सोना', 'आभूषण'],
    domain: 'jewellery',
    role: 'primary'
  }),

  standard({
    id: 'IS-1418',
    is_number: 'IS 1418',
    part: 'Fire assay',
    title: 'Assaying of Gold in Gold Bullion, Gold Alloys and Gold Jewellery/Artefacts by Cupellation (Fire Assay) Method',
    relevance_score: 91,
    reason: 'Reference assay method used by BIS-recognized Assaying and Hallmarking Centres.',
    scope_summary: 'Cupellation (fire assay) method for determining gold fineness in bullion, alloys, and jewellery.',
    ics_code: '39.060',
    status: 'current',
    latest_version: {
      designation: 'IS 1418:2009',
      year: 2009,
      reaffirmed_year: null,
      published_on: '2009-01-01',
      citation: 'IS 1418:2009'
    },
    amendments: [
      { number: 'Amendment No. 1', date: '2012', summary: 'Procedural clarification for jewellery sampling.' }
    ],
    amendments_label: 'Amendment 1',
    version_history: [
      { edition: 'IS 1418:2009', year: '2009', status: 'current', gazette_date: '2009-01-01', remarks: 'Fire assay method for gold.' }
    ],
    keywords: ['assay', 'cupellation', 'fire assay', 'is 1418'],
    domain: 'jewellery',
    role: 'allied',
    relation_type: 'Test Methods',
    related_to: 'IS 1417'
  }),

  standard({
    id: 'IS-2114',
    is_number: 'IS 2114',
    part: 'Terminology',
    title: 'Terminology relating to assaying and hallmarking of precious metals',
    relevance_score: 80,
    reason: 'Defines hallmarking and assaying terms used with IS 1417.',
    scope_summary: 'Vocabulary for assaying and hallmarking of precious metals.',
    ics_code: '01.040.39',
    status: 'current',
    latest_version: {
      designation: 'IS 2114:2012',
      year: 2012,
      reaffirmed_year: null,
      published_on: '2012-01-01',
      citation: 'IS 2114:2012'
    },
    version_history: [
      { edition: 'IS 2114:2012', year: '2012', status: 'current', gazette_date: '2012-01-01', remarks: 'Hallmarking terminology.' }
    ],
    keywords: ['terminology', 'hallmarking', 'assaying', 'is 2114'],
    domain: 'jewellery',
    role: 'allied',
    relation_type: 'Terminology',
    related_to: 'IS 1417'
  }),

  standard({
    id: 'IS-2112',
    is_number: 'IS 2112',
    part: 'Silver',
    title: 'Silver and silver alloys, jewellery/artefacts — Fineness and marking',
    relevance_score: 68,
    reason: 'Companion fineness standard when a tender also covers silver articles.',
    scope_summary: 'Fineness grades and marking requirements for silver and silver-alloy jewellery and artefacts.',
    ics_code: '39.060',
    status: 'current',
    latest_version: {
      designation: 'IS 2112:2014',
      year: 2014,
      reaffirmed_year: null,
      published_on: '2014-01-01',
      citation: 'IS 2112:2014'
    },
    amendments: [
      { number: 'Amendment No. 1', date: '2018', summary: 'Marking clarifications for silver articles.' }
    ],
    amendments_label: 'Amendment 1',
    version_history: [
      { edition: 'IS 2112:2014', year: '2014', status: 'current', gazette_date: '2014-01-01', remarks: 'Silver fineness and marking.' }
    ],
    keywords: ['silver', 'fineness', 'is 2112'],
    domain: 'jewellery',
    role: 'allied',
    relation_type: 'Related Products',
    related_to: 'IS 1417'
  }),

  standard({
    id: 'IS-14543',
    is_number: 'IS 14543',
    part: 'Standard Specification',
    title: 'Packaged Drinking Water (Other than Packaged Natural Mineral Water) — Specification (Second Revision)',
    relevance_score: 99,
    reason: 'Mandatory statutory specification for commercial packaged drinking water containers.',
    scope_summary: 'Physical, chemical, radiological, and microbiological standards for sealed drinking water.',
    scope: 'Prescribes requirements and methods of sampling and test for packaged drinking water other than packaged natural mineral water. Specifies microbiological limits, chemical purity, and food grade packaging container norms.',
    ics_code: '13.060.20 (Drinking water); 67.160.20 (Non-alcoholic beverages)',
    status: 'current',
    latest_version: {
      designation: 'IS 14543:2016',
      year: 2016,
      reaffirmed_year: 2021,
      published_on: '2016-09-12',
      citation: 'IS 14543:2016 (Reaffirmed 2021)'
    },
    amendments: [
      { number: 'Amendment No. 1', date: 'October 2017', summary: 'Revision of pesticide residues test protocols.' }
    ],
    amendments_label: 'Amendment 1',
    version_history: [
      { edition: 'Second Revision (IS 14543:2016)', year: '2016', status: 'current', gazette_date: '2016-09-12', remarks: 'Incorporated revised limits for minerals and total dissolved solids.' }
    ],
    normative_references: [
      { id: 'IS-3025-1', is_number: 'IS 3025 (Part 1)', title: 'Methods of sampling and test (physical and chemical) for water and wastewater' }
    ],
    certification: {
      is_mandatory: true,
      scheme: 'Scheme-I (ISI Mark)',
      name: 'BIS Mandatory ISI Mark for Packaged Water',
      regulatory_order: 'Food Safety and Standards (Prohibition and Restrictions on Sales) Regulations & BIS QCO',
      authority: 'Food Safety and Standards Authority of India (FSSAI) & BIS',
      prohibition_clause: 'Mandatory ISI Certification mark is required under FSSAI regulation 2.3.14 before marketing or distribution.',
      applies_to: 'All bottled and jar-packaged drinking water containers',
      basis: 'Food Safety and Standards Act (FSSAI) Regulation 2.3.14 & Ministry of Consumer Affairs notifications',
      notes: 'Strict dual certification required: valid FSSAI license and valid BIS ISI Mark license.'
    },
    keywords: ['drinking water', 'packaged water', 'bottled', 'is 14543', 'पेयजल'],
    domain: 'water',
    role: 'primary'
  }),

  standard({
    id: 'IS-3025-1',
    is_number: 'IS 3025 (Part 1)',
    part: 'Part 1: Sampling',
    title: 'Methods of sampling and test (physical and chemical) for water and wastewater',
    relevance_score: 82,
    reason: 'Sampling and test method cited for packaged drinking water compliance.',
    scope_summary: 'Methods of sampling and physical and chemical tests for water and wastewater.',
    ics_code: '13.060.50',
    status: 'current',
    latest_version: {
      designation: 'IS 3025 (Part 1):1987',
      year: 1987,
      reaffirmed_year: null,
      published_on: '1987-01-01',
      citation: 'IS 3025 (Part 1):1987'
    },
    version_history: [
      { edition: 'IS 3025 (Part 1):1987', year: '1987', status: 'current', gazette_date: '1987-01-01', remarks: 'Sampling method cited by IS 14543.' }
    ],
    keywords: ['water sampling', 'wastewater', 'is 3025'],
    domain: 'water',
    role: 'allied',
    relation_type: 'Test Methods',
    related_to: 'IS 14543'
  }),

  standard({
    id: 'IS-1786',
    is_number: 'IS 1786',
    part: 'Reinforcement',
    title: 'High strength deformed steel bars and wires for concrete reinforcement — Specification',
    relevance_score: 86,
    reason: 'Product specification for reinforcement bars used with concrete designed to IS 456.',
    scope_summary: 'Requirements for high strength deformed steel bars and wires used as concrete reinforcement.',
    scope: 'Covers chemical, mechanical, and dimensional requirements, including ductility classes, for deformed steel bars and wires used to reinforce concrete.',
    ics_code: '77.140.15 (Steels for reinforcement of concrete)',
    status: 'current',
    latest_version: {
      designation: 'IS 1786:2008',
      year: 2008,
      reaffirmed_year: 2018,
      published_on: '2008-11-01',
      citation: 'IS 1786:2008 (Reaffirmed 2018)'
    },
    amendments: [
      { number: 'Amendment No. 1', date: '2012', summary: 'Ductility and marking clarifications.' }
    ],
    amendments_label: 'Amendment 1',
    version_history: [
      { edition: 'Fourth Revision', year: '2008', status: 'current', gazette_date: '2008-11-01', remarks: 'Reinforcement bar specification cited by IS 456.' }
    ],
    normative_references: [
      { id: 'IS-456', is_number: 'IS 456', title: 'Plain and Reinforced Concrete — Code of Practice' }
    ],
    certification: {
      is_mandatory: true,
      scheme: 'Scheme-I (ISI Mark)',
      name: 'BIS certification for reinforcement steel',
      regulatory_order: 'Steel and Steel Products (Quality Control) Order',
      authority: 'Ministry of Steel',
      prohibition_clause: 'Notified steel products shall not be manufactured or sold without the Standard Mark where the Quality Control Order applies.',
      applies_to: 'High strength deformed steel bars and wires',
      basis: 'Steel and Steel Products (Quality Control) Order',
      notes: 'Check the current notified list before treating a bar diameter as mandatory.'
    },
    keywords: ['rebar', 'tmt', 'steel bars', 'reinforcement', 'is 1786'],
    domain: 'cement',
    role: 'allied',
    relation_type: 'Related Products',
    related_to: 'IS 456'
  }),

  standard({
    id: 'IS-4984',
    is_number: 'IS 4984',
    part: 'HDPE pipes',
    title: 'High density polyethylene pipes for water supply',
    relevance_score: 70,
    reason: 'Specification for HDPE water-supply pipes. Included because IS 269 lists it among normative references in the portal catalogue.',
    scope_summary: 'Requirements for HDPE pipes used in water supply, including material, dimensions, and hydrostatic strength.',
    ics_code: '23.040.20 (Plastics pipes)',
    status: 'current',
    latest_version: {
      designation: 'IS 4984:2016',
      year: 2016,
      reaffirmed_year: null,
      published_on: '2016-01-01',
      citation: 'IS 4984:2016'
    },
    version_history: [
      { edition: 'Fifth Revision', year: '2016', status: 'current', gazette_date: '2016-01-01', remarks: 'HDPE pipes for water supply.' }
    ],
    keywords: ['hdpe pipe', 'water supply', 'is 4984'],
    domain: 'water',
    role: 'allied',
    relation_type: 'Related Products',
    related_to: 'IS 14543'
  })
];

module.exports = standards;
