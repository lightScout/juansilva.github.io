function initTheme() {
  const html = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  function updateButtonText() {
    const isLight = html.classList.contains('light');
    if (toggle) {
      toggle.textContent = isLight ? 'DARK' : 'LIGHT';
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
  updateButtonText();

  // Toggle button
  if (toggle) {
    toggle.addEventListener('click', () => {
      html.classList.toggle('light');
      const isLight = html.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      updateButtonText();
    });
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}
