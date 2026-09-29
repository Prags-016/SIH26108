import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHealth } from '../services/api.js';

export function Footer({ t }) {
  const [dataSyncedTime, setDataSyncedTime] = useState('2026-09-25 06:00 IST');

  useEffect(() => {
    let isMounted = true;
    getHealth()
      .then((health) => {
        if (isMounted && health?.data_last_synced) {
          const dateObj = new Date(health.data_last_synced);
          setDataSyncedTime(dateObj.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST');
        }
      })
      .catch((err) => {
        console.warn('Health check sync timestamp fetch failed:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        {/* Footer Navigation Links */}
        <div className="footer-links-grid" aria-label="Portal Policies and Legal Links">
          <Link to="/accessibility">{t.bcAccessibility || "Accessibility Statement"}</Link>
          <Link to="/policies">{t.bcPolicies || "Website Policies"}</Link>
          <Link to="/terms">{t.bcTerms || "Terms & Conditions"}</Link>
          <Link to="/privacy">{t.bcPrivacy || "Privacy Policy"}</Link>
          <Link to="/sitemap">{t.bcSitemap || "Sitemap"}</Link>
          <Link to="/guide">{t.navUserGuide || "Help & User Guide"}</Link>
          <Link to="/feedback">{t.navFeedback || "Feedback"}</Link>
          <Link to="/contact">{t.navContact || "Contact Us"}</Link>
        </div>

        {/* Official Government Partner Links */}
        <div className="footer-portal-partners" aria-label="National Portals and Partners">
          <a
            href="https://india.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="partner-logo-item"
            title="National Portal of India (External site that opens in a new window)"
          >
            <span>🇮🇳</span>
            <span>india.gov.in — National Portal of India</span>
          </a>

          <a
            href="https://www.bis.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="partner-logo-item"
            title="Bureau of Indian Standards Official Portal"
          >
            <span>⚖️</span>
            <span>bis.gov.in — Bureau of Indian Standards</span>
          </a>

          <a
            href="https://gem.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="partner-logo-item"
            title="Government e-Marketplace"
          >
            <span>🛒</span>
            <span>gem.gov.in — Government e-Marketplace</span>
          </a>

          <div className="partner-logo-item" style={{ backgroundColor: '#FAF5E8', borderColor: '#D6BC76' }}>
            <span>🔒 GIGW 3.0 & WCAG 2.1 AA Compliant</span>
          </div>
        </div>

        {/* Ownership, Hosting & Sync Metadata */}
        <div className="footer-meta-row">
          <div>
            <strong>{t.contentOwned}</strong>
            <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '2px' }}>
              Portal designed, developed and hosted by National Informatics Centre (NIC) / MeitY Cloud Infrastructure.
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div>
              <span>{t.lastUpdated} 29 September 2026</span>
              <span style={{ margin: '0 8px' }}>|</span>
              <span>{t.dataSynced} {dataSyncedTime}</span>
            </div>
            <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <span>Visitor Counter:</span>
              <span className="visitor-counter-box" aria-label="1489204 visits">
                <span className="visitor-digit">0</span>
                <span className="visitor-digit">1</span>
                <span className="visitor-digit">4</span>
                <span className="visitor-digit">8</span>
                <span className="visitor-digit">9</span>
                <span className="visitor-digit">2</span>
                <span className="visitor-digit">0</span>
                <span className="visitor-digit">4</span>
              </span>
            </div>
          </div>
        </div>

        {/* Official Advisory Disclaimer */}
        <div className="footer-disclaimer">
          <strong>Disclaimer: </strong>
          {t.footerDisclaimer}
        </div>
      </div>
    </footer>
  );
}
