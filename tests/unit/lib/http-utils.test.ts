import { describe, it, expect, beforeEach } from 'vitest';
import { isRateLimited } from '@/lib/http-utils';

describe('isRateLimited', () => {
  beforeEach(() => {
    // Clear rate limit map before each test
    // Note: This relies on the internal implementation
    // In a real scenario, you might want to expose a reset function
  });

  it('should return false for first request', () => {
    const result = isRateLimited('test-key-1', 10, 60000);
    expect(result).toBe(false);
  });

  it('should return false when under limit', () => {
    const key = 'test-key-2';
    const limit = 5;
    
    // Make requests up to limit
    for (let i = 0; i < limit; i++) {
      const result = isRateLimited(key, limit, 60000);
      expect(result).toBe(false);
    }
  });

  it('should return true when over limit', () => {
    const key = 'test-key-3';
    const limit = 3;
    
    // Make requests up to limit (should all be false)
    for (let i = 0; i < limit; i++) {
      expect(isRateLimited(key, limit, 60000)).toBe(false);
    }
    
    // Next request should be rate limited
    expect(isRateLimited(key, limit, 60000)).toBe(true);
  });

  it('should reset after window expires', async () => {
    const key = 'test-key-4';
    const limit = 2;
    const windowMs = 100; // Very short window for testing
    
    // Make requests up to limit
    isRateLimited(key, limit, windowMs);
    isRateLimited(key, limit, windowMs);
    
    // Should be rate limited
    expect(isRateLimited(key, limit, windowMs)).toBe(true);
    
    // Wait for window to expire
    await new Promise(resolve => setTimeout(resolve, windowMs + 10));
    
    // Should not be rate limited after window expires
    expect(isRateLimited(key, limit, windowMs)).toBe(false);
  });

  it('should handle different keys independently', () => {
    const key1 = 'test-key-5';
    const key2 = 'test-key-6';
    const limit = 2;
    
    // Exhaust limit for key1
    isRateLimited(key1, limit, 60000);
    isRateLimited(key1, limit, 60000);
    expect(isRateLimited(key1, limit, 60000)).toBe(true);
    
    // key2 should still be available
    expect(isRateLimited(key2, limit, 60000)).toBe(false);
  });

  it('should use default values when not provided', () => {
    const key = 'test-key-7';
    
    // First request should not be limited
    expect(isRateLimited(key)).toBe(false);
    
    // Make 10 more requests (default limit is 10)
    for (let i = 0; i < 10; i++) {
      isRateLimited(key);
    }
    
    // 11th request should be rate limited
    expect(isRateLimited(key)).toBe(true);
  });
});
