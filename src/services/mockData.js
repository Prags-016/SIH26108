/**
 * Mock Data for IS Standards Recommendation Engine
 * Includes diverse product domains to demonstrate all BIS certification schemes:
 * 1. Cement (Scheme-I ISI Mark under DPIIT Cement QCO)
 * 2. IT Equipment / Laptop (Scheme-II CRS under MeitY Compulsory Registration Scheme)
 * 3. Gold Jewellery (Hallmarking Scheme under BIS Hallmarking Order)
 * 4. Multi-item Tender (Demonstrating multi-item tender tabs)
 * 5. Packaged Drinking Water (Scheme-I ISI Mark under Food Safety QCO)
 */

export const MOCK_HEALTH = {
  status: "healthy",
  data_last_synced: "2026-09-25T06:00:00Z",
  version: "1.2.0",
  standards_indexed: 24650,
  qco_orders_indexed: 148
};

export const MOCK_STANDARDS_DB = {
  "IS-269": {
    id: "IS-269",
    is_number: "IS 269",
    part: "Section 1",
    title: "Ordinary Portland Cement — Specification (Sixth Revision)",
    ics_code: "91.100.10 (Cement. Gypsum. Lime. Mortar)",
    status: "current",
    latest_version: "IS 269:2015 (Reaffirmed 2020)",
    scope: "This standard covers the manufacture and chemical and physical requirements of ordinary Portland cement of 33, 43 and 53 grades. It unifies the earlier separate specifications for 33, 43 and 53 grade cement into a single standard.",
    bis_link: "https://standardsbis.bsbedge.com/bis_search_detail.aspx?id=IS-269",
    amendments: [
      { number: "Amendment No. 1", date: "June 2018", summary: "Inclusion of composite performance criteria and updated packaging norms." },
      { number: "Amendment No. 2", date: "March 2021", summary: "Revision of permissible limits for insoluble residue and chloride content." }
    ],
    version_history: [
      { edition: "Sixth Revision (IS 269:2015)", year: "2015", status: "current", gazette_date: "2015-12-04", remarks: "Combined IS 269, IS 8112, and IS 12269." },
      { edition: "Fifth Revision (IS 269:1989)", year: "1989", status: "superseded", superseded_by: "IS 269:2015", remarks: "Specified 33 grade ordinary Portland cement." },
      { edition: "Fourth Revision (IS 269:1976)", year: "1976", status: "superseded", superseded_by: "IS 269:1989", remarks: "Standard revision." }
    ],
    normative_references: [
      { id: "IS-4031-1", is_number: "IS 4031 (Part 1)", title: "Methods of physical tests for hydraulic cement: Part 1 Determination of fineness by dry sieving" },
      { id: "IS-4031-6", is_number: "IS 4031 (Part 6)", title: "Methods of physical tests for hydraulic cement: Part 6 Determination of compressive strength" },
      { id: "IS-4032", is_number: "IS 4032", title: "Method of chemical analysis of hydraulic cement" },
      { id: "IS-4984", is_number: "IS 4984", title: "High density polyethylene pipes for water supply" }
    ],
    certification: {
      is_mandatory: true,
      scheme: "Scheme-I (ISI Mark)",
      regulatory_order: "Cement (Quality Control) Order, 2003 as amended",
      authority: "Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce & Industry",
      prohibition_clause: "No person shall manufacture, store for sale, sell or distribute cement which does not conform to the Indian Standard and which does not bear the Standard Mark."
    }
  },
  "IS-13252-1": {
    id: "IS-13252-1",
    is_number: "IS 13252 (Part 1)",
    part: "Part 1: General Requirements",
    title: "Information Technology Equipment — Safety: Part 1 General Requirements",
    ics_code: "35.020 (Information technology in general); 35.160 (Microprocessor systems)",
    status: "current",
    latest_version: "IS 13252 (Part 1):2010 / IEC 60950-1:2005 (Reaffirmed 2020)",
    scope: "This standard applies to power-operated or battery-operated information technology equipment, including electrical business equipment and associated equipment, with a rated voltage not exceeding 600 V. Covers safety against electrical shock, fire, and thermal hazards in laptops, servers, and computers.",
    bis_link: "https://standardsbis.bsbedge.com/bis_search_detail.aspx?id=IS-13252-1",
    amendments: [
      { number: "Amendment No. 1", date: "May 2013", summary: "Harmonization with IEC Corrigendum 1 and test safety requirements for power supplies." },
      { number: "Amendment No. 2", date: "April 2017", summary: "Specific labelling requirements for BIS Registration Number and Website link." }
    ],
    version_history: [
      { edition: "First Edition (IS 13252 (Part 1):2010)", year: "2010", status: "current", gazette_date: "2010-09-07", remarks: "Harmonized with IEC 60950-1:2005." },
      { edition: "Initial Standard (IS 13252:1992)", year: "1992", status: "superseded", superseded_by: "IS 13252 (Part 1):2010", remarks: "Legacy standard." }
    ],
    normative_references: [
      { id: "IS-616", is_number: "IS 616", title: "Audio, video and similar electronic apparatus — Safety requirements" },
      { id: "IS-16046-2", is_number: "IS 16046 (Part 2)", title: "Secondary cells and batteries containing alkaline or other non-acid electrolytes: Portable lithium systems" }
    ],
    certification: {
      is_mandatory: true,
      scheme: "Scheme-II (Compulsory Registration Scheme - CRS)",
      regulatory_order: "Electronics and Information Technology Goods (Requirement for Compulsory Registration) Order, 2012 (CRO)",
      authority: "Ministry of Electronics and Information Technology (MeitY)",
      prohibition_clause: "No person shall manufacture or store for sale, import, sell or distribute goods specified in the Schedule which do not conform to the Indian Standard and do not bear the words 'Self declaration - Conforming to IS...' with BIS registration number."
    }
  },
  "IS-1417": {
    id: "IS-1417",
    is_number: "IS 1417",
    part: "General Specification",
    title: "Gold and Gold Alloys, Jewellery/Artefacts — Fineness and Marking (Fifth Revision)",
    ics_code: "39.060 (Jewellery)",
    status: "current",
    latest_version: "IS 1417:2016 (Reaffirmed 2021)",
    scope: "This standard covers the requirements of gold and gold alloys, jewellery/artefacts, fineness grades (e.g., 24K, 22K, 18K, 14K), identification markings, and hallmarking symbols issued by Assaying and Hallmarking Centres.",
    bis_link: "https://standardsbis.bsbedge.com/bis_search_detail.aspx?id=IS-1417",
    amendments: [
      { number: "Amendment No. 1", date: "August 2020", summary: "Introduction of 6-digit alphanumeric HUID (Hallmark Unique Identification Number)." }
    ],
    version_history: [
      { edition: "Fifth Revision (IS 1417:2016)", year: "2016", status: "current", gazette_date: "2016-08-14", remarks: "Prescribed 3 grades: 22K, 18K, and 14K, later amended." },
      { edition: "Fourth Revision (IS 1417:1999)", year: "1999", status: "superseded", superseded_by: "IS 1417:2016", remarks: "Previous edition." }
    ],
    normative_references: [
      { id: "IS-2112", is_number: "IS 2112", title: "Silver and silver alloys, jewellery/artefacts — Fineness and marking" },
      { id: "IS-1418", is_number: "IS 1418", title: "Assaying of Gold in Gold Bullion, Gold Alloys and Gold Jewellery/Artefacts by Cupellation (Fire Assay) Method" }
    ],
    certification: {
      is_mandatory: true,
      scheme: "Hallmarking Scheme",
      regulatory_order: "Hallmarking of Gold Jewellery and Gold Artefacts Order, 2020",
      authority: "Department of Consumer Affairs, Ministry of Consumer Affairs, Food & Public Distribution",
      prohibition_clause: "No jeweller shall sell any gold jewellery or gold artefact unless it is hallmarked in accordance with the provisions of BIS Act, 2016."
    }
  },
  "IS-14543": {
    id: "IS-14543",
    is_number: "IS 14543",
    part: "Standard Specification",
    title: "Packaged Drinking Water (Other than Packaged Natural Mineral Water) — Specification (Second Revision)",
    ics_code: "13.060.20 (Drinking water); 67.160.20 (Non-alcoholic beverages)",
    status: "current",
    latest_version: "IS 14543:2016 (Reaffirmed 2021)",
    scope: "Prescribes requirements and methods of sampling and test for packaged drinking water other than packaged natural mineral water. Specifies microbiological limits, chemical purity, and food grade packaging container norms.",
    bis_link: "https://standardsbis.bsbedge.com/bis_search_detail.aspx?id=IS-14543",
    amendments: [
      { number: "Amendment No. 1", date: "October 2017", summary: "Revision of pesticide residues test protocols." }
    ],
    version_history: [
      { edition: "Second Revision (IS 14543:2016)", year: "2016", status: "current", gazette_date: "2016-09-12", remarks: "Incorporated revised limits for minerals and total dissolved solids." }
    ],
    normative_references: [
      { id: "IS-3025-1", is_number: "IS 3025 (Part 1)", title: "Methods of sampling and test (physical and chemical) for water and wastewater" }
    ],
    certification: {
      is_mandatory: true,
      scheme: "Scheme-I (ISI Mark)",
      regulatory_order: "Food Safety and Standards (Prohibition and Restrictions on Sales) Regulations & BIS QCO",
      authority: "Food Safety and Standards Authority of India (FSSAI) & BIS",
      prohibition_clause: "Mandatory ISI Certification mark is required under FSSAI regulation 2.3.14 before marketing or distribution."
    }
  },
  "IS-456": {
    id: "IS-456",
    is_number: "IS 456",
    part: "Plain and Reinforced Concrete",
    title: "Plain and Reinforced Concrete — Code of Practice (Fourth Revision)",
    ics_code: "91.100.30 (Concrete and concrete products)",
    status: "current",
    latest_version: "IS 456:2000 (Reaffirmed 2021)",
    scope: "Deals with general structural use of plain and reinforced concrete in buildings and civil engineering structures. Does not cover prestressed concrete or special structures like bridges and dams.",
    bis_link: "https://standardsbis.bsbedge.com/bis_search_detail.aspx?id=IS-456",
    amendments: [
      { number: "Amendment No. 1 to 5", date: "Various", summary: "Durability requirements, mineral admixtures, and design guidelines." }
    ],
    version_history: [
      { edition: "Fourth Revision", year: "2000", status: "current", gazette_date: "2000-07-26", remarks: "Currently valid general code of practice." }
    ],
    normative_references: [
      { id: "IS-269", is_number: "IS 269", title: "Ordinary Portland Cement — Specification" },
      { id: "IS-1786", is_number: "IS 1786", title: "High strength deformed steel bars and wires for concrete reinforcement" }
    ],
    certification: {
      is_mandatory: false,
      scheme: "Code of Practice / Design Guideline",
      regulatory_order: "Adopted under National Building Code of India (NBC 2016)",
      authority: "Ministry of Housing and Urban Affairs",
      prohibition_clause: "Normative code required for all public works departments (CPWD, State PWDs, MES)."
    }
  },
  "IS-4031-1": {
    id: "IS-4031-1",
    is_number: "IS 4031 (Part 1)",
    part: "Part 1: Determination of fineness by dry sieving",
    title: "Methods of physical tests for hydraulic cement: Part 1 Determination of fineness by dry sieving",
    ics_code: "91.100.10",
    status: "current",
    latest_version: "IS 4031 (Part 1):1996 (Reaffirmed 2022)",
    scope: "Specifies the method of test for determining the fineness of hydraulic cement by dry sieving on a 90-micron IS Sieve.",
    bis_link: "https://standardsbis.bsbedge.com/bis_search_detail.aspx?id=IS-4031-1",
    amendments: [],
    version_history: [
      { edition: "Second Revision", year: "1996", status: "current", gazette_date: "1996-03-15", remarks: "Normative test standard." }
    ],
    normative_references: [
      { id: "IS-269", is_number: "IS 269", title: "Ordinary Portland Cement — Specification" }
    ],
    certification: {
      is_mandatory: false,
      scheme: "Normative Test Standard",
      regulatory_order: "Referenced within IS 269 mandatory compliance testing",
      authority: "BIS",
      notes: "Testing laboratory must be NABL accredited or BIS recognized."
    }
  }
};

