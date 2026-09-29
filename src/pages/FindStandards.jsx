import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs } from '../components/Tabs.jsx';
import { Loader } from '../components/Loader.jsx';
import { ErrorBox } from '../components/ErrorBox.jsx';
import { SUPPORTED_LANGUAGES } from '../i18n/index.js';
import { EXAMPLE_QUERIES } from '../services/mockData.js';
import { recommendStandards } from '../services/api.js';

export function FindStandards({ t }) {
  const navigate = useNavigate();

  // Tab state
  const [activeTab, setActiveTab] = useState('describe');

  // Form states: Describe Product
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('auto');
  const [includeAllied, setIncludeAllied] = useState(true);
  const [includeCert, setIncludeCert] = useState(true);

  // Form states: Upload Document
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadLanguage, setUploadLanguage] = useState('auto');
  const [uploadAllied, setUploadAllied] = useState(true);
  const [uploadCert, setUploadCert] = useState(true);

  // Loading & Error states
  const [loading, setLoading] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const charCount = query.length;
  const isCharCountValid = charCount >= 10 && charCount <= 5000;

  const handleExampleClick = (example) => {
    setQuery(example.query);
    if (example.language === 'hi') {
      setLanguage('hi');
    } else {
      setLanguage('auto');
    }
    setErrorMessage(null);
  };

  const handleReset = () => {
    setQuery('');
    setLanguage('auto');
    setIncludeAllied(true);
    setIncludeCert(true);
    setErrorMessage(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setErrorMessage(null);
    if (!file) {
      setUploadedFile(null);
      return;
    }

    // Client-side validations: File Type
    const validExtensions = ['.pdf', '.docx', '.txt'];
    const fileName = file.name.toLowerCase();
    const isValidType = validExtensions.some(ext => fileName.endsWith(ext));

    if (!isValidType) {
      setErrorMessage(t.uploadErrorType || 'Invalid file format. Only PDF, DOCX, and TXT files are accepted.');
      setUploadedFile(null);
      e.target.value = '';
      return;
    }

    // Client-side validations: File Size (max 10 MB = 10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage(t.uploadErrorSize || 'File size exceeds 10 MB limit. Please select a smaller file.');
      setUploadedFile(null);
      e.target.value = '';
      return;
    }

    setUploadedFile(file);
  };

  // Helper to load sample tender file directly for testing
  const handleLoadSampleFile = () => {
    const sampleContent = `GOVERNMENT OF INDIA - MINISTRY OF HOUSING AND URBAN AFFAIRS
CPWD TENDER NOTICE NO. CPWD/2026/CIVIL-04
Supply of Ordinary Portland Cement 43 Grade conforming to technical standard specifications for construction of multi-storey government residential quarters. The cement bags must conform to BIS standards and bear valid ISI certification mark.`;
    const blob = new Blob([sampleContent], { type: 'text/plain' });
    const file = new File([blob], 'sample_tender_specification.txt', { type: 'text/plain' });
    setUploadedFile(file);
    setErrorMessage(null);
  };

  const handleSubmitDescribe = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (charCount < 10) {
      setErrorMessage("Please enter at least 10 characters describing the product or technical specifications.");
      return;
    }

    if (charCount > 5000) {
      setErrorMessage("Description exceeds the 5000 character maximum limit.");
      return;
    }

    setLoading(true);
    setProgressMsg("Connecting to BIS Knowledge Index & checking mandatory Quality Control Orders (QCO)...");

    try {
      const result = await recommendStandards({
        query,
        language,
        includeAllied,
        includeCert
      });
      setLoading(false);
      navigate('/results', { state: { result, originalQuery: query } });
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || "Failed to analyze specifications. Please try again.");
    }
  };

  const handleSubmitUpload = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!uploadedFile) {
      setErrorMessage("Please select a tender document file (PDF, DOCX, or TXT) to upload.");
      return;
    }

    setLoading(true);
    setProgressMsg(`Parsing ${uploadedFile.name} & extracting technical requirement parameters...`);

    try {
      const result = await recommendStandards({
        file: uploadedFile,
        language: uploadLanguage,
        includeAllied: uploadAllied,
        includeCert: uploadCert
      });
      setLoading(false);
      navigate('/results', { state: { result, originalQuery: `Uploaded document: ${uploadedFile.name}` } });
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || "Failed to process tender document. Please try again.");
    }
  };

  const tabsConfig = [
    { id: 'describe', label: t.tabDescribe || "Describe Product" },
    { id: 'upload', label: t.tabUpload || "Upload Tender Document" }
  ];

  return (
    <div className="page-find-standards">
      <h1>{t.findPageTitle}</h1>

      <Tabs tabs={tabsConfig} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Error Display */}
      {errorMessage && (
        <ErrorBox message={errorMessage} onDismiss={() => setErrorMessage(null)} />
      )}

      {/* Loading Progress State */}
      {loading && (
        <Loader message={t.analyzingMsg} progressText={progressMsg} />
      )}

      {/* TAB 1: Describe Product */}
      {!loading && activeTab === 'describe' && (
        <form onSubmit={handleSubmitDescribe} className="panel-white" noValidate>
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="product-query" className="form-label" style={{ marginBottom: 0 }}>
                {t.inputLabel} <span className="required">*</span>
              </label>
              {query && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-sm btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '2px 6px' }}
                >
                  Clear Text
                </button>
              )}
            </div>

            <textarea
              id="product-query"
              className="form-control"
              rows={6}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.inputPlaceholder}
              aria-describedby="char-counter query-hint"
              required
              style={{ marginTop: '6px' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
              <div id="query-hint" className="form-hint">
                Tip: Mention generic material, intended application, or design grade (avoid proprietary brand names).
              </div>
              <div
                id="char-counter"
                className={`char-counter ${charCount > 5000 ? 'limit-exceeded' : ''}`}
                style={{
                  color: charCount >= 10 && charCount <= 5000 ? 'var(--color-status-current)' : (charCount > 5000 ? 'var(--color-status-withdrawn)' : '#666'),
                  fontWeight: 600
                }}
              >
                {charCount} / 5000 characters {charCount >= 10 && charCount <= 5000 ? '✓ (Valid)' : '(Min 10)'}
              </div>
            </div>
          </div>

          {/* Quick Clickable Example Queries */}
          <div className="form-group" style={{ backgroundColor: '#F8F9FA', border: '1px solid #E0E0E0', padding: '10px 12px' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '4px' }}>
              {t.exampleQueriesLabel}
            </div>
            <div className="example-chips">
              {EXAMPLE_QUERIES.map((ex) => (
                <button
                  key={ex.id}
                  type="button"
                  className="example-chip-btn"
                  onClick={() => handleExampleClick(ex)}
                  title="Click to populate specification query"
                >
                  ▶ {ex.label}
                </button>
              ))}
            </div>
          </div>

          {/* Configuration Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', margin: '16px 0' }}>
            {/* Language Selection */}
            <div>
              <label htmlFor="input-language" className="form-label">
                {t.languageLabel}
              </label>
              <select
                id="input-language"
                className="form-control"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="auto">{t.autoDetect}</option>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkboxes: Allied standards & Certification */}
            <div>
              <label className="form-label">Recommendation Scope:</label>
              <div>
                <label className="checkbox-label" htmlFor="chk-allied">
                  <input
                    type="checkbox"
                    id="chk-allied"
                    checked={includeAllied}
                    onChange={(e) => setIncludeAllied(e.target.checked)}
                  />
                  <span>{t.optAllied}</span>
                </label>
              </div>
              <div>
                <label className="checkbox-label" htmlFor="chk-cert">
                  <input
                    type="checkbox"
                    id="chk-cert"
                    checked={includeCert}
                    onChange={(e) => setIncludeCert(e.target.checked)}
                  />
                  <span>{t.optCert}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Buttons: Submit & Reset */}
          <div className="button-group" style={{ marginTop: '20px', borderTop: '1px solid #EEEEEE', paddingTop: '16px' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={charCount < 10 || charCount > 5000}
              style={{ minWidth: '160px' }}
            >
              {t.btnSubmit}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              {t.btnReset}
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: Upload Tender Document */}
      {!loading && activeTab === 'upload' && (
        <form onSubmit={handleSubmitUpload} className="panel-white" noValidate>
          <div className="form-group">
            <label htmlFor="tender-file-upload" className="form-label">
              {t.uploadLabel} <span className="required">*</span>
            </label>

            <div className="dropzone-box">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1F3A6E" strokeWidth="1.5" style={{ display: 'block', margin: '0 auto 8px auto' }} aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
              <div style={{ fontWeight: 600, color: '#333', marginBottom: '4px' }}>
                Select or Browse Tender Document from Your Computer
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#666', marginBottom: '12px' }}>
                Supported formats: <strong>.pdf</strong>, <strong>.docx</strong>, <strong>.txt</strong> (Max file size: 10 MB)
              </div>
              <input
                type="file"
                id="tender-file-upload"
                className="form-control"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                aria-describedby="upload-help"
                style={{ maxWidth: '400px', margin: '0 auto' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
              <div id="upload-help" className="form-hint">
                Document contents are parsed safely for technical standards keywords.
              </div>
              <button
                type="button"
                className="example-link"
                onClick={handleLoadSampleFile}
                style={{ fontSize: '0.8125rem' }}
              >
                📎 Load Sample Tender Document (.txt)
              </button>
            </div>

            {uploadedFile && (
              <div className="success-box" style={{ marginTop: '12px', padding: '8px 12px' }}>
                Selected file: <strong>{uploadedFile.name}</strong> ({(uploadedFile.size / 1024).toFixed(1)} KB) &mdash; Ready for analysis.
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', margin: '16px 0' }}>
            <div style={{ maxWidth: '320px' }}>
              <label htmlFor="upload-language" className="form-label">
                {t.languageLabel}
              </label>
              <select
                id="upload-language"
                className="form-control"
                value={uploadLanguage}
                onChange={(e) => setUploadLanguage(e.target.value)}
              >
                <option value="auto">{t.autoDetect}</option>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Recommendation Scope:</label>
              <div>
                <label className="checkbox-label" htmlFor="chk-upload-allied">
                  <input
                    type="checkbox"
                    id="chk-upload-allied"
                    checked={uploadAllied}
                    onChange={(e) => setUploadAllied(e.target.checked)}
                  />
                  <span>{t.optAllied}</span>
                </label>
              </div>
              <div>
                <label className="checkbox-label" htmlFor="chk-upload-cert">
                  <input
                    type="checkbox"
                    id="chk-upload-cert"
                    checked={uploadCert}
                    onChange={(e) => setUploadCert(e.target.checked)}
                  />
                  <span>{t.optCert}</span>
                </label>
              </div>
            </div>
          </div>

          <div className="button-group" style={{ marginTop: '20px', borderTop: '1px solid #EEEEEE', paddingTop: '16px' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!uploadedFile}
              style={{ minWidth: '160px' }}
            >
              {t.btnSubmit}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
