import React from 'react';

export function Loader({ message, progressText }) {
  return (
    <div
      className="loader-panel"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-navy)' }}>
        {message || "Analysing your input, please wait..."}
      </div>
      <div className="loader-spinner-bar" aria-hidden="true"></div>
      <div style={{ fontSize: '0.875rem', color: '#555555' }}>
        {progressText || "Query parsed. Searching BIS standards repository and checking Quality Control Orders..."}
      </div>
    </div>
  );
}
