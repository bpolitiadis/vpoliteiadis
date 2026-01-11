import { describe, it, expect, vi } from 'vitest';
import {
  TEXT_REVEAL_CONFIG,
} from '@/lib/animations/textReveal';

describe('Text Reveal Configuration', () => {
  it('should have correct default configuration', () => {
    expect(TEXT_REVEAL_CONFIG.SELECTOR).toBe('.text-animation');
    expect(TEXT_REVEAL_CONFIG.ANIMATE_CLASS).toBe('animate-reveal-up');
    expect(TEXT_REVEAL_CONFIG.TRIGGERED_CLASS).toBe('animate');
    expect(TEXT_REVEAL_CONFIG.THRESHOLD).toBe(0.15);
    expect(TEXT_REVEAL_CONFIG.STAGGER_DELAY).toBe(100);
    expect(TEXT_REVEAL_CONFIG.INITIAL_DELAY).toBe(50);
    expect(TEXT_REVEAL_CONFIG.CHECK_INITIAL_VISIBILITY).toBe(true);
  });
});

describe('Text Reveal Animations - Integration Test', () => {
  it('should export all required functions', async () => {
    // Dynamic import to avoid issues with mocking
    const { initTextReveal, killTextReveal, getTextRevealState, TEXT_REVEAL_CONFIG } = await import('@/lib/animations/textReveal');

    expect(typeof initTextReveal).toBe('function');
    expect(typeof killTextReveal).toBe('function');
    expect(typeof getTextRevealState).toBe('function');
    expect(TEXT_REVEAL_CONFIG).toBeDefined();
  });
});