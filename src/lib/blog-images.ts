/**
 * Blog Cover Image Mapping
 * 
 * Maps blog post coverImage paths to imported ImageMetadata for proper optimization.
 * This ensures images work correctly with Astro's Image component on Vercel.
 */

import type { ImageMetadata } from 'astro';

// Import all blog cover images from assets
import artOfPromptEngineeringCover from '../assets/images/art-of-prompt-engineering-cover.webp';
import bitcoinPhilosophyCover from '../assets/images/bitcoin-philosophy-cover.webp';
import casacapoeiraCover from '../assets/images/casacapoeira-cover.webp';
import promptEngCover from '../assets/images/prompt-eng-cover.webp';
import vibeCodingCover from '../assets/images/vibe-coding.webp';

/**
 * Map of cover image paths to ImageMetadata imports
 */
const coverImageMap: Record<string, ImageMetadata> = {
  '/images/art-of-prompt-engineering-cover.webp': artOfPromptEngineeringCover,
  '/images/bitcoin-philosophy-cover.webp': bitcoinPhilosophyCover,
  '/images/casacapoeira-cover.webp': casacapoeiraCover,
  '/images/prompt-eng-cover.webp': promptEngCover,
  '/images/vibe-coding.webp': vibeCodingCover,
};

/**
 * Get ImageMetadata for a cover image path, or return the original path if not found.
 * This allows fallback to static paths for images not yet migrated.
 */
export function getCoverImage(
  coverImagePath: string | undefined
): ImageMetadata | string | undefined {
  if (!coverImagePath) {
    return undefined;
  }

  // Return ImageMetadata if mapped, otherwise return original path for static serving
  return coverImageMap[coverImagePath] ?? coverImagePath;
}
