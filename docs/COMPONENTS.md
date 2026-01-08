# 🧩 Components

**Who this is for:** Frontend developers building and extending UI components and layouts.

**What you'll learn:** Component inventory, usage patterns, props, dependencies, and integration guidelines.

> **TL;DR** - Astro components are static by default; React used only for interactivity. Matrix-inspired cyberpunk aesthetic with accessibility compliance. Prefer existing design tokens and utilities.

## 📋 Component Inventory

### Layout & Structure

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `MainLayout.astro` | `src/layouts/MainLayout.astro` | Global shell, meta tags, backgrounds, navbar/footer | `title`, `description`, `currentPath`, `bgSlug`, `bgEager`, `bgOpacityClass`, `bgOverlayClass` | Navbar, Footer, global styles |
| `PageHero.astro` | `src/components/PageHero.astro` | Page hero with optional background | `title` (req), `description?`, `bgSlug?`, `metaText?`, `eager?` | MainLayout, background images |

#### MainLayout.astro
**Purpose:** Global shell wrapping all pages with consistent navigation, footer, and meta tags.

**Key Features:**
- Dynamic meta tags based on page props
- Background image orchestration with opacity controls
- Font loading and optimization
- SEO meta tags and Open Graph
- Structured data integration

**Usage:**
```astro
---
import MainLayout from '../layouts/MainLayout.astro';

const title = "Projects | Vasileios Politeiadis";
const description = "Selected work and case studies";
const currentPath = "/projects";
const bgSlug = "projects-bg";
---

<MainLayout
  title={title}
  description={description}
  currentPath={currentPath}
  bgSlug={bgSlug}
  bgEager={true}
>
  <!-- Page content -->
</MainLayout>
```

#### PageHero.astro
**Purpose:** Consistent page headers with optional backgrounds and metadata.

**Props:**
- `title` (required): Page title
- `description` (optional): Page description
- `bgSlug` (optional): Background image identifier
- `metaText` (optional): Additional metadata text
- `eager` (optional): Load background immediately

**Usage:**
```astro
---
import PageHero from '../components/PageHero.astro';
---

<PageHero
  title="Projects"
  description="Selected work and case studies"
  bgSlug="projects-bg"
  eager
/>
```

### Navigation & Chrome

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `Navbar.astro` | `src/components/Navbar.astro` | Compact Matrix-inspired top nav with scroll spy and neon styling | `currentPath?` | `/public/scripts/navbar.js` (mobile menu), Intersection Observer API, global styles |
| `Footer.astro` | `src/components/Footer.astro` | Footer with social links and branding | — | SocialLink components |

### Hero & Animation

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `Hero.astro` | `src/components/Hero.astro` | Home hero with matrix rain, ElectricBorder avatar, and dynamic subtitle | — | HeroAnimationController, ElectricBorder, `/public/scripts/matrix-rain.js` |
| `HeroSection.tsx` | `src/components/hero/HeroSection.tsx` | GSAP-powered hero section with floating animations for illustrations and laptop graphics | — | React, GSAP, public folder images |
| `HeroIntro.astro` | `src/components/hero/HeroIntro.astro` | Hero intro section with chat layout (uses HeroSection) | — | HeroSection |
| `HeroAnimationController.tsx` | `src/components/HeroAnimationController.tsx` | React component managing hero animation sequence | `quotes: string[]` (14 professional quotes) | DecryptedText, TextType |
| `DecryptedText.tsx` | `src/components/DecryptedText.tsx` | Matrix-style text decryption effect | `text: string`, `speed?: number`, `className?: string` | React, CSS animations |
| `TextType.tsx` | `src/components/TextType.tsx` | Typing/erasing text rotator with cursor | `text: string \| string[]`, `typingSpeed?`, `deletingSpeed?`, `pauseDuration?`, `showCursor?`, `cursorCharacter?`, `cursorClassName?`, `className?`, `startOnVisible?` | React, CSS animations |
| `FuzzyText.tsx` | `src/components/FuzzyText.tsx` | Canvas-based fuzzy text effect with hover interactions | `children`, `fontSize?`, `fontWeight?`, `fontFamily?`, `color?`, `enableHover?`, `baseIntensity?`, `hoverIntensity?` | React, Canvas API, requestAnimationFrame |

