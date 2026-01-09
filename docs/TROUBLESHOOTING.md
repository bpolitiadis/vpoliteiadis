# 🔧 Troubleshooting

**Who this is for:** Developers encountering build failures, runtime errors, or deployment issues.

**What you'll learn:** Common problems and their solutions for Astro, React, TailwindCSS, and Vercel deployment.

> **TL;DR** - Most issues are environment variables, build cache, or missing dependencies. Clear cache first, then check environment variables.

## 🚨 Emergency Fixes

### Build Completely Broken

**Symptoms:**
- `pnpm build` fails immediately
- Multiple module resolution errors
- Node.js version conflicts

**Immediate Fix:**
```bash
# Clear all caches and reinstall
rm -rf node_modules/.cache dist .astro
pnpm install
pnpm build
```

### Production Not Working

**Symptoms:**
- Local works, Vercel fails
- Environment variables missing
- Build succeeds but runtime errors

**Immediate Fix:**
```bash
# Check environment variables
vercel env ls

# Redeploy with fresh build
vercel --prod --force
```

## 🏗️ Build Issues

### "Missing static asset references" (Vercel)

**Symptoms:**
- Vercel build fails with asset reference errors
- Local build succeeds
- Asset check runs before build completion

**Root Cause:**
Asset validation runs during build instead of after.

**Solution:**
```bash
# Option 1: Update package.json build script
"build": "astro check && astro build && node scripts/asset-check.mjs"

# Option 2: Disable asset check in CI
# Set SKIP_ASSET_CHECK=true in Vercel environment variables
```

**Prevention:**
Ensure asset check runs after `astro build` completes.

### Sharp/Image Processing Errors

**Symptoms:**
- `Error: Could not load the "sharp" module`
- Image optimization fails
- macOS installation issues

**Solutions:**
```bash
# macOS with Homebrew
brew install vips
rm -rf node_modules && pnpm install

# Linux
sudo apt-get install libvips-dev
rm -rf node_modules && pnpm install

# Alternative: Use system Sharp
npm config set sharp_binary_host "https://registry.npmjs.org/"
npm config set sharp_libvips_binary_host "https://registry.npmjs.org/"
```

### Node.js Version Mismatches

**Symptoms:**
- "engines": { "node": ">=20.0.0" } warnings
- Vercel uses different Node.js version

**Solution:**
```json
// vercel.json - Force Node.js version
{
  "functions": {
    "src/pages/api/**/*.ts": {
      "runtime": "nodejs20.x"
    }
  }
}
```

**Check Version:**
```bash
node -v  # Should be >= 20.10.0
pnpm -v  # Should be >= 9.0.0
```

### TypeScript Compilation Errors

**Symptoms:**
- Type errors during build
- Zod schema validation fails
- Content collection type mismatches

**Debug Steps:**
```bash
# Check TypeScript compilation
pnpm astro check

# Validate content schemas
pnpm build

# Check specific file types
npx tsc --noEmit --skipLibCheck
```

### CSS/Tailwind Build Issues

**Symptoms:**
- Tailwind classes not applied
- Custom CSS variables missing
- Build fails with CSS errors

**Solutions:**
```bash
# Clear CSS cache
rm -rf node_modules/.cache

# Rebuild CSS
pnpm build

# Check Tailwind config
npx tailwindcss --help
```

## 🌐 Development Issues

### Environment Variables Not Loading

**Symptoms:**
- Sentry not capturing errors
- Email service not working
- Logging level incorrect

**Debug Steps:**
```bash
# Check if variables are loaded
console.log(import.meta.env.VITE_SENTRY_DSN)  # Should show value

# Restart dev server
pnpm dev

# Check .env.local file
cat .env.local
```

**Common Issues:**
- Variables need `PUBLIC_` prefix for client-side access
- Server restart required after adding variables
- Typos in variable names

### Hot Reload Not Working