/**
 * Pre-configured mock responses mapped to keywords
 */
export const MOCK_RECOMMENDATIONS = {
  cement: {
    request_id: "REQ-2026-0929-8812",
    detected_language: "English",
    product_summary: "Ordinary Portland Cement (OPC) 43/53 Grade for Reinforced Concrete Civil Works",
    translated_query: null,
    user_version_warning: "Notice: Your specification input referenced an earlier edition ('IS 269:1989 / IS 8112'). Please note that IS 8112 (43 grade) and IS 12269 (53 grade) were superseded and amalgamated into IS 269:2015 (Sixth Revision). Tender documents must cite IS 269:2015 directly.",
    recommended_standards: [
      {
        rank: 1,
        id: "IS-269",
        is_number: "IS 269",
        title: "Ordinary Portland Cement — Specification (Sixth Revision)",
        relevance: 98,
        status: "current",
        latest_version: "IS 269:2015",
        amendments: "Amendments 1, 2",
        reason: "Primary governing specification for ordinary Portland cement (33, 43 and 53 grades) manufactured in India.",
        scope_summary: "Specifies chemical composition (lime saturation factor, alumina iron ratio, insoluble residue, magnesia) and physical requirements (fineness, setting time, soundness, compressive strength)."
      },
      {
        rank: 2,
        id: "IS-456",
        is_number: "IS 456",
        title: "Plain and Reinforced Concrete — Code of Practice (Fourth Revision)",
        relevance: 88,
        status: "current",
        latest_version: "IS 456:2000",
        amendments: "Amendments 1 to 5",
        reason: "Mandatory structural design and batching code governing cement grades, water-cement ratios, and durability in RCC foundations.",
        scope_summary: "Specifies minimum cement content, exposure conditions (mild, moderate, severe, very severe, extreme), and structural requirements."
      }
    ],
    allied_standards: [
      {
        relation_type: "Test Methods",
        rank: 1,
        id: "IS-4031-1",
        is_number: "IS 4031 (Part 1)",
        title: "Methods of physical tests for hydraulic cement: Part 1 Determination of fineness by dry sieving",
        relevance: 85,
        status: "current",
        latest_version: "IS 4031 (Part 1):1996",
        amendments: "Nil",
        related_to: "IS 269"
      },
      {
        relation_type: "Test Methods",
        rank: 2,
        id: "IS-4031-6",
        is_number: "IS 4031 (Part 6)",
        title: "Methods of physical tests for hydraulic cement: Part 6 Compressive strength",
        relevance: 84,
        status: "current",
        latest_version: "IS 4031 (Part 6):1988",
        amendments: "Amendment 1",
        related_to: "IS 269"
      },
      {
        relation_type: "Test Methods",
        rank: 3,
        id: "IS-4032",
        is_number: "IS 4032",
        title: "Method of chemical analysis of hydraulic cement",
        relevance: 81,
        status: "current",
        latest_version: "IS 4032:1985",
        amendments: "Amendments 1, 2",
        related_to: "IS 269"
      },
      {
        relation_type: "Packaging & Marking",
        rank: 4,
        id: "IS-11652",
        is_number: "IS 11652",
        title: "High density polyethylene (HDPE) / polypropylene (PP) woven sacks for packing cement — Specification",
        relevance: 78,
        status: "current",
        latest_version: "IS 11652:2017",
        amendments: "Amendment 1",
        related_to: "IS 269"
      },
      {
        relation_type: "Terminology",
        rank: 5,
        id: "IS-4845",
        is_number: "IS 4845",
        title: "Definitions and terminology relating to hydraulic cement",
        relevance: 72,
        status: "current",
        latest_version: "IS 4845:1990",
        amendments: "Nil",
        related_to: "IS 269"
      }
    ],
    mandatory_certifications: [
      {
        scheme: "Scheme-I (ISI Mark)",
        name: "Bureau of Indian Standards Product Certification Scheme",
        mandatory: "Yes",
        applies_to: "All grades of Ordinary Portland Cement (33, 43, 53 Grade)",
        basis: "Cement (Quality Control) Order, 2003 issued by DPIIT, Ministry of Commerce and Industry",
        notes: "No consignment shall be accepted without the standard ISI mark and manufacturer's valid BIS License Number (CM/L-XXXXXXXXX)."
      }
    ],
    suggested_clause: `TENDER SPECIFICATION COMPLIANCE CLAUSE:
The cement supplied under this contract shall strictly conform to IS 269:2015 (Ordinary Portland Cement - Specification, Sixth Revision) of the grade specified in the Schedule of Quantities. The cement shall hold a valid Bureau of Indian Standards (BIS) Certification Mark (ISI Mark) under Scheme-I of BIS (Conformity Assessment) Regulations, 2018 in compliance with the Cement (Quality Control) Order issued by the Government of India. The bidder shall furnish a copy of the manufacturer's valid BIS license along with the technical bid, and each consignment delivered at the site shall bear the ISI Mark, manufacturer's name, brand, grade, week and year of manufacture, and net mass on every bag as per IS 269:2015 and IS 11652:2017. Acceptance testing shall be carried out in accordance with IS 4031 and IS 4032 at a NABL-accredited test laboratory.`,
    warnings: [
      "Ensure the manufacturer possesses an active, un-suspended BIS License at the time of bid submission and material dispatch.",
      "IS 8112 (43 grade) and IS 12269 (53 grade) standards are withdrawn; ensure tender terms do not refer to superseded standards without citing IS 269:2015.",
      "Check that cement bags stored for more than 90 days from the date of manufacture are retested for compressive strength prior to incorporation into permanent civil works."
    ]
  },

  electronics: {
    request_id: "REQ-2026-0929-9140",
    detected_language: "English",
    product_summary: "Commercial Laptops / Portable Information Technology Equipment and Power Adapters",
    translated_query: null,
    user_version_warning: null,
    recommended_standards: [
      {
        rank: 1,
        id: "IS-13252-1",
        is_number: "IS 13252 (Part 1)",
        title: "Information Technology Equipment — Safety: Part 1 General Requirements",
        relevance: 97,
        status: "current",
        latest_version: "IS 13252 (Part 1):2010",
        amendments: "Amendments 1, 2",
        reason: "Core safety standard notified under MeitY Compulsory Registration Scheme (CRS) for portable notebook computers.",
        scope_summary: "Covers electrical safety, insulation resistance, touch current, fire retardance of casing, thermal runaways, and power supply safety."
      },
      {
        rank: 2,
        id: "IS-16046-2",
        is_number: "IS 16046 (Part 2)",
        title: "Secondary cells and batteries containing alkaline or other non-acid electrolytes: Portable lithium systems",
        relevance: 93,
        status: "current",
        latest_version: "IS 16046 (Part 2):2018 / IEC 62133-2:2017",
        amendments: "Amendment 1",
        reason: "Mandatory safety requirement for rechargeable internal lithium-ion / polymer battery packs powering laptops.",
        scope_summary: "Specifies rigorous safety testing including external short circuit, thermal abuse, free fall, crushing, and overcharging protection."
      }
    ],
    allied_standards: [
      {
        relation_type: "Safety",
        rank: 1,
        id: "IS-616",
        is_number: "IS 616",
        title: "Audio, video and similar electronic apparatus — Safety requirements",
        relevance: 82,
        status: "under_revision",
        latest_version: "IS 616:2017 / IEC 60065",
        amendments: "Amendments 1, 2",
        related_to: "IS 13252 (Part 1)"
      },
      {
        relation_type: "Test Methods",
        rank: 2,
        id: "IS-14886",
        is_number: "IS 14886",
        title: "Methods of measurement for energy consumption of computers",
        relevance: 79,
        status: "current",
        latest_version: "IS 14886:2000",
        amendments: "Nil",
        related_to: "IS 13252 (Part 1)"
      },
      {
        relation_type: "Packaging & Marking",
        rank: 3,
        id: "IS-12063",
        is_number: "IS 12063",
        title: "Classification of degrees of protection provided by enclosures (IP Code)",
        relevance: 74,
        status: "current",
        latest_version: "IS 12063:1987",
        amendments: "Nil",
        related_to: "IS 13252 (Part 1)"
      }
    ],
    mandatory_certifications: [
      {
        scheme: "Scheme-II (CRS - Compulsory Registration Scheme)",
        name: "MeitY Electronics and IT Goods (Requirement for Compulsory Registration) Order",
        mandatory: "Yes",
        applies_to: "Laptops / Notebook Computers (Item 3) and Power Adapters (Item 5)",
        basis: "Electronics & IT Goods (Requirement for Compulsory Registration) Order (CRO), 2012 and subsequent amendments issued by MeitY",
        notes: "Goods must be registered with BIS under CRS and bear the standard registration mark with statement 'Self Declaration - Conforming to IS 13252 (Part 1):2010, R-XXXXXXXX' and BIS portal link."
      },
      {
        scheme: "Scheme-II (CRS - Batteries)",
        name: "Secondary Cells and Batteries (Lithium)",
        mandatory: "Yes",
        applies_to: "Internal Lithium-ion battery packs",
        basis: "CRO Phase II notified under Gazette notification",
        notes: "Battery cell/pack must possess distinct R-number registration conforming to IS 16046 (Part 2):2018."
      }
    ],
    suggested_clause: `TENDER SPECIFICATION COMPLIANCE CLAUSE:
The IT hardware equipment (laptops, notebook computers, and external power adapters) supplied under this tender must strictly conform to IS 13252 (Part 1):2010 / IEC 60950-1 and have valid registration under the Compulsory Registration Scheme (CRS - Scheme II) of the Bureau of Indian Standards (BIS) in compliance with the Electronics and Information Technology Goods (Requirement for Compulsory Registration) Order, 2012 issued by MeitY. The internal rechargeable battery packs must independently conform to IS 16046 (Part 2):2018 / IEC 62133-2 with separate valid BIS CRS registration. Every unit and its primary packaging carton shall visibly bear the BIS standard CRS mark with the inscription "Self-Declaration - Conforming to IS 13252 (Part 1):2010, R-XXXXXXXX, www.bis.gov.in". Bidders must submit copies of the valid BIS CRS grant letters and test reports issued by a BIS-recognized test laboratory with the technical bid.`,
    warnings: [
      "Verify the R-number (Registration Number) directly on the official BIS CRS portal (www.crsbis.in) to verify status and brand inclusion.",
      "Power adapters and battery packs are treated as distinct mandatory categories; ensure OEM supplies certified peripherals under valid registrations.",
      "Suppliers importing equipment must be verified as authorized Indian Representatives registered with BIS."
    ]
  },

  jewellery: {
    request_id: "REQ-2026-0929-7751",
    detected_language: "Hindi",
    product_summary: "22 Karat Gold Jewellery and Commemorative Mementos / Artefacts",
    translated_query: "Procurement of 22 Karat Gold Jewellery, Coins, or Artefacts for official presentation / mementos with BIS Hallmarking",
    user_version_warning: null,
    recommended_standards: [
      {
        rank: 1,
        id: "IS-1417",
        is_number: "IS 1417",
        title: "Gold and Gold Alloys, Jewellery/Artefacts — Fineness and Marking (Fifth Revision)",
        relevance: 99,
        status: "current",
        latest_version: "IS 1417:2016",
        amendments: "Amendment 1 (HUID mandate)",
        reason: "Primary national standard governing fineness, hallmarking grades, and stamping of gold artefacts.",
        scope_summary: "Prescribes requirements of fineness grades (e.g. 22K = 916 fineness, 18K = 750 fineness, 14K = 585 fineness) and official marks."
      }
    ],
    allied_standards: [
      {
        relation_type: "Test Methods",
        rank: 1,
        id: "IS-1418",
        is_number: "IS 1418",
        title: "Assaying of Gold in Gold Bullion, Gold Alloys and Gold Jewellery/Artefacts by Cupellation (Fire Assay) Method",
        relevance: 91,
        status: "current",
        latest_version: "IS 1418:2009",
        amendments: "Amendment 1",
        related_to: "IS 1417"
      },
      {
        relation_type: "Terminology",
        rank: 2,
        id: "IS-2114",
        is_number: "IS 2114",
        title: "Terminology relating to assaying and hallmarking of precious metals",
        relevance: 80,
        status: "current",
        latest_version: "IS 2114:2012",
        amendments: "Nil",
        related_to: "IS 1417"
      },
      {
        relation_type: "Related Products",
        rank: 3,
        id: "IS-2112",
        is_number: "IS 2112",
        title: "Silver and silver alloys, jewellery/artefacts — Fineness and marking",
        relevance: 68,
        status: "current",
        latest_version: "IS 2112:2014",
        amendments: "Amendment 1",
        related_to: "IS 1417"
      }
    ],
    mandatory_certifications: [
      {
        scheme: "Hallmarking Scheme",
        name: "Mandatory BIS Hallmarking for Gold Jewellery & Artefacts",
        mandatory: "Yes",
        applies_to: "All 14K, 18K, 20K, 22K, 23K and 24K Gold Jewellery/Artefacts",
        basis: "Hallmarking of Gold Jewellery and Gold Artefacts Order, 2020 issued under Section 14, 15 and 16 of the BIS Act, 2016",
        notes: "Each article must be laser-marked with 3 distinct symbols: (1) BIS Logo, (2) Purity and Fineness (e.g. 22K916), (3) 6-digit alphanumeric Hallmark Unique Identification (HUID) number."
      }
    ],
    suggested_clause: `TENDER SPECIFICATION COMPLIANCE CLAUSE:
All gold jewellery, coins, or commemorative artefacts supplied under this contract shall strictly conform to IS 1417:2016 (Gold and Gold Alloys, Jewellery/Artefacts - Fineness and Marking) of 22 Karat (916 fineness) purity. In accordance with the Hallmarking of Gold Jewellery and Gold Artefacts Order, 2020, every item must be hallmarked by a BIS-recognized Assaying and Hallmarking Centre (AHC) and must bear the three mandatory laser marks: (1) Official BIS Hallmark triangle logo, (2) Purity/Fineness symbol "22K916", and (3) Individual 6-digit alphanumeric Hallmark Unique Identification (HUID) code. The vendor must be a registered jeweller with the Bureau of Indian Standards and must provide an authenticated HUID verification certificate from the BIS Care Portal with every deliverable item.`,
    warnings: [
      "Do not accept any non-hallmarked or non-HUID marked gold items under government procurement contracts.",
      "The procuring entity should verify the 6-digit HUID code using the BIS Care Mobile App or BIS portal before releasing vendor payment."
    ]
  },

  multi_item: {
    request_id: "REQ-2026-0929-9944",
    detected_language: "English",
    product_summary: "Comprehensive Civil Infrastructure and IT Package: Structural Cement and Desktop/Laptop Systems",
    translated_query: null,
    user_version_warning: null,
    items: [
      {
        item_id: "item-1",
        item_name: "Item 1: Structural Portland Cement (Civil Works)",
        product_summary: "Ordinary Portland Cement 53 Grade conforming to IS 269",
        recommended_standards: [
          {
            rank: 1,
            id: "IS-269",
            is_number: "IS 269",
            title: "Ordinary Portland Cement — Specification (Sixth Revision)",
            relevance: 98,
            status: "current",
            latest_version: "IS 269:2015",
            amendments: "Amendments 1, 2",
            reason: "Standard specification for 53 Grade cement for high strength structural load bearing structures.",
            scope_summary: "Chemical and physical parameters for high grade OPC."
          }
        ],
        allied_standards: [
          {
            relation_type: "Test Methods",
            rank: 1,
            id: "IS-4031-6",
            is_number: "IS 4031 (Part 6)",
            title: "Methods of physical tests for hydraulic cement: Part 6 Compressive strength",
            relevance: 84,
            status: "current",
            latest_version: "IS 4031 (Part 6):1988",
            amendments: "Amendment 1",
            related_to: "IS 269"
          }
        ],
        mandatory_certifications: [
          {
            scheme: "Scheme-I (ISI Mark)",
            name: "BIS ISI Product Certification",
            mandatory: "Yes",
            applies_to: "All manufactured cement",
            basis: "Cement Quality Control Order, 2003",
            notes: "Must bear standard ISI mark."
          }
        ],
        suggested_clause: "Cement for Item 1 shall conform to IS 269:2015 with valid ISI mark under DPIIT Cement QCO.",
        warnings: ["Ensure valid BIS license for cement manufacturer."]
      },
      {
        item_id: "item-2",
        item_name: "Item 2: IT Equipment & Laptops (Administrative Setup)",
        product_summary: "Commercial Laptops with CRS Certification",
        recommended_standards: [
          {
            rank: 1,
            id: "IS-13252-1",
            is_number: "IS 13252 (Part 1)",
            title: "Information Technology Equipment — Safety: Part 1 General Requirements",
            relevance: 96,
            status: "current",
            latest_version: "IS 13252 (Part 1):2010",
            amendments: "Amendments 1, 2",
            reason: "Notified standard for laptop electronic safety.",
            scope_summary: "Electrical safety and environmental endurance."
          }
        ],
        allied_standards: [
          {
            relation_type: "Safety",
            rank: 1,
            id: "IS-16046-2",
            is_number: "IS 16046 (Part 2)",
            title: "Secondary cells and batteries: Portable lithium systems",
            relevance: 92,
            status: "current",
            latest_version: "IS 16046 (Part 2):2018",
            amendments: "Amendment 1",
            related_to: "IS 13252 (Part 1)"
          }
        ],
        mandatory_certifications: [
          {
            scheme: "Scheme-II (CRS - Compulsory Registration Scheme)",
            name: "MeitY Compulsory Registration Scheme",
            mandatory: "Yes",
            applies_to: "Laptops, Power Adapters and Lithium Batteries",
            basis: "Electronics & IT Goods CRO 2012",
            notes: "Bidders must submit R-number registration letters."
          }
        ],
        suggested_clause: "IT equipment under Item 2 shall comply with IS 13252 (Part 1):2010 and carry valid BIS CRS registration.",
        warnings: ["Validate R-numbers on official crsbis.in database before procurement award."]
      }
    ]
  },

  packaged_water: {
    request_id: "REQ-2026-0929-6542",
    detected_language: "English",
    product_summary: "Packaged Drinking Water for Institutional Catering and Public Supplies",
    translated_query: null,
    user_version_warning: null,
    recommended_standards: [
      {
        rank: 1,
        id: "IS-14543",
        is_number: "IS 14543",
        title: "Packaged Drinking Water (Other than Packaged Natural Mineral Water) — Specification",
        relevance: 99,
        status: "current",
        latest_version: "IS 14543:2016",
        amendments: "Amendment 1",
        reason: "Mandatory statutory specification for commercial packaged drinking water containers.",
        scope_summary: "Physical, chemical, radiological, and microbiological standards for sealed drinking water."
      }
    ],
    allied_standards: [
      {
        relation_type: "Test Methods",
        rank: 1,
        id: "IS-3025-1",
        is_number: "IS 3025 (Part 1)",
        title: "Methods of sampling and test (physical and chemical) for water and wastewater",
        relevance: 82,
        status: "current",
        latest_version: "IS 3025 (Part 1):1987",
        amendments: "Nil",
        related_to: "IS 14543"
      }
    ],
    mandatory_certifications: [
      {
        scheme: "Scheme-I (ISI Mark)",
        name: "BIS Mandatory ISI Mark for Packaged Water",
        mandatory: "Yes",
        applies_to: "All bottled and jar-packaged drinking water containers",
        basis: "Food Safety and Standards Act (FSSAI) Regulation 2.3.14 & Ministry of Consumer Affairs notifications",
        notes: "Strict dual certification required: valid FSSAI license and valid BIS ISI Mark license."
      }
    ],
    suggested_clause: "Packaged drinking water supplied shall conform to IS 14543:2016, carrying the ISI Mark and valid FSSAI license number.",
    warnings: ["Random batch water samples should be submitted to accredited public health laboratories for periodic testing."]
  }
};

