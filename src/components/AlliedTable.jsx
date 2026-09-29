import React from 'react';
import { Link } from 'react-router-dom';

export function AlliedTable({ alliedStandards, t }) {
  if (!alliedStandards || alliedStandards.length === 0) {
    return <p>No allied or related standards applicable.</p>;
  }

  // Group by relation_type
  const groups = alliedStandards.reduce((acc, item) => {
    const groupName = item.relation_type || 'Related Standards';
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(item);
    return acc;
  }, {});

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

  return (
    <div>
      {Object.entries(groups).map(([groupName, items]) => (
        <div key={groupName} style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--color-navy)', marginBottom: '8px', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>
            Category: {groupName} ({items.length})
          </h3>
          <div className="table-responsive">
            <table className="table-gov" aria-label={`Allied Standards - ${groupName}`}>
              <thead>
                <tr>
                  <th scope="col" style={{ width: '130px' }}>{t.colIsNumber || "IS Number"}</th>
                  <th scope="col">{t.colTitle || "Title"}</th>
                  <th scope="col" style={{ width: '130px' }}>{t.colRelatedTo || "Related to"}</th>
                  <th scope="col" style={{ width: '90px' }}>{t.colRelevance || "Relevance"}</th>
                  <th scope="col" style={{ width: '120px' }}>{t.colStatus || "Status"}</th>
                  <th scope="col" style={{ width: '140px' }}>{t.colLatestVersion || "Latest Version"}</th>
                  <th scope="col" style={{ width: '120px' }}>{t.colAmendments || "Amendments"}</th>
                  <th scope="col" style={{ width: '110px' }} className="no-print">{t.colActions || "Actions"}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((std, idx) => (
                  <tr key={std.id || idx}>
                    <td>
                      <strong>{std.is_number}</strong>
                    </td>
                    <td>{std.title}</td>
                    <td>
                      <span style={{ fontSize: '0.8125rem', backgroundColor: '#EEE', padding: '2px 6px', border: '1px solid #CCC' }}>
                        {std.related_to || 'Primary'}
                      </span>
                    </td>
                    <td>{std.relevance}%</td>
                    <td>{getStatusBadge(std.status)}</td>
                    <td>{std.latest_version}</td>
                    <td>{std.amendments || 'Nil'}</td>
                    <td className="no-print">
                      <Link
                        to={`/standard/${std.id || std.is_number.replace(/\s+/g, '-')}`}
                        className="btn btn-sm btn-secondary"
                      >
                        {t.btnViewDetails || "View details"}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
