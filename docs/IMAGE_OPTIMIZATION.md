# Image Optimization Best Practices (2025)

## Overview

This project now uses **Vercel's built-in Image Optimization API** for instant, on-demand image optimization. This approach eliminates build-time processing and provides superior performance.

## Why This Approach is Superior

### ❌ Old Approach (Build-Time Processing)
- **Build time**: 12+ minutes
- **Storage**: 140+ generated files
- **Cost**: Expensive build minutes
- **Flexibility**: Fixed sizes/formats

### ✅ New Approach (Vercel Image Optimization)
- **Build time**: <2 minutes
- **Storage**: Only source images
- **Cost**: Free with Vercel
- **Flexibility**: Dynamic optimization

## Architecture

### Directory Structure

```
src/assets/images/          # Source images (COMMITTED)
├── casa-capoeira-cover.png # High-quality source images
├── upiria-cover.png        # Original images in any format
└── ...                     # All source images

public/images/               # DEPRECATED - No longer used
```

### How It Works

1. **Source images** stored in `src/assets/images/`
2. **Vercel Image API** optimizes on-demand
3. **Automatic caching** on Vercel's edge network
4. **Zero build-time processing**

## Usage Examples

### 1. Basic Image Usage

```astro
---
import VercelImage from '../components/VercelImage.astro';
---

<VercelImage
  src="/src/assets/images/avatar.png"
  alt="Profile avatar"
  width={256}
  height={256}
  class="rounded-full"
/>
```

### 2. Hero Image with Responsive Sizing

```astro
<VercelImage
  src="/src/assets/images/hero-background.png"
  alt="Hero background"
  width={1200}
  height={800}
  sizes="100vw"
  loading="eager"
  fetchpriority="high"
  class="w-full h-auto"
/>
```

### 3. Content Image with Lazy Loading

```astro
<VercelImage
  src="/src/assets/images/content-illustration.png"
  alt="Content illustration"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
  class="rounded-lg shadow-lg"
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
- Use VercelImage component for all images
- Specify appropriate width/height attributes
- Use meaningful alt text
- Implement responsive sizing with `sizes` attribute

### ❌ Don't

- Process images during build time
- Store generated images in git
- Use hardcoded image paths
- Skip alt text for accessibility
- Ignore responsive sizing

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

1. **Images not loading**: Check source path in `src/assets/images/`
2. **Build errors**: Verify VercelImage component usage
3. **Performance issues**: Review image dimensions and sizing

### Debug Commands

```bash
# Check build performance
time pnpm run build

# Verify image paths
find src/assets/images -name "*.png" -o -name "*.webp" -o -name "*.jpg"

# Check Vercel deployment
vercel --prod
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
