import React, { useState, useEffect } from 'react';

export function UpdateTicker({ t }) {
  const updates = [
    "DPIIT Cement Quality Control Order: All tender notices must cite IS 269:2015 directly; IS 8112 (43 grade) & IS 12269 (53 grade) are superseded.",
    "MeitY Compulsory Registration Scheme (CRS): Mandatory R-Number validation required for all commercial laptops and IT power adapters.",
    "Hallmarking of Gold Jewellery Order: 6-digit alphanumeric HUID laser marking mandatory on all deliverables.",
    "Rule 144, General Financial Rules (GFR) 2017: Technical specifications in government tenders should strictly be based on Indian Standards.",
    "Packaged Drinking Water: Mandatory dual licensing under FSSAI and BIS ISI Mark (IS 14543:2016) before supply distribution."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % updates.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, updates.length]);

  return (
    <div className="update-ticker-bar" role="region" aria-label="Latest Government Gazette Notifications">
      <div className="container">
        <span className="ticker-label">
          Latest Gazette Updates
        </span>
        <div className="ticker-content" aria-live="polite">
          <span>{updates[currentIndex]}</span>
        </div>
        <div className="ticker-controls">
          <button
            type="button"
            className="ticker-btn"
            onClick={() => setCurrentIndex((prev) => (prev - 1 + updates.length) % updates.length)}
            title="Previous notification"
            aria-label="Previous notification"
          >
            &lt;
          </button>
          <button
            type="button"
            className="ticker-btn"
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "Play notifications" : "Pause notifications"}
            aria-label={isPaused ? "Play updates" : "Pause updates"}
          >
            {isPaused ? "▶" : "❚❚"}
          </button>
          <button
            type="button"
            className="ticker-btn"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % updates.length)}
            title="Next notification"
            aria-label="Next notification"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
