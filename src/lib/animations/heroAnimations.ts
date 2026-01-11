/**
 * Hero Section Animations - GSAP-powered floating effects
 *
 * Extracted from HeroSection.astro for better testability and reusability.
 * Uses GSAP for smooth, GPU-accelerated animations with reduced motion support.
 *
 * @see docs/appendices/HERO_ANIMATIONS_EXPLAINED.md
 */
import gsap from 'gsap';

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────

export const HERO_ANIMATION_CONFIG = {
  /** Tailwind sm breakpoint (640px) */
  MOBILE_BREAKPOINT: 640,

  /** Selector for hero section */
  SECTION_SELECTOR: '[data-testid="hero-section"]',

  /** Class added when GSAP takes over (disables CSS fallback animations) */
  GSAP_READY_CLASS: 'gsap-ready',

  /** Character illustration floating animation */
  image: {
    selector: '.image-animation',
    durations: [3, 2, 3, 3],
    movements: [
      { y: '-=30', x: '+=20', rotation: '-=2' },
      { y: '+=30', x: '-=20', rotation: '-=2' },
      { y: '-=20', rotation: '+=2' },
      { y: '+=20', rotation: '+=2' },
    ],
    movementsMobile: [
      { y: '-=15', x: '+=10', rotation: '-=1' },
      { y: '+=15', x: '-=10', rotation: '-=1' },
      { y: '-=10', rotation: '+=1' },
      { y: '+=10', rotation: '+=1' },
    ],
  },

  /** Laptop illustration floating animation (separate timeline for 3D depth) */
  laptop: {
    selector: '.laptop',
    durations: [3, 2, 3, 3],
    initialScale: 0.4,
    movements: [
      { y: '-=10', x: '+=10', rotation: '-=1' },
      { y: '+=10', x: '-=10', rotation: '-=1' },
      { y: '-=10', rotation: '+=1' },
      { y: '+=10', rotation: '+=1' },
    ],
    movementsMobile: [
      { y: '-=5', x: '+=5', rotation: '-=0.5' },
      { y: '+=5', x: '-=5', rotation: '-=0.5' },
      { y: '-=5', rotation: '+=0.5' },
      { y: '+=5', rotation: '+=0.5' },
    ],
  },

  /** Easing function for all animations */
  easing: 'power1.easeInOut',

  /** Resize debounce delay (ms) */
  resizeDebounce: 150,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type GSAPTimeline = ReturnType<typeof gsap.timeline>;

interface HeroAnimationState {
  imageTimeline: GSAPTimeline | null;
  laptopTimeline: GSAPTimeline | null;
  resizeTimeout: ReturnType<typeof setTimeout> | null;
  cleanupFn: (() => void) | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// State (module-level for cleanup)
// ─────────────────────────────────────────────────────────────────────────────

const state: HeroAnimationState = {
  imageTimeline: null,
  laptopTimeline: null,
  resizeTimeout: null,
  cleanupFn: null,
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const IS_DEV = import.meta.env?.DEV ?? false;

function log(...args: unknown[]): void {
  if (IS_DEV) {
    console.log('[HeroAnimations]', ...args);
  }
}

function warn(...args: unknown[]): void {
  if (IS_DEV) {
    console.warn('[HeroAnimations]', ...args);
  }
}

function getIsMobile(): boolean {
  return window.innerWidth < HERO_ANIMATION_CONFIG.MOBILE_BREAKPOINT;
}

// ─────────────────────────────────────────────────────────────────────────────
// Animation Creators
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates the floating animation timeline for an element group
 */
function createFloatingTimeline(
  elements: NodeListOf<Element> | Element[],
  config: typeof HERO_ANIMATION_CONFIG.image | typeof HERO_ANIMATION_CONFIG.laptop,
  isMobile: boolean
): GSAPTimeline {
  const movements = isMobile ? config.movementsMobile : config.movements;
  const timeline = gsap.timeline({ repeat: -1 });

  movements.forEach((movement, index) => {
    timeline.to(elements, {
      ...movement,
      ease: HERO_ANIMATION_CONFIG.easing,
      duration: config.durations[index],
      force3D: true,
    });
  });

  return timeline;
}

/**
 * Creates all hero section animations
 */
function createAnimations(section: Element, prefersReducedMotion: boolean): void {
  const imageElements = section.querySelectorAll(HERO_ANIMATION_CONFIG.image.selector);
  const laptopElements = section.querySelectorAll(HERO_ANIMATION_CONFIG.laptop.selector);
  const isMobile = getIsMobile();

  log('Creating animations', {
    imageCount: imageElements.length,
    laptopCount: laptopElements.length,
    prefersReducedMotion,
    isMobile,
    viewportWidth: window.innerWidth,
  });

  // Clean up existing timelines
  if (state.imageTimeline) {
    state.imageTimeline.kill();
    state.imageTimeline = null;
  }
  if (state.laptopTimeline) {
    state.laptopTimeline.kill();
    state.laptopTimeline = null;
  }

  // Character illustration floating effect
  if (!prefersReducedMotion && imageElements.length > 0) {
    gsap.set(imageElements, { x: 0, y: 0, rotation: 0, force3D: true });
    state.imageTimeline = createFloatingTimeline(
      imageElements,
      HERO_ANIMATION_CONFIG.image,
      isMobile
    );
  }

  // Laptop floating effect (separate timeline for 3D depth)
  if (laptopElements.length > 0) {
    gsap.set(laptopElements, {
      scale: HERO_ANIMATION_CONFIG.laptop.initialScale,
      x: 0,
      y: 0,
      rotation: 0,
      transformOrigin: 'center center',
      force3D: true,
    });

    if (!prefersReducedMotion) {
      state.laptopTimeline = createFloatingTimeline(
        laptopElements,
        HERO_ANIMATION_CONFIG.laptop,
        isMobile
      );
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Initializes hero section animations
 *
 * @returns Cleanup function to stop all animations
 */
export function initHeroAnimations(): () => void {
  const section = document.querySelector(HERO_ANIMATION_CONFIG.SECTION_SELECTOR);

  if (!section) {
    warn('Hero section not found');
    return () => {};
  }

  if (typeof gsap === 'undefined') {
    warn('GSAP is not available');
    return () => {};
  }

  // Mark section as GSAP-ready (disables CSS fallback animations)
  section.classList.add(HERO_ANIMATION_CONFIG.GSAP_READY_CLASS);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Create initial animations
  createAnimations(section, prefersReducedMotion);

  // Handle window resize with debouncing
  const handleResize = (): void => {
    if (state.resizeTimeout) {
      clearTimeout(state.resizeTimeout);
    }
    state.resizeTimeout = setTimeout(() => {
      createAnimations(section, prefersReducedMotion);
    }, HERO_ANIMATION_CONFIG.resizeDebounce);
  };

  window.addEventListener('resize', handleResize, { passive: true });

  // Create cleanup function
  const cleanup = (): void => {
    log('Cleaning up animations');

    if (state.imageTimeline) {
      state.imageTimeline.kill();
      state.imageTimeline = null;
    }
    if (state.laptopTimeline) {
      state.laptopTimeline.kill();
      state.laptopTimeline = null;
    }
    if (state.resizeTimeout) {
      clearTimeout(state.resizeTimeout);
      state.resizeTimeout = null;
    }

    window.removeEventListener('resize', handleResize);
    window.removeEventListener('beforeunload', cleanup);
  };

  // Store cleanup for module-level access
  state.cleanupFn = cleanup;

  // Cleanup on page unload (for SPA navigation)
  window.addEventListener('beforeunload', cleanup);

  return cleanup;
}

/**
 * Auto-initializes when DOM is ready (for direct script usage)
 */
export function autoInit(): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initHeroAnimations());
  } else {
    initHeroAnimations();
  }
}

/**
 * Kills all active hero animations (useful for testing)
 */
export function killHeroAnimations(): void {
  state.cleanupFn?.();
}

/**
 * Returns current animation state (useful for debugging)
 */
export function getAnimationState(): Readonly<{
  hasImageTimeline: boolean;
  hasLaptopTimeline: boolean;
  isMobile: boolean;
}> {
  return {
    hasImageTimeline: state.imageTimeline !== null,
    hasLaptopTimeline: state.laptopTimeline !== null,
    isMobile: getIsMobile(),
  };
}
