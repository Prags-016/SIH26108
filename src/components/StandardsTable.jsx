import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function StandardsTable({ standards, userVersionWarning, t }) {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (rank) => {
    setExpandedRows(prev => ({
      ...prev,
      [rank]: !prev[rank]
    }));
  };

  const getStatusBadge = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('current')) {
      return (
        <span className="status-badge current" title="Active standard approved by BIS">
          ✓ {t.statusCurrent || 'Current'}
        </span>
      );
    }
    if (s.includes('withdrawn') || s.includes('superseded')) {
      return (
        <span className="status-badge withdrawn" title="Standard withdrawn or superseded by newer standard">
          ⚠ {t.statusWithdrawn || 'Withdrawn / Superseded'}
        </span>
      );
    }
    if (s.includes('revision')) {
      return (
        <span className="status-badge under_revision" title="Draft revision under committee scrutiny">
          ⏳ {t.statusRevision || 'Under Revision'}
        </span>
      );
    }
    return <span className="status-badge">{status}</span>;
  };

  if (!standards || standards.length === 0) {
    return <p>No recommended standards available for this item.</p>;
  }

  return (
    <div>
      {/* user_version_warning in a yellow bordered box if not null */}
      {userVersionWarning && (
        <div className="warning-box" role="alert" style={{ marginBottom: '14px' }}>
          <strong>{t.versionWarningTitle || 'Version Warning'}: </strong>
          <span>{userVersionWarning}</span>
        </div>
      )}

      <div className="table-responsive">
        <table className="table-gov" aria-label={t.recommendedStandardsTitle || "Recommended Indian Standards"}>
          <thead>
            <tr>
              <th scope="col" style={{ width: '50px' }}>{t.colRank || "Rank"}</th>
              <th scope="col" style={{ width: '130px' }}>{t.colIsNumber || "IS Number"}</th>
              <th scope="col">{t.colTitle || "Title"}</th>
              <th scope="col" style={{ width: '130px' }}>{t.colRelevance || "Relevance"}</th>
              <th scope="col" style={{ width: '140px' }}>{t.colStatus || "Status"}</th>
              <th scope="col" style={{ width: '140px' }}>{t.colLatestVersion || "Latest Version"}</th>
              <th scope="col" style={{ width: '130px' }}>{t.colAmendments || "Amendments"}</th>
              <th scope="col" style={{ width: '180px' }} className="no-print">{t.colActions || "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {standards.map((std) => {
              const isExpanded = !!expandedRows[std.rank];
              return (
                <React.Fragment key={std.rank}>
                  <tr>
                    <td>{std.rank}</td>
                    <td>
                      <strong style={{ color: 'var(--color-navy)', fontSize: '0.9375rem' }}>{std.is_number}</strong>
                    </td>
                    <td>
                      <div>{std.title}</div>
                    </td>
                    <td>
                      <div className="relevance-bar-wrap">
                        <strong>{std.relevance}%</strong>
                        <div className="relevance-meter" aria-hidden="true" title={`${std.relevance}% relevance score`}>
                          <div className="relevance-fill" style={{ width: `${std.relevance}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {getStatusBadge(std.status)}
                    </td>
                    <td>
                      <strong>{std.latest_version}</strong>
                    </td>
                    <td>{std.amendments || 'None'}</td>
                    <td className="no-print">
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <Link
                          to={`/standard/${std.id || std.is_number.replace(/\s+/g, '-')}`}
                          className="btn btn-sm btn-secondary"
                          title="Open full standard specification sheet"
                        >
                          {t.btnViewDetails || "View details"}
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary"
                          onClick={() => toggleRow(std.rank)}
                          aria-expanded={isExpanded}
                          aria-controls={`reason-row-${std.rank}`}
                          title="Toggle technical justification"
                        >
                          {isExpanded ? (t.btnHideReason || "Hide reason") : (t.btnShowReason || "Show reason")}
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expandable row showing reason and scope summary */}
                  {isExpanded && (
                    <tr id={`reason-row-${std.rank}`}>
                      <td colSpan="8" style={{ backgroundColor: '#F8FAFD', borderLeft: '4px solid var(--color-navy)', padding: '14px 16px' }}>
                        <div style={{ marginBottom: '8px' }}>
                          <span style={{ fontWeight: 700, color: 'var(--color-navy)' }}>Reason for Recommendation: </span>
                          <span>{std.reason || 'Primary matching standard for this product specification.'}</span>
                        </div>
                        <div>
                          <span style={{ fontWeight: 700, color: 'var(--color-navy)' }}>Technical Scope & Parameters: </span>
                          <span>{std.scope_summary || 'Standard requirements and performance criteria defined by BIS.'}</span>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          <Link
                            to={`/standard/${std.id || std.is_number.replace(/\s+/g, '-')}`}
                            className="btn btn-sm btn-primary"
                          >
                            Inspect Full Version History & Test Methods &rarr;
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
