#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceImagesDir = path.join(root, 'src', 'assets', 'images');
const imagesDir = path.join(root, 'public', 'images');
const creativeDir = path.join(root, 'public', 'creative');

// 2025 Best Practices: Modern responsive breakpoints
const sizes = [480, 800, 1200, 1600, 2400, 3840];
const formats = [
  { ext: 'avif', options: { quality: 60, effort: 6 } }, // AVIF with higher effort for better compression
  { ext: 'webp', options: { quality: 80, effort: 6 } }, // WebP with better quality
];

// Modern responsive image configuration
const responsiveConfig = {
  avatar: { sizes: [128, 160, 192, 256], aspectRatio: '1:1' },
  logo: { sizes: [240, 480, 800], aspectRatio: 'auto' },
  hero: { sizes: [480, 800, 1200, 1600], aspectRatio: '16:9' },
  background: { sizes: [480, 800, 1200, 1600, 2400], aspectRatio: 'auto' },
  gallery: { sizes: [480, 800, 1200, 1600], aspectRatio: '4:3' }
};

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  const dir = path.dirname(filePath);
  const base = path.basename(filePath, ext);

  // If processing source images, output to public/images
  let outputDir = dir;
  if (dir === sourceImagesDir) {
    outputDir = imagesDir;
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  }

  const image = sharp(filePath, { failOn: 'none' });
  const metadata = await image.metadata();
  if (!metadata.width) return;

  // Determine image type for responsive sizing
  let imageType = 'background'; // default
  if (base.includes('avatar')) imageType = 'avatar';
  else if (base.includes('logo')) imageType = 'logo';
  else if (base.includes('hero')) imageType = 'hero';
  else if (base.includes('gallery')) imageType = 'gallery';

  const config = responsiveConfig[imageType];
  const targetSizes = config ? config.sizes : sizes;

  for (const width of targetSizes) {
    if (width > metadata.width) continue;
    
    for (const fmt of formats) {
      const out = path.join(outputDir, `${base}-${width}.${fmt.ext}`);
      if (fs.existsSync(out)) continue;
      
      try {
        let processedImage = image.resize({ 
          width, 
          withoutEnlargement: true,
          fit: 'cover'
        });

        // Apply aspect ratio if specified
        if (config?.aspectRatio && config.aspectRatio !== 'auto') {
          const [w, h] = config.aspectRatio.split(':').map(Number);
          processedImage = processedImage.resize({ 
            width, 
            height: Math.round((width * h) / w),
            fit: 'cover'
          });
        }

        await processedImage[fmt.ext](fmt.options).toFile(out);
        console.log(`✓ Generated: ${out}`);
      } catch (error) {
        console.warn(`⚠ Failed to generate ${out}:`, error.message);
      }
    }
  }

  // Generate base format for the image
  const baseWidth = Math.min(metadata.width, 1600);
  for (const fmt of formats) {
    const baseOut = path.join(outputDir, `${base}.${fmt.ext}`);
    if (!fs.existsSync(baseOut)) {
      try {
        await image
          .resize({ width: baseWidth, withoutEnlargement: true })
          [fmt.ext](fmt.options)
          .toFile(baseOut);
        console.log(`✓ Generated base: ${baseOut}`);
      } catch (error) {
        console.warn(`⚠ Failed to generate base ${baseOut}:`, error.message);
      }
    }
  }
}

function* walk(dir) {
  if (!fs.existsSync(dir)) return;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

(async function main() {
  console.log('🚀 Optimizing images with 2025 best practices...');
  console.log(`📁 Source: ${sourceImagesDir}`);
  console.log(`📁 Output: ${imagesDir}`);
  
  let processedCount = 0;
  let errorCount = 0;
  
  for (const target of [sourceImagesDir, imagesDir, creativeDir]) {
    if (!fs.existsSync(target)) continue;
    
    for (const file of walk(target)) {
      try {
        await processImage(file);
        processedCount++;
      } catch (error) {
        console.warn(`⚠ Skip ${file}: ${error.message}`);
        errorCount++;
      }
    }
  }
  
  console.log(`\n✅ Optimization complete!`);
  console.log(`📊 Processed: ${processedCount} files`);
  if (errorCount > 0) console.log(`⚠ Errors: ${errorCount} files`);
  console.log(`💾 Check ${imagesDir} for optimized images`);
})();
