# 🔍 SEO Testing & Verification Guide

**Purpose:** Comprehensive guide for testing and verifying SEO implementation, ensuring content-first, crawler-friendly output.

## 📋 Table of Contents

- [Quick Verification Checklist](#quick-verification-checklist)
- [HTML Content Verification](#html-content-verification)
- [Structured Data Testing](#structured-data-testing)
- [Performance Testing](#performance-testing)
- [Lighthouse CI Integration](#lighthouse-ci-integration)
- [Automated Testing Scripts](#automated-testing-scripts)
- [Continuous Monitoring](#continuous-monitoring)

---

## ✅ Quick Verification Checklist

### Pre-Deployment Checklist

- [ ] All public routes return HTML (no client-only rendering)
- [ ] Every page has unique `<title>` and `<meta name="description">`
- [ ] Canonical URLs are present and correct on all pages
- [ ] Structured data (JSON-LD) validates without errors
- [ ] sitemap.xml includes all public routes
- [ ] rss.xml contains latest blog posts
- [ ] robots.txt allows crawlers and references sitemap
- [ ] All images have descriptive `alt` attributes
- [ ] Breadcrumb navigation with structured data on subpages
- [ ] RSS feed link in HTML `<head>`

### Post-Deployment Checklist

- [ ] Lighthouse SEO score ≥ 95 on all key pages
- [ ] Core Web Vitals pass (LCP < 2.5s, CLS < 0.1, FID < 100ms)
- [ ] Google Rich Results Test validates structured data
- [ ] Schema.org Validator passes for all page types
- [ ] Search Console shows no indexing errors
- [ ] PageSpeed Insights scores ≥ 90 (Performance)

---

## 🌐 HTML Content Verification

### 1. Testing with cURL

Verify that every route returns actual HTML content (not just JavaScript):

```bash
# Test homepage
curl -s https://vpoliteiadis.com/ | grep -o "<h1[^>]*>.*</h1>" | head -1

# Test about page
curl -s https://vpoliteiadis.com/about | grep -o "<h1[^>]*>.*</h1>" | head -1

# Test projects page
curl -s https://vpoliteiadis.com/projects | grep -o "<h1[^>]*>.*</h1>" | head -1

# Test blog page
curl -s https://vpoliteiadis.com/blog | grep -o "<h1[^>]*>.*</h1>" | head -1

# Test contact page
curl -s https://vpoliteiadis.com/contact | grep -o "<h1[^>]*>.*</h1>" | head -1
```

**Expected Results:** Each command should return an `<h1>` tag with meaningful content, not empty or "Loading...".

### 2. Testing with "Disable JavaScript"

1. Open Chrome DevTools (F12)
2. Open Command Palette (Cmd+Shift+P / Ctrl+Shift+P)
3. Type "Disable JavaScript" and press Enter
4. Navigate to each page
5. Verify:
   - Page content is visible
   - H1 heading is present
   - Main content text is readable
   - Images are displayed
   - Internal links are clickable

### 3. HTML Validation Script

Create a test script to validate HTML content:

```bash
#!/bin/bash
# test-html-content.sh

SITE_URL="https://vpoliteiadis.com"
ROUTES=("/" "/about" "/projects" "/blog" "/contact")

echo "=== HTML Content Verification ==="
echo ""

for route in "${ROUTES[@]}"; do
  echo "Testing: $SITE_URL$route"
  
  # Check for H1
  h1=$(curl -s "$SITE_URL$route" | grep -o "<h1[^>]*>.*</h1>" | head -1)
  if [ -n "$h1" ]; then
    echo "  ✓ H1 found: $h1"
  else
    echo "  ✗ H1 missing!"
  fi
  
  # Check for meta description
  meta_desc=$(curl -s "$SITE_URL$route" | grep -o '<meta name="description"[^>]*>' | head -1)
  if [ -n "$meta_desc" ]; then
    echo "  ✓ Meta description found"
  else
    echo "  ✗ Meta description missing!"
  fi
  
  # Check for canonical
  canonical=$(curl -s "$SITE_URL$route" | grep -o '<link rel="canonical"[^>]*>' | head -1)
  if [ -n "$canonical" ]; then
    echo "  ✓ Canonical URL found"
  else
    echo "  ✗ Canonical URL missing!"
  fi
  
  echo ""
done
```

---

## 🏗️ Structured Data Testing

### 1. Google Rich Results Test

**URL:** https://search.google.com/test/rich-results

Test each page type:

1. **Homepage** - Should detect `Person` and `WebSite` schemas
2. **About Page** - Should detect enhanced `Person` schema
3. **Blog Post** - Should detect `BlogPosting` schema with breadcrumbs
4. **Project Page** - Should detect `CreativeWork` schema with breadcrumbs
5. **Blog Index** - Should detect `Blog` schema with multiple posts
6. **Projects Index** - Should detect `CollectionPage` schema

### 2. Schema.org Validator

**URL:** https://validator.schema.org/

Paste the full HTML of each page to validate:

```bash
# Extract and save HTML for validation
curl -s https://vpoliteiadis.com/ > homepage.html
curl -s https://vpoliteiadis.com/about > about.html
curl -s https://vpoliteiadis.com/blog/your-post-slug > blogpost.html
curl -s https://vpoliteiadis.com/projects/your-project-slug > project.html
```

### 3. JSON-LD Validation Script

```javascript
// validate-structured-data.mjs
import { JSDOM } from 'jsdom';

const SITE_URL = 'https://vpoliteiadis.com';
const ROUTES = ['/', '/about', '/blog', '/projects'];

async function validateStructuredData(url) {
  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);
  const scripts = dom.window.document.querySelectorAll(
    'script[type="application/ld+json"]'
  );

  console.log(`\n=== ${url} ===`);
  console.log(`Found ${scripts.length} JSON-LD scripts`);

  scripts.forEach((script, index) => {
    try {
      const data = JSON.parse(script.textContent);
      console.log(`  ✓ Script ${index + 1} valid:`, data['@type']);
    } catch (error) {
      console.error(`  ✗ Script ${index + 1} invalid:`, error.message);
    }
  });
}

for (const route of ROUTES) {
  await validateStructuredData(`${SITE_URL}${route}`);
}
```

---

## ⚡ Performance Testing

### 1. Lighthouse CI

Run Lighthouse CI locally before deployment:

```bash
# Build the site
pnpm run build

# Start a local server
pnpm run preview &
SERVER_PID=$!

# Wait for server to start
sleep 5

# Run Lighthouse CI
npx @lhci/cli@latest autorun

# Kill the server
kill $SERVER_PID
```

### 2. Core Web Vitals Monitoring

Create a monitoring script:

```javascript
// check-vitals.mjs
import { chromium } from 'playwright';

const SITE_URL = 'https://vpoliteiadis.com';
const ROUTES = ['/', '/about', '/projects', '/blog'];

async function checkVitals(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const vitals = await page.evaluate(() => {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcpEntry = entries.find(
          (entry) => entry.entryType === 'largest-contentful-paint'
        );
        resolve({
          lcp: lcpEntry?.renderTime || lcpEntry?.loadTime || 0,
        });
      });
      observer.observe({ type: 'largest-contentful-paint', buffered: true });

      setTimeout(() => resolve({ lcp: null }), 5000);
    });
  });

  console.log(`${url}: LCP = ${vitals.lcp ? vitals.lcp.toFixed(2) + 'ms' : 'N/A'}`);

  await browser.close();
}

for (const route of ROUTES) {
  await checkVitals(`${SITE_URL}${route}`);
}
```

---

## 🤖 Lighthouse CI Integration

### GitHub Actions Workflow

Create `.github/workflows/lighthouse-ci.yml`:

```yaml
name: Lighthouse CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build site
        run: pnpm run build
      
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@latest
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

### Local Lighthouse CI Config

Already created at `lighthouserc.json` with the following assertions:

- **Performance:** ≥ 90
- **Accessibility:** ≥ 95
- **Best Practices:** ≥ 95
- **SEO:** ≥ 95
- **LCP:** ≤ 2500ms
- **FCP:** ≤ 1800ms
- **CLS:** ≤ 0.1

---

## 🧪 Automated Testing Scripts

### Complete SEO Test Suite

Create `scripts/seo-test-suite.mjs`:

```javascript
#!/usr/bin/env node
// seo-test-suite.mjs
import { chromium } from 'playwright';
import { JSDOM } from 'jsdom';

const SITE_URL = process.env.SITE_URL || 'https://vpoliteiadis.com';
const ROUTES = ['/', '/about', '/projects', '/blog', '/contact'];

console.log('🚀 Starting SEO Test Suite...\n');

async function testRoute(route) {
  const url = `${SITE_URL}${route}`;
  console.log(`\n📄 Testing: ${url}`);

  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const results = {
    url,
    passed: 0,
    failed: 0,
    warnings: 0,
  };

  // Test 1: Title Tag
  const title = doc.querySelector('title');
  if (title && title.textContent.trim().length > 0) {
    console.log('  ✓ Title tag present');
    results.passed++;
  } else {
    console.error('  ✗ Title tag missing or empty');
    results.failed++;
  }

  // Test 2: Meta Description
  const metaDesc = doc.querySelector('meta[name="description"]');
  if (metaDesc && metaDesc.content.length > 50 && metaDesc.content.length < 160) {
    console.log('  ✓ Meta description optimal length');
    results.passed++;
  } else if (metaDesc) {
    console.warn('  ⚠ Meta description length suboptimal');
    results.warnings++;
  } else {
    console.error('  ✗ Meta description missing');
    results.failed++;
  }

  // Test 3: Canonical URL
  const canonical = doc.querySelector('link[rel="canonical"]');
  if (canonical) {
    console.log('  ✓ Canonical URL present');
    results.passed++;
  } else {
    console.error('  ✗ Canonical URL missing');
    results.failed++;
  }

  // Test 4: H1 Tag
  const h1 = doc.querySelector('h1');
  if (h1 && h1.textContent.trim().length > 0) {
    console.log('  ✓ H1 tag present');
    results.passed++;
  } else {
    console.error('  ✗ H1 tag missing or empty');
    results.failed++;
  }

  // Test 5: Structured Data
  const jsonLdScripts = doc.querySelectorAll('script[type="application/ld+json"]');
  if (jsonLdScripts.length > 0) {
    console.log(`  ✓ ${jsonLdScripts.length} JSON-LD scripts found`);
    results.passed++;

    // Validate JSON-LD
    jsonLdScripts.forEach((script, index) => {
      try {
        const data = JSON.parse(script.textContent);
        console.log(`    ✓ Script ${index + 1} valid: ${data['@type']}`);
      } catch (error) {
        console.error(`    ✗ Script ${index + 1} invalid JSON`);
        results.failed++;
      }
    });
  } else {
    console.warn('  ⚠ No structured data found');
    results.warnings++;
  }

  // Test 6: Open Graph Tags
  const ogTitle = doc.querySelector('meta[property="og:title"]');
  const ogDesc = doc.querySelector('meta[property="og:description"]');
  const ogImage = doc.querySelector('meta[property="og:image"]');
  
  if (ogTitle && ogDesc && ogImage) {
    console.log('  ✓ Open Graph tags complete');
    results.passed++;
  } else {
    console.warn('  ⚠ Open Graph tags incomplete');
    results.warnings++;
  }

  // Test 7: Image Alt Attributes
  const images = doc.querySelectorAll('img:not([alt])');
  if (images.length === 0) {
    console.log('  ✓ All images have alt attributes');
    results.passed++;
  } else {
    console.error(`  ✗ ${images.length} images missing alt attributes`);
    results.failed++;
  }

  return results;
}

// Run tests
const allResults = [];
for (const route of ROUTES) {
  try {
    const results = await testRoute(route);
    allResults.push(results);
  } catch (error) {
    console.error(`\n❌ Error testing ${route}:`, error.message);
  }
}

// Summary
console.log('\n\n📊 === Test Summary ===');
const totals = allResults.reduce(
  (acc, r) => ({
    passed: acc.passed + r.passed,
    failed: acc.failed + r.failed,
    warnings: acc.warnings + r.warnings,
  }),
  { passed: 0, failed: 0, warnings: 0 }
);

console.log(`✅ Passed: ${totals.passed}`);
console.log(`⚠️  Warnings: ${totals.warnings}`);
console.log(`❌ Failed: ${totals.failed}`);

if (totals.failed > 0) {
  console.log('\n❌ SEO tests FAILED');
  process.exit(1);
} else {
  console.log('\n✅ All SEO tests PASSED');
  process.exit(0);
}
```

### Running the Test Suite

```bash
# Add to package.json scripts
{
  "scripts": {
    "seo:test": "node scripts/seo-test-suite.mjs",
    "seo:test:local": "SITE_URL=http://localhost:4321 node scripts/seo-test-suite.mjs"
  }
}

# Run locally against preview
pnpm run build && pnpm run preview &
sleep 5
pnpm run seo:test:local
```

---

## 📈 Continuous Monitoring

### 1. Google Search Console

**Setup Steps:**

1. Add property at https://search.google.com/search-console
2. Verify ownership via DNS or HTML file
3. Submit sitemap: `https://vpoliteiadis.com/sitemap-index.xml`
4. Monitor:
   - Coverage (indexed pages)
   - Performance (clicks, impressions)
   - Enhancements (structured data)
   - Core Web Vitals

### 2. Monthly SEO Audit

Create a monthly checklist:

```markdown
# Monthly SEO Audit - [Month Year]

## Search Console Health
- [ ] No indexing errors
- [ ] Core Web Vitals passing
- [ ] No mobile usability issues
- [ ] Structured data valid

## Content Quality
- [ ] All pages have unique titles/descriptions
- [ ] Images have descriptive alt text
- [ ] Internal linking is strong
- [ ] No broken links

## Performance
- [ ] PageSpeed score ≥ 90
- [ ] LCP < 2.5s on all pages
- [ ] CLS < 0.1 on all pages

## Technical
- [ ] Sitemap up to date
- [ ] robots.txt allows crawlers
- [ ] RSS feed current
- [ ] Structured data valid
- [ ] HTTPS working properly

## Action Items
- [ ] List any issues found
- [ ] Prioritize fixes
- [ ] Set deadlines
```

### 3. Automated Monitoring Service

Consider integrating:

- **Sentry** (already configured) - Error monitoring
- **Vercel Analytics** (already configured) - Performance tracking
- **Google Analytics 4** - User behavior and SEO metrics
- **PageSpeed Insights API** - Automated performance checks

---

## 🔧 Quick Reference Commands

```bash
# Build and test locally
pnpm run build
pnpm run preview

# Test HTML content
curl -s http://localhost:4321/ | grep "<h1"

# Run Lighthouse
npx lighthouse http://localhost:4321/ --view

# Validate sitemap
curl -s http://localhost:4321/sitemap-index.xml | xmllint --format -

# Check RSS feed
curl -s http://localhost:4321/rss.xml | xmllint --format -

# Test robots.txt
curl -s http://localhost:4321/robots.txt
```

---

## 📚 Resources

- [Google Search Central Documentation](https://developers.google.com/search/docs)
- [Schema.org Vocabulary](https://schema.org/docs/full.html)
- [Web.dev Performance](https://web.dev/performance/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [Core Web Vitals Guide](https://web.dev/vitals/)

---

**Last Updated:** January 2025  
**Maintainer:** Vasileios Politeiadis  
**Review Frequency:** Quarterly

