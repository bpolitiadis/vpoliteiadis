function initTheme() {
  var themeToggle = document.getElementById('theme-toggle');
  var lightIcon = document.getElementById('theme-toggle-light-icon');
  var darkIcon = document.getElementById('theme-toggle-dark-icon');

  var savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.classList.toggle('dark', savedTheme === 'dark');

  if (savedTheme === 'dark') {
    lightIcon && lightIcon.classList.remove('hidden');
    darkIcon && darkIcon.classList.add('hidden');
    themeToggle && themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    lightIcon && lightIcon.classList.add('hidden');
    darkIcon && darkIcon.classList.remove('hidden');
    themeToggle && themeToggle.setAttribute('aria-pressed', 'false');
  }

  themeToggle && themeToggle.addEventListener('click', function () {
    var isDark = document.documentElement.classList.contains('dark');
    var newTheme = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      lightIcon && lightIcon.classList.remove('hidden');
      darkIcon && darkIcon.classList.add('hidden');
      themeToggle && themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      lightIcon && lightIcon.classList.add('hidden');
      darkIcon && darkIcon.classList.remove('hidden');
      themeToggle && themeToggle.setAttribute('aria-pressed', 'false');
    }
  });
}

function initMobileMenu() {
  var mobileMenuButton = document.getElementById('mobile-menu-button');
  var mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) mobileMenu.classList.add('hidden');

  mobileMenuButton && mobileMenuButton.addEventListener('click', function () {
    var isExpanded = mobileMenu && mobileMenu.classList.contains('hidden') === false;
    mobileMenu && mobileMenu.classList.toggle('hidden');
    mobileMenuButton && mobileMenuButton.setAttribute('aria-expanded', (!isExpanded).toString());
  });

  var mobileLinks = mobileMenu && mobileMenu.querySelectorAll('a');
  mobileLinks && mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu && mobileMenu.classList.add('hidden');
      mobileMenuButton && mobileMenuButton.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      mobileMenuButton && mobileMenuButton.setAttribute('aria-expanded', 'false');
      mobileMenuButton && mobileMenuButton.focus();
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  initMobileMenu();
});


