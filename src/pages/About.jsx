import React from 'react';
import { Link } from 'react-router-dom';

export function About({ t }) {
  return (
    <div className="page-about">
      <h1>{t.navAbout || "About the Portal"}</h1>

      <div className="panel-white">
        <h2 style={{ marginTop: 0 }}>Portal Mandate and Background</h2>
        <p>
          The <strong>IS Standards Recommendation Engine (Bharatiya Manak Sifarish Portal)</strong> has been established to support transparent, competitive, and high-quality public procurement across Central Ministries, State Departments, Central Public Sector Enterprises (CPSEs), and autonomous statutory institutions.
        </p>
        <p>
          Formulating tender specifications without referring to updated Indian Standards often results in restrictive single-vendor conditions, substandard material delivery, and procurement disputes. This portal serves as an institutional bridge between the vast compendium of over 24,000 Indian Standards published by the Bureau of Indian Standards (BIS) and tender drafting committees.
        </p>

        <h3 style={{ marginTop: '16px' }}>Key Objectives</h3>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>
            <strong>Compliance with GFR 2017:</strong> Ensuring adherence to Rule 144 requiring specifications to reflect national standards.
          </li>
          <li>
            <strong>Quality Control Order (QCO) Enforcement:</strong> Automatically identifying statutory orders making BIS certification mandatory.
          </li>
          <li>
            <strong>Multi-Lingual Accessibility:</strong> Facilitating query inputs in scheduled Indian languages to promote ease of doing business across states.
          </li>
          <li>
            <strong>Tender Clause Standardization:</strong> Providing copy-ready compliance text clauses to eliminate ambiguity in bid contracts.
          </li>
        </ul>

        <h3 style={{ marginTop: '16px' }}>Institutional Stakeholders</h3>
        <p>
          This platform operates in institutional alignment with the Department of Consumer Affairs, Bureau of Indian Standards (BIS), and line Ministries enforcing Quality Control Orders.
        </p>
        <div style={{ marginTop: '16px' }}>
          <Link to="/find" className="btn btn-primary">
            Launch Recommendation Tool
          </Link>
        </div>
      </div>
    </div>
  );
}
