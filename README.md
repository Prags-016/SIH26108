# IS Standards Recommendation Engine (Bharatiya Manak Sifarish Portal)
### भारतीय मानक अनुशंसा पोर्टल — सार्वजनिक खरीद हेतु एआई-सहायक मंच

A specialized government web application built in strict conformance with the **Guidelines for Indian Government Websites (GIGW)** and **WCAG 2.1 AA** standards. It helps procurement officials, tender drafting committees, and technical evaluation teams discover relevant Indian Standards (IS), mandatory Quality Control Orders (QCOs), and allied testing specifications when preparing government tenders under Rule 144 of the General Financial Rules (GFR), 2017.

---

## 🏛️ Design & GIGW Aesthetic Principles

- **Formal Government Aesthetic:** Plain, formal, high-density layout inspired by *india.gov.in*, *bis.gov.in*, and *gem.gov.in*.
- **No Non-Government Frills:** Zero gradients, zero glassmorphism, zero pill buttons, zero emojis, zero gratuitous animations.
- **Official Colour System:** 
  - Header & Primary Action: Deep Navy Blue (`#1F3A6E`)
  - Content Panels: Clean Off-White & Light Grey (`#F2F2F2`)
  - Borders: 1px Solid Grey (`#CCCCCC`)
  - Status Indicators: Current (Dark Green `#1E6B2E`), Withdrawn/Superseded (Dark Red `#B00020`), Under Revision (Amber `#9A5B00`)
- **Full Accessibility:**
  - Skip to main content link
  - Text-size adjustment controls (A-, A, A+)
  - High Contrast mode toggle (Black & Yellow theme)
  - Keyboard accessible tab indexing and visible focus indicators
  - Semantic HTML5 structure with ARIA live regions for asynchronous processes

---

## 🛠️ Tech Stack

- **Core:** React 19 + Vite 8
- **Routing:** React Router v7
- **Styling:** Vanilla CSS with CSS custom properties (`src/styles/global.css`)
- **Language / Typings:** JavaScript (ES Modules)
- **Internationalization:** Multi-lingual support dictionary (`src/i18n/`) for English, Hindi, and 11 other scheduled languages.
- **Data & API Layer:** Standalone mock API service (`src/services/api.js` and `src/services/mockData.js`) with instant live backend toggle.

---

## 🚀 Getting Started

### 1. Installation

Ensure Node.js (v18+) is installed on your system.

```bash
npm install
```

### 2. Running in Development Mode

```bash
npm run dev
```

The portal will start locally at **`http://localhost:3000`** (or the port indicated in your terminal).

### 3. Production Build

To test or generate the production bundle:

```bash
npm run build
npm run preview
```

---

## ⚙️ Environment Configuration

Configuration is managed via `.env` / `.env.example`:

| Variable | Default Value | Description |
|---|---|---|
| `VITE_USE_MOCK` | `true` | When `true`, all API calls return simulated data from `mockData.js` after a realistic 1-second delay. Set to `false` for live backend integration. |
| `VITE_API_BASE_URL` | `https://api.standards.gov.in/api/v1` | Target URL for the live backend API. |

---

## 🧪 Demo Scenarios & Test Queries

The mock engine supports test queries to demonstrate all BIS certification schemes:

1. **Scheme-I (ISI Mark) — Cement:**
   - Click the first example on the Find Standards page: *"Civil Works: Ordinary Portland Cement 43/53 Grade for RCC bridge foundation"*
   - Demonstrates: IS 269:2015, version warning for superseded IS 8112 / IS 12269, allied test methods (IS 4031, IS 4032), packaging standards (IS 11652), and DPIIT Cement Quality Control Order.

2. **Scheme-II (CRS - Compulsory Registration Scheme) — Electronics / IT:**
   - Click the second example: *"IT Procurement: 500 commercial laptops with BIS CRS registration and power adapters"*
   - Demonstrates: IS 13252 (Part 1):2010, secondary battery requirements (IS 16046 Part 2), MeitY CRO mandates, and R-Number registration guidelines.

