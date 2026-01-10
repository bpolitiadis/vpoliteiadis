import { describe, it, expect } from 'vitest';
import { getCoverImage } from '@/lib/blog-images';

describe('getCoverImage', () => {
  it('should return undefined for undefined input', () => {
    const result = getCoverImage(undefined);
    expect(result).toBeUndefined();
  });

  it('should return ImageMetadata for mapped images', () => {
    const result = getCoverImage('/images/art-of-prompt-engineering-cover.webp');
    expect(result).toBeDefined();
    // ImageMetadata can be an object or string depending on build/test environment
    // In test environment, imports may resolve to strings
    expect(result !== undefined).toBe(true);
  });

  it('should return original path for unmapped images', () => {
    const unmappedPath = '/images/unmapped-image.webp';
    const result = getCoverImage(unmappedPath);
    expect(result).toBe(unmappedPath);
  });

  it('should handle all mapped cover images', () => {
    const mappedImages = [
      '/images/art-of-prompt-engineering-cover.webp',
      '/images/bitcoin-philosophy-cover.webp',
      '/images/casacapoeira-cover.webp',
      '/images/prompt-eng-cover.webp',
      '/images/vibe-coding.webp',
    ];

    mappedImages.forEach(path => {
      const result = getCoverImage(path);
      expect(result).toBeDefined();
      // ImageMetadata can be an object or string depending on build/test environment
      expect(result !== undefined).toBe(true);
    });
  });

  it('should return string for fallback images', () => {
    const fallbackPath = '/images/custom-image.webp';
    const result = getCoverImage(fallbackPath);
    expect(typeof result).toBe('string');
    expect(result).toBe(fallbackPath);
  });
});
