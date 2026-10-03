(function () {
  var root = document.documentElement;
  var button = document.querySelector('[data-theme-toggle]');

  function applyTheme(theme) {
    root.dataset.theme = theme;
    button.textContent = theme === 'dark' ? '☀' : '☾';
    button.setAttribute('aria-label', theme === 'dark' ? 'Use light appearance' : 'Use dark appearance');
  }

  var savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem('0x2-draft-theme') || 'light';
  } catch (error) {
    // Appearance persistence is optional.
  }
  applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

  button.addEventListener('click', function () {
    var theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try {
      localStorage.setItem('0x2-draft-theme', theme);
    } catch (error) {
      // Appearance persistence is optional.
    }
  });

  var menu = document.querySelector('.mobile-menu');
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', function (event) {
    if (!menu.contains(event.target)) menu.open = false;
  });
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { menu.open = false; });
  });
})();
