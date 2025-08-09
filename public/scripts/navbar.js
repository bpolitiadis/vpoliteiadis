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

(function ready(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
})(initMobileMenu);