### Sections & Page Layouts

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `AboutSection.astro` | `src/components/AboutSection.astro` | Comprehensive profile showcase with work experience, education, and certifications | `profileImageSrc: string` | ProfileCard, structured data |
| `ProjectsSection.astro` | `src/components/ProjectsSection.astro` | Featured projects showcase with GSAP animations | — | GSAP animations, public images |
| `CreativeLabSection.astro` | `src/components/CreativeLabSection.astro` | Creative portfolio showcase with category-based styling and animations | — | GSAP animations, category colors |

### Cards & Containers

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `ProfileCard.tsx` | `src/components/ui/profile-card.tsx` | Interactive profile card with tilt effects, social links, and status indicators | `name: string`, `title: string`, `status?: 'Online' \| 'Offline' \| 'Away'`, `contactText?`, `avatarUrl: string`, `showUserInfo?`, `enableTilt?`, `enableMobileTilt?`, `onContactClick?`, `className?` | React, Button, Card, Icon components |
| `GlassCard.astro` | `src/components/GlassCard.astro` | Glassmorphic container with neon accent | `accent?`, `ariaLabel?`, `class?` | global.css glass-card styles |
| `HighlightBlock.astro` | `src/components/HighlightBlock.astro` | Compact highlight tile for impact points | `title: string`, `description?`, `class?` | global.css styling |
| `FeaturedProjectCard.tsx` | `src/components/FeaturedProjectCard.tsx` | Featured, rich project card (React) | `title`, `role`, `description`, `hero`, `detailUrl`, `cta`, `techStack`, `tags` | OptimizedImage, React |

### Media & Images

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `VercelImage.astro` | `src/components/VercelImage.astro` | Astro Image wrapper using built-in optimization | `src`, `alt?`, `width?`, `quality?`, `class?` | Astro Image component |
| `OptimizedImage.tsx` | `src/components/OptimizedImage.tsx` | React image helper (deprecated) | `src`, `width?`, `quality?`, plus `<img>` attrs | React, deprecated |
| `ScreenshotFrame.astro` | `src/components/ScreenshotFrame.astro` | Premium framed screenshot with neon/scanlines | `src` (req), `alt` (req), `eager?`, `width?`, `height?`, `class?` | global.css holo-frame styles |
| `LightboxGallery.tsx` | `src/components/LightboxGallery.tsx` | React lightbox grid powered by `yet-another-react-lightbox` | `items: { thumbSrc, fullSrc, alt }[]`, `className?` | React, yet-another-react-lightbox |

### Interactive Elements

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `ElectricBorder.tsx` | `src/components/ElectricBorder.tsx` | Animated electric border effect using SVG filters | `color?`, `speed?`, `chaos?`, `thickness?`, `className?`, `style?` | React, SVG filters, CSS animations |
| `NeonCTA.astro` | `src/components/NeonCTA.astro` | Neon-styled call-to-action button | `href`, `text?`, `class?` | global.css neon-cta styles |
| `SpotifyEmbed.astro` | `src/components/SpotifyEmbed.astro` | Spotify iframe helper with cyberpunk styling | `src` or (`type`, `id`), `height?`, `title?`, `theme?` | Spotify embed API |

### Icons & Graphics

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `Icon.tsx` | `src/components/icons/Icon.tsx` | Lucide icon wrapper with consistent sizing | `name: string`, `size?: 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, `className?` | React, Lucide React |

## 🔗 Component Dependencies

### Dependency Graph

```mermaid
graph TD
  A[MainLayout.astro] --> B[Navbar.astro]
  A --> C[Footer.astro]
  A --> D[/public/scripts/theme-init.js]
  B --> E[/public/scripts/navbar.js]

  F[PageHero.astro] --> A

  G[Hero.astro] --> H[HeroAnimationController.tsx]
  H --> I[DecryptedText.tsx]
  H --> J[TextType.tsx]
  H --> V[FuzzyText.tsx]
  G --> K[/public/scripts/matrix-rain.js]

  AA[HeroSection.tsx] --> AB[GSAP]
  AC[HeroIntro.astro] --> AA

  AD[AboutSection.astro] --> AE[ProfileCard.tsx]
  AD --> AF[Structured Data]

  AG[ProjectsSection.astro] --> AH[GSAP Animations]
  AI[CreativeLabSection.astro] --> AH

  AJ[FeaturedProjectCard.tsx] --> AK[OptimizedImage.tsx]
  AJ --> AL[React]
