function initMobileMenu() {
  var mobileMenuButton = document.getElementById('mobile-menu-button');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileCloseButton = document.getElementById('mobile-close-button');
  
  if (mobileMenu) mobileMenu.classList.add('hidden');

  // Toggle mobile menu
  mobileMenuButton && mobileMenuButton.addEventListener('click', function () {
    var isExpanded = mobileMenu && mobileMenu.classList.contains('hidden') === false;
    mobileMenu && mobileMenu.classList.toggle('hidden');
    mobileMenu && mobileMenu.classList.toggle('show');
    mobileMenuButton && mobileMenuButton.setAttribute('aria-expanded', (!isExpanded).toString());
    
    // Lock scroll when menu is open (mobile UX best practice)
    if (document && document.body) {
      if (!isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  });

  // Close mobile menu with close button
  mobileCloseButton && mobileCloseButton.addEventListener('click', function () {
    mobileMenu && mobileMenu.classList.add('hidden');
    mobileMenu && mobileMenu.classList.remove('show');
    mobileMenuButton && mobileMenuButton.setAttribute('aria-expanded', 'false');
    if (document && document.body) document.body.style.overflow = '';
  });

  // Close mobile menu when clicking on links
  var mobileLinks = mobileMenu && mobileMenu.querySelectorAll('a');
  mobileLinks && mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu && mobileMenu.classList.add('hidden');
      mobileMenu && mobileMenu.classList.remove('show');
      mobileMenuButton && mobileMenuButton.setAttribute('aria-expanded', 'false');
      if (document && document.body) document.body.style.overflow = '';
    });
  });

  // Close mobile menu with Escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('show');
      mobileMenuButton && mobileMenuButton.setAttribute('aria-expanded', 'false');
      mobileMenuButton && mobileMenuButton.focus();
      if (document && document.body) document.body.style.overflow = '';
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (event) {
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      var isClickInsideMenu = mobileMenu.contains(event.target);
      var isClickOnButton = mobileMenuButton && mobileMenuButton.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnButton) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
        mobileMenuButton && mobileMenuButton.setAttribute('aria-expanded', 'false');
        if (document && document.body) document.body.style.overflow = '';
      }
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


