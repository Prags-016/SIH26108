import React from 'react';
import { Link } from 'react-router-dom';

export function Home({ t }) {
  const recentQCOs = [
    {
      ministry: "DPIIT, Min. of Commerce & Industry",
      order: "Cement (Quality Control) Order",
      standards: "IS 269:2015 (33, 43, 53 Grade)",
      status: "Mandatory ISI Mark",
      complianceDate: "Active & Enforced"
    },
    {
      ministry: "MeitY (Electronics & IT)",
      order: "Electronics & IT Goods (Compulsory Registration) Order",
      standards: "IS 13252 (Part 1), IS 16046 (Part 2)",
      status: "Mandatory BIS CRS",
      complianceDate: "Active & Enforced"
    },
    {
      ministry: "Dept. of Consumer Affairs",
      order: "Hallmarking of Gold Jewellery & Artefacts Order",
      standards: "IS 1417:2016",
      status: "Mandatory HUID Hallmarking",
      complianceDate: "Active & Enforced"
    },
    {
      ministry: "FSSAI & BIS",
      order: "Food Safety & Standards (Packaged Water) Regulations",
      standards: "IS 14543:2016, IS 13428:2005",
      status: "Mandatory Dual License",
      complianceDate: "Active & Enforced"
    }
  ];

  return (
    <div className="page-home">
      {/* 1. Portal Statistics Strip */}
      <section className="kpi-grid" aria-label="Portal Metrics and Indexed Registries">
        <div className="kpi-card">
          <div className="kpi-number">24,650+</div>
          <div className="kpi-label">Indian Standards Indexed (BIS)</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-number">148</div>
          <div className="kpi-label">Quality Control Orders (QCO)</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-number">38,400+</div>
          <div className="kpi-label">Licensed Manufacturers Tracked</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-number">100%</div>
          <div className="kpi-label">GFR 2017 Rule 144 Compliant</div>
        </div>
      </section>

      {/* Heading */}
      <h1>{t.homeHeading}</h1>

      {/* Short plain paragraph explaining the portal */}
      <section className="panel-white">
        <p style={{ fontSize: '1.0625rem', lineHeight: '1.6', color: '#1F3A6E', fontWeight: 600 }}>
          {t.homeIntro}
        </p>
        <p>
          Established under the auspices of the Ministry of Consumer Affairs, Food & Public Distribution in coordination with the Bureau of Indian Standards (BIS), this engine empowers public procurement bodies, Central Public Sector Enterprises (CPSEs), and state tender boards to automatically map technical specifications against official national standards, identify mandatory Quality Control Orders (QCOs), and eliminate restrictive or outdated vendor specifications.
        </p>
      </section>

      {/* Quick Services Grid */}
      <section aria-labelledby="quick-services-heading">
        <h2 id="quick-services-heading" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
          Procurement Officer Quick Services
        </h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>1. Find Standards by Specification</h3>
            <p>Input raw technical specifications or equipment performance parameters to extract applicable primary and allied IS codes.</p>
            <div style={{ marginTop: '12px' }}>
              <Link to="/find" className="btn btn-sm btn-primary" style={{ width: '100%' }}>
                Search Standards &rarr;
              </Link>
            </div>
          </div>

          <div className="service-card">
            <h3>2. Upload Tender Document</h3>
            <p>Directly upload draft tender documents in PDF, DOCX, or TXT formats for comprehensive standards compliance analysis.</p>
            <div style={{ marginTop: '12px' }}>
              <Link to="/find" className="btn btn-sm btn-secondary" style={{ width: '100%' }}>
                Upload Draft File &rarr;
              </Link>
            </div>
          </div>

          <div className="service-card">
            <h3>3. Superseded Standard Verifier</h3>
            <p>Detect withdrawn, superseded, or under-revision Indian Standards before final tender issuance to avoid contract disputes.</p>
            <div style={{ marginTop: '12px' }}>
              <Link to="/find" className="btn btn-sm btn-secondary" style={{ width: '100%' }}>
                Verify Standard Status &rarr;
              </Link>
            </div>
          </div>

          <div className="service-card">
            <h3>4. Model Tender Clause Generator</h3>
            <p>Receive copy-ready, legally tested tender specification clauses compliant with Section IV of standard government bid documents.</p>
            <div style={{ marginTop: '12px' }}>
              <Link to="/results" className="btn btn-sm btn-secondary" style={{ width: '100%' }}>
                View Sample Clauses &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works as a plain numbered list (3 steps) */}
      <section className="panel" aria-labelledby="how-it-works-heading">
        <h2 id="how-it-works-heading" style={{ marginTop: 0, marginBottom: '12px', borderBottom: '1px solid #CCC', paddingBottom: '6px' }}>
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
      </section>

      {/* Notice box (bordered, light grey) titled "Important Notice" with advisory disclaimer */}
      <section className="notice-box" role="region" aria-label={t.importantNoticeTitle}>
        <div className="notice-title">{t.importantNoticeTitle}</div>
        <p style={{ margin: 0, fontSize: '0.9375rem' }}>
          {t.advisoryText}
        </p>
      </section>

      {/* Statutory Mandate Excerpt: GFR 2017 Rule 144 */}
      <section className="panel-white">
        <h2 style={{ marginTop: 0, borderBottom: '1px solid #CCC', paddingBottom: '6px' }}>
          Statutory Procurement Framework: Rule 144 of General Financial Rules (GFR), 2017
        </h2>
        <p style={{ fontSize: '0.9375rem', fontStyle: 'italic', backgroundColor: '#F9F9F9', borderLeft: '3px solid #1F3A6E', padding: '10px 14px' }}>
          "Rule 144 (i): The technical specifications should, to the extent practicable, be based on the national standards published by the Bureau of Indian Standards (BIS) wherever such standards exist. Where no national standards exist, the technical specifications should be based on international standards or standards established by recognized trade associations."
        </p>
      </section>

      {/* Recent Quality Control Orders (QCO) Gazette Table */}
      <section className="panel-white">
        <h2 style={{ marginTop: 0, borderBottom: '1px solid #CCC', paddingBottom: '6px' }}>
          Mandatory Quality Control Orders (QCOs) Enforced by Line Ministries
        </h2>
        <div className="table-responsive">
          <table className="table-gov" aria-label="Recent Quality Control Orders">
            <thead>
              <tr>
                <th scope="col">Notifying Ministry / Dept</th>
                <th scope="col">Quality Control Order</th>
                <th scope="col">Governing Standard</th>
                <th scope="col">Compliance Scheme</th>
                <th scope="col">Statutory Status</th>
              </tr>
            </thead>
            <tbody>
              {recentQCOs.map((q, idx) => (
                <tr key={idx}>
                  <td><strong>{q.ministry}</strong></td>
                  <td>{q.order}</td>
                  <td><code>{q.standards}</code></td>
                  <td>{q.status}</td>
                  <td>
                    <span className="status-badge current">{q.complianceDate}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
