import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStandardDetail } from '../services/api.js';
import { Loader } from '../components/Loader.jsx';
import { ErrorBox } from '../components/ErrorBox.jsx';

export function StandardDetail({ t }) {
  const { id } = useParams();
  const [standard, setStandard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getStandardDetail(id)
      .then((data) => {
        if (isMounted) {
          setStandard(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load Indian Standard details.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <Loader message="Fetching standard details from BIS database..." />;
  }

  if (error || !standard) {
    return (
      <div className="page-standard-detail">
        <h1>{t.detailTitle}</h1>
        <ErrorBox message={error || 'Standard record could not be retrieved.'} />
        <div style={{ marginTop: '16px' }}>
          <Link to="/find" className="btn btn-primary">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="page-standard-detail">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <h1 style={{ margin: 0, borderBottom: 'none', paddingBottom: 0 }}>
          {standard.is_number}: {standard.title}
        </h1>
        <div className="no-print">
          <Link to="/results" className="btn btn-secondary btn-sm" style={{ marginRight: '8px' }}>
            &larr; Back to Results
          </Link>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => window.print()}>
            Print Detail
          </button>
        </div>
      </div>

      {/* Definition-style Table */}
      <div className="panel-white">
        <h2 style={{ marginTop: 0, borderBottom: '1px solid #CCC', paddingBottom: '6px' }}>
          General Specification Attributes
        </h2>
        <table className="def-table" aria-label="Indian Standard Attributes">
          <tbody>
            <tr>
              <th scope="row">{t.fieldIsNumber}</th>
              <td><strong>{standard.is_number}</strong></td>
            </tr>
            <tr>
              <th scope="row">{t.fieldPart}</th>
              <td>{standard.part || 'N/A'}</td>
            </tr>
            <tr>
              <th scope="row">{t.fieldTitle}</th>
              <td>{standard.title}</td>
            </tr>
            <tr>
              <th scope="row">{t.fieldIcsCode}</th>
              <td>{standard.ics_code || '91.100'}</td>
            </tr>
            <tr>
              <th scope="row">{t.fieldStatus}</th>
              <td>{getStatusBadge(standard.status)}</td>
            </tr>
            <tr>
              <th scope="row">{t.fieldLatestVersion}</th>
              <td>{standard.latest_version}</td>
            </tr>
            <tr>
              <th scope="row">{t.fieldScope}</th>
              <td>{standard.scope}</td>
            </tr>
            <tr>
              <th scope="row">{t.fieldBisLink}</th>
              <td>
                <a
                  href={standard.bis_link || 'https://standardsbis.bsbedge.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {standard.bis_link || 'View official Bureau of Indian Standards Catalogue Page'} &nearr;
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section: Amendments & Corrigenda */}
      <div className="panel-white">
        <h2 style={{ marginTop: 0, borderBottom: '1px solid #CCC', paddingBottom: '6px' }}>
          {t.sectionAmendments}
        </h2>
        {standard.amendments && standard.amendments.length > 0 ? (
          <ul style={{ paddingLeft: '20px', lineHeight: '1.7' }}>
            {standard.amendments.map((am, idx) => (
              <li key={idx} style={{ marginBottom: '8px' }}>
                <strong>{am.number}</strong> ({am.date}): {am.summary}
              </li>
            ))}
          </ul>
        ) : (
          <p>No formal amendments or corrigenda have been published for this current revision.</p>
        )}
      </div>

      {/* Section: Version History (table) */}
      <div className="panel-white">
        <h2 style={{ marginTop: 0, borderBottom: '1px solid #CCC', paddingBottom: '6px' }}>
          {t.sectionVersionHistory}
        </h2>
        {standard.version_history && standard.version_history.length > 0 ? (
          <div className="table-responsive">
            <table className="table-gov" aria-label="Version and Revision History">
              <thead>
                <tr>
                  <th scope="col">Edition / Revision</th>
                  <th scope="col">Year</th>
                  <th scope="col">Status</th>
                  <th scope="col">Gazette / Supersession Date</th>
                  <th scope="col">Remarks / Superseded By</th>
                </tr>
              </thead>
              <tbody>
                {standard.version_history.map((vh, idx) => (
                  <tr key={idx}>
                    <td><strong>{vh.edition}</strong></td>
                    <td>{vh.year}</td>
                    <td>{getStatusBadge(vh.status)}</td>
                    <td>{vh.gazette_date || 'N/A'}</td>
                    <td>{vh.superseded_by ? `Superseded by ${vh.superseded_by}` : (vh.remarks || 'Standard edition')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No historical edition data available.</p>
        )}
      </div>

      {/* Section: Normative References (linked to their detail pages) */}
      <div className="panel-white">
        <h2 style={{ marginTop: 0, borderBottom: '1px solid #CCC', paddingBottom: '6px' }}>
          {t.sectionNormativeRef}
        </h2>
        {standard.normative_references && standard.normative_references.length > 0 ? (
          <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
            {standard.normative_references.map((nr) => (
              <li key={nr.id}>
                <Link to={`/standard/${nr.id || nr.is_number.replace(/\s+/g, '-')}`}>
                  <strong>{nr.is_number}</strong>
                </Link>
                <span> &mdash; {nr.title}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No normative references recorded.</p>
        )}
      </div>

      {/* Section: Certification */}
      <div className="panel-white">
        <h2 style={{ marginTop: 0, borderBottom: '1px solid #CCC', paddingBottom: '6px' }}>
          {t.sectionCert}
        </h2>
        {standard.certification ? (
          <div style={{ lineHeight: '1.7' }}>
            <p>
              <strong>Applicable Scheme: </strong>
              <span>{standard.certification.scheme || 'Scheme-I'}</span>
            </p>
            <p>
              <strong>Mandatory Quality Control Order (QCO): </strong>
              <span>{standard.certification.regulatory_order || 'Under relevant Quality Control Order'}</span>
            </p>
            <p>
              <strong>Regulatory Authority: </strong>
              <span>{standard.certification.authority || 'Government of India'}</span>
            </p>
            {standard.certification.prohibition_clause && (
              <div className="notice-box" style={{ marginTop: '8px' }}>
                <strong>Statutory Restriction Clause: </strong>
                {standard.certification.prohibition_clause}
              </div>
            )}
          </div>
        ) : (
          <p>No specific mandatory Quality Control Order (QCO) is currently attached to this standard.</p>
        )}
      </div>
    </div>
  );
}
