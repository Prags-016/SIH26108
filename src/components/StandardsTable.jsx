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
      return <span className="status-badge current">{t.statusCurrent || 'Current'}</span>;
    }
    if (s.includes('withdrawn') || s.includes('superseded')) {
      return <span className="status-badge withdrawn">{t.statusWithdrawn || 'Withdrawn / Superseded'}</span>;
    }
    if (s.includes('revision')) {
      return <span className="status-badge under_revision">{t.statusRevision || 'Under Revision'}</span>;
    }
    return <span className="status-badge">{status}</span>;
  };

  if (!standards || standards.length === 0) {
    return <p>No recommended standards available.</p>;
  }

  return (
    <div>
      {/* user_version_warning in a yellow bordered box if not null */}
      {userVersionWarning && (
        <div className="warning-box" role="alert">
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
              <th scope="col" style={{ width: '100px' }}>{t.colRelevance || "Relevance"}</th>
              <th scope="col" style={{ width: '120px' }}>{t.colStatus || "Status"}</th>
              <th scope="col" style={{ width: '140px' }}>{t.colLatestVersion || "Latest Version"}</th>
              <th scope="col" style={{ width: '130px' }}>{t.colAmendments || "Amendments"}</th>
              <th scope="col" style={{ width: '150px' }} className="no-print">{t.colActions || "Actions"}</th>
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
                      <strong>{std.is_number}</strong>
                    </td>
                    <td>
                      <div>{std.title}</div>
                    </td>
                    <td>
                      <strong>{std.relevance}%</strong>
                    </td>
                    <td>
                      {getStatusBadge(std.status)}
                    </td>
                    <td>{std.latest_version}</td>
                    <td>{std.amendments || 'None'}</td>
                    <td className="no-print">
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Link
                          to={`/standard/${std.id || std.is_number.replace(/\s+/g, '-')}`}
                          className="btn btn-sm btn-secondary"
                        >
                          {t.btnViewDetails || "View details"}
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary"
                          onClick={() => toggleRow(std.rank)}
                          aria-expanded={isExpanded}
                          aria-controls={`reason-row-${std.rank}`}
                        >
                          {isExpanded ? (t.btnHideReason || "Hide reason") : (t.btnShowReason || "Show reason")}
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expandable row showing reason and scope summary */}
                  {isExpanded && (
                    <tr id={`reason-row-${std.rank}`}>
                      <td colSpan="8" style={{ backgroundColor: '#F9FBFD', padding: '12px 16px' }}>
                        <div style={{ marginBottom: '6px' }}>
                          <strong>Reason for Recommendation: </strong>
                          <span>{std.reason || 'Primary matching standard for this product specification.'}</span>
                        </div>
                        <div>
                          <strong>Scope Summary: </strong>
                          <span>{std.scope_summary || 'Standard requirements and performance criteria defined by BIS.'}</span>
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
