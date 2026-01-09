#!/usr/bin/env node

/**
 * Helper script to move files to the backup directory
 * Usage: node scripts/move-to-backup.mjs <file-path> [category]
 *
 * Examples:
 *   node scripts/move-to-backup.mjs src/assets/images/old-logo.png
 *   node scripts/move-to-backup.mjs unused-video.mp4 other
 */

import { existsSync, mkdirSync } from 'fs';
import { dirname, basename, extname, join } from 'path';
import { execSync } from 'child_process';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
Usage: node scripts/move-to-backup.mjs <file-path> [category]

Arguments:
  file-path: Path to the file to move (required)
  category:  Category subdirectory (optional, defaults based on extension)
             - images: .png, .jpg, .jpeg, .webp, .avif, .svg, .gif
             - other:  all other files

Examples:
  node scripts/move-to-backup.mjs src/assets/images/old-logo.png
  node scripts/move-to-backup.mjs unused-video.mp4 other
  node scripts/move-to-backup.mjs document.pdf other
`);
  process.exit(1);
}

const filePath = args[0];
const explicitCategory = args[1];

if (!existsSync(filePath)) {
  console.error(`❌ File not found: ${filePath}`);
  process.exit(1);
}

// Determine category based on file extension if not explicitly provided
function getCategory(filePath, explicitCategory) {
  if (explicitCategory) return explicitCategory;

  const ext = extname(filePath).toLowerCase();
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.gif', '.bmp', '.tiff'];

  return imageExtensions.includes(ext) ? 'images' : 'other';
}

const category = getCategory(filePath, explicitCategory);
const backupDir = join('backup', 'assets', category);
const fileName = basename(filePath);
const backupPath = join(backupDir, fileName);

// Ensure backup directory exists
mkdirSync(backupDir, { recursive: true });

// Move the file
try {
  execSync(`mv "${filePath}" "${backupPath}"`, { stdio: 'inherit' });
  console.log(`✅ Moved ${fileName} to backup/assets/${category}/`);
  console.log(`   Original: ${filePath}`);
  console.log(`   Backup:   ${backupPath}`);
} catch (error) {
  console.error(`❌ Failed to move file: ${error.message}`);
  process.exit(1);
}