import React from 'react';
import { SUPPORTED_LANGUAGES } from '../i18n/index.js';

export function UtilityBar({
  currentLang,
  onLanguageChange,
  fontSize,
  onFontSizeChange,
  highContrast,
  onToggleHighContrast,
  t
}) {
  return (
    <aside className="utility-bar" aria-label="Accessibility and Utility Controls">
      <a href="#main-content" className="skip-link">
        {t.skipToContent}
      </a>
      <div className="container">
        <div className="utility-bar-left">
          <span style={{ fontWeight: 600, color: '#333' }}>
            भारत सरकार | Government of India
          </span>
        </div>

        <div className="utility-bar-right">
          {/* Text Size Resizer */}
          <div className="utility-item" role="group" aria-label={t.textSize}>
            <span id="text-size-label" style={{ marginRight: '4px' }}>{t.textSize}:</span>
            <div className="font-resizer" aria-labelledby="text-size-label">
              <button
                type="button"
                className={fontSize === 'small' ? 'active' : ''}
                onClick={() => onFontSizeChange('small')}
                title="Decrease font size (A-)"
                aria-label="Decrease text size"
              >
                A-
              </button>
              <button
                type="button"
                className={fontSize === 'normal' ? 'active' : ''}
                onClick={() => onFontSizeChange('normal')}
                title="Default font size (A)"
                aria-label="Normal text size"
              >
                A
              </button>
              <button
                type="button"
                className={fontSize === 'large' ? 'active' : ''}
                onClick={() => onFontSizeChange('large')}
                title="Increase font size (A+)"
                aria-label="Increase text size"
              >
                A+
              </button>
            </div>
          </div>

          {/* High Contrast Toggle */}
          <div className="utility-item">
            <button
              type="button"
              className="contrast-btn"
              onClick={onToggleHighContrast}
              aria-pressed={highContrast}
              title="Toggle High Contrast Display Mode"
            >
              {highContrast ? t.normalContrast : t.highContrast}
            </button>
          </div>

          {/* Language Selector */}
          <div className="utility-item">
            <label htmlFor="language-selector" style={{ marginRight: '4px' }}>
              {t.selectLanguage}:
            </label>
            <select
              id="language-selector"
              className="lang-select"
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value)}
              aria-label={t.selectLanguage}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </aside>
  );
}
