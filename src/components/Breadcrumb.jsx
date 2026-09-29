import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Breadcrumb({ items, t }) {
  const location = useLocation();

  let breadcrumbs = items;

  if (!breadcrumbs) {
    const pathnames = location.pathname.split('/').filter(x => x);
    breadcrumbs = [{ label: t.bcHome || 'Home', to: '/' }];

    let currentPath = '';
    pathnames.forEach((segment) => {
      currentPath += `/${segment}`;
      let label = segment;

      if (segment === 'find') label = t.bcFind || 'Find Standards';
      else if (segment === 'results') label = t.bcResults || 'Results';
      else if (segment === 'standard') label = t.bcDetail || 'Standard Detail';
      else if (segment === 'history') label = t.bcHistory || 'My Searches';
      else if (segment === 'guide') label = t.bcGuide || 'User Guide';
      else if (segment === 'about') label = t.bcAbout || 'About';
      else if (segment === 'feedback') label = t.bcFeedback || 'Feedback';
      else if (segment === 'contact') label = t.bcContact || 'Contact Us';
      else if (segment === 'accessibility') label = t.bcAccessibility || 'Accessibility';
      else if (segment === 'policies') label = t.bcPolicies || 'Policies';
      else if (segment === 'terms') label = t.bcTerms || 'Terms';
      else if (segment === 'privacy') label = t.bcPrivacy || 'Privacy';
      else if (segment === 'sitemap') label = t.bcSitemap || 'Sitemap';

      breadcrumbs.push({ label, to: currentPath });
    });
  }

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="breadcrumb-bar" aria-label="Breadcrumb Navigation">
      <div className="container">
        <ol className="breadcrumb-list">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <li
                key={crumb.to || index}
                className={`breadcrumb-item ${isLast ? 'active' : ''}`}
                aria-current={isLast ? 'page' : undefined}
              >
                {isLast ? (
                  <span>{crumb.label}</span>
                ) : (
                  <Link to={crumb.to}>{crumb.label}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
