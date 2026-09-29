import React from 'react';
import { Link } from 'react-router-dom';

export function Accessibility({ t }) {
  return (
    <div className="page-accessibility">
      <h1>Accessibility Statement</h1>

      <div className="panel-white">
        <p>
          The <strong>Bharatiya Manak Sifarish Portal</strong> is committed to ensuring that its services and information are accessible to all users, including people with visual, hearing, motor, or cognitive disabilities, in full compliance with the <strong>Guidelines for Indian Government Websites (GIGW)</strong> and the <strong>World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>.
        </p>

        <h2>Accessibility Features Implemented</h2>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>
            <strong>Skip to Main Content:</strong> A dedicated skip-link is provided at the very top of each page for keyboard and screen reader navigation.
          </li>
          <li>
            <strong>Text Resizing Controls:</strong> Users can increase or decrease font size through the utility bar (A-, A, A+) without losing page layout integrity.
          </li>
          <li>
            <strong>High Contrast Display:</strong> A high contrast mode toggle (Black & Yellow) is available for users with low vision or colour vision deficiencies.
          </li>
          <li>
            <strong>Semantic HTML Structure:</strong> All pages utilize valid semantic markup (`header`, `nav`, `main`, `section`, `footer`) and clear heading hierarchy (single `h1` per page).
          </li>
          <li>
            <strong>Keyboard Navigation & Visible Focus:</strong> All interactive elements, including buttons, form inputs, tabs, and links, have unambiguous focus outlines.
          </li>
          <li>
            <strong>Non-reliance on Colour Alone:</strong> Standard statuses (Current, Withdrawn, Under Revision) and certification flags use explicit text labels alongside color.
          </li>
          <li>
            <strong>Screen Reader Compatibility:</strong> Dynamic loading and validation updates utilize ARIA-live regions (`polite` and `assertive`).
          </li>
        </ul>

        <h2>Standards Compliance Feedback</h2>
        <p>
          If you experience any accessibility barrier while browsing this website, please report it via our <Link to="/feedback">Feedback Form</Link> or email our nodal accessibility coordinator at <a href="mailto:accessibility-isportal@gov.in">accessibility-isportal@gov.in</a>.
        </p>
      </div>
    </div>
  );
}
