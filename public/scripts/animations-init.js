// Animation initialization script
(function() {
  // Matrix-themed scroll animations using GSAP
  function initScrollAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Disable all animations for users who prefer reduced motion
      const animatedElements = document.querySelectorAll('[data-animate]');
      animatedElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
        el.style.filter = 'blur(0px)';
      });
      return;
    }

    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not loaded, skipping scroll animations');
      return;
    }

    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Matrix Reveal Animation - for elements that blur in from below
    const revealElements = document.querySelectorAll('[data-animate="reveal"]');

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
          markers: false,
          onEnter: () => {
            element.setAttribute('data-gsap-animated', 'true');
          }
        }
      });
    });

    // Data Stagger Animation - for containers with staggered children
    const staggerContainers = document.querySelectorAll('[data-animate="stagger-container"]');

    staggerContainers.forEach((container) => {
      // Look for items with stagger-item attribute, or fall back to direct children
      const staggerItems = container.querySelectorAll('[data-animate="stagger-item"]');
      const children = staggerItems.length > 0 ? Array.from(staggerItems) : Array.from(container.children);
      
      if (children.length === 0) return;

      gsap.set(children, {
        opacity: 0,
        y: 20,
        filter: 'blur(2px)',
        willChange: 'opacity, transform, filter'
      });

      gsap.to(children, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power2.out',
        willChange: 'auto',
        stagger: 0.1,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          markers: false,
          onEnter: () => {
            children.forEach(child => child.setAttribute('data-gsap-animated', 'true'));
          }
        }
      });
    });

    // Blur-in Animation - subtle reveal with blur effect
    const blurElements = document.querySelectorAll('[data-animate="blur-in"]');

    blurElements.forEach((element) => {
      gsap.set(element, {
        opacity: 0,
        filter: 'blur(8px)',
        willChange: 'opacity, filter'
      });

      gsap.to(element, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out',
        willChange: 'auto',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
          markers: false
        }
      });
    });

    // Scale-in Animation - elements that scale in from smaller size
    const scaleElements = document.querySelectorAll('[data-animate="scale-in"]');

    scaleElements.forEach((element) => {
      gsap.set(element, {
        opacity: 0,
        scale: 0.9,
        willChange: 'opacity, transform'
      });

      gsap.to(element, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.7)',
        willChange: 'auto',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          markers: false
        }
      });
    });

    // Cyberpunk Glow Animation - for elements that should have animated glows
    const glowElements = document.querySelectorAll('[data-animate="glow"]');

    glowElements.forEach((element) => {
      gsap.to(element, {
        boxShadow: '0 0 20px rgba(57, 255, 20, 0.3)',
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          markers: false
        }
      });
    });
  }

  // Wait for GSAP to be available, then initialize animations
  const waitForGSAP = (callback, maxAttempts = 50, attempt = 0) => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);
      // Small delay to ensure all elements are rendered
      setTimeout(() => {
        callback();
      }, 100);
    } else if (attempt < maxAttempts) {
      setTimeout(() => {
        waitForGSAP(callback, maxAttempts, attempt + 1);
      }, 100);
    } else {
      console.warn('GSAP or ScrollTrigger not loaded after waiting, animations may not work');
      // Fallback: make elements visible even if GSAP isn't loaded
      const animatedElements = document.querySelectorAll('[data-animate]');
      animatedElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.filter = 'blur(0px)';
      });
    }
  };

  // Initialize animations when DOM is ready
  const init = () => {
    waitForGSAP(initScrollAnimations);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();