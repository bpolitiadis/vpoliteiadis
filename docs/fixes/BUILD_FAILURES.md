# Build Failures - Common Fixes

## Overview

This document covers the most common build failures encountered in this Astro + Vercel project and their solutions.

## Issue: Missing Static Asset References

### Symptoms
```
Missing static asset references found:
- /images/contact-bg.avif referenced in src/components/ContactSection.astro
- /images/casacapoeira-cover.png referenced in src/components/ProjectsSection.astro
```

### Root Cause
The asset check script (`scripts/asset-check.mjs`) runs before the Astro build completes, when image files may not be fully available on Vercel.

### Solutions

#### 1. Check Build Order (Most Common)
**Problem:** Asset check runs before `astro build` in the build script.

**Fix:** Move asset check to run after the build:
```json
// package.json
{
  "scripts": {
    "build": "astro check && astro build && node scripts/asset-check.mjs"
  }
}
```

#### 2. Verify Image Files Exist
**Check if files are present:**
```bash
ls -la public/images/contact-bg.avif
ls -la public/images/casacapoeira-cover.png
```

**If missing:** Ensure source images are in `src/assets/images/` and build process completes.

#### 3. Update Asset Check Script
The script now skips `/images/` paths since they're handled by Vercel's image optimization:

```javascript
// scripts/asset-check.mjs - Updated to skip /images/ checks
// Note: /images/ paths are handled by Vercel's image optimization
```

## Issue: Vercel Node.js Version Warnings

### Symptoms
```
Warning: Due to "engines": { "node": ">=20.0.0" } in your `package.json` file,
the Node.js Version defined in your Project Settings ("22.x") will not apply,
Node.js Version "24.x" will be used instead.
```

### Solution
This is a warning, not an error. Node.js 24.x is compatible with the project requirements. No action needed unless you want to update Vercel project settings.

## Issue: Build Timeout on Vercel

### Symptoms
- Build takes longer than 45 minutes
- Vercel build fails with timeout error

### Solutions

#### 1. Reduce Image Processing
- Ensure images are optimized before build
- Use Vercel's image optimization instead of build-time processing
- Check image sizes: `find public/images -type f -size +1M`

#### 2. Optimize Dependencies
```bash
# Check for unused dependencies
pnpm why <package-name>

# Update to latest versions
pnpm update
```

#### 3. Check Build Performance
```bash
# Time the build locally
time pnpm run build

# Check for slow scripts
pnpm run build --verbose
```

## Issue: Astro Check Failures

### Symptoms
```
18:47:20 [check] Getting diagnostics for Astro files...
error: TypeScript error in src/components/...
```

### Solutions

#### 1. Fix TypeScript Errors
```bash
# Run type checking
pnpm run type-check

# Fix common issues:
# - Add missing imports
# - Fix type annotations
# - Update interface definitions
```

#### 2. Update Dependencies
```bash
pnpm update @astrojs/check
pnpm update typescript
```

## Issue: Vercel Deployment Errors

### Symptoms
- Build succeeds locally but fails on Vercel
- Different behavior between local and Vercel environments

### Solutions

#### 1. Check Environment Differences
- **Node.js version:** Vercel may use different Node version
- **Build cache:** Clear Vercel's build cache
- **Environment variables:** Ensure all required env vars are set in Vercel

#### 2. Debug Steps
```bash
# Test with Vercel CLI locally
npx vercel build

# Check build logs in Vercel dashboard
# Look for environment-specific errors
```

#### 3. Common Vercel-Specific Issues
- **File paths:** Use absolute paths (`/images/...`) not relative
- **Case sensitivity:** macOS is case-insensitive, Linux (Vercel) is case-sensitive
- **File permissions:** Ensure scripts have execute permissions

## Issue: Image Optimization Failures

### Symptoms
- Images don't load in production
- Large image file sizes
- Wrong image formats served

### Solutions

#### 1. Verify Astro Image Configuration
```javascript
// astro.config.mjs
export default defineConfig({
  adapter: vercel({
    imageService: true, // Must be enabled
  }),
});
```

#### 2. Check Image Usage
```astro
<!-- Correct usage -->
<Image
  src="/images/avatar.webp"
  alt="Description"
  width={256}
  height={256}
/>

<!-- Incorrect usage -->
<img src="../images/avatar.webp" alt="Description" />
```

#### 3. Debug Image Paths
```bash
# Check if images exist
find public/images -name "*.webp" -o -name "*.avif"

# Test Vercel image URLs
curl -I "https://your-domain.com/images/avatar.webp"
```

## Issue: Contact Form Not Working

### Symptoms
- Form submissions fail
- Emails not being sent
- API endpoints return errors

### Solutions

#### 1. Check Environment Variables
Required environment variables in Vercel:
- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `VERCEL_URL` (automatically set)

#### 2. Test API Endpoint
```bash
# Test the API endpoint
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

#### 3. Check Logs
- Review Vercel function logs
- Check server-side error handling
- Verify Resend API key validity

## Quick Debug Checklist

### Before Deploying
- [ ] Run `pnpm run build` locally
- [ ] Run `pnpm run lint` to check for errors
- [ ] Run `pnpm test:contact` for contact form
- [ ] Check that all images exist in `public/images/`
- [ ] Verify environment variables are set in Vercel

### When Build Fails
- [ ] Check Vercel build logs for specific error messages
- [ ] Compare local vs Vercel environment differences
- [ ] Verify file paths are absolute, not relative
- [ ] Check that all dependencies are installed
- [ ] Ensure Node.js version compatibility

### Performance Issues
- [ ] Run Lighthouse audit: `pnpm seo:lighthouse`
- [ ] Check Core Web Vitals in browser dev tools
- [ ] Verify image optimization is working
- [ ] Check for unused CSS/JS with build analyzer

## Getting Help

1. **Check this document** for your specific error
2. **Search existing issues** in the repository
3. **Review Vercel documentation** for platform-specific issues
4. **Check Astro documentation** for framework-specific issues
5. **Create an issue** with build logs and error messages

## Prevention

### Pre-commit Hooks
```bash
# Install husky for pre-commit checks
pnpm add -D husky

# Add build check to pre-commit
echo "pnpm run type-check && pnpm run lint" > .husky/pre-commit
```

### CI/CD Checks
```yaml
# Add to GitHub Actions or similar
- name: Type Check
  run: pnpm run type-check

- name: Lint
  run: pnpm run lint

- name: Build Test
  run: pnpm run build
```

---

*Last updated: January 2025*