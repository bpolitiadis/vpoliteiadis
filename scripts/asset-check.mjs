#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

// Simple static reference checker: ensures that any "/images/..." path exists under public/images
// and any "/scripts/..." path exists under public/scripts.

const repoRoot = process.cwd();
const exts = ['.astro', '.tsx', '.ts', '.mdx', '.md', '.css', '.js'];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(full));
    else if (exts.includes(path.extname(e.name))) files.push(full);
  }
  return files;
}

const files = walk(repoRoot);
const missing = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const imageMatches = content.match(/(['"])\/(images)\/[^'"\s)]+\1/g) || [];
  const scriptMatches = content.match(/(['"])\/(scripts)\/[^'"\s)]+\1/g) || [];
  for (const m of imageMatches) {
    const rel = m.slice(1, -1);
    const candidate = path.join(repoRoot, 'public', rel);
    if (!fs.existsSync(candidate)) missing.push({ file, ref: rel });
  }
  for (const m of scriptMatches) {
    const rel = m.slice(1, -1);
    const candidate = path.join(repoRoot, 'public', rel);
    if (!fs.existsSync(candidate)) missing.push({ file, ref: rel });
  }
}

if (missing.length) {
  console.error('Missing static asset references found:');
  for (const m of missing) console.error(`- ${m.ref} referenced in ${path.relative(repoRoot, m.file)}`);
  process.exit(1);
}

console.log('Asset check passed.');


