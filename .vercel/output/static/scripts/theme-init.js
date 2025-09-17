(function initTheme() {
  try {
    var savedTheme = localStorage.getItem('theme') || 'dark';
    var isDark = savedTheme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    if (document && document.fonts && document.fonts.load) {
      Promise.all([
        document.fonts.load('400 1em Inter'),
        document.fonts.load('400 1em Orbitron'),
      ])
        .then(function () {
          document.documentElement.classList.add('fonts-loaded');
        })
        .catch(function () {
          /* no-op */
        });
    }
  } catch (_) {
    /* no-op */
  }
})();


