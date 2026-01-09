# Image Optimization Summary

## ✅ Completed Optimizations

### 1. Created Image Optimization Script
- **Location**: `scripts/optimize-images.mjs`
- **Features**:
  - Converts PNG/JPG to WebP and AVIF formats
  - Generates responsive variants (480w, 800w, 1200w, etc.)
  - Uses Sharp for high-performance processing
  - Respects image presets (hero, card, thumb)
  - Reports file size savings

### 2. Optimized Large PNG Files
All large PNG files in `public/images/` have been optimized:

| Image | Original | WebP | AVIF | Savings |
|-------|----------|------|------|---------|
| `casacapoeira-cover.png` | 2.66MB | 0.38MB | 0.16MB | ~94% |
| `vasileios-illustration.png` | 2.35MB | 0.21MB | 0.11MB | ~95% |
| `laptop-illustration.png` | 2.31MB | 0.20MB | 0.10MB | ~96% |
| `vibe-coding.png` | 2.27MB | 0.10MB | 0.14MB | ~95% |

**Total savings**: ~9.5MB → ~1MB (approximately 90% reduction)

### 3. Enhanced AImage Component
- **Location**: `src/components/media/AImage.astro`
- **New Features**:
  - Automatically generates `<picture>` elements with `<source>` tags for AVIF and WebP
  - Supports responsive srcset for static images
  - Falls back to original format for older browsers
  - Maintains backward compatibility with imported images

### 4. Updated Code References
Updated all code references to use optimized WebP versions:
- ✅ `src/components/hero/HeroSection.tsx` - Added picture elements with srcset
- ✅ `src/components/ProjectsSection.astro` - Updated to `.webp`
- ✅ `src/content/blog/casa-capoeira-journey.mdx` - Updated to `.webp`
- ✅ `src/content/projects/casa-capoeira.md` - Updated to `.webp`
- ✅ `src/content/blog/vibe-coding-ai-assisted-development.mdx` - Updated to `.webp`

## 📦 Generated Files

For each optimized image, the following variants were created:

### casacapoeira-cover
- `casacapoeira-cover-320w.webp` / `.avif`
- `casacapoeira-cover-480w.webp` / `.avif`
- `casacapoeira-cover-768w.webp` / `.avif`
- `casacapoeira-cover-1024w.webp` / `.avif`
- `casacapoeira-cover.webp` / `.avif` (base)

### vasileios-illustration
- `vasileios-illustration-480w.webp` / `.avif`
- `vasileios-illustration-800w.webp` / `.avif`
- `vasileios-illustration.webp` / `.avif` (base)

### laptop-illustration
- `laptop-illustration-480w.webp` / `.avif`
- `laptop-illustration-800w.webp` / `.avif`
- `laptop-illustration-1200w.webp` / `.avif`
- `laptop-illustration.webp` / `.avif` (base)

### vibe-coding
- `vibe-coding-320w.webp` / `.avif`
- `vibe-coding-480w.webp` / `.avif`
- `vibe-coding-768w.webp` / `.avif`
- `vibe-coding-1024w.webp` / `.avif`
- `vibe-coding.webp` / `.avif` (base)

## 🚀 Usage

### Running the Optimization Script
```bash
pnpm run optimize:images
```

### Using Optimized Images

#### In Astro Components (with AImage)
```astro
<AImage
  src="/images/casacapoeira-cover.webp"
  alt="Casa Capoeira cover"
  preset="card"
/>
```

The component automatically generates:
```html
<picture>
  <source type="image/avif" srcset="...-480w.avif 480w, ...-800w.avif 800w" />
  <source type="image/webp" srcset="...-480w.webp 480w, ...-800w.webp 800w" />
  <img src="/images/casacapoeira-cover.webp" alt="..." />
</picture>
```

#### In React Components (manual picture element)
```tsx
<picture>
  <source
    srcSet="/images/vasileios-illustration-480w.avif 480w, /images/vasileios-illustration-800w.avif 800w"
    type="image/avif"
  />
  <source
    srcSet="/images/vasileios-illustration-480w.webp 480w, /images/vasileios-illustration-800w.webp 800w"
    type="image/webp"
  />
  <img
    src="/images/vasileios-illustration.webp"
    alt="..."
    loading="eager"
    fetchpriority="high"
  />
</picture>
```

## 📊 Performance Impact

### Before Optimization
- Total image size: ~9.5MB (4 PNG files)
- Format: PNG only
- No responsive variants
- Large file sizes impact page load

### After Optimization
- Total image size: ~1MB (optimized variants)
- Formats: AVIF (best compression) + WebP (fallback) + PNG (legacy)
- Responsive variants for different viewports
- **~90% reduction in file size**
- Faster page loads, better Core Web Vitals

## 🔄 Future Optimizations

### Images Still Using PNG (but have optimized versions)
These images have optimized WebP/AVIF versions but code still references PNG:
- Consider updating references as needed
- Original PNG files can be kept as fallbacks

### Source Images (`src/assets/images/`)
- These are optimized automatically by Astro's Image component when imported
- No manual optimization needed
- Use `import` statements to leverage Astro's optimization

## 📝 Notes

1. **Browser Support**:
   - AVIF: Modern browsers (Chrome 85+, Firefox 93+, Safari 16+)
   - WebP: Excellent support (Chrome 23+, Firefox 65+, Safari 14+)
   - PNG: Universal fallback

2. **Image Presets**:
   - `hero`: [480, 800, 1200, 1600, 2400]px
   - `card`: [320, 480, 768, 1024]px
   - `thumb`: [160, 320]px

3. **Quality Settings**:
   - WebP: 85% quality, effort 6
   - AVIF: 80% quality, effort 4
   - These provide excellent visual quality with optimal file sizes

4. **Build Integration**:
   - Optimization script can be run manually: `pnpm run optimize:images`
   - Consider adding to pre-build step if needed
   - Optimized files are committed to git (not generated during build)
