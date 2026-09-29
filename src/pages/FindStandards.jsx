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
      // Navigate to Results page passing recommendation data
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
    { id: 'describe', label: t.tabDescribe },
    { id: 'upload', label: t.tabUpload }
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
            <label htmlFor="product-query" className="form-label">
              {t.inputLabel} <span className="required">*</span>
            </label>
            <textarea
              id="product-query"
              className="form-control"
              rows={6}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.inputPlaceholder}
              aria-describedby="char-counter query-hint"
              required
            />
            <div
              id="char-counter"
              className={`char-counter ${charCount > 5000 ? 'limit-exceeded' : ''}`}
            >
              Characters: {charCount} / 5000 ({t.charCountMinMax})
            </div>
            <div id="query-hint" className="form-hint">
              Mention product functionality, engineering materials, grades, or intended environmental operating conditions.
            </div>
          </div>

          {/* Clickable Example Queries (plain text links, including one in Hindi) */}
          <div className="form-group example-queries">
            <strong>{t.exampleQueriesLabel}</strong>
            <ul className="example-list">
              {EXAMPLE_QUERIES.map((ex) => (
                <li key={ex.id}>
                  <button
                    type="button"
                    className="example-link"
                    onClick={() => handleExampleClick(ex)}
                  >
                    &bull; {ex.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Language Selection */}
          <div className="form-group" style={{ maxWidth: '320px' }}>
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
          <div className="form-group">
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

          {/* Buttons: Submit & Reset */}
          <div className="button-group" style={{ marginTop: '20px' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={charCount < 10 || charCount > 5000}
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
            <input
              type="file"
              id="tender-file-upload"
              className="form-control"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              aria-describedby="upload-help"
            />
            <div id="upload-help" className="form-hint">
              Supported file formats: Portable Document Format (.pdf), Microsoft Word (.docx), Plain Text (.txt). Maximum file size limit: 10 MB.
            </div>
            {uploadedFile && (
              <div style={{ marginTop: '8px', fontSize: '0.875rem', color: '#1E6B2E' }}>
                Selected file: <strong>{uploadedFile.name}</strong> ({(uploadedFile.size / 1024).toFixed(1)} KB)
              </div>
            )}
          </div>

          <div className="form-group" style={{ maxWidth: '320px' }}>
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

          <div className="form-group">
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

          <div className="button-group" style={{ marginTop: '20px' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!uploadedFile}
            >
              {t.btnSubmit}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
