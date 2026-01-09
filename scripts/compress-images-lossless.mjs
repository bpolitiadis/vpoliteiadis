#!/usr/bin/env node
/**
 * Lossless PNG Compression Script
 * 
 * Uses oxipng to compress PNG files without quality loss.
 * Best practice: Run this before committing large images to git.
 * 
 * Usage:
 *   node scripts/compress-images-lossless.mjs [directory]
 * 
 * Default: compresses all PNGs in src/assets/images/
 */

import { execSync } from 'child_process';
import { readdir } from 'fs/promises';
import { statSync } from 'fs';
import { join } from 'path';

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
 * Get file size in human-readable format
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
 * Compress a single PNG file using oxipng
 * 
 * oxipng options:
 *   -o 6: Maximum optimization level (0-6, 6 is best but slowest)
 *   --strip safe: Remove metadata but keep color profiles
 *   --alpha: Optimize alpha channel
 */
async function compressPng(filePath) {
  const originalSize = getFileSize(filePath);
  
  try {
    // oxipng with maximum optimization
    // -o 6: maximum compression (slowest but best)
    // --strip safe: remove metadata safely
    // --alpha: optimize alpha channel
    execSync(
      `oxipng -o 6 --strip safe --alpha "${filePath}"`,
      { stdio: 'pipe' }
    );
    
    const newSize = getFileSize(filePath);
    const saved = originalSize - newSize;
    const percent = ((saved / originalSize) * 100).toFixed(1);
    
    return {
      success: true,
      originalSize,
      newSize,
      saved,
      percent
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
  console.log('🚀 Starting lossless compression...\n');
  
  let totalOriginal = 0;
  let totalNew = 0;
  const results = [];
  
  for (const file of pngFiles) {
    process.stdout.write(`  Compressing ${file}... `);
    
    const result = await compressPng(file);
    
    if (result.success) {
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
      results.push({
        file,
        ...result
      });
      
      if (result.saved > 0) {
        console.log(`✅ Saved ${formatBytes(result.saved)} (${result.percent}%)`);
      } else {
        console.log(`ℹ️  Already optimized`);
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
  console.log(`  Original size: ${formatBytes(totalOriginal)}`);
  console.log(`  New size: ${formatBytes(totalNew)}`);
  console.log(`  Total saved: ${formatBytes(totalSaved)} (${totalPercent}%)`);
  console.log('='.repeat(60) + '\n');
  
  // Show top savings
  const topSavings = results
    .filter(r => r.success && r.saved > 0)
    .sort((a, b) => b.saved - a.saved)
    .slice(0, 5);
  
  if (topSavings.length > 0) {
    console.log('🏆 Top 5 savings:');
    topSavings.forEach((r, i) => {
      console.log(`  ${i + 1}. ${r.file}`);
      console.log(`     ${formatBytes(r.originalSize)} → ${formatBytes(r.newSize)} (saved ${formatBytes(r.saved)}, ${r.percent}%)`);
    });
    console.log();
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
