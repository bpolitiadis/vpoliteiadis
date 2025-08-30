# 🧩 Components Reference

**Who this is for:** Frontend developers reusing/extending UI blocks and components.  
**What you'll learn:** Component inventory, purpose, props, dependencies, and usage patterns.

> **TL;DR** - Astro components are static by default; React used only where needed for interactivity. Prefer existing design tokens and utilities for consistent UI. Components follow Matrix-inspired cyberpunk aesthetic with accessibility compliance.

## 📋 Component Inventory

### Layout & Structure

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `MainLayout.astro` | `src/layouts/MainLayout.astro` | Global shell, meta tags, backgrounds, navbar/footer | `title`, `description`, `currentPath`, `bgSlug`, `bgEager`, `bgOpacityClass`, `bgOverlayClass` | Navbar, Footer, global styles |
| `PageHero.astro` | `src/components/PageHero.astro` | Page hero with optional background | `title` (req), `description?`, `bgSlug?`, `metaText?`, `eager?` | MainLayout, background images |

### Navigation & Chrome

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `Navbar.astro` | `src/components/Navbar.astro` | Compact Matrix-inspired top nav with neon styling | `currentPath?` | `/public/scripts/navbar.js` (mobile menu), global styles |
| `Footer.astro` | `src/components/Footer.astro` | Footer with social links and branding | — | SocialLink components |

### Hero & Animation

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `Hero.astro` | `src/components/Hero.astro` | Home hero with matrix rain, ElectricBorder avatar, and dynamic subtitle | — | HeroAnimationController, ElectricBorder, `/public/scripts/matrix-rain.js` |
| `HeroAnimationController.tsx` | `src/components/HeroAnimationController.tsx` | React component managing hero animation sequence | `quotes: string[]` (14 professional quotes) | DecryptedText, TextType |

**Note:** The Hero component now includes a curated array of 14 professional quotes that rotate through the TextType animation, including phrases like "Certified bug hunter", "Automating workflows, amplifying humans", and "Partnering with AI to outpace time". The avatar now features an ElectricBorder effect for enhanced visual appeal.
| `DecryptedText.tsx` | `src/components/DecryptedText.tsx` | Matrix-style text decryption effect | `text: string`, `speed?: number`, `className?: string` | React, CSS animations |
| `TextType.tsx` | `src/components/TextType.tsx` | Typing/erasing text rotator with cursor | `text: string \| string[]`, `typingSpeed?`, `deletingSpeed?`, `pauseDuration?`, `showCursor?`, `cursorCharacter?`, `cursorClassName?`, `className?`, `startOnVisible?` | React, CSS animations |

### Cards & Containers

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `GlassCard.astro` | `src/components/GlassCard.astro` | Glassmorphic container with neon accent | `accent?`, `ariaLabel?`, `class?` | global.css glass-card styles |
| `HighlightBlock.astro` | `src/components/HighlightBlock.astro` | Compact highlight tile for impact points | `title: string`, `description?`, `class?` | global.css styling |
| `ProjectCard.astro` | `src/components/ProjectCard.astro` | Project card from content collection | `project: { slug, data }` | VercelImage, global.css card styles |
| `FeaturedProjectCard.tsx` | `src/components/FeaturedProjectCard.tsx` | Featured, rich project card (React) | `title`, `role`, `description`, `hero`, `detailUrl`, `cta`, `techStack`, `tags` | OptimizedImage, React |