```

### Component Hierarchy

- **Layout Level**: MainLayout.astro wraps all pages
- **Page Level**: Page-specific components and content
- **Component Level**: Reusable UI components
- **Utility Level**: Helper functions and configurations

## 🎨 Design System

### Matrix-Inspired Theme

**Color Palette:**
- **Primary:** Matrix Black (#0A0A0A) + Neon Lime (#39FF14)
- **Secondary:** Digital Emerald (#00B86B) + Cyber Gray (#222222)
- **Typography:** Orbitron (headings) + Inter (body)
- **Effects:** Neon glows, glassmorphism, animated elements

### Design Tokens

**CSS Custom Properties:**
```css
:root {
  --matrix-black: #0A0A0A;
  --neon-lime: #39FF14;
  --digital-emerald: #00B86B;
  --cyber-gray: #222222;
  --neon-glow: 0 0 10px var(--neon-lime);
}
```

### Utility Classes

**Neon Effects:**
```css
.neon-text {
  color: var(--neon-lime);
  text-shadow: var(--neon-glow);
}

.neon-border {
  border: 1px solid var(--neon-lime);
  box-shadow: var(--neon-glow);
}
```

**Glassmorphism:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

## 📱 Responsive Design

### Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Mobile-First Approach

```css
/* Mobile first */
.component {
  font-size: 14px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    font-size: 16px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    font-size: 18px;
  }
}
```

## ♿ Accessibility

### WCAG 2.1 AA Compliance

**Color Contrast:**
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Neon accents over dark backgrounds meet AA standards

**Keyboard Navigation:**
- All interactive elements focusable
- Logical tab order
- Visible focus indicators

**Screen Reader Support:**
- Proper ARIA labels and roles
- Semantic HTML structure
- Alt text for all images

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
  }
}
```

## 🔧 Component Development

### Creating New Components

**Astro Component Template:**
```astro
---
// ComponentName.astro
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="component">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>

<style>
  .component {
    @apply text-cyber-gray;
  }
</style>
```

**React Component Template:**
```tsx
// ComponentName.tsx
import { useState } from 'react';

interface Props {
  title: string;
  onAction?: () => void;
}

export function ComponentName({ title, onAction }: Props) {
  return (
    <div className="component">
      <h2>{title}</h2>
      {onAction && (
        <button onClick={onAction}>
          Action
        </button>
      )}
    </div>
  );
}
```

### Component Guidelines

- **Single Responsibility:** Each component has one clear purpose
- **Props Interface:** Typed props for all components
- **Default Props:** Sensible defaults where appropriate
- **CSS Modules:** Scoped styling to avoid conflicts
- **Performance:** Lazy load heavy components when possible

## 🖼️ Image Optimization

### Astro Image Component

**Usage:**
```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/images/hero.webp';
---

<Image
  src={heroImage}
  alt="Hero image"
  width={800}
  height={600}
  loading="eager"
  fetchpriority="high"
/>
```

### Vercel Image API

**Automatic Optimization:**
- WebP/AVIF format selection
- Responsive width optimization
- On-demand image processing
- Global CDN distribution

## 🎭 Animation Patterns

### GSAP Integration

**Basic Animation:**
```typescript
import { gsap } from 'gsap';

gsap.from('.element', {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'power2.out'
});
```

### Reduced Motion Respect

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Run animations
}
```

## 🧪 Component Testing

### Accessibility Testing

```typescript
// axe-core integration
import axe from 'axe-core';

test('component is accessible', async ({ page }) => {
  await page.goto('/component-page');
  const results = await page.evaluate(() => axe.run());
  expect(results.violations).toHaveLength(0);
});
```

### Visual Regression Testing

```typescript
test('component matches design', async ({ page }) => {
  await page.goto('/component-page');
  await expect(page).toHaveScreenshot();
});
```

## 📚 Related Documentation

- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Development setup and coding standards
- **[CONTENT.md](./CONTENT.md)** - Content collections and management
- **[SEO.md](./SEO.md)** - Search engine optimization
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common component issues

---

**Need to add a component?** Follow the [development guidelines](./DEVELOPMENT.md) and ensure accessibility compliance. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common integration issues.