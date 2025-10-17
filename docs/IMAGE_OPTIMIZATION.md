# Image Optimization with Astro's Built-in Solution (2025)

## Overview

This project uses **Astro's built-in Image component** with **Vercel's Image Optimization API** for optimal performance, reliability, and developer experience. This approach eliminates the need for build-time image processing while providing automatic optimization, responsive images, and modern format support.

## Why This Approach is Superior

### ❌ Old Approach (Build-Time Processing)
- **Build time**: 12+ minutes
- **Storage**: 140+ generated files
- **Cost**: Expensive build minutes
- **Flexibility**: Fixed sizes/formats
- **Maintenance**: Complex optimization scripts

### ✅ New Approach (Astro + Vercel)
- **Build time**: <2 minutes
- **Storage**: Only source images
- **Cost**: Free with Vercel
- **Flexibility**: Dynamic optimization
- **Reliability**: Works consistently across all environments
- **Maintenance**: Zero maintenance required

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

1. **Source images** stored in `src/assets/images/` or `public/images/`
2. **Astro Image component** handles optimization automatically
3. **Vercel Image API** provides dynamic optimization
4. **Automatic format selection**: AVIF → WebP → PNG fallback
5. **Responsive sizing**: On-demand width optimization
6. **Edge caching**: Global CDN distribution

## Usage Examples

### 1. Astro Components - Direct Image Usage

```astro
---
import { Image } from 'astro:assets';
---

<Image
  src="/images/avatar.webp"
  alt="Profile avatar"
  width={256}
  height={256}
  loading="eager"
  fetchpriority="high"
  class="rounded-full"
/>
```

### 2. Astro Components - Asset Imports

```astro
---
import { Image } from 'astro:assets';
import avatarImage from '../assets/images/avatar.webp';
---

<Image
  src={avatarImage}
  alt="Profile avatar"
  width={256}
  height={256}
  loading="eager"
  fetchpriority="high"
  class="rounded-full"
/>
```

### 3. React Components - Fallback Approach

```tsx
// For React components, use regular img tags
// Astro will optimize these at the page level
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

### 4. Project Cards with Responsive Images

```astro
---
import { Image } from 'astro:assets';
---

<Image
  src={project.data.coverImage}
  alt={`${project.data.title} project cover image`}
  width={1200}
  height={800}
  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
  loading="lazy"
  decoding="async"
  fetchpriority="low"
  class="w-full h-full object-cover"
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
- **Critical resource hints**: Automatic priority handling

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

2. **Update image components**:
   ```diff
   - import VercelImage from './VercelImage.astro';
   - <VercelImage src="/images/image.png" alt="Description" />
   + import { Image } from 'astro:assets';
   + <Image src="/images/image.png" alt="Description" />
   ```

3. **Remove build script**:
   ```diff
   - "build": "astro check && node scripts/optimize-images.mjs && astro build"
   + "build": "astro check && astro build"
   ```

### To New System

1. **Use Astro Image component**:
   ```astro
   <Image src="/images/image.png" alt="Description" />
   ```

2. **Specify dimensions**:
   ```astro
   <Image 
     src="/images/image.png" 
     width={800} 
     height={600} 
   />
   ```

3. **Add responsive sizing**:
   ```astro
   <Image 
     src="/images/image.png" 
     sizes="(max-width: 768px) 100vw, 50vw" 
   />
   ```

## Best Practices

### ✅ Do

- Use Astro's Image component in `.astro` files
- Store source images in `src/assets/images/` or `public/images/`
- Specify appropriate width/height attributes
- Use meaningful alt text
- Implement responsive sizing with `sizes` attribute
- Use `loading="eager"` and `fetchpriority="high"` for above-the-fold images
- Use `loading="lazy"` for below-the-fold images
- Use `decoding="async"` for non-critical images

### ❌ Don't

- Process images during build time
- Store generated images in git
- Use hardcoded image paths in React components
- Skip alt text for accessibility
- Ignore responsive sizing
- Use complex image optimization for simple static assets
- Mix different image serving strategies inconsistently

## Component Usage

### VercelImage.astro (Legacy Wrapper)

```astro
---
import { Image } from 'astro:assets';

export interface Props {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  class?: string;
  sizes?: string;
  loading?: 'eager' | 'lazy';
  decoding?: 'auto' | 'sync' | 'async';
  fetchpriority?: 'high' | 'low' | 'auto';
  quality?: number;
  decorative?: boolean;
}

const { src, alt = '', width = 1200, height = 800, class: className = '', sizes = '100vw', loading = 'lazy', decoding = 'async', fetchpriority = 'auto', quality = 80, decorative = false } = Astro.props;

const isDecorative = decorative || (alt || '').trim() === '';
---

<Image
  src={src}
  alt={alt}
  width={width}
  height={height}
  class={className}
  sizes={sizes}
  loading={loading}
  decoding={decoding}
  fetchpriority={fetchpriority}
  quality={quality}
  aria-hidden={isDecorative ? 'true' : undefined}
  role={isDecorative ? 'presentation' : undefined}
/>
```

### OptimizedImage.tsx (React Fallback)

```tsx
import React from 'react';

type OptimizedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  width?: number;
  quality?: number;
  decorative?: boolean;
};

/**
 * @deprecated Use Astro's Image component directly in .astro files instead
 */
export function OptimizedImage(props: OptimizedImageProps) {
  const { src, width = 1200, quality = 75, decorative = false, ...rest } = props;
  const isDecorative = decorative || (rest.alt || '').trim() === '';

  return (
    <img
      src={src}
      width={width}
      loading={rest.loading ?? 'lazy'}
      decoding={rest.decoding ?? 'async'}
      aria-hidden={isDecorative ? 'true' : undefined}
      role={isDecorative ? 'presentation' : undefined}
      {...rest}
    />
  );
}
```

## Monitoring and Maintenance

### 1. Performance Metrics
- **Build time**: Should be <2 minutes
- **Image load time**: Vercel edge optimization
- **Core Web Vitals**: Improved LCP, CLS
- **Format adoption**: Automatic AVIF/WebP usage

### 2. Regular Updates
- **Monthly**: Review image usage patterns
- **Quarterly**: Update Vercel configuration
- **Annually**: Review image optimization strategy

## Troubleshooting

### Common Issues

1. **Images not loading in production**: Verify image paths and component usage
2. **Build errors**: Check Astro Image component imports
3. **Performance issues**: Review image dimensions and loading attributes
4. **Format issues**: Ensure source images are in supported formats

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

## Configuration

### Astro Configuration

```javascript
// astro.config.mjs
export default defineConfig({
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true, // Enable Vercel's image optimization
  }),
});
```

### Vercel Configuration

```json
{
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, s-maxage=31536000, immutable" }
      ]
    }
  ]
}
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