### Media & Images

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `VercelImage.astro` | `src/components/VercelImage.astro` | Image helper using Vercel optimizer in production | `src`, `alt?`, `width?`, `quality?`, `class?` | Astro Image component |
| `OptimizedImage.tsx` | `src/components/OptimizedImage.tsx` | React image helper (Vercel optimizer aware) | `src`, `width?`, `quality?`, plus `<img>` attrs | React, Vercel Image API |
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
  G --> K[/public/scripts/matrix-rain.js]
  
  L[ProjectCard.astro] --> M[VercelImage.astro]
  N[FeaturedProjectCard.tsx] --> O[OptimizedImage.tsx]
  
  P[Footer.astro] --> Q[SocialLink.astro]
  
  R[LightboxGallery.tsx] --> S[yet-another-react-lightbox]
  
  T[ElectricBorder.tsx] --> U[SVG Filters]
  T --> V[CSS Animations]
  
  W[contact.astro] --> X[/public/scripts/contact-form.js]
  Y[blog/index.astro] --> Z[/public/scripts/blog-index.js]
```

### Script Dependencies
- **`/public/scripts/navbar.js`**: Mobile navigation toggle and compact navbar behavior (used in `Navbar.astro`)
- **`/public/scripts/matrix-rain.js`**: Matrix-style background animation (used in `Hero.astro`)
- **`/public/scripts/contact-form.js`**: Contact form validation and submission (used in `contact.astro`)
- **`/public/scripts/theme-init.js`**: Theme initialization and persistence (used in `MainLayout.astro`)
- **`/public/scripts/blog-index.js`**: Blog post indexing and data attributes (used in `blog/index.astro`)

### Unused Scripts (Documentation Cleanup Required)
- **`/public/scripts/blog-filter.js`**: Blog filtering functionality (exists but not used - blog page has no filters)
- **`/public/scripts/creative-modal.js`**: Creative portfolio modal functionality (exists but not used)
- **`/public/scripts/scroll-reveal.js`**: Scroll-triggered animations (exists but not used)

> **Note:** These scripts exist in the codebase but are not currently integrated into any components. They represent planned functionality that may be implemented in future updates. The documentation has been updated to reflect only the currently active script dependencies.

## 🎨 Component Theming

### Design System Integration
All components use the established design tokens from `src/styles/global.css`:

```css
/* Primary brand colors */
--primary: #39FF14;        /* Neon Lime */
--secondary: #00B86B;      /* Digital Emerald */
--background: #0A0A0A;     /* Matrix Black */
--foreground: #E8FFE8;     /* Matrix White */

/* Component-specific utilities */
.btn-primary, .btn-secondary, .filter-btn-compact
.glass-card, .holo-frame, .neon-cta
```

### Responsive Design
Components follow mobile-first responsive patterns:

```css
/* Example responsive pattern */
.container {
  @apply px-4 md:px-6 lg:px-8;
  @apply py-6 md:py-8 lg:py-12;
}

.hero-content {
  @apply text-center md:text-left;
  @apply space-y-4 md:space-y-6;
}
```

## 📱 Usage Examples

> **Current Implementation Status:** Some documented features are planned but not yet implemented. The blog page shows posts without filtering, and the projects page shows featured projects only. Filtering scripts exist in the codebase but are not integrated.

### Minimal PageHero
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

### Hero with Animation Sequence
```astro
---
import Hero from '../components/Hero.astro';
---
<Hero />
<!-- Automatically includes:
- Matrix rain background via matrix-rain.js
- Avatar with ElectricBorder animation
- HeroAnimationController managing:
  - DecryptedText headline animation
  - TextType subtitle with rotating quotes (starts immediately)
  - CTA buttons (animate after first quote completes)
- Timing: Typing 45ms, deleting 25ms, pause 1500ms between quotes -->
```

### Glass Card with CTA
```astro
---
import GlassCard from '../components/GlassCard.astro';
import NeonCTA from '../components/NeonCTA.astro';
---
<GlassCard class="mb-6" accent>
  <p class="text-sm text-text-muted">
    Concise body copy inside a glass card with neon accent line.
  </p>
