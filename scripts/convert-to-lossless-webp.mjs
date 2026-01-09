#!/usr/bin/env node
/**
 * Convert PNG to Lossless WebP
 * 
 * WebP lossless typically achieves 26% smaller file sizes than PNG
 * while maintaining 100% quality (lossless).
 * 
 * This is the 2025 best practice for large images in git repos.
 * 
 * Usage:
 *   node scripts/convert-to-lossless-webp.mjs [directory]
 * 
 * Default: converts all PNGs in src/assets/images/
 */

import { execSync } from 'child_process';
import { readdir, stat, unlink } from 'fs/promises';
import { statSync } from 'fs';
import { join, extname } from 'path';

const TARGET_DIR = process.argv[2] || 'src/assets/images';

/**
 * Recursively find all PNG files
 */
async function findPngFiles(dir) {
  const files = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        const subFiles = await findPngFiles(fullPath);
        files.push(...subFiles);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Error reading directory ${dir}:`, error.message);
    }
  }
  
  return files;
}

/**
 * Get file size
 */
function getFileSize(filePath) {
  try {
    const stats = statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

/**
 * Format bytes to human-readable size
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Convert PNG to lossless WebP using cwebp
 * 
 * cwebp options:
 *   -lossless: Use lossless compression (100% quality)
 *   -z 9: Maximum compression effort (0-9, 9 is slowest but best)
 *   -m 6: Maximum compression method (0-6)
 */
async function convertToWebP(pngPath) {
  const webpPath = pngPath.replace(/\.png$/i, '.webp');
  const originalSize = getFileSize(pngPath);
  
  try {
    // cwebp with lossless compression
    // -lossless: 100% quality, no data loss
    // -z 9: maximum compression effort
    // -m 6: maximum compression method
    execSync(
      `cwebp -lossless -z 9 -m 6 "${pngPath}" -o "${webpPath}"`,
      { stdio: 'pipe' }
    );
    
    const newSize = getFileSize(webpPath);
    const saved = originalSize - newSize;
    const percent = ((saved / originalSize) * 100).toFixed(1);
    
    return {
      success: true,
      originalSize,
      newSize,
      saved,
      percent,
      webpPath
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      originalSize
    };
  }
}

/**
 * Main execution
 */
async function main() {
  console.log(`\n🔍 Finding PNG files in ${TARGET_DIR}...\n`);
  
  const pngFiles = await findPngFiles(TARGET_DIR);
  
  if (pngFiles.length === 0) {
    console.log('❌ No PNG files found.');
    process.exit(1);
  }
  
  console.log(`📦 Found ${pngFiles.length} PNG file(s)\n`);
  console.log('🚀 Converting to lossless WebP...\n');
  console.log('⚠️  Note: This creates .webp files alongside .png files.');
  console.log('   You can delete the .png files after verifying the .webp files work.\n');
  
  let totalOriginal = 0;
  let totalNew = 0;
  const results = [];
  
  for (const file of pngFiles) {
    process.stdout.write(`  Converting ${file}... `);
    
    const result = await convertToWebP(file);
    
    if (result.success) {
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
      results.push({
        file,
        ...result
      });
      
      if (result.saved > 0) {
        console.log(`✅ Saved ${formatBytes(result.saved)} (${result.percent}%) → ${result.webpPath}`);
      } else {
        console.log(`ℹ️  Same size (WebP: ${result.webpPath})`);
      }
    } else {
      console.log(`❌ Error: ${result.error}`);
      results.push({
        file,
        ...result
      });
    }
  }
  
  // Summary
  const totalSaved = totalOriginal - totalNew;
  const totalPercent = totalOriginal > 0 
    ? ((totalSaved / totalOriginal) * 100).toFixed(1)
    : '0';
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log(`  Files processed: ${pngFiles.length}`);
  console.log(`  Original PNG size: ${formatBytes(totalOriginal)}`);
  console.log(`  New WebP size: ${formatBytes(totalNew)}`);
  console.log(`  Total saved: ${formatBytes(totalSaved)} (${totalPercent}%)`);
  console.log('='.repeat(60) + '\n');
  
  // Show top savings
  const topSavings = results
    .filter(r => r.success && r.saved > 0)
    .sort((a, b) => b.saved - a.saved)
    .slice(0, 10);
  
  if (topSavings.length > 0) {
    console.log('🏆 Top savings:');
    topSavings.forEach((r, i) => {
      console.log(`  ${i + 1}. ${r.file}`);
      console.log(`     ${formatBytes(r.originalSize)} → ${formatBytes(r.newSize)} (saved ${formatBytes(r.saved)}, ${r.percent}%)`);
    });
    console.log();
  }
  
  console.log('✅ Conversion complete!');
  console.log('📝 Next steps:');
  console.log('   1. Test your site to ensure WebP images work correctly');
  console.log('   2. Update your code to use .webp files instead of .png');
  console.log('   3. Delete the original .png files to reduce repo size');
  console.log('   4. Commit the changes\n');
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
