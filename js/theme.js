function initTheme() {
  const html = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  function updateButtonIcon() {
    const isLight = html.classList.contains('light');
    if (toggle) {
      const icon = isLight ? 'moon' : 'sun';
      fetch(`/icons/${icon}.svg`)
        .then(r => r.text())
        .then(svg => {
          toggle.innerHTML = svg.replace('fill="#e3e3e3"', 'fill="currentColor"');
        })
        .catch(() => toggle.textContent = isLight ? '🌙' : '☀️');
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
    const icon = isDark ? 'sun' : 'moon';
    fetch(`/icons/${icon}.svg`)
      .then(r => r.text())
      .then(svg => {
        toggle.innerHTML = svg.replace('fill="#e3e3e3"', 'fill="currentColor"');
      })
      .catch(() => toggle.textContent = isDark ? '☀️' : '🌙');
  }
})();

// Run full initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}
