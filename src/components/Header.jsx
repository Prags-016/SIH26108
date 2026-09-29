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
          {/* Emblem placeholder as specifically mandated */}
          <div
            className="emblem-placeholder"
            role="img"
            aria-label={t.emblemAlt}
          >
            <span>Emblem</span>
            <span>Placeholder</span>
          </div>

          <div className="header-titles">
            <span className="header-dept">
              {t.deptName}
            </span>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="header-title-en">
                Bharatiya Manak Sifarish Portal
              </div>
              <div className="header-title-hi">
                भारतीय मानक अनुशंसा पोर्टल
              </div>
            </Link>
          </div>
        </div>

        <div className="header-meta">
          <div><strong>IS Recommendation Engine</strong></div>
          <div>Advisory Procurement Assistant</div>
          <div>Standards version: BIS 2026.09</div>
        </div>
      </div>
    </header>
  );
}