**Symptoms:**
- Changes not reflected in browser
- Dev server running but stale content

**Solutions:**
```bash
# Clear all caches
rm -rf .astro node_modules/.cache

# Restart dev server
pnpm dev

# Check file watching
ls -la src/  # Ensure files are not ignored
```

### Port Already in Use

**Symptoms:**
- `Error: Port 4321 already in use`

**Solutions:**
```bash
# Use different port
pnpm dev --port 4322

# Kill process on port
lsof -ti:4321 | xargs kill -9

# Find what's using the port
lsof -i :4321
```

### Content Collection Errors

**Symptoms:**
- Blog posts not loading
- Build fails with content errors
- MDX parsing issues

**Debug Steps:**
```bash
# Validate content
pnpm astro check

# Check content files
ls -la src/content/blog/

# Test content loading
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
console.log(posts.length);
```

## 🚀 Deployment Issues

### Vercel Build Failures

**Symptoms:**
- Local build succeeds, Vercel fails
- Different Node.js versions
- Missing build dependencies

**Debug Steps:**
```bash
# Check Vercel logs
vercel logs

# Compare local vs Vercel build
pnpm build  # Local
# Check Vercel dashboard for build logs

# Verify Node.js version in Vercel
# Project Settings → Functions → Node.js Version
```

### Environment Variables Missing in Production

**Symptoms:**
- Works locally, fails in production
- API calls return 500 errors

**Solutions:**
```bash
# Check Vercel environment variables
vercel env ls

# Add missing variables
vercel env add SENTRY_DSN production
vercel env add RESEND_API_KEY production

# Redeploy
vercel --prod
```

### Static Asset Issues

**Symptoms:**
- Images not loading in production
- 404 errors for static files
- Font loading issues

**Debug Steps:**
```bash
# Check file paths
ls -la public/images/

# Verify absolute paths in code
# Should be /images/... not ./images/...

# Test asset URLs
curl -I https://yourdomain.com/images/avatar.webp
```

## ⚛️ React/Component Issues

### Hydration Mismatches

**Symptoms:**
- "Hydration mismatch" errors
- Different content server vs client

**Common Causes:**
- Using `Date.now()` or `Math.random()` in components
- Browser-specific APIs without checks
- Dynamic content that differs between server/client

**Solutions:**
```tsx
// Avoid hydration mismatches
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null; // Or loading state

// Safe to use browser APIs now
const now = Date.now();
```

### Client Directive Issues

**Symptoms:**
- Components not interactive
- JavaScript not loading

**Check Client Directives:**
```astro
<!-- Correct usage -->
<Component client:load />        <!-- Immediate hydration -->
<Component client:idle />        <!-- When page becomes idle -->
<Component client:visible />      <!-- When component enters viewport -->
<Component client:media="(max-width: 768px)" />  <!-- Media query -->
```

### shadcn/ui Color Conflicts

**Symptoms:**
- Wrong colors after shadcn/ui installation
- Brand colors overridden
- Inconsistent styling

**Root Cause:**
shadcn/ui overwrites CSS variables in `global.css`.

**Solution:**
```css
/* src/styles/global.css - Preserve brand colors */
:root {
  --primary: 57 100% 53%; /* Neon Lime #39FF14 */
  --secondary: 160 100% 36%; /* Digital Emerald #00B86B */
  --ring: 57 100% 53%;
}

.dark {
  --primary: 57 100% 53%;
  --secondary: 160 100% 36%;
  --ring: 57 100% 53%;
}
```

**Prevention:**
Backup `global.css` before installing shadcn/ui components.

## 📧 Email/Contact Form Issues

### Contact Form Not Working

**Symptoms:**
- Form submissions fail
- No emails received
- API returns 500 error

**Debug Steps:**
```bash
# Check environment variables
echo $RESEND_API_KEY  # Should not be empty
echo $FROM_EMAIL      # Should be verified in Resend

# Test API endpoint
curl -X POST http://localhost:4321/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test"}'

# Check logs
tail -f logs/app.log
```

