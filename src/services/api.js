import {
  MOCK_HEALTH,
  MOCK_STANDARDS_DB,
  MOCK_RECOMMENDATIONS
} from './mockData.js';

// Environment variables
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.standards.gov.in/api/v1';

// Backend errors look like { error: { code, message, details } }.
async function errorMessageFrom(response, fallback) {
  try {
    const body = await response.json();
    return (body && body.error && body.error.message) || (body && body.message) || fallback;
  } catch {
    return fallback;
  }
}

// Helper for simulated network latency
const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch health & data sync status
 */
export async function getHealth() {
  if (USE_MOCK) {
    await delay(300);
    return MOCK_HEALTH;
  }
  const res = await fetch(`${API_BASE_URL}/health`);
  if (!res.ok) {
    throw new Error(`Health check failed with status: ${res.status}`);
  }
  return res.json();
}

/**
 * Submit tender specification / product query for recommendation
 * Supports text query or uploaded document
 */
export async function recommendStandards({
  query = '',
  file = null,
  language = 'auto',
  includeAllied = true,
  includeCert = true
}) {
  if (USE_MOCK) {
    await delay(1000);

    const textToMatch = ((query || '') + ' ' + (file ? file.name : '')).toLowerCase();

    // Check for explicit no-match testing
    if (textToMatch.includes('quantum') || textToMatch.includes('flux capacitor') || textToMatch.includes('nomatch')) {
      const noMatchResp = {
        request_id: `REQ-${Date.now().toString().slice(-4)}`,
        status: "NO_MATCH_FOUND",
        detected_language: language === 'auto' ? 'English' : language,
        product_summary: query || (file ? file.name : "Unrecognized specification"),
        recommended_standards: [],
        allied_standards: [],
        mandatory_certifications: [],
        warnings: ["No direct matching Indian Standards could be identified for this query."]
      };
      saveToHistory({ query: query || file?.name, request_id: noMatchResp.request_id, result: noMatchResp });
      return noMatchResp;
    }

    let result = null;

    if (textToMatch.includes('composite') || (textToMatch.includes('cement') && textToMatch.includes('laptop'))) {
      result = JSON.parse(JSON.stringify(MOCK_RECOMMENDATIONS.multi_item));
    } else if (textToMatch.includes('सोने') || textToMatch.includes('jewel') || textToMatch.includes('gold') || textToMatch.includes('huid') || textToMatch.includes('hallmark')) {
      result = JSON.parse(JSON.stringify(MOCK_RECOMMENDATIONS.jewellery));
    } else if (textToMatch.includes('laptop') || textToMatch.includes('computer') || textToMatch.includes('electronic') || textToMatch.includes('crs')) {
      result = JSON.parse(JSON.stringify(MOCK_RECOMMENDATIONS.electronics));
    } else if (textToMatch.includes('water') || textToMatch.includes('drinking') || textToMatch.includes('bottle')) {
      result = JSON.parse(JSON.stringify(MOCK_RECOMMENDATIONS.packaged_water));
    } else {
      // Default to cement specification demonstration
      result = JSON.parse(JSON.stringify(MOCK_RECOMMENDATIONS.cement));
    }

    // Filter allied standards and certifications if toggled off
    if (!includeAllied) {
      if (result.allied_standards) result.allied_standards = [];
      if (result.items) {
        result.items.forEach(item => { item.allied_standards = []; });
      }
    }
    if (!includeCert) {
      if (result.mandatory_certifications) result.mandatory_certifications = [];
      if (result.items) {
        result.items.forEach(item => { item.mandatory_certifications = []; });
      }
    }

    // Generate fresh request ID
    result.request_id = `REQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    saveToHistory({
      query: query || (file ? `File: ${file.name}` : 'Tender Specification Query'),
      request_id: result.request_id,
      result
    });

    return result;
  }

  // Live backend
  let response;
  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);
    formData.append('include_allied', includeAllied);
    formData.append('include_cert', includeCert);

    response = await fetch(`${API_BASE_URL}/recommend/upload`, {
      method: 'POST',
      body: formData
    });
  } else {
    response = await fetch(`${API_BASE_URL}/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        language,
        include_allied: includeAllied,
        include_cert: includeCert
      })
    });
  }


  if (!response.ok) {
    throw new Error(await errorMessageFrom(response, `Server responded with error status ${response.status}`));
  }

  const data = await response.json();
  saveToHistory({
    query: query || file?.name,
    request_id: data.request_id,
    result: data
  });
  return data;
}

