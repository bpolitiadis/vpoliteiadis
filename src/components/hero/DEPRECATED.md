# Deprecated Components

## HeroSection.tsx

**Status:** ⚠️ DEPRECATED  
**Replaced by:** `HeroSection.astro`  
**Deprecation Date:** 2025-01-XX  
**Removal Date:** TBD (after performance verification)

### Why was it deprecated?

The React component (`HeroSection.tsx`) caused performance issues:

1. **CLS Score:** 0.309 (poor) - React hydration caused layout shifts
2. **LCP:** 2.7s (moderate) - React island hydration delayed initial render
3. **TBT:** 0ms (good) - but unnecessary React bundle size

### Migration

**Old (deprecated):**
```astro
---
import HeroSection from './HeroSection.tsx';
---
<HeroSection 
  client:load 
  vasileiosIllustration={heroImageData.vasileiosIllustration}
  laptopIllustration={heroImageData.laptopIllustration}
/>
```

**New (current):**
```astro
---
import HeroSection from './HeroSection.astro';
---
<HeroSection />
```

### Performance Improvements

- ✅ **Static HTML** - No React hydration delay
- ✅ **Explicit aspect-ratio** - Prevents CLS
- ✅ **Preloaded LCP image** - Faster initial render
- ✅ **Optimized font loading** - `font-display: optional` prevents FOUT
- ✅ **Smaller bundle** - No React island JavaScript

### Removal Checklist

Before deleting `HeroSection.tsx`:

- [ ] Verify CLS < 0.1 in production (PageSpeed Insights)
- [ ] Verify LCP < 2.5s in production
- [ ] Confirm no other components import `HeroSection.tsx`
- [ ] Update documentation references
- [ ] Test build and preview locally
- [ ] Monitor production metrics for 1 week

### Files to Update After Removal

- `docs/COMPONENTS.md` - Update component table
- `docs/TECHNICAL_DEBT_AUDIT.md` - Remove references
- `docs/CHANGELOG.md` - Document removal
