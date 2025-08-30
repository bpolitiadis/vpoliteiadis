/**
 * Performance Optimization Script
 * Monitors Core Web Vitals and optimizes user experience
 * Optimized for vpoliteiadis portfolio site
 */

// Performance monitoring and optimization
(function() {
  'use strict';

  // Check if performance API is available
  if (!('performance' in window) || !('PerformanceObserver' in window)) {
    return;
  }

  // Performance metrics storage
  const performanceMetrics = {
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    fcp: null
  };

  // Core Web Vitals thresholds
  const thresholds = {
    lcp: { good: 2500, poor: 4000 },
    fid: { good: 100, poor: 300 },
    cls: { good: 0.1, poor: 0.25 }
  };

  // Performance observer for Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      switch (entry.entryType) {
        case 'largest-contentful-paint':
          performanceMetrics.lcp = entry.startTime;
          reportMetric('LCP', entry.startTime, thresholds.lcp);
          break;
        case 'first-input':
          performanceMetrics.fid = entry.processingStart - entry.startTime;
          reportMetric('FID', performanceMetrics.fid, thresholds.fid);
          break;
        case 'layout-shift':
          if (!entry.hadRecentInput) {
            performanceMetrics.cls = (performanceMetrics.cls || 0) + entry.value;
            reportMetric('CLS', performanceMetrics.cls, thresholds.cls);
          }
          break;
        case 'paint':
          if (entry.name === 'first-contentful-paint') {
            performanceMetrics.fcp = entry.startTime;
            reportMetric('FCP', entry.startTime, { good: 1800, poor: 3000 });
          }
          break;
      }
    }
  });

  // Observe performance entries
  try {
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift', 'paint'] });
  } catch (e) {
    // Fallback for older browsers
    console.warn('PerformanceObserver not fully supported');
  }

  // Report performance metrics
  function reportMetric(name, value, threshold) {
    const status = value <= threshold.good ? 'good' : value <= threshold.poor ? 'needs-improvement' : 'poor';
    
    // Log to console in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log(`🚀 ${name}: ${Math.round(value)}ms (${status})`);
    }

    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: name,
        value: Math.round(value),
        non_interaction: true
      });
    }
  }

  // Time to First Byte measurement
  if ('navigation' in performance) {
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      performanceMetrics.ttfb = navigation.responseStart - navigation.requestStart;
      reportMetric('TTFB', performanceMetrics.ttfb, { good: 800, poor: 1800 });
    }
  }

  // Image loading optimization
  function optimizeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // Use Intersection Observer for better lazy loading
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => {
        if (img.dataset.src) {
          imageObserver.observe(img);
        }
      });
    }
  }

  // Font loading optimization
  function optimizeFonts() {
    if ('fonts' in document) {
      // Preload critical fonts
      const criticalFonts = [
        'Orbitron',
        'Inter'
      ];

      criticalFonts.forEach(fontFamily => {
        document.fonts.load(`400 16px ${fontFamily}`).then(() => {
          document.documentElement.classList.add(`font-${fontFamily.toLowerCase()}-loaded`);
        });
      });
    }
  }

  // Animation performance optimization
  function optimizeAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
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

  // Resource hints optimization
  function optimizeResourceHints() {
    // Preconnect to external domains
    const domains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com'
    ];

    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  // Lazy loading for below-the-fold sections
  function initializeLazySections() {
    const lazySections = document.querySelectorAll('[data-lazy-section]');
    
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
    }
  }

  // Performance monitoring dashboard (development only)
  function createPerformanceDashboard() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      const dashboard = document.createElement('div');
      dashboard.id = 'performance-dashboard';
      dashboard.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.9);
        color: #39FF14;
        padding: 15px;
        border-radius: 8px;
        font-family: monospace;
        font-size: 12px;
        z-index: 10000;
        border: 1px solid #39FF14;
        max-width: 300px;
      `;
      
      dashboard.innerHTML = `
        <div style="margin-bottom: 10px; font-weight: bold;">🚀 Performance Metrics</div>
        <div>LCP: <span id="lcp-value">-</span></div>
        <div>FID: <span id="fid-value">-</span></div>
        <div>CLS: <span id="cls-value">-</span></div>
        <div>TTFB: <span id="ttfb-value">-</span></div>
        <div style="margin-top: 10px; font-size: 10px; opacity: 0.7;">
          Press 'P' to toggle
        </div>
      `;
      
      document.body.appendChild(dashboard);
      
      // Update dashboard values
      const updateDashboard = () => {
        if (performanceMetrics.lcp) document.getElementById('lcp-value').textContent = `${Math.round(performanceMetrics.lcp)}ms`;
        if (performanceMetrics.fid) document.getElementById('fid-value').textContent = `${Math.round(performanceMetrics.fid)}ms`;
        if (performanceMetrics.cls) document.getElementById('cls-value').textContent = performanceMetrics.cls.toFixed(3);
        if (performanceMetrics.ttfb) document.getElementById('ttfb-value').textContent = `${Math.round(performanceMetrics.ttfb)}ms`;
      };
      
      // Toggle dashboard with 'P' key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'p' || e.key === 'P') {
          dashboard.style.display = dashboard.style.display === 'none' ? 'block' : 'none';
        }
      });
      
      // Update dashboard periodically
      setInterval(updateDashboard, 1000);
    }
  }

  // Initialize all optimizations when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  function initialize() {
    optimizeImages();
    optimizeFonts();
    optimizeAnimations();
    optimizeResourceHints();
    initializeLazySections();
    createPerformanceDashboard();
  }

  // Export metrics for external use
  window.getPerformanceMetrics = () => performanceMetrics;

})();
