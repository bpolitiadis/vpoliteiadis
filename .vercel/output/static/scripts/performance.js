// Performance optimization script for Matrix theme
// Target: <90KB JS on homepage

(function() {
  'use strict';
  
  // Lazy loading for below-the-fold sections
  function initLazyLoading() {
    const lazySections = document.querySelectorAll('[data-lazy-section]');
    
    if (!lazySections.length) return;
    
    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('lazy-loaded');
            sectionObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.1
      });
      
      lazySections.forEach(section => {
        sectionObserver.observe(section);
      });
    } else {
      // Fallback for older browsers
      lazySections.forEach(section => {
        section.classList.add('lazy-loaded');
      });
    }
  }
  
  // Optimize images for Matrix theme
  function initImageOptimization() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      images.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
      });
    } else {
      // Fallback for older browsers
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  }
  
  // Optimize animations for Matrix theme
  function initAnimationOptimization() {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduced-motion');
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        document.documentElement.classList.add('paused');
      } else {
        document.documentElement.classList.remove('paused');
      }
    });
  }
  
  // Initialize performance optimizations
  function init() {
    // Use requestIdleCallback for non-critical optimizations
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        initImageOptimization();
        initAnimationOptimization();
      });
    } else {
      // Fallback for older browsers
      setTimeout(() => {
        initImageOptimization();
        initAnimationOptimization();
      }, 100);
    }
    
    // Initialize lazy loading immediately
    initLazyLoading();
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
