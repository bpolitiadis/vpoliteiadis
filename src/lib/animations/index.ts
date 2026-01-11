/**
 * Animation utilities index
 *
 * Centralized exports for all animation-related functionality.
 * Each animation module follows a consistent pattern:
 * - Configuration object for easy customization
 * - Init function that returns cleanup
 * - Respects prefers-reduced-motion
 */

export {
  initHeroAnimations,
  autoInit as autoInitHeroAnimations,
  killHeroAnimations,
  getAnimationState as getHeroAnimationState,
  HERO_ANIMATION_CONFIG,
} from './heroAnimations';

export {
  initTextReveal,
  autoInit as autoInitTextReveal,
  killTextReveal,
  getTextRevealState,
  TEXT_REVEAL_CONFIG,
} from './textReveal';
