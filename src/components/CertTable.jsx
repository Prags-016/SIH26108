import React from 'react';

export function CertTable({ certifications, t }) {
  if (!certifications || certifications.length === 0) {
    return <p>No mandatory certification orders identified for this product line.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table-gov" aria-label={t.certTitle || "Mandatory Certification Requirements"}>
        <thead>
          <tr>
            <th scope="col" style={{ width: '160px' }}>{t.colScheme || "Scheme"}</th>
            <th scope="col" style={{ width: '180px' }}>{t.colName || "Name"}</th>
            <th scope="col" style={{ width: '90px' }}>{t.colMandatory || "Mandatory"}</th>
            <th scope="col" style={{ width: '180px' }}>{t.colAppliesTo || "Applies to"}</th>
            <th scope="col">{t.colBasis || "Legal / Regulatory Basis"}</th>
            <th scope="col">{t.colNotes || "Notes / Compliance Instructions"}</th>
          </tr>
        </thead>
        <tbody>
          {certifications.map((cert, index) => {
            const isMandatory = cert.mandatory === 'Yes' || cert.mandatory === true;
            return (
              <tr key={index}>
                <td>
                  <strong>{cert.scheme}</strong>
                </td>
                <td>{cert.name}</td>
                <td>
                  <span
                    style={{
                      fontWeight: 700,
                      color: isMandatory ? 'var(--color-status-withdrawn)' : 'inherit',
                      textTransform: 'uppercase'
                    }}
                  >
                    {isMandatory ? 'YES' : 'NO'}
                  </span>
                </td>
                <td>{cert.applies_to}</td>
                <td>
                  <span style={{ fontSize: '0.8125rem' }}>{cert.basis}</span>
                </td>
                <td>
                  <span style={{ fontSize: '0.8125rem' }}>{cert.notes}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
