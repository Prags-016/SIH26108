import React from 'react';
import { Link } from 'react-router-dom';

export function Sitemap({ t }) {
  return (
    <div className="page-sitemap">
      <h1>Portal Sitemap</h1>

      <div className="panel-white">
        <p>A comprehensive hierarchical map of all sections, tools, and institutional resources available on the Bharatiya Manak Sifarish Portal:</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '16px' }}>
          <div className="panel">
            <h2 style={{ fontSize: '1.1rem', marginTop: 0 }}>Core Operations</h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
              <li><Link to="/">Home (Portal Overview)</Link></li>
              <li><Link to="/find">Find Standards (Query & Upload)</Link></li>
              <li><Link to="/results">Recommendation Results</Link></li>
              <li><Link to="/history">My Searches (Local Session History)</Link></li>
            </ul>
          </div>

          <div className="panel">
            <h2 style={{ fontSize: '1.1rem', marginTop: 0 }}>Guidance & Support</h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
              <li><Link to="/guide">User Guide & FAQ</Link></li>
              <li><Link to="/about">About the Portal & GFR Rule 144</Link></li>
              <li><Link to="/feedback">Citizen / Officer Feedback Form</Link></li>
              <li><Link to="/contact">Helpdesk & Contact Information</Link></li>
            </ul>
          </div>

          <div className="panel">
            <h2 style={{ fontSize: '1.1rem', marginTop: 0 }}>Policies & Compliance</h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
              <li><Link to="/accessibility">Accessibility Statement (WCAG 2.1 AA)</Link></li>
              <li><Link to="/policies">Website & Hyperlink Policies</Link></li>
              <li><Link to="/terms">Terms & Conditions of Service</Link></li>
              <li><Link to="/privacy">Privacy & Confidentiality Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
