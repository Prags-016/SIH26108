import React from 'react';
import { Link } from 'react-router-dom';

export function Header({ t }) {
  return (
    <header className="site-header" role="banner">
      {/* 3-colour thin strip (saffron, white, green) at the very top */}
      <div className="tricolour-strip" aria-hidden="true">
        <div className="stripe-saffron"></div>
        <div className="stripe-white"></div>
        <div className="stripe-green"></div>
      </div>

      <div className="container">
        <div className="header-brand">
          {/* Emblem placeholder as specifically mandated - rendered with official government seal styling */}
          <div
            className="emblem-placeholder-wrap"
            role="img"
            aria-label={t.emblemAlt || "Emblem placeholder - Government of India"}
          >
            <svg
              width="42"
              height="42"
              viewBox="0 0 100 100"
              aria-hidden="true"
              style={{ display: 'block', margin: '0 auto' }}
            >
              {/* Dignified circular crest outline */}
              <circle cx="50" cy="50" r="46" fill="#F4F5F7" stroke="#1F3A6E" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="41" fill="none" stroke="#1F3A6E" strokeWidth="1" strokeDasharray="3 2" />
              {/* Ashoka Chakra representation */}
              <circle cx="50" cy="46" r="15" fill="none" stroke="#1F3A6E" strokeWidth="2" />
              <circle cx="50" cy="46" r="3" fill="#1F3A6E" />
              {/* Chakra spokes */}
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="46"
                  x2={50 + 15 * Math.cos((i * 30 * Math.PI) / 180)}
                  y2={46 + 15 * Math.sin((i * 30 * Math.PI) / 180)}
                  stroke="#1F3A6E"
                  strokeWidth="1"
                />
              ))}
              {/* Base pedestal and motto ribbon */}
              <path d="M 28 68 L 72 68 L 68 76 L 32 76 Z" fill="#1F3A6E" />
              <text x="50" y="86" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1F3A6E" fontFamily="Arial, sans-serif">
                सत्यमेव जयते
              </text>
            </svg>
            <span className="emblem-placeholder-title">
              Emblem Placeholder
            </span>
          </div>

          <div className="header-titles">
            <span className="header-dept">
              {t.deptName || "Ministry of Consumer Affairs, Food & Public Distribution | Government of India"}
            </span>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="header-title-en">
                Bharatiya Manak Sifarish Portal
              </div>
              <div className="header-title-hi">
                भारतीय मानक अनुशंसा पोर्टल
              </div>
            </Link>
            <span style={{ fontSize: '0.75rem', color: '#666666', marginTop: '1px' }}>
              IS Standards Recommendation Engine for Public Procurement (GFR 2017 Rule 144)
            </span>
          </div>
        </div>

        <div className="header-right-badges">
          <div className="bis-partner-badge">
            <div><strong>Bureau of Indian Standards</strong></div>
            <div>Knowledge & Catalogue Partner</div>
            <div style={{ color: '#1E6B2E', fontWeight: 600 }}>● Live Registry Synced</div>
          </div>

          <div className="helpline-box">
            <div style={{ fontWeight: 700, color: 'var(--color-navy)' }}>Toll-Free Helpline</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>1800-11-4000 / 1915</div>
            <div style={{ color: '#666', fontSize: '0.6875rem' }}>Working Days: 09:30 - 18:00 IST</div>
          </div>
        </div>
      </div>
    </header>
  );
}
