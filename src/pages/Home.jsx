import React from 'react';
import { Link } from 'react-router-dom';

export function Home({ t }) {
  return (
    <div className="page-home">
      <h1>{t.homeHeading}</h1>

      {/* Short plain paragraph explaining the portal */}
      <div className="panel-white">
        <p style={{ fontSize: '1.0625rem', lineHeight: '1.6' }}>
          {t.homeIntro}
        </p>
        <p>
          This portal leverages technical mapping taxonomies and the Bureau of Indian Standards (BIS) database to help procurement teams formulate legally robust, technologically accurate, and unrestrictive tender specifications under Rule 144 of the General Financial Rules (GFR), 2017.
        </p>
      </div>

      {/* How it works as a plain numbered list (3 steps) */}
      <div className="panel">
        <h2 style={{ marginTop: 0, marginBottom: '12px', borderBottom: '1px solid #CCC', paddingBottom: '6px' }}>
          {t.howItWorksHeading}
        </h2>
        <ol style={{ paddingLeft: '24px', lineHeight: '1.8' }}>
          <li style={{ marginBottom: '8px' }}>
            <strong>Step 1: Provide Specification or Tender Notice:</strong> {t.step1.replace(/^1\.\s*/, '')}
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Step 2: AI Standards Mapping:</strong> {t.step2.replace(/^2\.\s*/, '')}
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Step 3: Receive Compliance Package:</strong> {t.step3.replace(/^3\.\s*/, '')}
          </li>
        </ol>

        <div style={{ marginTop: '20px' }}>
          <Link to="/find" className="btn btn-primary" style={{ padding: '10px 22px', fontSize: '1rem' }}>
            {t.startBtn}
          </Link>
        </div>
      </div>

      {/* Notice box (bordered, light grey) titled "Important Notice" with advisory disclaimer */}
      <div className="notice-box" role="region" aria-label={t.importantNoticeTitle}>
        <div className="notice-title">{t.importantNoticeTitle}</div>
        <p style={{ margin: 0, fontSize: '0.9375rem' }}>
          {t.advisoryText}
        </p>
      </div>
    </div>
  );
}