3. **Hallmarking Scheme — Gold Jewellery (in Hindi):**
   - Click the third example: *"हिन्दी: 22 कैरेट सोने के आभूषण एवं स्मृति चिन्हों की खरीद हेतु बीआईएस हॉलमार्किंग"*
   - Demonstrates: IS 1417:2016, 6-digit HUID requirement, assaying codes (IS 1418), and Hindi-to-English query translation.

4. **Multi-Item Tender Schedule:**
   - Click the fifth example: *"Composite Tender: Civil Works Cement & Office Laptops"*
   - Demonstrates: Multi-item tabbed layout where each item has independent recommended standards, allied codes, and certification orders.

5. **No Match / Empty State:**
   - Type in an unrecognized item (e.g., `quantum flux capacitor`)
   - Demonstrates: GIGW-compliant empty state notification with practical reformulation suggestions for procurement officers.

---

## 📁 Project Directory Structure

```
├── .env.example              # Environment variables template
├── .env                      # Active environment settings
├── index.html                # Main HTML entry with GIGW fonts & accessibility hooks
├── vite.config.js            # Vite bundler configuration
├── package.json              # Project scripts and dependencies
└── src/
    ├── App.jsx               # Root router, global layout and accessibility states
    ├── main.jsx              # React DOM mounting
    ├── components/
    │   ├── AlliedTable.jsx   # Grouped table for allied standards
    │   ├── Breadcrumb.jsx    # Accessible breadcrumb trail
    │   ├── CertTable.jsx     # Mandatory certification requirements table
    │   ├── ErrorBox.jsx      # Accessible error message alert
    │   ├── Footer.jsx        # GIGW-compliant footer with health sync timestamp
    │   ├── Header.jsx        # Tricolour band, emblem placeholder & dual titles
    │   ├── Loader.jsx        # Plain progress indicator with aria-live
    │   ├── Nav.jsx           # Main navigation bar
    │   ├── StandardsTable.jsx# Primary recommended standards with expandable reason rows
    │   ├── Tabs.jsx          # Accessible non-animated bordered tabs
    │   └── UtilityBar.jsx    # Text resizer, high contrast switch, language selector
    ├── i18n/
    │   ├── en.js             # English UI label dictionary
    │   ├── hi.js             # Hindi UI label dictionary
    │   └── index.js          # Language selector index & fallback logic
    ├── pages/
    │   ├── About.jsx         # Portal background & institutional mandate
    │   ├── Accessibility.jsx # WCAG 2.1 AA accessibility conformance report
    │   ├── ContactUs.jsx     # Official secretariat contact details & helpdesk
    │   ├── FeedbackPage.jsx  # Citizen & officer feedback form
    │   ├── FindStandards.jsx # Dual-tab specification input & file upload
    │   ├── Home.jsx          # Portal home with 3-step workflow & advisory notice
    │   ├── MySearches.jsx    # LocalStorage recent query history manager
    │   ├── Policies.jsx      # GIGW hyperlinking, copyright & security policies
    │   ├── Privacy.jsx       # Tender confidentiality & data handling statement
    │   ├── Results.jsx       # 8-section structured recommendation results
    │   ├── Sitemap.jsx       # Hierarchical portal sitemap
    │   ├── StandardDetail.jsx# Definition-style standard metadata & revision log
    │   └── UserGuide.jsx     # Officer SOP & plain FAQ list
    ├── services/
    │   ├── api.js            # Unified API layer reading VITE_USE_MOCK
    │   └── mockData.js       # Complete realistic BIS standards database
    └── styles/
        └── global.css        # Pure CSS design system with high-contrast & print rules
```

---

## 📄 License
Conforms to Government Open Data and GIGW Standards. Developed for educational, hackathon, and procurement modernizing purposes.
