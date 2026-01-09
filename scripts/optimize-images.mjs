#!/usr/bin/env node
/**
 * Image Optimization Script
 * Converts PNG/JPG images to optimized WebP and AVIF formats with responsive variants
 */

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// Responsive image widths based on image-presets.ts
const RESPONSIVE_WIDTHS = {
  hero: [480, 800, 1200, 1600, 2400],
  card: [320, 480, 768, 1024],
  thumb: [160, 320],
  default: [480, 800, 1200],
};

// Images that need optimization (PNG files in public/images without webp/avif versions)
const IMAGES_TO_OPTIMIZE = [
  {
    source: 'public/images/casacapoeira-cover.png',
    preset: 'card',
    name: 'casacapoeira-cover',
  },
  {
    source: 'public/images/vasileios-illustration.png',
    preset: 'hero',
    name: 'vasileios-illustration',
  },
  {
    source: 'public/images/laptop-illustration.png',
    preset: 'hero',
    name: 'laptop-illustration',
  },
  {
    source: 'public/images/vibe-coding.png',
    preset: 'card',
    name: 'vibe-coding',
  },
];

// Images that need additional width variants (already optimized but missing some widths)
const IMAGES_TO_COMPLETE = [
  {
    source: 'src/assets/images/upiria-cover.png', // Use PNG source from assets
    preset: 'card',
    name: 'upiria-cover',
    widths: [320, 768, 1024], // Generate missing card preset widths only
    skipBase: true, // Skip base file creation since it already exists
  },
];

/**
 * Optimize a single image to WebP and AVIF formats
 */
async function optimizeImage({ source, preset, name, widths: customWidths, skipBase = false }) {
  const sourcePath = path.join(repoRoot, source);
  
  if (!fs.existsSync(sourcePath)) {
    console.warn(`⚠️  Source image not found: ${source}`);
    return;
  }

  const widths = customWidths || RESPONSIVE_WIDTHS[preset] || RESPONSIVE_WIDTHS.default;
  // For images from src/assets, output to public/images
  const outputDir = source.startsWith('src/') 
    ? path.join(repoRoot, 'public/images')
    : path.dirname(sourcePath);
  const baseName = name || path.basename(source, path.extname(source));

  console.log(`\n🖼️  Optimizing: ${baseName}`);
  console.log(`   Source: ${source}`);
  console.log(`   Preset: ${preset}`);
  console.log(`   Widths: ${widths.join(', ')}px`);

  try {
    const image = sharp(sourcePath);
    const metadata = await image.metadata();
    
    // Generate responsive variants
    for (const width of widths) {
      // Skip if width is larger than original
      if (metadata.width && width > metadata.width) {
        continue;
      }

      // WebP format
      const webpPath = path.join(outputDir, `${baseName}-${width}w.webp`);
      await image
        .clone()
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .webp({ quality: 85, effort: 6 })
        .toFile(webpPath);
      console.log(`   ✅ Created: ${path.basename(webpPath)}`);

      // AVIF format
      const avifPath = path.join(outputDir, `${baseName}-${width}w.avif`);
      await image
        .clone()
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .avif({ quality: 80, effort: 4 })
        .toFile(avifPath);
      console.log(`   ✅ Created: ${path.basename(avifPath)}`);
    }

    // Also create base versions (without width suffix) at original size (unless skipped)
    if (!skipBase) {
      const baseWebpPath = path.join(outputDir, `${baseName}.webp`);
      // Only create if it doesn't exist
      if (!fs.existsSync(baseWebpPath)) {
        await image
          .clone()
          .webp({ quality: 85, effort: 6 })
          .toFile(baseWebpPath);
        console.log(`   ✅ Created: ${path.basename(baseWebpPath)}`);
      }

      const baseAvifPath = path.join(outputDir, `${baseName}.avif`);
      if (!fs.existsSync(baseAvifPath)) {
        await image
          .clone()
          .avif({ quality: 80, effort: 4 })
          .toFile(baseAvifPath);
        console.log(`   ✅ Created: ${path.basename(baseAvifPath)}`);
      }

      // Get file sizes for comparison
      const originalSize = fs.statSync(sourcePath).size;
      const webpSize = fs.existsSync(baseWebpPath) ? fs.statSync(baseWebpPath).size : 0;
      const avifSize = fs.existsSync(baseAvifPath) ? fs.statSync(baseAvifPath).size : 0;
      if (webpSize > 0 && avifSize > 0) {
        const savings = ((1 - Math.min(webpSize, avifSize) / originalSize) * 100).toFixed(1);
        console.log(`   📊 Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
        console.log(`   📊 WebP: ${(webpSize / 1024 / 1024).toFixed(2)}MB`);
        console.log(`   📊 AVIF: ${(avifSize / 1024 / 1024).toFixed(2)}MB`);
        console.log(`   💾 Savings: ~${savings}%`);
      }
    } else {
      console.log(`   ⏭️  Skipped base file creation (already exists)`);
    }

  } catch (error) {
    console.error(`   ❌ Error optimizing ${baseName}:`, error.message);
  }
}

/**
 * Main optimization function
 */
async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log(`📁 Working directory: ${repoRoot}\n`);

  for (const imageConfig of IMAGES_TO_OPTIMIZE) {
    await optimizeImage(imageConfig);
  }

  // Generate missing width variants for already-optimized images
  for (const imageConfig of IMAGES_TO_COMPLETE) {
    await optimizeImage(imageConfig);
  }

  console.log('\n✅ Image optimization completed!');
  console.log('\n📝 Next steps:');
  console.log('   1. Update code references to use .webp or .avif versions');
  console.log('   2. Consider using <picture> elements with srcset for optimal loading');
  console.log('   3. Test image loading in different browsers');
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

export { optimizeImage, RESPONSIVE_WIDTHS };
