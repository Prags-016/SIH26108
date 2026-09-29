const NAMES = {
  en: 'English',
  hi: 'Hindi',
  bn: 'Bengali',
  ta: 'Tamil',
  te: 'Telugu',
  mr: 'Marathi',
  gu: 'Gujarati',
  kn: 'Kannada',
  ml: 'Malayalam',
  pa: 'Punjabi',
  or: 'Odia',
  as: 'Assamese',
  ur: 'Urdu'
};

const SCRIPT_TESTS = [
  { code: 'hi', name: 'Hindi', pattern: /[\u0900-\u097F]/ },
  { code: 'bn', name: 'Bengali', pattern: /[\u0980-\u09FF]/ },
  { code: 'pa', name: 'Punjabi', pattern: /[\u0A00-\u0A7F]/ },
  { code: 'gu', name: 'Gujarati', pattern: /[\u0A80-\u0AFF]/ },
  { code: 'or', name: 'Odia', pattern: /[\u0B00-\u0B7F]/ },
  { code: 'ta', name: 'Tamil', pattern: /[\u0B80-\u0BFF]/ },
  { code: 'te', name: 'Telugu', pattern: /[\u0C00-\u0C7F]/ },
  { code: 'kn', name: 'Kannada', pattern: /[\u0C80-\u0CFF]/ },
  { code: 'ml', name: 'Malayalam', pattern: /[\u0D00-\u0D7F]/ },
  { code: 'ur', name: 'Urdu', pattern: /[\u0600-\u06FF]/ }
];

function detectScript(text) {
  const source = String(text || '');
  for (const script of SCRIPT_TESTS) {
    if (script.pattern.test(source)) {
      return { code: script.code, name: script.name };
    }
  }
  return null;
}

function detectLanguage(text, requested = 'auto') {
  const choice = String(requested || 'auto').trim().toLowerCase();
  if (choice && choice !== 'auto' && NAMES[choice]) {
    return { code: choice, name: NAMES[choice] };
  }
  return detectScript(text) || { code: 'en', name: 'English' };
}

module.exports = {
  NAMES,
  detectLanguage,
  detectScript
};
