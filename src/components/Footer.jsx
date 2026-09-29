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

        {/* Ownership and Sync Metadata */}
        <div className="footer-meta-row">
          <div>
            <strong>{t.contentOwned}</strong>
          </div>
          <div>
            <span>{t.lastUpdated} 29 September 2026</span>
            <span style={{ margin: '0 8px' }}>|</span>
            <span>{t.dataSynced} {dataSyncedTime}</span>
            <span style={{ margin: '0 8px' }}>|</span>
            <span>{t.visitorCounter}</span>
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
