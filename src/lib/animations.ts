import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Matrix-themed scroll animations using GSAP
 * Provides unified animation system for the portfolio
 */
export function initScrollAnimations() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Disable all animations for users who prefer reduced motion
    gsap.set('[data-animate]', { opacity: 1, y: 0, filter: 'blur(0px)' });
    return;
  }

  // Matrix Reveal Animation - for elements that blur in from below
  const revealElements = gsap.utils.toArray('[data-animate="reveal"]') as Element[];

  revealElements.forEach((element) => {
    gsap.set(element, {
      opacity: 0,
      y: 30,
      filter: 'blur(4px)',
      willChange: 'opacity, transform, filter'
    });

    gsap.to(element, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out',
      willChange: 'auto',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        markers: false // Set to true for debugging
      }
    });
  });

  // Data Stagger Animation - for containers with staggered children
  const staggerContainers = gsap.utils.toArray('[data-animate="stagger-container"]') as Element[];

  staggerContainers.forEach((container) => {
    const staggerItems = gsap.utils.toArray('[data-animate="stagger-item"]', container) as Element[];

    if (staggerItems.length > 0) {
      gsap.set(staggerItems, {
        opacity: 0,
        y: 20,
        filter: 'blur(2px)',
        willChange: 'opacity, transform, filter'
      });

      gsap.to(staggerItems, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        willChange: 'auto',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  });

  // Floating Elements - for decorative elements (like stars, particles)
  const floatingElements = gsap.utils.toArray('[data-animate="float"]') as Element[];

  floatingElements.forEach((element, index) => {
    gsap.set(element, {
      willChange: 'transform'
    });

    gsap.to(element, {
      y: 'random(-20, 20)',
      rotation: 'random(-5, 5)',
      duration: 'random(3, 6)',
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: index * 0.1,
      willChange: 'auto'
    });
  });

  // Matrix Data Stream Effect - for text that appears like cascading data
  const dataStreamElements = gsap.utils.toArray('[data-animate="data-stream"]') as Element[];

  dataStreamElements.forEach((element) => {
    const text = element.textContent || '';
    element.textContent = '';

    // Split text into individual characters
    const chars = text.split('');
    const charElements: HTMLSpanElement[] = [];

    chars.forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.filter = 'blur(2px)';
      span.style.transform = 'translateY(10px)';
      charElements.push(span);
      element.appendChild(span);
    });

    gsap.to(charElements, {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      duration: 0.05,
      stagger: 0.02,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Performance optimization: Kill scroll triggers when page is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      ScrollTrigger.getAll().forEach(trigger => trigger.disable());
    } else {
      ScrollTrigger.getAll().forEach(trigger => trigger.enable());
    }
  });

  // Refresh ScrollTrigger on window resize (debounced)
  let resizeTimeout: NodeJS.Timeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  });
}

/**
 * Utility function to manually trigger animations for dynamically added content
 */
export function refreshAnimations() {
  ScrollTrigger.refresh();
}

/**
 * Cleanup function to remove all scroll triggers
 */
export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  ScrollTrigger.clearMatchMedia();
}