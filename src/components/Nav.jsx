import React from 'react';
import { NavLink } from 'react-router-dom';

export function Nav({ t }) {
  const navItems = [
    { to: '/', label: t.navHome },
    { to: '/find', label: t.navFindStandards },
    { to: '/history', label: t.navMySearches },
    { to: '/guide', label: t.navUserGuide },
    { to: '/about', label: t.navAbout },
    { to: '/feedback', label: t.navFeedback },
    { to: '/contact', label: t.navContact }
  ];

  return (
    <nav className="main-nav" aria-label="Main Navigation">
      <div className="container">
        <ul>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => (isActive ? 'active' : '')}
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
