# Hero Section Component

## Overview

The hero section displays Vasileios Politeiadis' introduction with animated illustrations and professional information. This is a **static Astro component** that combines Astro's server-side rendering with client-side GSAP animations for optimal performance and Core Web Vitals.

## Tech Stack

This component leverages a powerful combination of modern web technologies:

- **Astro**: Static component architecture with server-side rendering and zero JavaScript by default
- **GSAP (GreenSock Animation Platform)**: Professional-grade animations for floating illustrations (loaded via inline `<script>` tag)
- **Tailwind CSS**: Utility-first styling with custom animations and responsive breakpoints
- **Shadcn/ui**: Design system patterns for the CTA button (implemented as plain HTML with Tailwind classes matching Shadcn's `buttonVariants`)
- **Astro Assets**: Automatic image optimization with WebP/AVIF formats and responsive srcsets
- **LetterGlitch React Component**: Canvas-based glitch background effect (loaded with `client:visible` in parent page)

## Usage

```astro
---
import HeroSection from '../components/hero/HeroSection.astro';
---

<HeroSection />
```

The component is typically used within a full-viewport section wrapper (see `src/pages/index.astro`):

```astro
<section class="relative min-h-[calc(100svh-48px-60px)]">
  <!-- LetterGlitch background with lazy loading -->
  <div class="absolute inset-0 pointer-events-none opacity-20 z-0">
    <LetterGlitch client:visible />
  </div>
  
  <HeroSection />
</section>
```

## Component Architecture

### Static Astro Component Structure

The component uses Astro's frontmatter for image optimization and static HTML generation:

```astro
---
// Image optimization at build time
const vasileiosImg = await getImage({
  src: vasileiosIllustration,
  widths: [480, 800, 1200],
  format: 'webp',
});

// AVIF variants for better compression
const vasileiosAvif480 = await getImage({ 
  src: vasileiosIllustration, 
  width: 480, 
  format: 'avif' 
});
---
```

### Inline GSAP Script

Animations are handled via an inline `<script>` tag (not a React component) to avoid hydration delays:

```235:358:src/components/hero/HeroSection.astro
<!-- GSAP animations - separate timelines for character and laptop for 3D depth effect -->
<script>
  import gsap from 'gsap';

  // Animation config matching React component
  const ANIMATION_CONFIG = {
    image: {
      durations: [3, 2, 3, 3],
      movements: [
        { y: '-=30', x: '+=20', rotation: '-=2' },
        { y: '+=30', x: '-=20', rotation: '-=2' },
        { y: '-=20', rotation: '+=2' },
        { y: '+=20', rotation: '+=2' },
      ],
      movementsMobile: [
        { y: '-=15', x: '+=10', rotation: '-=1' },
        { y: '+=15', x: '-=10', rotation: '-=1' },
        { y: '-=10', rotation: '+=1' },
        { y: '+=10', rotation: '+=1' },
      ],
    },
    laptop: {
      durations: [3, 2, 3, 3],
      movements: [
        { y: '-=10', x: '+=10', rotation: '-=1' },
        { y: '+=10', x: '-=10', rotation: '-=1' },
        { y: '-=10', rotation: '+=1' },
        { y: '+=10', rotation: '+=1' },
      ],
      movementsMobile: [
        { y: '-=5', x: '+=5', rotation: '-=0.5' },
        { y: '+=5', x: '-=5', rotation: '-=0.5' },
        { y: '-=5', rotation: '+=0.5' },
        { y: '+=5', rotation: '+=0.5' },
      ],
    },
    easing: 'power1.easeInOut',
  };

  function initHeroAnimations() {
    const section = document.querySelector('[data-testid="hero-section"]');
    if (!section) {
      console.warn('[HeroSection] Section not found');
      return;
    }

    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
      console.error('[HeroSection] GSAP is not available');
      return;
    }

    // Mark section as GSAP-ready to disable CSS fallback animations
    section.classList.add('gsap-ready');

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 640;

    const imageElements = section.querySelectorAll('.image-animation');
    const laptopElements = section.querySelectorAll('.laptop');

    console.log('[HeroSection] Initializing animations', {
      imageElements: imageElements.length,
      laptopElements: laptopElements.length,
      prefersReducedMotion,
      isMobile
    });

    // Character illustration floating effect (infinite loop)
    const imageTimeline = gsap.timeline({ repeat: -1 });
    if (!prefersReducedMotion && imageElements.length > 0) {
      // Set initial transform state
      gsap.set(imageElements, { x: 0, y: 0, rotation: 0, force3D: true });
      
      const movements = isMobile 
        ? ANIMATION_CONFIG.image.movementsMobile 
        : ANIMATION_CONFIG.image.movements;
      movements.forEach((movement, index) => {
        imageTimeline.to(imageElements, {
          ...movement,
          ease: ANIMATION_CONFIG.easing,
          duration: ANIMATION_CONFIG.image.durations[index],
          force3D: true,
        });
      });
      console.log('[HeroSection] Image timeline created with', movements.length, 'movements');
    }

    // Laptop floating effect (infinite loop, separate timeline for 3D depth)
    // Set initial transform state including scale
    if (laptopElements.length > 0) {
      gsap.set(laptopElements, { 
        scale: 0.40,
        x: 0, 
        y: 0, 
        rotation: 0,
        transformOrigin: 'center center',
        force3D: true
      });
    }
    
    const laptopTimeline = gsap.timeline({ repeat: -1 });
    if (!prefersReducedMotion && laptopElements.length > 0) {
      const movements = isMobile 
        ? ANIMATION_CONFIG.laptop.movementsMobile 
        : ANIMATION_CONFIG.laptop.movements;
      movements.forEach((movement, index) => {
        laptopTimeline.to(laptopElements, {
          ...movement,
          ease: ANIMATION_CONFIG.easing,
          duration: ANIMATION_CONFIG.laptop.durations[index],
          force3D: true,
        });
      });
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroAnimations);
  } else {
    initHeroAnimations();
  }
</script>
```

## Animations Explained

### 1. Floating Character Illustration (Desktop)

The character illustration uses a **GSAP timeline with 4 movement sequences** in an infinite loop:

**Desktop Movement Pattern:**
- **Sequence 1** (3s): Move up 30px, right 20px, rotate -2° 
- **Sequence 2** (2s): Move down 30px, left 20px, rotate -2°
- **Sequence 3** (3s): Move up 20px, rotate +2°
- **Sequence 4** (3s): Move down 20px, rotate +2°
- **Easing**: `power1.easeInOut` for smooth acceleration/deceleration
- **3D Acceleration**: `force3D: true` for GPU acceleration

### 2. Floating Laptop Illustration (Desktop)

The laptop has a **separate timeline** for 3D depth effect, with smaller movement values:

**Desktop Movement Pattern:**
- **Sequence 1** (3s): Move up 10px, right 10px, rotate -1°
- **Sequence 2** (2s): Move down 10px, left 10px, rotate -1°
- **Sequence 3** (3s): Move up 10px, rotate +1°
- **Sequence 4** (3s): Move down 10px, rotate +1°
- **Scale**: Fixed at `0.40` for all viewports
- **Transform Origin**: `center center` for proper rotation

### 3. Mobile Optimizations

On screens **< 640px width**, animations use reduced movement values for better performance:

**Mobile Character Movement:**
- Movements are **50% smaller** (e.g., `-15px` instead of `-30px`)
- Rotations are **50% smaller** (e.g., `-1°` instead of `-2°`)
- Same timing sequences for consistency

**Mobile Laptop Movement:**
- Movements are **50% smaller** (e.g., `-5px` instead of `-10px`)
- Rotations are **50% smaller** (e.g., `-0.5°` instead of `-1°`)

### 4. CSS Fallback Animations

When GSAP isn't loaded yet, CSS keyframe animations provide a fallback:

```198:220:src/components/hero/HeroSection.astro
  @keyframes hero-float-fallback {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    25% {
      transform: translateY(-15px) translateX(10px) rotate(-1deg);
    }
    50% {
      transform: translateY(-5px) translateX(-5px) rotate(0.5deg);
    }
    75% {
      transform: translateY(-20px) translateX(5px) rotate(-0.5deg);
    }
  }
  
  @keyframes hero-float-laptop-fallback {
    0%, 100% {
      transform: scale(var(--laptop-scale)) translateY(0) rotate(0deg);
    }
    50% {
      transform: scale(var(--laptop-scale)) translateY(-8px) rotate(0.5deg);
    }
  }
```

The component automatically disables CSS animations when GSAP is ready by adding the `.gsap-ready` class:

```192:196:src/components/hero/HeroSection.astro
  /* Disable CSS animations and clear transforms when GSAP is ready */
  [data-testid="hero-section"].gsap-ready .image-animation,
  [data-testid="hero-section"].gsap-ready .laptop {
    animation: none !important;
    /* Let GSAP control all transforms */
  }
```

### 5. Text Elements

Text elements use the `.text-animation` class but are **visible by default** (no GSAP text animations). This ensures:
- **Instant LCP**: Text is visible immediately (no animation delays)
- **No CLS**: Content is stable from first paint
- **Progressive Enhancement**: Animations are optional, content is primary

The text elements are styled with Tailwind utilities and remain static for optimal performance.

### 6. Reduced Motion Support

All animations respect `prefers-reduced-motion`:

```222:231:src/components/hero/HeroSection.astro
  /* Reduced motion: disable all animations and ensure visibility */
  @media (prefers-reduced-motion: reduce) {
    [data-testid="hero-section"] .text-animation,
    [data-testid="hero-section"] .image-animation,
    [data-testid="hero-section"] .laptop {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
```

When reduced motion is detected, GSAP animations are skipped entirely, and CSS fallbacks are disabled.

## LetterGlitch Background Integration

The `LetterGlitch` component is **not part of HeroSection.astro** but is integrated in the parent page (`src/pages/index.astro`):

```astro
<section class="relative min-h-[calc(100svh-48px-60px)]">
  <!-- Full-screen glitch background - lazy load when visible -->
  <div class="absolute inset-0 pointer-events-none opacity-20 z-0" aria-hidden="true">
    <LetterGlitch client:visible />
  </div>
  
  <HeroSection />
</section>
```

**Integration Details:**
- **Position**: Absolute positioning with `inset-0` for full-screen coverage
- **Z-index**: `z-0` (behind hero content which is `z-10`)
- **Opacity**: `20%` for subtle background effect
- **Lazy Loading**: `client:visible` directive loads only when element is visible
- **Pointer Events**: `pointer-events-none` to allow interactions with hero content
- **Accessibility**: `aria-hidden="true"` since it's decorative

**LetterGlitch Component** (`src/components/LetterGlitch.tsx`):
- **Technology**: React component with Canvas API
- **Effect**: Animated grid of random letters/symbols with color transitions
- **Performance**: Uses `requestAnimationFrame` and throttled updates (1% of letters per frame)
- **Customization**: Configurable glitch colors, speed, and vignette effects
- **Default Colors**: `['#2b4539', '#61dca3', '#61b3dc']` (dark green, emerald, cyan)

## CTA Button Implementation

The "Contact me" button uses **Shadcn/ui design patterns** but is implemented as a **plain HTML anchor** with Tailwind classes:

```110:119:src/components/hero/HeroSection.astro
    <a 
      href="#contact" 
      class="hero-cta-button text-animation inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium font-inter h-9 px-4 py-2 mt-2 sm:mt-4 bg-primary text-primary-foreground shadow-[0_0_20px_rgba(57,255,20,0.25)] hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(57,255,20,0.35)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
      Contact me
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4" aria-hidden="true">
        <path d="m22 2-7 20-4-9-9-4Z"></path>
        <path d="M22 2 11 13"></path>
      </svg>
    </a>
```

**Design System Alignment:**
- **Size**: `h-9 px-4 py-2` (matches Shadcn's default button size)
- **Colors**: `bg-primary` (neon lime `#39FF14`) with `text-primary-foreground`
- **Glow Effect**: Custom shadow `shadow-[0_0_20px_rgba(57,255,20,0.25)]` with enhanced hover state
- **Hover State**: `hover:bg-primary/90` with brighter glow `shadow-[0_0_24px_rgba(57,255,20,0.35)]`
- **Focus State**: `focus-visible:ring-1 focus-visible:ring-ring` for keyboard navigation
- **Icon**: Inline SVG arrow icon matching Shadcn button patterns
- **Transitions**: `transition-all duration-300` for smooth hover effects

**Why Not Use Shadcn Button Component?**
- **Zero JavaScript**: Plain anchor tag requires no React hydration
- **Better Performance**: No component overhead, faster LCP
- **Astro-First**: Matches the static component architecture
- **Design Consistency**: Uses same Tailwind classes as Shadcn's `buttonVariants`

## Image Optimization

### Astro Assets Integration

The component uses Astro's `getImage()` function for automatic optimization:

```6:17:src/components/hero/HeroSection.astro
// Generate optimized image data with explicit dimensions
const vasileiosImg = await getImage({
  src: vasileiosIllustration,
  widths: [480, 800, 1200],
  format: 'webp',
});

const laptopImg = await getImage({
  src: laptopIllustration,
  widths: [480, 800, 1200],
  format: 'webp',
});
```

### Responsive Picture Elements

Both images use `<picture>` elements with multiple source formats:

```38:58:src/components/hero/HeroSection.astro
        <picture>
          <source
            srcset={`${vasileiosAvif480.src} 480w, ${vasileiosAvif800.src} 800w`}
            type="image/avif"
          />
          <source
            srcset={`${vasileiosImg.src} 1177w`}
            type="image/webp"
          />
          <img
            src={vasileiosImg.src}
            width={vasileiosIllustration.width || 1177}
            height={vasileiosIllustration.height || 1374}
            id="character-illustration"
            aria-label="Vasileios Politeiadis character illustration levitating with a Macbook"
            alt="Vasileios Politeiadis character illustration"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </picture>
```

**Optimization Strategy:**
- **AVIF First**: Best compression, supported by modern browsers
- **WebP Fallback**: Good compression, broader browser support
- **Explicit Dimensions**: Prevents CLS (Cumulative Layout Shift)
- **LCP Priority**: `loading="eager"` and `fetchpriority="high"` for critical LCP image
- **Async Decoding**: `decoding="async"` for non-blocking image decode

## Accessibility Features

- **Semantic HTML**: Proper `<section>`, `<h1>`, and anchor tags
- **ARIA Labels**: `aria-label` on images and `aria-hidden` on decorative elements
- **Test IDs**: `data-testid="hero-section"` for automated testing
- **Reduced Motion**: Complete animation disabling for `prefers-reduced-motion: reduce`
- **Keyboard Navigation**: Focus-visible states on interactive elements
- **Screen Reader Support**: Descriptive alt text and aria-labels

## Performance Optimizations

1. **Static Rendering**: Zero JavaScript for initial render (Astro SSG)
2. **Lazy GSAP Loading**: Animations only initialize when DOM is ready
3. **CSS Fallbacks**: Content visible even if JavaScript fails
4. **Image Optimization**: AVIF/WebP with responsive srcsets
5. **LCP Optimization**: Critical image preloading and eager loading
6. **No Hydration**: Plain HTML elements, no React hydration delays
7. **GPU Acceleration**: `force3D: true` and `transform3d` for smooth animations

## Responsive Design

- **Mobile First**: Base styles optimized for mobile (< 640px)
- **Breakpoints**: `sm:640px`, `md:768px`, `lg:1024px` (Tailwind defaults)
- **Flexible Layout**: Flexbox with `flex-col` (mobile) → `flex-row-reverse` (desktop)
- **Responsive Typography**: Fluid text sizes from `text-4xl` to `lg:text-7xl`
- **Adaptive Spacing**: Mobile-tight spacing that expands on larger screens
- **Image Scaling**: Fixed scale values with responsive container sizing

## Deprecated Components

The React version (`HeroSection.tsx`) has been moved to `deprecated/` folder. The Astro component (`HeroSection.astro`) is the current implementation for better:
- **Performance**: Faster LCP, reduced CLS, better Core Web Vitals
- **SEO**: Static HTML rendering for better crawlability
- **Developer Experience**: Simpler architecture without React hydration complexity

