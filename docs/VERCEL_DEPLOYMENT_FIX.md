# Vercel Deployment Fix - ERR_MODULE_NOT_FOUND

## Problem

The Vercel deployment was experiencing a persistent `ERR_MODULE_NOT_FOUND` error for `/var/task/dist/server/entry.mjs`, causing all requests to return `500: INTERNAL_SERVER_ERROR` with `FUNCTION_INVOCATION_FAILED`.

### Root Cause

**Configuration Mismatch**: The project was configured with `output: 'static'` but included API routes that require server-side rendering (`prerender = false`). This created a conflict where:
- Astro tried to build a fully static site
- API routes explicitly required server-side rendering
- Vercel couldn't find the server entry point because the build didn't create one

## Solution

Changed from fully static to **server mode with selective prerendering** to support both static pages and server-rendered API routes.

### Changes Made

#### 1. Updated `astro.config.mjs`

```diff
export default defineConfig({
  site: 'https://vpoliteiadis.com',
- output: 'static',
+ output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true },
-   isr: false,
  }),
```

**Why**: `output: 'server'` enables server-side rendering by default, allowing API routes to work while still supporting prerendered pages.

#### 2. Added Prerendering to Static Pages

Added `export const prerender = true;` to all static pages:

- ✅ `/src/pages/index.astro` - Homepage
- ✅ `/src/pages/about.astro` - About page
- ✅ `/src/pages/contact.astro` - Contact page (form UI only)
- ✅ `/src/pages/404.astro` - Error page
- ✅ `/src/pages/letter-glitch-demo.astro` - Demo page
- ✅ `/src/pages/blog/index.astro` - Blog listing
- ✅ `/src/pages/blog/[slug].astro` - Blog posts (with `getStaticPaths()`)
- ✅ `/src/pages/projects/index.astro` - Projects listing
- ✅ `/src/pages/projects/casa-capoeira.astro` - Project detail
- ✅ `/src/pages/projects/upiria.astro` - Project detail
- ✅ `/src/pages/creative/index.astro` - Creative portfolio
- ✅ `/src/pages/creative/emmanuelle-silk.astro` - Creative project
- ✅ `/src/pages/creative/arte-imaginari.astro` - Creative project
- ✅ `/src/pages/creative/smoking-two.astro` - Creative project
- ✅ `/src/pages/structured/blog/[slug].json.ts` - Structured data
- ✅ `/src/pages/structured/project/[slug].json.ts` - Structured data

**Example**:
```typescript
---
// Prerender this page for optimal performance
export const prerender = true;

import MainLayout from '../layouts/MainLayout.astro';
// ... rest of imports
---
```

#### 3. API Routes (Already Configured)

API routes already had `export const prerender = false;` to enable server-side rendering:

- `/src/pages/api/contact.ts` - Contact form submission
- `/src/pages/api/health.ts` - Health check
- `/src/pages/api/test-contact.ts` - Contact form testing

### How It Works

With `output: 'server'`:

1. **Static Pages** (with `prerender = true`):
   - Built at compile time
   - Served as static HTML from `.vercel/output/static/`
   - Maximum performance, cached by CDN
   - No server-side processing needed

2. **API Routes** (with `prerender = false`):
   - Run as serverless functions
   - Handled by `.vercel/output/_functions/entry.mjs`
   - Execute server-side code (email sending, etc.)
   - Can access environment variables at runtime

### Build Output Structure

```
.vercel/output/
├── _functions/
│   └── entry.mjs                    # Serverless function entry point
├── functions/
│   └── _render.func/
│       └── dist/server/
│           └── entry.mjs            # Bundled server entry
└── static/
    ├── index.html                   # Prerendered homepage
    ├── about/index.html             # Prerendered about page
    ├── contact/index.html           # Prerendered contact page
    └── ...                          # All other prerendered pages
```

## Verification

### Build Status
✅ Build completes successfully  
✅ No TypeScript errors  
✅ No prerendering warnings  
✅ Server entry point created at correct location  
✅ All static pages prerendered to HTML  

### Test Deployment

1. **Build locally**:
   ```bash
   pnpm run build
   ```

2. **Preview locally**:
   ```bash
   pnpm run preview
   ```

3. **Deploy to Vercel**:
   ```bash
   git add .
   git commit -m "fix: Resolve Vercel deployment ERR_MODULE_NOT_FOUND error"
   git push origin main
   ```

### Expected Results

- ✅ All pages load successfully (200 OK)
- ✅ Contact form API works (`/api/contact`)
- ✅ Health check works (`/api/health`)
- ✅ Static pages served instantly from CDN
- ✅ API routes execute server-side

## Performance Benefits

- **Static pages**: Served from CDN, instant loading
- **API routes**: Only run when called, no unnecessary server processing
- **Best of both worlds**: Static site speed with dynamic functionality

## References

- [Astro Server-Side Rendering Guide](https://docs.astro.build/en/guides/server-side-rendering/)
- [Astro Vercel Adapter Docs](https://docs.astro.build/en/guides/integrations-guide/vercel/)
- [Vercel Output API](https://vercel.com/docs/build-output-api/v3)

---

**Last Updated**: 2025-01-16  
**Status**: ✅ Resolved

