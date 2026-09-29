import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSearchHistory, deleteHistoryItem, clearAllHistory } from '../services/api.js';

export function MySearches({ t }) {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  const handleView = (item) => {
    navigate('/results', { state: { result: item.result, originalQuery: item.query } });
  };

  const handleDelete = (id) => {
    const updated = deleteHistoryItem(id);
    setHistory(updated);
  };

  const handleClearAll = () => {
    if (window.confirm(t.confirmClearHistory || "Are you sure you want to clear your local search history?")) {
      const updated = clearAllHistory();
      setHistory(updated);
    }
  };

  return (
    <div className="page-history">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <h1 style={{ margin: 0, borderBottom: 'none', paddingBottom: 0 }}>
          {t.historyTitle}
        </h1>
        {history.length > 0 && (
          <button
            type="button"
            className="btn btn-secondary btn-danger"
            onClick={handleClearAll}
          >
            {t.btnClearHistory}
          </button>
        )}
      </div>

      <div className="panel-white">
        <p style={{ fontSize: '0.875rem', color: '#555' }}>
          Your last 20 queries and recommendation results are securely stored locally within your browser. No personal data or tender drafts are transmitted to persistent central storage.
        </p>

        {history.length === 0 ? (
          <div className="notice-box" style={{ marginTop: '16px' }}>
            <p style={{ margin: 0 }}>{t.historyEmpty}</p>
          </div>
        ) : (
          <div className="table-responsive" style={{ marginTop: '16px' }}>
            <table className="table-gov" aria-label={t.historyTitle}>
              <thead>
                <tr>
                  <th scope="col" style={{ width: '150px' }}>Request ID</th>
                  <th scope="col" style={{ width: '180px' }}>{t.historyDate}</th>
                  <th scope="col">{t.historyQuery}</th>
                  <th scope="col" style={{ width: '160px' }}>{t.historyAction}</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => {
                  const dateStr = item.timestamp
                    ? new Date(item.timestamp).toLocaleString('en-IN')
                    : 'N/A';
                  return (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.id}</strong>
                      </td>
                      <td>{dateStr}</td>
                      <td>
                        <div style={{ maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.query}
                        </div>
                      </td>
                      <td>
                        <div className="button-group">
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => handleView(item)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