### Resend API Errors

**Common Issues:**
- API key invalid or expired
- Sender email not verified
- Rate limits exceeded
- Invalid email format

**Solutions:**
```bash
# Verify API key
curl -H "Authorization: Bearer $RESEND_API_KEY" \
  https://api.resend.com/domains

# Check sender verification
# Login to Resend dashboard → Verified Domains
```

### Form Validation Issues

**Symptoms:**
- Form accepts invalid data
- Validation not working
- TypeScript errors

**Check Implementation:**
```typescript
// Verify Zod schema
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10)
});

// Test validation
const result = contactSchema.safeParse(formData);
if (!result.success) {
  console.log(result.error.issues);
}
```

## 📊 Performance Issues

### Bundle Size Too Large

**Symptoms:**
- JavaScript bundle >90KB
- Slow initial page load
- Poor Lighthouse scores

**Optimization Steps:**
```bash
# Analyze bundle
pnpm build
npx vite-bundle-analyzer dist/

# Check what components are hydrated
grep -r "client:" src/components/

# Lazy load heavy components
<Component client:visible />  <!-- Instead of client:load -->
```

### Images Not Optimizing

**Symptoms:**
- Large image file sizes
- No WebP/AVIF variants
- Slow image loading

**Debug Steps:**
```bash
# Check image processing
ls -la public/images/  # Should have .webp variants

# Verify Astro Image usage
<Image src="/images/hero.webp" alt="Hero" width={800} height={600} />

# Test image URLs
curl -I https://yourdomain.com/images/hero.webp
```

### Core Web Vitals Failing

**Symptoms:**
- LCP > 2.5s
- CLS > 0.1
- FID > 100ms

**Common Fixes:**
```html
<!-- Preload critical images -->
<link rel="preload" href="/images/hero.webp" as="image">

<!-- Proper image dimensions -->
<img src="/images/hero.webp" width="800" height="600" alt="Hero">

<!-- Avoid layout shift -->
<div style="aspect-ratio: 800/600">
  <img src="/images/hero.webp" alt="Hero" />
</div>
```

## Performance Incidents

### CLS Score 0.309 - Hero Section Layout Shift (2025-01-XX)

**Incident:** PageSpeed Insights reported CLS score of 0.309 (poor), primarily caused by hero section image container and font loading.

**Root Cause:**
1. **Hero Image Container**: React component (`HeroSection.tsx`) with `client:load` caused hydration delays and layout shifts. Image container used responsive classes without explicit `aspect-ratio`, causing reflows when images loaded.
2. **Font Loading**: Google Fonts loaded with `font-display: swap` causing FOUT (Flash of Unstyled Text) and layout shifts when fonts swapped in.
3. **React Hydration**: Hero section was unnecessarily a React island, delaying LCP and causing CLS during hydration.

**Fix Applied:**
1. **Converted HeroSection to Static Astro Component** (`src/components/hero/HeroSection.astro`):
   - Removed React dependency and `client:load` directive
   - Added explicit `aspect-ratio` CSS to image containers using calculated ratios
   - Preloaded critical LCP image with `<link rel="preload">`
   - Moved GSAP animations to inline `<script>` tag (no hydration delay)

2. **Optimized Font Loading** (`src/layouts/MainLayout.astro`):
   - Changed `font-display: swap` to `font-display: optional` to prevent FOUT
   - Added async font loading with `media="print"` trick for non-blocking load
   - Added fallback `<noscript>` tag for users without JavaScript

3. **Reduced React Islands** (`src/pages/index.astro`):
   - Changed `LetterGlitch` from `client:load` to `client:visible` (lazy load when visible)
   - Removed unnecessary React hydration from hero section

4. **Image Optimization**:
   - Added explicit `width` and `height` attributes to all images
   - Used inline `style="aspect-ratio: X/Y"` on containers
   - Ensured LCP image has `fetchpriority="high"` and `loading="eager"`