/**
 * Fetch detailed specification for a single standard
 */
export async function getStandardDetail(id) {
  if (USE_MOCK) {
    await delay(500);
    const standard = MOCK_STANDARDS_DB[id];
    if (standard) {
      return standard;
    }

    // Dynamic fallback for any standard ID clicked
    return {
      id,
      is_number: id.replace('-', ' '),
      part: "General Section",
      title: `Indian Standard Specification for ${id.replace('-', ' ')}`,
      ics_code: "91.010.01 (Construction industry / General Standards)",
      status: "current",
      latest_version: `${id.replace('-', ' ')}:2020`,
      scope: `This Indian Standard prescribes technical requirements, testing protocols, and compliance criteria for ${id.replace('-', ' ')}. Detailed documentation is maintained by the Bureau of Indian Standards technical committees.`,
      bis_link: `https://standardsbis.bsbedge.com/bis_search_detail.aspx?id=${id}`,
      amendments: [
        { number: "Amendment No. 1", date: "January 2022", summary: "Harmonized sampling guidelines." }
      ],
      version_history: [
        { edition: "Current Revision", year: "2020", status: "current", gazette_date: "2020-05-15", remarks: "Current active standard." }
      ],
      normative_references: [
        { id: "IS-269", is_number: "IS 269", title: "Ordinary Portland Cement — Specification" }
      ],
      certification: {
        is_mandatory: true,
        scheme: "Scheme-I (ISI Mark) / Applicable QCO",
        regulatory_order: "Standard Quality Control Order",
        authority: "Bureau of Indian Standards",
        prohibition_clause: "Conformance required under applicable departmental procurement guidelines."
      }
    };
  }

  const response = await fetch(`${API_BASE_URL}/standards/${encodeURIComponent(id)}`);
  if (!response.ok) {
    throw new Error(await errorMessageFrom(response, `Failed to fetch standard details: status ${response.status}`));
  }
  return response.json();
}

/**
 * Submit feedback for a recommendation result
 */
export async function submitFeedback({ requestId, helpful, comment = '', category = 'accuracy' }) {
  if (USE_MOCK) {
    await delay(600);
    return {
      success: true,
      message: "Feedback submitted successfully. Thank you for helping improve the portal."
    };
  }

  const response = await fetch(`${API_BASE_URL}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      request_id: requestId,
      helpful,
      comment,
      category
    })
  });

  if (!response.ok) {
    throw new Error(await errorMessageFrom(response, `Feedback submission failed: status ${response.status}`));
  }
  return response.json();
}

/**
 * LocalStorage Search History Manager (stores up to last 20 searches)
 */
const STORAGE_KEY = 'bis_search_history';

export function getSearchHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed reading search history:', err);
    return [];
  }
}

export function saveToHistory({ query, request_id, result }) {
  try {
    const history = getSearchHistory();
    const entry = {
      id: request_id || `REQ-${Date.now()}`,
      query,
      timestamp: new Date().toISOString(),
      result
    };
    // Keep most recent first, max 20 entries
    const updated = [entry, ...history.filter(h => h.id !== entry.id)].slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed saving search history:', err);
  }
}

export function deleteHistoryItem(id) {
  try {
    const history = getSearchHistory();
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed deleting history item:', err);
    return [];
  }
}

export function clearAllHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (err) {
    console.error('Failed clearing history:', err);
    return [];
  }
}
