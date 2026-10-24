/** Alternância de tema com preferência persistente e detecção do sistema. */
(function () {
  'use strict';
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  const storageKey = 'luan-portfolio-theme';
  const scheme = window.matchMedia('(prefers-color-scheme: dark)');

  function savedChoice() {
    try { return localStorage.getItem(storageKey); } catch (_) { return null; }
  }

  function setTheme(theme, persist) {
    root.dataset.theme = theme;
    button.setAttribute('aria-label', theme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro');
    button.setAttribute('title', theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
    button.querySelector('use').setAttribute('href', theme === 'dark' ? '#i-sun' : '#i-moon');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#090f19' : '#f5f8fd';
    if (persist) {
      try { localStorage.setItem(storageKey, theme); } catch (_) { /* armazenamento bloqueado */ }
    }
  }

  setTheme(root.dataset.theme === 'light' ? 'light' : 'dark', false);
  button.addEventListener('click', function () {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
  });
  const followSystem = function () {
    if (!['dark', 'light'].includes(savedChoice())) setTheme(scheme.matches ? 'dark' : 'light', false);
  };
  if (scheme.addEventListener) scheme.addEventListener('change', followSystem);
  else if (scheme.addListener) scheme.addListener(followSystem);
}());