</GlassCard>
<NeonCTA href="https://example.com">View Live Project</NeonCTA>
```

### Project Card with HUD Metadata
```astro
---
import ProjectCard from '../components/ProjectCard.astro';
---
<ProjectCard project={project} />
<!-- Features:
- Glassmorphic neon panel with framed cover image
- Concise blurb and HUD-style metadata block
- Tech stack highlights (first three items)
- Dual CTA layout: Learn More + View Live (when available)
- Responsive: vertical stack on mobile, horizontal on desktop
- Note: Projects page currently shows featured projects only, no filtering implemented -->
```

### Electric Border Avatar
```tsx
import ElectricBorder from '../components/ElectricBorder';

<ElectricBorder
  color="#39FF14"
  speed={1}
  chaos={0.5}
  thickness={2}
  style={{ borderRadius: '50%' }}
>
  <img src="/avatar.png" alt="Avatar" />
</ElectricBorder>
```

## 🔧 Component Development

### Adding New Components
1. **Choose Framework**: Prefer Astro for static content, React only for interactivity
2. **Follow Naming**: Use PascalCase for component files
3. **Type Props**: Define TypeScript interfaces for all props
4. **Accessibility**: Include proper ARIA labels and keyboard navigation
5. **Styling**: Use existing design tokens and Tailwind utilities

### Component Template
```typescript
// src/components/NewComponent.tsx
import React from 'react';

interface NewComponentProps {
  title: string;
  description?: string;
  className?: string;
}

export default function NewComponent({ 
  title, 
  description, 
  className = '' 
}: NewComponentProps) {
  return (
    <div className={`glass-card ${className}`}>
      <h3 className="neon-heading">{title}</h3>
      {description && <p className="text-muted">{description}</p>}
    </div>
  );
}
```

### Testing Components
```bash
# Build validation
pnpm build

# Type checking
pnpm astro check

# Linting
pnpm lint

# Manual testing checklist
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Accessibility (screen reader, keyboard navigation)
- [ ] Performance (no layout shifts, efficient rendering)
- [ ] Brand consistency (colors, typography, spacing)
```

## 🎯 Performance Considerations

### Astro vs React
- **Astro Components**: Render to HTML at build time, zero JavaScript
- **React Islands**: Hydrate on demand, use sparingly for interactivity
- **Client Directives**: `client:load` for immediate hydration, `client:visible` for lazy loading

### Image Optimization
- **VercelImage**: Automatic optimization in production
- **OptimizedImage**: React wrapper with lazy loading
- **Picture Elements**: WebP/AVIF with fallbacks
- **Lazy Loading**: Images load as they enter viewport

### Bundle Optimization
- **Tree Shaking**: Only used components included in bundle
- **Code Splitting**: Automatic by Astro for optimal performance
- **CSS Inlining**: Critical styles inlined for fast rendering

## ♿ Accessibility Features

### ARIA Implementation
- **Labels**: Descriptive `aria-label` for interactive elements
- **Roles**: Proper semantic roles for complex components
- **States**: ARIA states for dynamic content updates
- **Live Regions**: Announcements for screen readers

### Keyboard Navigation
- **Tab Order**: Logical tab sequence through components
- **Focus Management**: Clear focus indicators with neon styling
- **Skip Links**: Available for keyboard users
- **Shortcuts**: Keyboard shortcuts for power users

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  .animate-glow,
  .animate-pulse-slow,
  .animate-spin-slow,
  .animate-bounce-slow,
  .animate-float,
  .animate-matrix-rain {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

## 🔄 Future Enhancements

### shadcn/ui Integration
When adopting shadcn/ui components:

```typescript
// Map design tokens to shadcn/ui theme
const theme = {
  colors: {
    primary: "hsl(var(--primary))",
    secondary: "hsl(var(--secondary))",
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
  },
  borderRadius: {
    lg: "var(--radius)",
    md: "calc(var(--radius) - 2px)",
  },
}
```

### Animation Library
If adding Framer Motion later:

```typescript
// Keep animations subtle and performant
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};
```

---

**This component system prioritizes consistency, accessibility, and performance while maintaining the Matrix-inspired cyberpunk aesthetic. Use existing patterns and tokens for new components to ensure brand consistency.**