**Files Changed:**
- `src/components/hero/HeroSection.astro` (new static component)
- `src/components/hero/HeroIntro.astro` (updated to use static component)
- `src/pages/index.astro` (changed LetterGlitch to `client:visible`)
- `src/layouts/MainLayout.astro` (optimized font loading)

**Prevention:**
1. **Always use explicit dimensions**: Every image must have `width`, `height`, and container `aspect-ratio`
2. **Prefer static Astro components**: Only use React islands when interactivity is required
3. **Use `font-display: optional`**: Prevents layout shifts from font loading
4. **Lazy load non-critical components**: Use `client:visible` instead of `client:load` for below-the-fold content
5. **Preload LCP images**: Add `<link rel="preload" as="image">` for above-the-fold images
6. **Test CLS regularly**: Run PageSpeed Insights after major changes to catch layout shifts early

## 🔍 SEO & Content Issues

### Structured Data Errors

**Symptoms:**
- Google Search Console warnings
- Rich results not displaying

**Validation:**
```bash
# Test with Google's tool
curl -X POST "https://search.google.com/test/rich-results" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://yourdomain.com"}'

# Check JSON-LD output
curl -s https://yourdomain.com/structured/website.json | jq
```

### Meta Tags Missing

**Symptoms:**
- Wrong page titles
- Missing descriptions
- Incorrect Open Graph data

**Debug Steps:**
```bash
# Check meta tags
curl -s https://yourdomain.com/ | grep '<meta'

# Verify page props
curl -s https://yourdomain.com/ | grep '<title>'
```

## 🔒 Security Issues

### CSP Violations

**Symptoms:**
- Console errors about Content Security Policy
- Inline scripts blocked

**Debug Steps:**
```bash
# Check CSP headers
curl -I https://yourdomain.com/

# Verify CSP configuration in vercel.json
cat vercel.json | jq '.headers'
```

### CORS Errors

**Symptoms:**
- API calls failing with CORS errors
- Font loading blocked

**Solutions:**
```json
// vercel.json - Update CSP
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; font-src 'self' https://fonts.gstatic.com; ..."
        }
      ]
    }
  ]
}
```

## 📱 Responsive & Accessibility Issues

### Mobile Layout Broken

**Symptoms:**
- Content overflowing on mobile
- Touch targets too small
- Navigation not working

**Debug Steps:**
```bash
# Test responsive breakpoints
# Chrome DevTools → Device Toolbar

# Check CSS media queries
grep -r "@media" src/styles/

# Verify touch targets
# Minimum 44px height/width for touch
```

### Accessibility Violations

**Symptoms:**
- axe-core test failures
- Screen reader issues
- Keyboard navigation problems

**Common Fixes:**
```html
<!-- Proper focus management -->
<button aria-expanded="false" aria-controls="menu">
  Menu
</button>

<!-- Semantic HTML -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<!-- Alt text for images -->
<img src="/images/avatar.webp" alt="Vasileios Politeiadis profile photo" />
```

## 🔄 Quick Reference

### Most Common Issues

1. **Build fails**: Clear cache (`rm -rf .astro node_modules/.cache dist`)
2. **Environment variables**: Check `vercel env ls` and restart dev server
3. **Images not loading**: Use absolute paths (`/images/...`)
4. **Colors wrong**: Check CSS variables in `global.css`
5. **Performance issues**: Analyze bundle with `vite-bundle-analyzer`

### Emergency Commands

```bash
# Nuclear option - clear everything
rm -rf node_modules/.cache dist .astro .vercel
pnpm install
pnpm dev

# Check all systems
pnpm lint && pnpm build && pnpm preview

# Deploy with force rebuild
vercel --prod --force
```

---

**Still stuck?** Check the [logs](#logs) and search for error patterns. Most issues are environmental or cache-related.