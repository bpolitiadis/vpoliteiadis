# Image Optimization Best Practices (2025)

## Overview

This document outlines the modern image optimization strategy implemented in this project, following 2025 best practices for performance, SEO, and developer experience.

## Architecture

### Directory Structure

```
src/assets/images/          # Source images (COMMITTED)
├── avatar.webp            # Original high-quality images
├── hero-images/           # Source hero images
└── content-images/        # Source content images

public/images/              # Generated optimized images (IGNORED)
├── avatar-128.avif        # Build artifacts - generated during build
├── avatar-160.webp        # Build artifacts - generated during build
└── ...                    # All optimized variants
```

### Single Source of Truth

- **Source images**: Stored in `src/assets/images/` and committed to git
- **Optimized images**: Generated in `public/images/` during build/deploy
- **No duplication**: Each image exists in only one source location

## Image Optimization Pipeline

### 1. Source Image Requirements

- **Format**: Prefer WebP or AVIF for photos, SVG for icons/logos
- **Quality**: Use high-quality source images (minimum 1200px width for hero images)
- **Naming**: Use descriptive, kebab-case names (e.g., `hero-background.webp`)

### 2. Automated Optimization

The `scripts/optimize-images.mjs` script automatically:

- Generates multiple sizes: 128, 160, 192, 256, 480, 800, 1200, 1600, 2400, 3840px
- Creates modern formats: AVIF (primary) and WebP (fallback)
- Applies quality optimizations: AVIF (60% quality, effort 6), WebP (80% quality, effort 6)
- Maintains aspect ratios and prevents distortion

### 3. Responsive Image Strategy

```typescript
// Modern responsive image implementation
const responsiveAttributes = {
  'data-loading': 'lazy',           // Lazy loading for performance
  'data-decoding': 'async',         // Async decoding
  'data-fetchpriority': 'auto',     // Smart fetch priority
  'data-format': 'auto',            // Automatic format selection
  'data-placeholder': 'blur'        // Blur placeholder for better UX
};
```

## Performance Optimizations

### 1. Format Selection

- **AVIF**: Primary format (best compression, modern browsers)
- **WebP**: Fallback format (good compression, wide support)
- **Automatic**: Browser selects best supported format

### 2. Lazy Loading

- **Above the fold**: `loading="eager"` for critical images
- **Below the fold**: `loading="lazy"` for non-critical images
- **Intersection Observer**: Smart loading based on viewport

### 3. Caching Strategy

```json
// vercel.json caching headers
{
  "source": "/images/(.*)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000, s-maxage=31536000, immutable"
    }
  ]
}
```

## Usage Examples

### 1. Basic Image Usage

```astro
---
import VercelImage from '../components/VercelImage.astro';
import avatarSrc from '../assets/images/avatar.webp';
---

<VercelImage
  src={avatarSrc}
  alt="Profile avatar"
  width={256}
  height={256}
  class="rounded-full"
/>
```

### 2. Hero Image with Responsive Sizes

```astro
<VercelImage
  src={heroSrc}
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
  src={contentSrc}
  alt="Content illustration"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
  class="rounded-lg shadow-lg"
/>
```

## Build Process

### 1. Development

```bash
# Generate optimized images for development
pnpm run optimize:images

# Images are generated in public/images/
# These files are ignored by git (.gitignore)
```

### 2. Production

```bash
# Build process automatically optimizes images
pnpm run build

# Optimized images are generated during build
# No manual optimization needed
```

### 3. Deployment

- **Vercel**: Automatically serves optimized images
- **CDN**: Global distribution with edge caching
- **Compression**: Automatic gzip/brotli compression

## Best Practices Checklist

### ✅ Do

- Store source images in `src/assets/images/`
- Use descriptive, kebab-case filenames
- Prefer WebP/AVIF over PNG/JPG
- Provide meaningful alt text
- Use appropriate loading strategies
- Implement responsive sizing

### ❌ Don't

- Store generated images in git
- Use generic filenames (img1.png, photo.jpg)
- Use PNG for photos (use WebP/AVIF instead)
- Skip alt text for accessibility
- Load all images eagerly
- Use fixed sizes for responsive layouts

## Monitoring and Maintenance

### 1. Performance Metrics

- **Core Web Vitals**: LCP, FID, CLS
- **Image metrics**: Load time, compression ratio
- **User experience**: Perceived performance

### 2. Regular Updates

- **Monthly**: Review image optimization results
- **Quarterly**: Update optimization scripts
- **Annually**: Review and update best practices

### 3. Quality Assurance

- **Automated testing**: Image optimization pipeline
- **Manual review**: Visual quality assessment
- **Performance testing**: Lighthouse audits

## Troubleshooting

### Common Issues

1. **Images not optimizing**: Check source image format and quality
2. **Build errors**: Verify image optimization script dependencies
3. **Performance issues**: Review image sizes and loading strategies

### Debug Commands

```bash
# Check image optimization status
pnpm run optimize:images

# Verify git ignore rules
git status --ignored

# Check build output
pnpm run build
```

## Future Considerations

### 1. Emerging Technologies

- **AVIF 2.0**: Enhanced compression algorithms
- **WebP 2.0**: Improved quality and compression
- **JPEG XL**: Next-generation JPEG format

### 2. Performance Enhancements

- **Service Worker**: Offline image caching
- **Progressive loading**: Enhanced user experience
- **AI optimization**: Automated quality assessment

### 3. Accessibility Improvements

- **Alt text generation**: AI-powered descriptions
- **Color contrast**: Automatic accessibility checks
- **Screen reader optimization**: Enhanced navigation

---

*Last updated: January 2025*
*Next review: April 2025*
