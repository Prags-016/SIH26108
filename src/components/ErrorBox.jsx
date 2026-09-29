import React from 'react';

export function ErrorBox({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div
      className="error-box"
      role="alert"
      aria-live="assertive"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <strong>Error: </strong>
          <span>{message}</span>
        </div>
        {onDismiss && (
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={onDismiss}
            style={{ marginLeft: '12px' }}
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
