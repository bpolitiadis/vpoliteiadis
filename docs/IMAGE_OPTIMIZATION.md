# Image Optimization Best Practices (2025)

## Overview

This project uses **direct static asset serving** for production reliability combined with **Vercel's Image Optimization API** for dynamic optimization when needed. This hybrid approach ensures maximum compatibility and performance.

## Why This Approach is Superior

### ❌ Old Approach (Build-Time Processing)
- **Build time**: 12+ minutes
- **Storage**: 140+ generated files
- **Cost**: Expensive build minutes
- **Flexibility**: Fixed sizes/formats

### ✅ New Approach (Hybrid Static + Dynamic)
- **Build time**: <2 minutes
- **Storage**: Only source images
- **Cost**: Free with Vercel
- **Flexibility**: Direct serving + dynamic optimization
- **Reliability**: Works consistently across all environments

## Architecture

### Directory Structure

```
src/assets/images/          # Source images (COMMITTED)
├── casa-capoeira-cover.png # High-quality source images
├── upiria-cover.png        # Original images in any format
├── avatar.webp            # Optimized avatar image
└── ...                     # All source images

public/images/               # Static assets served by Vercel
├── avatar.webp            # Production-ready avatar
├── blog/                  # Blog images
├── creative/              # Creative portfolio images
└── projects/              # Project images
```

### How It Works

1. **Source images** stored in `src/assets/images/`
2. **Static assets** copied to `public/images/` during build
3. **Direct serving** for critical images (avatar, logos)
4. **Vercel Image API** available for dynamic optimization when needed
5. **Automatic caching** on Vercel's edge network

## Usage Examples

### 1. Critical Images (Avatar, Logos) - Direct Serving

```tsx
// React component - Direct static asset serving
<img
  src="/images/avatar.webp"
  alt="Profile avatar"
  width={256}
  height={256}
  loading="eager"
  fetchPriority="high"
  className="rounded-full"
/>
```

```astro
<!-- Astro component - Direct static asset serving -->
<img
  src="/images/avatar.webp"
  alt="Profile avatar"
  width={256}
  height={256}
  loading="eager"
  fetchPriority="high"
  class="rounded-full"
/>
```

### 2. Dynamic Images - Vercel Image Optimization

```astro
---
import VercelImage from '../components/VercelImage.astro';
---

<VercelImage
  src="/images/casa-capoeira-cover.png"
  alt="Casa Capoeira project"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
  class="rounded-lg shadow-lg"
/>
```

### 3. Hero Images with High Priority

```astro
<VercelImage
  src="/images/hero-background.png"
  alt="Hero background"
  width={1200}
  height={800}
  sizes="100vw"
  loading="eager"
  fetchpriority="high"
  class="w-full h-auto"
/>
```

## Performance Benefits

### 1. Build Performance
- **Before**: 12+ minutes (image processing)
- **After**: <2 minutes (no image processing)
- **Improvement**: 80%+ faster builds

### 2. Runtime Performance
- **Automatic format selection**: AVIF → WebP → PNG fallback
- **Responsive sizing**: On-demand width optimization
- **Edge caching**: Global CDN distribution
- **Lazy loading**: Built-in performance optimization

### 3. Cost Benefits
- **Build minutes**: Significantly reduced
- **Storage**: Only source images stored
- **Bandwidth**: Vercel's edge network
- **Processing**: Free with Vercel deployment

## Migration Guide

### From Old System

1. **Remove generated images**:
   ```bash
   rm -rf public/images/
   ```

2. **Update image paths**:
   ```diff
   - coverImage: '/images/casa-capoeira-cover.webp'
   + coverImage: '/src/assets/images/casa-capoeira-cover.png'
   ```

3. **Remove build script**:
   ```diff
   - "build": "astro check && node scripts/optimize-images.mjs && astro build"
   + "build": "astro check && astro build"
   ```

### To New System

1. **Use VercelImage component**:
   ```astro
   <VercelImage src="/src/assets/images/image.png" alt="Description" />
   ```

2. **Specify dimensions**:
   ```astro
   <VercelImage 
     src="/src/assets/images/image.png" 
     width={800} 
     height={600} 
   />
   ```

3. **Add responsive sizing**:
   ```astro
   <VercelImage 
     src="/src/assets/images/image.png" 
     sizes="(max-width: 768px) 100vw, 50vw" 
   />
   ```

## Best Practices

### ✅ Do

- Store source images in `src/assets/images/`
- Use direct static asset serving for critical images (avatar, logos)
- Use VercelImage component for dynamic content images
- Specify appropriate width/height attributes
- Use meaningful alt text
- Implement responsive sizing with `sizes` attribute
- Use `loading="eager"` and `fetchPriority="high"` for above-the-fold images
- Use `loading="lazy"` for below-the-fold images

### ❌ Don't

- Process images during build time
- Store generated images in git
- Use hardcoded image paths
- Skip alt text for accessibility
- Ignore responsive sizing
- Use complex image optimization for simple static assets
- Mix different image serving strategies inconsistently

## Monitoring and Maintenance

### 1. Performance Metrics
- **Build time**: Should be <2 minutes
- **Image load time**: Vercel edge optimization
- **Core Web Vitals**: Improved LCP, CLS

### 2. Regular Updates
- **Monthly**: Review image usage patterns
- **Quarterly**: Update Vercel configuration
- **Annually**: Review image optimization strategy

## Troubleshooting

### Common Issues

1. **Images not loading in production**: Use direct static asset paths (`/images/filename.webp`)
2. **Build errors**: Verify image paths and component usage
3. **Performance issues**: Review image dimensions and loading attributes
4. **Console pollution**: Use client-side logger for development-only logging

### Debug Commands

```bash
# Check build performance
time pnpm run build

# Verify image paths
find src/assets/images -name "*.png" -o -name "*.webp" -o -name "*.jpg"

# Check Vercel deployment
vercel --prod

# Test image loading
curl -I https://your-domain.com/images/avatar.webp
```

## Console Logging Best Practices

### Production-Safe Logging

Use the client-side logger for development-only console output:

```tsx
import clientLogger from '../lib/logger-client';

// Development-only logging
clientLogger.animation('ComponentName', 'action completed');
clientLogger.debug('Debug information', { context: 'value' });
clientLogger.info('Info message');
clientLogger.warn('Warning message');
clientLogger.error('Error message'); // Always logged, even in production
```

### ❌ Avoid in Production

```tsx
// Don't use direct console.log in components
console.log('Debug info'); // Visible in production
console.warn('Warning'); // Visible in production
```

### ✅ Use Instead

```tsx
// Use client logger for production-safe logging
clientLogger.debug('Debug info'); // Hidden in production
clientLogger.warn('Warning'); // Hidden in production
clientLogger.error('Error'); // Always visible (for debugging)
```

## Future Considerations

### 1. Vercel Features
- **Image Analytics**: Track image performance
- **Advanced Formats**: AVIF 2.0, WebP 2.0
- **AI Optimization**: Automatic quality assessment

### 2. Performance Enhancements
- **Service Worker**: Offline image caching
- **Progressive loading**: Enhanced user experience
- **Preloading**: Critical image optimization

---

*Last updated: January 2025*
*Next review: April 2025*
