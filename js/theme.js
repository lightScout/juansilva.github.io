function initTheme() {
  const html = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  function updateButtonIcon() {
    const isLight = html.classList.contains('light');
    if (toggle) {
      toggle.textContent = isLight ? 'Dark' : 'Light';
    }
  }

  // Check stored preference or system preference
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = stored ? stored === 'dark' : prefersDark;

  // Set initial theme
  if (!isDark) {
    html.classList.add('light');
  }
  updateButtonIcon();

  // Toggle button
  if (toggle) {
    toggle.addEventListener('click', () => {
      html.classList.toggle('light');
      const isLight = html.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      updateButtonIcon();
    });
  }
}

// Set initial button icon immediately (before DOM ready)
(function() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = stored ? stored === 'dark' : prefersDark;
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.textContent = isDark ? 'Light' : 'Dark';
  }
})();

// Run full initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}
