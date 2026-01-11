/**
 * Text Reveal Animations - IntersectionObserver-powered reveal effects
 *
 * Modern, performant text reveal animations using native browser APIs.
 * Follows 2025 best practices: IntersectionObserver, CSS transitions, reduced motion support.
 *
 * @see docs/ANIMATION_REVIEW.md
 */

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────

export const TEXT_REVEAL_CONFIG = {
  /** Selector for elements that should reveal */
  SELECTOR: '.text-animation',

  /** Class added when element should animate (deprecated - now handled by CSS) */
  ANIMATE_CLASS: 'animate-reveal-up',

  /** Class added when animation is triggered */
  TRIGGERED_CLASS: 'animate',

  /** IntersectionObserver threshold (0.15 = trigger when 15% visible) */
  THRESHOLD: 0.15,

  /** Root margin for IntersectionObserver (trigger slightly before visible) */
  ROOT_MARGIN: '0px 0px -10% 0px',

  /** Stagger delay between elements (ms) */
  STAGGER_DELAY: 100,

  /** Initial delay before first animation (ms) - for hero section */
  INITIAL_DELAY: 50,

  /** Whether to check if element is already visible on mount */
  CHECK_INITIAL_VISIBILITY: true,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface TextRevealState {
  observer: IntersectionObserver | null;
  observedElements: Set<Element>;
  cleanupFn: (() => void) | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// State (module-level for cleanup)
// ─────────────────────────────────────────────────────────────────────────────

const state: TextRevealState = {
  observer: null,
  observedElements: new Set(),
  cleanupFn: null,
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const IS_DEV = import.meta.env?.DEV ?? false;

function log(...args: unknown[]): void {
  if (IS_DEV) {
    console.log('[TextReveal]', ...args);
  }
}

function warn(...args: unknown[]): void {
  if (IS_DEV) {
    console.warn('[TextReveal]', ...args);
  }
}

/**
 * Checks if element is currently visible in viewport
 */
function isElementVisible(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const triggerPoint = viewportHeight * 0.85; // Trigger if top is above 85% of viewport

  return rect.top < triggerPoint && rect.bottom > 0;
}

/**
 * Checks if user prefers reduced motion
 */
function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Triggers reveal animation on an element with optional delay
 */
function triggerReveal(element: Element, delay: number = 0): void {
  if (prefersReducedMotion()) {
    // Skip animation, show immediately
    element.classList.add(TEXT_REVEAL_CONFIG.TRIGGERED_CLASS);
    return;
  }

  if (delay > 0) {
    setTimeout(() => {
      element.classList.add(TEXT_REVEAL_CONFIG.TRIGGERED_CLASS);
    }, delay);
  } else {
    // Use requestAnimationFrame for smooth animation start
    requestAnimationFrame(() => {
      element.classList.add(TEXT_REVEAL_CONFIG.TRIGGERED_CLASS);
    });
  }
}

/**
 * Processes elements that are already visible (above-the-fold)
 */
function processVisibleElements(elements: NodeListOf<Element>): void {
  let staggerIndex = 0;

  elements.forEach((element) => {
    if (isElementVisible(element)) {
      const delay =
        TEXT_REVEAL_CONFIG.INITIAL_DELAY +
        staggerIndex * TEXT_REVEAL_CONFIG.STAGGER_DELAY;
      triggerReveal(element, delay);
      staggerIndex++;
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Initializes text reveal animations
 *
 * @param container - Optional container element to scope the search (default: document)
 * @returns Cleanup function to stop all animations
 */
export function initTextReveal(container: Document | Element = document): () => void {
  // Clean up existing observer
  if (state.observer) {
    state.observer.disconnect();
    state.observer = null;
  }
  state.observedElements.clear();

  // Check for IntersectionObserver support
  if (!('IntersectionObserver' in window)) {
    warn('IntersectionObserver not supported, showing all elements immediately');
    const elements = container.querySelectorAll(TEXT_REVEAL_CONFIG.SELECTOR);
    elements.forEach((el) => {
      el.classList.add(TEXT_REVEAL_CONFIG.ANIMATE_CLASS);
      el.classList.add(TEXT_REVEAL_CONFIG.TRIGGERED_CLASS);
    });
    return () => {};
  }

  // Find all elements that should reveal
  const elements = container.querySelectorAll(TEXT_REVEAL_CONFIG.SELECTOR);

  if (elements.length === 0) {
    log('No elements found with selector:', TEXT_REVEAL_CONFIG.SELECTOR);
    return () => {};
  }

  log('Initializing text reveal for', elements.length, 'elements');

  // Elements already have initial hidden state via .text-animation class
  // Just track them for observation
  elements.forEach((element) => {
    state.observedElements.add(element);
  });

  // Process elements that are already visible (above-the-fold)
  if (TEXT_REVEAL_CONFIG.CHECK_INITIAL_VISIBILITY) {
    processVisibleElements(elements);
  }

  // Create IntersectionObserver for scroll-triggered animations
  let staggerIndex = 0;
  const alreadyTriggered = new Set<Element>();

  state.observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !alreadyTriggered.has(entry.target)) {
          alreadyTriggered.add(entry.target);

          // Calculate stagger delay
          const delay = staggerIndex * TEXT_REVEAL_CONFIG.STAGGER_DELAY;
          staggerIndex++;

          triggerReveal(entry.target, delay);

          // Unobserve after triggering (one-time animation)
          state.observer?.unobserve(entry.target);
        }
      });
    },
    {
      threshold: TEXT_REVEAL_CONFIG.THRESHOLD,
      rootMargin: TEXT_REVEAL_CONFIG.ROOT_MARGIN,
    }
  );

  // Observe all elements
  elements.forEach((element) => {
    // Only observe if not already triggered
    if (!alreadyTriggered.has(element)) {
      state.observer?.observe(element);
    }
  });

  // Create cleanup function
  const cleanup = (): void => {
    log('Cleaning up text reveal animations');

    if (state.observer) {
      state.observer.disconnect();
      state.observer = null;
    }

    state.observedElements.forEach((element) => {
      // Don't remove .text-animation class as it provides initial state
      element.classList.remove(TEXT_REVEAL_CONFIG.TRIGGERED_CLASS);
    });

    state.observedElements.clear();
    state.cleanupFn = null;
  };

  state.cleanupFn = cleanup;

  return cleanup;
}

/**
 * Auto-initializes when DOM is ready (for direct script usage)
 */
export function autoInit(): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initTextReveal(), {
      once: true,
    });
  } else {
    initTextReveal();
  }
}

/**
 * Kills all active text reveal animations (useful for testing)
 */
export function killTextReveal(): void {
  state.cleanupFn?.();
}

/**
 * Returns current animation state (useful for debugging)
 */
export function getTextRevealState(): Readonly<{
  observerActive: boolean;
  observedCount: number;
}> {
  return {
    observerActive: state.observer !== null,
    observedCount: state.observedElements.size,
  };
}