/**
 * Clickable Example Queries provided on Find Standards page
 */
export const EXAMPLE_QUERIES = [
  {
    id: "ex-cement",
    label: "Civil Works: Ordinary Portland Cement 43/53 Grade for RCC bridge foundation",
    query: "Procurement of Ordinary Portland Cement 43 Grade (referencing earlier IS 8112 / IS 269) for heavy structural reinforced concrete bridge foundation with high durability and sulfate resistance.",
    language: "en"
  },
  {
    id: "ex-electronics",
    label: "IT Procurement: 500 commercial laptops with BIS CRS registration and power adapters",
    query: "Supply of 500 commercial laptops and notebook computers with 65W power adapters and internal lithium-ion battery packs for government e-office deployment with BIS CRS compliance.",
    language: "en"
  },
  {
    id: "ex-jewellery",
    label: "हिन्दी: 22 कैरेट सोने के आभूषण एवं स्मृति चिन्हों की खरीद हेतु बीआईएस हॉलमार्किंग (IS 1417)",
    query: "सरकारी सम्मान समारोह एवं पुरस्कार हेतु 22 कैरेट (916 शुद्धता) सोने के स्मृति सिक्के एवं आभूषणों की खरीद, जिस पर अनिवार्य बीआईएस हॉलमार्क एवं 6-अंकीय HUID संख्या अंकित हो।",
    language: "hi"
  },
  {
    id: "ex-packaged-water",
    label: "Institutional Supply: Packaged drinking water bottles with ISI Mark (IS 14543)",
    query: "Annual rate contract for supply of 1-litre bottled packaged drinking water and 20-litre dispensers for government hospital canteens conforming to BIS standard with ISI Mark.",
    language: "en"
  },
  {
    id: "ex-multi-item",
    label: "Composite Tender: Civil Works Cement & Office Laptops (Multi-item tender demo)",
    query: "Tender for comprehensive project package including civil construction with 53 grade cement and office digitization with commercial laptops.",
    language: "en"
  }
];
