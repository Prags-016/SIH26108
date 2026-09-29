import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UtilityBar } from './components/UtilityBar.jsx';
import { Header } from './components/Header.jsx';
import { Nav } from './components/Nav.jsx';
import { Breadcrumb } from './components/Breadcrumb.jsx';
import { Footer } from './components/Footer.jsx';
import { getTranslation } from './i18n/index.js';
import { UpdateTicker } from './components/UpdateTicker.jsx';

// Pages
import { Home } from './pages/Home.jsx';
import { FindStandards } from './pages/FindStandards.jsx';
import { Results } from './pages/Results.jsx';
import { StandardDetail } from './pages/StandardDetail.jsx';
import { MySearches } from './pages/MySearches.jsx';
import { UserGuide } from './pages/UserGuide.jsx';
import { About } from './pages/About.jsx';
import { FeedbackPage } from './pages/FeedbackPage.jsx';
import { ContactUs } from './pages/ContactUs.jsx';
import { Accessibility } from './pages/Accessibility.jsx';
import { Policies } from './pages/Policies.jsx';
import { Terms } from './pages/Terms.jsx';
import { Privacy } from './pages/Privacy.jsx';
import { Sitemap } from './pages/Sitemap.jsx';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [fontSize, setFontSize] = useState('normal'); // 'small' | 'normal' | 'large'
  const [highContrast, setHighContrast] = useState(false);

  // Sync font size to body class
  useEffect(() => {
    document.body.classList.remove('font-size-small', 'font-size-normal', 'font-size-large');
    document.body.classList.add(`font-size-${fontSize}`);
  }, [fontSize]);

  // Sync high contrast to body class
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const t = getTranslation(currentLang);

  return (
    <div className="site-wrapper">
      {/* 1. Top Utility Bar */}
      <UtilityBar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        t={t}
      />

      {/* 2. Header */}
      <Header t={t} />

      {/* 3. Navigation Bar */}
      <Nav t={t} />

      {/* Gazette Updates Ticker */}
      <UpdateTicker t={t} />

      {/* 4. Breadcrumb */}
      <Breadcrumb t={t} />

      {/* 5. Main Content Area */}
      <main id="main-content" className="container" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home t={t} />} />
          <Route path="/find" element={<FindStandards t={t} />} />
          <Route path="/results" element={<Results t={t} />} />
          <Route path="/standard/:id" element={<StandardDetail t={t} />} />
          <Route path="/history" element={<MySearches t={t} />} />
          <Route path="/guide" element={<UserGuide t={t} />} />
          <Route path="/about" element={<About t={t} />} />
          <Route path="/feedback" element={<FeedbackPage t={t} />} />
          <Route path="/contact" element={<ContactUs t={t} />} />
          <Route path="/accessibility" element={<Accessibility t={t} />} />
          <Route path="/policies" element={<Policies t={t} />} />
          <Route path="/terms" element={<Terms t={t} />} />
          <Route path="/privacy" element={<Privacy t={t} />} />
          <Route path="/sitemap" element={<Sitemap t={t} />} />
        </Routes>
      </main>

      {/* 6. Footer */}
      <Footer t={t} />
    </div>
  );
}
