import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { StandardsTable } from '../components/StandardsTable.jsx';
import { AlliedTable } from '../components/AlliedTable.jsx';
import { CertTable } from '../components/CertTable.jsx';
import { Tabs } from '../components/Tabs.jsx';
import { submitFeedback, getSearchHistory } from '../services/api.js';
import { MOCK_RECOMMENDATIONS } from '../services/mockData.js';

export function Results({ t }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve data from router state or fallback to most recent search / default cement mock
  let initialResult = location.state?.result;
  if (!initialResult) {
    const history = getSearchHistory();
    if (history.length > 0 && history[0].result) {
      initialResult = history[0].result;
    } else {
      initialResult = MOCK_RECOMMENDATIONS.cement;
    }
  }

  const result = initialResult;

  // Multi-item tab handling
  const hasItems = Array.isArray(result.items) && result.items.length > 0;
  const [selectedItemId, setSelectedItemId] = useState(hasItems ? result.items[0].item_id : null);

  // Active dataset depending on whether multi-item is active
  const currentItem = hasItems
    ? result.items.find((item) => item.item_id === selectedItemId) || result.items[0]
    : result;

  const recommendedStandards = currentItem.recommended_standards || [];
  const alliedStandards = currentItem.allied_standards || [];
  const certifications = currentItem.mandatory_certifications || [];
  const suggestedClause = currentItem.suggested_clause || '';
  const warnings = currentItem.warnings || [];
  const userVersionWarning = currentItem.user_version_warning || result.user_version_warning || null;

  // Feedback states
  const [feedbackHelpful, setFeedbackHelpful] = useState('yes');
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);

  // Action status message
  const [copyStatus, setCopyStatus] = useState(null);

  // Action: Copy all IS Numbers
  const handleCopyAllIS = () => {
    const allIS = [];
    recommendedStandards.forEach((s) => allIS.push(s.is_number));
    alliedStandards.forEach((s) => allIS.push(s.is_number));
    const unique = [...new Set(allIS)].join(', ');

    if (unique) {
      navigator.clipboard.writeText(unique);
      setCopyStatus(t.isCopied || 'IS numbers copied to clipboard!');
      setTimeout(() => setCopyStatus(null), 3500);
    }
  };

  // Action: Copy Specification Clause
  const handleCopyClause = () => {
    if (suggestedClause) {
      navigator.clipboard.writeText(suggestedClause);
      setCopyStatus(t.clauseCopied || 'Clause copied to clipboard!');
      setTimeout(() => setCopyStatus(null), 3500);
    }
  };

  // Action: Download CSV
  const handleDownloadCSV = () => {
    const rows = [
      ['Type', 'Rank', 'IS Number', 'Title', 'Relevance', 'Status', 'Latest Version', 'Amendments', 'Related To']
    ];

    recommendedStandards.forEach((s) => {
      rows.push([
        'Recommended Standard',
        s.rank,
        `"${s.is_number}"`,
        `"${(s.title || '').replace(/"/g, '""')}"`,
        `${s.relevance}%`,
        `"${s.status}"`,
        `"${s.latest_version}"`,
        `"${s.amendments || ''}"`,
        'Primary'
      ]);
    });

    alliedStandards.forEach((s) => {
      rows.push([
        `Allied (${s.relation_type || 'General'})`,
        s.rank || '',
        `"${s.is_number}"`,
        `"${(s.title || '').replace(/"/g, '""')}"`,
        `${s.relevance}%`,
        `"${s.status}"`,
        `"${s.latest_version}"`,
        `"${s.amendments || ''}"`,
        `"${s.related_to || ''}"`
      ]);
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `IS_Standards_${result.request_id || 'export'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Feedback Submission
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackSubmitting(true);
    try {
      await submitFeedback({
        requestId: result.request_id,
        helpful: feedbackHelpful === 'yes',
        comment: feedbackComment
      });
      setFeedbackSubmitted(true);
    } catch (err) {
      console.error('Feedback failed:', err);
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  // Empty State Handling
  const isNoMatch =
    result.status === 'NO_MATCH_FOUND' ||
    (recommendedStandards.length === 0 && (!hasItems || result.items.length === 0));

  if (isNoMatch) {
    return (
      <div className="page-results">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h1>{t.resultsTitle}</h1>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/find')}
          >
            {t.btnNewSearch}
          </button>
        </div>

        <div className="panel-white">
          <div className="notice-box">
            <h2 style={{ fontSize: '1.2rem', color: '#6C4F00', marginTop: 0 }}>
              {t.noMatchTitle}
            </h2>
            <p>{t.noMatchDesc}</p>
            <p><strong>Query: </strong>{result.product_summary || 'N/A'}</p>
          </div>

          <div className="panel" style={{ marginTop: '16px' }}>
            <h3 style={{ marginTop: 0 }}>Tips for Refining Your Tender Specification:</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.7' }}>
              <li>{t.noMatchTip1}</li>
              <li>{t.noMatchTip2}</li>
              <li>{t.noMatchTip3}</li>
              <li>Consult the official Bureau of Indian Standards e-Sale portal (<a href="https://standardsbis.bsbedge.com" target="_blank" rel="noopener noreferrer">standardsbis.bsbedge.com</a>).</li>
            </ul>
            <div style={{ marginTop: '16px' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate('/find')}
              >
                Return to Search Form
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-results">
      {/* Top Action Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
        <h1 style={{ margin: 0, borderBottom: 'none', paddingBottom: 0 }}>
          {t.resultsTitle}
        </h1>
        <div className="button-group no-print">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => window.print()}
            title="Print or save as PDF"
          >
            {t.btnPrint}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCopyAllIS}
            title="Copy list of all Indian Standards numbers"
          >
            {t.btnCopyIS}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleDownloadCSV}
            title="Download table results as CSV"
          >
            {t.btnDownloadCSV}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/find')}
          >
            {t.btnNewSearch}
          </button>
        </div>
      </div>

      {copyStatus && (
        <div className="success-box" role="status" style={{ padding: '8px 12px', marginBottom: '12px' }}>
          <strong>{copyStatus}</strong>
        </div>
      )}

      {/* 1. Summary Bar Box */}
      <section className="panel" aria-label="Query and Session Summary">
        <div className="panel-header">1. Search & Specification Summary</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', fontSize: '0.9375rem' }}>
          <div>
            <strong>{t.reqId}: </strong>
            <span style={{ fontFamily: 'monospace' }}>{result.request_id || 'REQ-UNKNOWN'}</span>
          </div>
          <div>
            <strong>{t.detectedLang}: </strong>
            <span>{result.detected_language || 'English'}</span>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <strong>{t.productSummary}: </strong>
            <span>{result.product_summary || 'Specification details processed'}</span>
          </div>
          {result.translated_query && (
            <div style={{ gridColumn: '1 / -1', backgroundColor: '#FFF', padding: '8px 12px', border: '1px solid #CCC' }}>
              <strong>{t.translatedQuery}: </strong>
              <span>{result.translated_query}</span>
            </div>
          )}
        </div>
      </section>

      {/* 2. Multi-Item Tender Tabs (if items array present) */}
      {hasItems && (
        <section className="panel-white" style={{ marginBottom: '20px' }} aria-label="Multi-Item Tender Selection">
          <div className="panel-header">
            2. Multi-Item Tender Schedule (Select item to view specific standards)
          </div>
          <Tabs
            tabs={result.items.map((it) => ({ id: it.item_id, label: it.item_name }))}
            activeTab={selectedItemId}
            onTabChange={setSelectedItemId}
          />
          <div style={{ padding: '6px 0', fontSize: '0.9375rem' }}>
            Currently viewing: <strong>{currentItem.item_name}</strong> &mdash; {currentItem.product_summary}
          </div>
        </section>
      )}

      {/* 3. Recommended Indian Standards */}
      <section className="panel-white" aria-labelledby="heading-recommended">
        <h2 id="heading-recommended" className="panel-header" style={{ marginTop: 0 }}>
          {hasItems ? `3. ${currentItem.item_name} - ` : '3. '}{t.recommendedStandardsTitle}
        </h2>
        <StandardsTable
          standards={recommendedStandards}
          userVersionWarning={userVersionWarning}
          t={t}
        />
      </section>

      {/* 4. Allied / Related Standards */}
      <section className="panel-white" aria-labelledby="heading-allied">
        <h2 id="heading-allied" className="panel-header" style={{ marginTop: 0 }}>
          4. {t.alliedStandardsTitle}
        </h2>
        <AlliedTable
          alliedStandards={alliedStandards}
          t={t}
        />
      </section>

      {/* 5. Mandatory Certification Requirements */}
      <section className="panel-white" aria-labelledby="heading-cert">
        <h2 id="heading-cert" className="panel-header" style={{ marginTop: 0 }}>
          5. {t.certTitle}
        </h2>
        <CertTable
          certifications={certifications}
          t={t}
        />
      </section>

      {/* 6. Suggested Specification Clause */}
      <section className="panel-white" aria-labelledby="heading-clause">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h2 id="heading-clause" className="panel-header" style={{ margin: 0, borderBottom: 'none', paddingBottom: 0 }}>
            6. {t.clauseTitle}
          </h2>
          <button
            type="button"
            className="btn btn-sm btn-secondary no-print"
            onClick={handleCopyClause}
          >
            {t.btnCopyClause}
          </button>
        </div>
        <div className="form-group" style={{ marginTop: '8px' }}>
          <textarea
            className="form-control"
            rows={7}
            readOnly
            value={suggestedClause}
            aria-label={t.clauseTitle}
            style={{ backgroundColor: '#FBFBFB', fontFamily: 'monospace', fontSize: '0.875rem' }}
          />
          <div className="form-hint">
            Procurement officers can directly copy and paste this standard compliance paragraph into Section IV (Technical Specifications) of their tender document / GeM bid.
          </div>
        </div>
      </section>

      {/* 7. Warnings List */}
      <section className="panel" aria-labelledby="heading-warnings">
        <h2 id="heading-warnings" className="panel-header" style={{ marginTop: 0 }}>
          7. {t.warningsTitle}
        </h2>
        {warnings.length > 0 ? (
          <ul style={{ paddingLeft: '20px', lineHeight: '1.7' }}>
            {warnings.map((w, idx) => (
              <li key={idx} style={{ marginBottom: '6px' }}>
                <span style={{ color: 'var(--color-status-withdrawn)', fontWeight: 700 }}>[Compliance Advisory] </span>
                {w}
              </li>
            ))}
          </ul>
        ) : (
          <p>No critical technical warnings reported for this specification query.</p>
        )}
      </section>

      {/* 8. Feedback */}
      <section className="panel-white no-print" aria-labelledby="heading-feedback">
        <h2 id="heading-feedback" className="panel-header" style={{ marginTop: 0 }}>
          8. {t.feedbackTitle}
        </h2>

        {feedbackSubmitted ? (
          <div className="success-box" role="status">
            {t.feedbackSuccess}
          </div>
        ) : (
          <form onSubmit={handleFeedbackSubmit}>
            <div className="form-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="feedback_helpful"
                  value="yes"
                  checked={feedbackHelpful === 'yes'}
                  onChange={(e) => setFeedbackHelpful(e.target.value)}
                />
                <span>{t.feedbackHelpfulYes}</span>
              </label>

              <label className="radio-label">
                <input
                  type="radio"
                  name="feedback_helpful"
                  value="no"
                  checked={feedbackHelpful === 'no'}
                  onChange={(e) => setFeedbackHelpful(e.target.value)}
                />
                <span>{t.feedbackHelpfulNo}</span>
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="feedback-comment" className="form-label">
                Comments / Suggested Standards:
              </label>
              <textarea
                id="feedback-comment"
                className="form-control"
                rows={3}
                placeholder={t.feedbackCommentPlaceholder}
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={feedbackSubmitting}
            >
              {feedbackSubmitting ? 'Submitting...' : t.feedbackSubmit}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
