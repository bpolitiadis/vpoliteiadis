// Animation initialization script
// NOTE: After simplification, this script is kept for potential future use
// Currently, only HeroSection uses GSAP (no ScrollTrigger needed)
// DecryptedText handles its own animations via IntersectionObserver
(function() {
  // Check for reduced motion preference and ensure elements are visible
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Ensure all elements are visible for users who prefer reduced motion
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0) scale(1)';
      el.style.filter = 'blur(0px)';
    });
  }

  // Future: If you need scroll-triggered animations for other elements,
  // you can add them here. Currently unused since we removed data-animate attributes.
})();