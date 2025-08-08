#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const imagesDir = path.join(root, 'public', 'images');

const targets = [imagesDir];
const sizes = [3840, 2400, 1600, 1200, 800, 480];
const formats = [
  { ext: 'webp', options: { quality: 78 } },
  { ext: 'avif', options: { quality: 55 } },
];

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  const dir = path.dirname(filePath);
  const base = path.basename(filePath, ext);

  const image = sharp(filePath, { failOn: 'none' });
  const metadata = await image.metadata();
  if (!metadata.width) return;

  for (const width of sizes) {
    if (width > metadata.width) continue;
    for (const fmt of formats) {
      const out = path.join(dir, `${base}-${width}.${fmt.ext}`);
      if (fs.existsSync(out)) continue;
      await image
        .resize({ width, withoutEnlargement: true })
        [fmt.ext](fmt.options)
        .toFile(out);
      // Generate base format if named like .../home-bg.(png|jpg)
      const baseOut = path.join(dir, `${base}.${fmt.ext}`);
      if (!fs.existsSync(baseOut) && width === Math.min(...sizes.filter((s) => s >= Math.min(metadata.width, 1600))) ) {
        await image
          .resize({ width: Math.min(metadata.width, 1600), withoutEnlargement: true })
          [fmt.ext](fmt.options)
          .toFile(baseOut);
      }
    }
  }
}

function* walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

(async function main() {
  console.log('Optimizing images...');
  for (const t of targets) {
    if (!fs.existsSync(t)) continue;
    for (const file of walk(t)) {
      try {
        await processImage(file);
      } catch (e) {
        console.warn('Skip', file, e.message);
      }
    }
  }
  console.log('Done.');
})();
