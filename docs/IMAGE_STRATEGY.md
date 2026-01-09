# Image Strategy - The "Law"

**Last Updated**: 2025-01-XX  
**Status**: ✅ Active Standard

## 🎯 Golden Path Strategy

### Primary: `src/assets/images/` + `astro:assets`

**USE THIS** for all local portfolio images:
- Hero images
- Project covers
- Profile/avatar images
- Background images
- Illustrations
- Any image that can be imported at build time

**Why?**
- Astro 5 automatically optimizes (AVIF/WebP)
- Type-safe imports (`ImageMetadata`)
- Build-time optimization (no runtime overhead)
- Automatic responsive srcset generation
- Vercel Edge compatible

### Secondary: `public/images/` (Limited Use)

**ONLY USE** for:
- **Article/blog cover images** - Required for social sharing (OG tags need static URLs)
- **Logo variants** - For social sharing meta tags (e.g., `/images/vp-logo-800w.webp`)
- **Favicons and app icons** - Browser icons (already in `public/` root)
- **Assets that cannot be processed at build time**
- **Third-party images referenced by URL**

**Why Article Covers Must Stay in `public/images/`?**
- Social media platforms (Twitter, Facebook, LinkedIn) require **static, predictable URLs** for Open Graph images
- These URLs are referenced in content frontmatter (`coverImage: "/images/article-cover.webp"`)
- External crawlers need direct access to these images without build-time processing
- **Source PNGs** should still exist in `src/assets/images/` for editing, but the optimized WebP for social sharing stays in `public/images/`

**Why?**
- No build-time optimization (images are served as-is)
- No type safety (string paths instead of ImageMetadata)
- Manual responsive variant management required
- Use sparingly - only when static permalinks are absolutely required

## 📁 Directory Structure

```
src/assets/images/          ← PRIMARY: All portfolio images here
  ├── heroes/
  ├── projects/
  ├── avatars/
  └── backgrounds/

public/images/              ← SECONDARY: Only static permalinks
  ├── vp-logo-800w.webp     ← Logo for social sharing (OG tags)
  ├── article-cover.webp    ← Blog/project covers (OG tags need static URLs)
  ├── creative-cover.webp   ← Creative work covers (OG tags)
  └── [favicons in public/ root, not here]
```

## 🔧 Component Usage

### Standard Component: `AImage.astro`

**Always use `AImage` for images in Astro components.**

#### Imported Images (Preferred)

```astro
---
import AImage from '../components/media/AImage.astro';
import heroImage from '../../assets/images/heroes/vasileios-illustration.png';
---

<AImage
  src={heroImage}
  alt="Vasileios Politeiadis illustration"
  preset="hero"
  width={1177}
  height={1374}
  loading="eager"
  fetchpriority="high"
/>
```

#### Static Paths (Legacy - Avoid)

```astro
<!-- ⚠️ DEPRECATED: Only use if absolutely necessary -->
<AImage
  src="/images/og-image.png"
  alt="..."
  preset="card"
/>
```

### React Components

For React components, use `Image` directly from `astro:assets`:

```tsx
import { Image } from 'astro:assets';
import heroImage from '../../assets/images/heroes/vasileios-illustration.png';

<Image
  src={heroImage}
  alt="..."
  widths={[480, 800, 1200]}
  sizes="100vw"
  format="webp"
  loading="eager"
  fetchpriority="high"
/>
```

## ⚡ Performance Mandates

### 1. Explicit Dimensions (CLS Prevention)

**ALWAYS** provide `width` and `height` for above-the-fold images:

```astro
<AImage
  src={heroImage}
  alt="..."
  width={1177}    ← REQUIRED
  height={1374}   ← REQUIRED
/>
```

**Why?** Prevents Cumulative Layout Shift (CLS) by reserving space in the DOM.

### 2. LCP Image Optimization

For Largest Contentful Paint (LCP) images:

```astro
<AImage
  src={heroImage}
  alt="..."
  loading="eager"           ← REQUIRED
  fetchpriority="high"      ← REQUIRED
  decoding="async"          ← RECOMMENDED
/>
```

### 3. Preset Selection

Use appropriate presets based on image role:

- `preset="hero"` - Full-width hero images (LCP candidates)
- `preset="card"` - Project cards, thumbnails
- `thumb` - Small avatars, icons

## 🚫 Deprecated Patterns

### ❌ Custom Optimization Scripts

**DO NOT USE** `scripts/optimize-images.mjs` - Astro 5 handles this automatically.

### ❌ Manual Picture Elements

**DO NOT** create manual `<picture>` elements - `AImage` handles this:

```astro
<!-- ❌ BAD -->
<picture>
  <source srcset="..." type="image/avif" />
  <img src="..." />
</picture>

<!-- ✅ GOOD -->
<AImage src={importedImage} alt="..." />
```

### ❌ Direct Image Imports in React

**DO NOT** import images directly in React components - use `Image` from `astro:assets`:

```tsx
// ❌ BAD
import heroImage from '../../assets/images/hero.png';
<img src={heroImage.src} />

// ✅ GOOD
import { Image } from 'astro:assets';
import heroImage from '../../assets/images/hero.png';
<Image src={heroImage} alt="..." />
```

## 📋 Migration Checklist

When migrating existing images:

1. ✅ **For portfolio images**: Move source PNG from `public/images/` to `src/assets/images/`
2. ✅ **For article covers**: Keep optimized WebP in `public/images/` (needed for OG tags)
3. ✅ Update import statement (use `import` for assets, keep `/images/` paths for covers)
4. ✅ Replace `<img>` or manual `<picture>` with `<AImage>` (for imported images)
5. ✅ Add explicit `width` and `height`
6. ✅ Set `loading="eager"` and `fetchpriority="high"` for LCP images
7. ✅ Remove old static path references (except article covers)
8. ✅ Test build and verify optimization

**Exception**: Article/blog cover images (`coverImage` in frontmatter) **must stay** in `public/images/` because:
- They're referenced by static paths in content frontmatter
- Social media crawlers need direct access to these URLs
- OG tags require predictable, static URLs

## 🔍 Verification

### Build Verification

```bash
# Check for broken image links
pnpm build

# Verify optimized output
ls dist/_astro/ | grep -E '\.(webp|avif)'
```

### CLS Verification

1. Open Chrome DevTools → Lighthouse
2. Run Performance audit
3. Check "Cumulative Layout Shift" score
4. Verify all images have explicit dimensions

### Vercel Compatibility

- ✅ Astro 5 uses Sharp for image optimization
- ✅ Vercel Edge Functions support Sharp
- ✅ No additional configuration needed

## 📚 Related Documentation

- [Astro Image Optimization](https://docs.astro.build/en/guides/images/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Image Optimization Best Practices](https://web.dev/fast/#optimize-your-images)
