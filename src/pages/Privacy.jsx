import React from 'react';

export function Privacy({ t }) {
  return (
    <div className="page-privacy">
      <h1>Privacy Policy</h1>

      <div className="panel-white">
        <h2>Data Collection & Confidentiality of Tender Drafts</h2>
        <p>
          We respect the confidentiality of draft tender documents and specifications uploaded by procurement officials. The recommendation engine parses and analyzes document contents solely to extract standard requirements and does not store unreleased tender notices on public or shared servers.
        </p>

        <h2>Search History Storage</h2>
        <p>
          Your recent query history ("My Searches") is stored strictly on your local browser device via HTML5 LocalStorage. Clearing browser data or clicking "Clear all search history" completely purges this data.
        </p>

        <h2>Cookies and Analytics</h2>
        <p>
          This portal uses strictly necessary session cookies to maintain user preferences (such as high-contrast display mode, language preference, and font size choices). No commercial advertising or cross-site tracking cookies are deployed.
        </p>
      </div>
    </div>
  );
}
