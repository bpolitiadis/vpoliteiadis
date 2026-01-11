# 🧩 Components

**Who this is for:** Frontend developers building and extending UI components and layouts.

**What you'll learn:** Component inventory, usage patterns, props, dependencies, and integration guidelines.

> **TL;DR** - Astro components are static by default; React used only for interactivity. Matrix-inspired cyberpunk aesthetic with accessibility compliance. Prefer existing design tokens and utilities.

## 📋 Component Inventory

### Layout & Structure

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `MainLayout.astro` | `src/layouts/MainLayout.astro` | Global shell, meta tags, backgrounds, navbar/footer | `title`, `description`, `currentPath`, `bgSlug`, `bgEager`, `bgOpacityClass`, `bgOverlayClass` | Navbar, Footer, global styles |

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

### Navigation & Chrome

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `Navbar.astro` | `src/components/Navbar.astro` | Compact Matrix-inspired top nav with scroll spy and neon styling | `currentPath?` | `/public/scripts/navbar.js` (mobile menu), Intersection Observer API, global styles |
| `Footer.astro` | `src/components/Footer.astro` | Footer with social links and branding | — | SocialLink components |
| `Breadcrumb.astro` | `src/components/Breadcrumb.astro` | Navigation breadcrumb with JSON-LD structured data | `items: BreadcrumbItem[]`, `class?: string` | SchemaOrg component |

#### Breadcrumb.astro
**Purpose:** Navigation breadcrumb with JSON-LD structured data for SEO.

**Props:**
- `items` (required): Array of breadcrumb items (name, href)
- `class` (optional): Additional CSS classes

**Usage:**
```astro
---
import Breadcrumb from '../components/Breadcrumb.astro';
---

<Breadcrumb items={[
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Article Title', href: '/blog/article' }
]} />
```

#### SocialLink.astro
**Purpose:** Social media link with platform-specific icons and accessibility.

**Props:**
- `profile` (required): Social profile object with platform, username, displayName, deepLink, webUrl, icon, ariaLabel
- `className` (optional): Additional CSS classes
- `size` (optional): Icon size ('sm', 'md', 'lg')

**Usage:**
```astro
---
import SocialLink from '../components/SocialLink.astro';

const githubProfile = {
  platform: 'github',
  username: 'bpolitiadis',
  displayName: 'Vasileios Politeiadis',
  deepLink: 'github://user?username=bpolitiadis',
  webUrl: 'https://github.com/bpolitiadis',
  icon: 'github',
  ariaLabel: 'Visit my GitHub profile'
};
---

<SocialLink profile={githubProfile} size="lg" />
```

### Hero & Animation

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `Hero.astro` | `src/components/Hero.astro` | Home hero with matrix rain, ElectricBorder avatar, and dynamic subtitle | — | HeroAnimationController, ElectricBorder, `/public/scripts/matrix-rain.js` |
| `HeroSection.astro` | `src/components/hero/HeroSection.astro` | Static hero section with GSAP animations, optimized images, and floating illustrations | — | GSAP, Astro assets |
| `HeroSection.tsx` | `src/components/hero/deprecated/HeroSection.tsx` | ⚠️ DEPRECATED - GSAP-powered React hero section | — | React, GSAP |
| `HeroAnimationController.tsx` | `src/components/HeroAnimationController.tsx` | React component managing hero animation sequence | `quotes: string[]` (14 professional quotes) | DecryptedText, TextType |
| `DecryptedText.tsx` | `src/components/DecryptedText.tsx` | Matrix-style text decryption effect with scroll-triggered animations | `text: string`, `speed?: number`, `sequential?: boolean`, `revealDirection?: 'start' \| 'end' \| 'center'`, `animateOn?: 'view' \| 'hover'`, `className?: string`, `encryptedClassName?: string`, `revealedStyle?: React.CSSProperties` | React, IntersectionObserver |
| `TextType.tsx` | `src/components/TextType.tsx` | Typing/erasing text rotator with cursor | `text: string \| string[]`, `typingSpeed?`, `deletingSpeed?`, `pauseDuration?`, `showCursor?`, `cursorCharacter?`, `cursorClassName?`, `className?`, `startOnVisible?` | React, CSS animations |
| `TextAnimation.tsx` | `src/components/TextAnimation.tsx` | Advanced text animation effects component | `text: string`, `effect?: 'fadeIn' \| 'slideUp' \| 'typewriter' \| 'glitch'`, `duration?: number`, `delay?: number`, `className?: string` | React, GSAP, CSS animations |
| `FuzzyText.tsx` | `src/components/FuzzyText.tsx` | Canvas-based fuzzy text effect with hover interactions | `children`, `fontSize?`, `fontWeight?`, `fontFamily?`, `color?`, `enableHover?`, `baseIntensity?`, `hoverIntensity?` | React, Canvas API, requestAnimationFrame |
| `LetterGlitch.tsx` | `src/components/LetterGlitch.tsx` | Canvas-based letter glitch effect with customizable colors and speed | `glitchColors?`, `glitchSpeed?`, `centerVignette?`, `outerVignette?`, `smooth?` | React, Canvas API |

#### DecryptedText.tsx
**Purpose:** Matrix-style text decryption animation that reveals characters sequentially. Supports both scroll-triggered (view) and hover-triggered animations.

**Key Features:**
- **Scroll-triggered animations**: Uses IntersectionObserver for reliable scroll-triggered animations
- **Early visibility detection**: Automatically detects if element is already visible on page load (above the fold or hash navigation)
- **Sequential character reveal**: Characters decrypt one-by-one in configurable direction (start, end, center)
- **Accessibility**: Respects `prefers-reduced-motion` and provides screen reader support
- **Simplified implementation**: No GSAP dependency, uses native browser APIs only

**Animation Behavior:**
- **Above the fold**: When element is visible on page load, animation triggers immediately after mount
- **Below the fold**: When element requires scrolling, IntersectionObserver fires when element enters viewport (15% threshold)
- **Hash navigation**: Direct links to sections (e.g., `#about`) trigger animation even if element is already visible

**Props:**
- `text` (required): Text to decrypt
- `speed` (optional): Milliseconds between character reveals (default: 50)
- `sequential` (optional): Reveal characters one-by-one vs all at once (default: true)
- `revealDirection` (optional): 'start' | 'end' | 'center' - direction of character reveal (default: 'start')
- `animateOn` (optional): 'view' | 'hover' - trigger type (default: 'view')
- `className` (optional): CSS classes for revealed text
- `encryptedClassName` (optional): CSS classes for scrambled characters
- `revealedStyle` (optional): Inline styles for revealed characters (useful for gradients/glows)
- `reAnimateOnView` (optional): Re-animate when scrolling back into view (default: false)

**Usage:**
```tsx
import DecryptedText from '../components/DecryptedText';

// Basic usage - scroll-triggered
<DecryptedText
  client:visible
  text="Who am I?"
  speed={60}
  sequential={true}
  revealDirection="start"
  className="text-neon-lime"
  encryptedClassName="text-primary/40"
/>

// With custom revealed styles (gradient text)
<DecryptedText
  client:visible
  text="Creative Lab"
  revealedStyle={{
    background: 'linear-gradient(135deg, #00FFFF 0%, #00BFFF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }}
/>

// Hover-triggered animation
<DecryptedText
  text="Hover me"
  animateOn="hover"
  speed={30}
/>
```

**Technical Notes:**
- Uses `client:visible` directive for optimal performance (hydrates when element enters viewport)
- Uses IntersectionObserver for reliable scroll detection (no GSAP dependency)
- Prevents double-triggering with ref-based animation guard
- Simplified implementation reduces complexity and improves reliability

#### LetterGlitch.tsx
**Purpose:** Canvas-based letter glitch effect component with customizable glitch colors and speed.

**Props:**
- `glitchColors` (optional): Array of hex color strings for glitch effects
- `glitchSpeed` (optional): Speed of glitch animation (default: 50)
- `centerVignette` (optional): Enable center vignette effect
- `outerVignette` (optional): Enable outer vignette effect (default: true)
- `smooth` (optional): Enable smooth animation (default: true)

**Usage:**
```tsx
import LetterGlitch from '../components/LetterGlitch';

function MyComponent() {
  return (
    <LetterGlitch
      glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
      glitchSpeed={75}
      centerVignette={false}
      outerVignette={true}
      smooth={true}
    >
      <h1>GLITCHED TEXT</h1>
    </LetterGlitch>
  );
}
```

### Sections & Page Layouts

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `AboutSection.astro` | `src/components/AboutSection.astro` | Comprehensive profile showcase with work experience, education, and certifications | `profileImageSrc: string` | ProfileCard, TimelineItem, structured data |
| `TimelineItem.astro` | `src/components/sections/TimelineItem.astro` | Reusable timeline item component for work experience, education, and certifications | `item: TimelineItemData` | — |
| `ProjectsSection.astro` | `src/components/ProjectsSection.astro` | Featured projects showcase with scroll-triggered animations | — | ProjectCard, public images |
| `CreativeLabSection.astro` | `src/components/CreativeLabSection.astro` | Creative portfolio showcase with category-based styling and staggered animations | — | category colors |
| `ContactSection.astro` | `src/components/ContactSection.astro` | Contact form section with background image and animations | — | ContactForm, ContactCards, AImage |

#### ContactSection.astro
**Purpose:** Contact form section with background image, animations, and structured layout.

**Props:** None - configured via internal components

**Usage:**
```astro
---
import ContactSection from '../components/ContactSection.astro';
---

<ContactSection />
```

#### TimelineItem.astro
**Purpose:** Reusable timeline item component for displaying work experience, education, and certifications with consistent styling and hover effects.

**Props:**
- `item` (required): TimelineItemData object with period, title, subtitle, url, description, skills, and isCurrent flag

**Features:**
- Responsive grid layout (stacked on mobile, side-by-side on desktop)
- Color-coded current vs. past items
- Hover effects with border and background transitions
- Skills badges support
- External link handling with proper accessibility

**Usage:**
```astro
---
import TimelineItem from '../components/sections/TimelineItem.astro';

const workItem = {
  period: "2024 — PRESENT",
  title: "Senior QA Automation Specialist",
  subtitle: "VASS",
  url: "https://example.com",
  description: "Leading test automation...",
  skills: ["Java", "Selenium"],
  isCurrent: true
};
---

<TimelineItem item={workItem} />
```

### SEO & Metadata

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `SchemaOrg.astro` | `src/components/SchemaOrg.astro` | JSON-LD structured data for rich snippets | `schema: Record<string, unknown>` | — |


#### SchemaOrg.astro
**Purpose:** Renders JSON-LD structured data for SEO and rich snippets.

**Props:**
- `schema` (required): Schema.org structured data object (will automatically add @context)

**Usage:**
```astro
---
import SchemaOrg from '../components/SchemaOrg.astro';
---

<SchemaOrg schema={{
  "@type": "Person",
  "name": "Vasileios Politeiadis",
  "jobTitle": "Senior QA Automation Specialist"
}} />
```

### Cards & Containers

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `BlogPostCard.astro` | `src/components/BlogPostCard.astro` | Blog post preview card with cover image, metadata, and tags | `post: BlogPostMeta`, `class?: string` | AImage, global styles |
| `ProfileCard.tsx` | `src/components/ui/profile-card.tsx` | Interactive profile card with tilt effects, social links, and status indicators | `name: string`, `title: string`, `status?: 'Online' \| 'Offline' \| 'Away'`, `contactText?`, `avatarUrl: string`, `showUserInfo?`, `enableTilt?`, `enableMobileTilt?`, `onContactClick?`, `className?` | React, Button, Card, Icon components |
| `GlassCard.astro` | `src/components/GlassCard.astro` | Glassmorphic container with neon accent | `accent?`, `ariaLabel?`, `class?` | global.css glass-card styles |
| `CreativeCard.astro` | `src/components/CreativeCard.astro` | Creative portfolio project card with hover effects and tool badges | `project: CreativeProject`, `class?: string` | AImage, ExternalLink, global styles |
| `ProjectCard.astro` | `src/components/ProjectCard.astro` | Featured project showcase card with hover zoom and tech badges | `project: Project`, `class?: string` | AImage, global styles |
| `HighlightBlock.astro` | `src/components/HighlightBlock.astro` | Compact highlight tile for impact points | `title: string`, `description?`, `class?` | global.css styling |

#### BlogPostCard.astro
**Purpose:** Blog post preview card with cover image, metadata, and tags.

**Props:**
- `post` (required): BlogPostMeta object with slug, title, excerpt, coverImage, tags, publishedAt, readingTime
- `class` (optional): Additional CSS classes

**Usage:**
```astro
---
import BlogPostCard from '../components/BlogPostCard.astro';

const post = {
  slug: 'my-article',
  title: 'My Blog Article',
  excerpt: 'A brief description of the article...',
  coverImage: '/images/article-cover.webp',
  tags: ['javascript', 'react', 'tutorial'],
  publishedAt: '2024-01-15',
  readingTime: '5 min read'
};
---

<BlogPostCard post={post} />
```

#### CreativeCard.astro
**Purpose:** Creative portfolio project card with hover effects and tool badges.

**Props:**
- `project` (required): Creative project object with slug, title, description, hero, detailUrl, tools, cta

**Usage:**
```astro
---
import CreativeCard from '../components/CreativeCard.astro';

const project = {
  slug: 'digital-artwork',
  title: 'Digital Artwork',
  description: 'Interactive digital art piece',
  hero: '/images/artwork.webp',
  detailUrl: '/creative/digital-artwork',
  tools: ['Photoshop', 'Illustrator', 'After Effects'],
  cta: { label: 'View Project', href: '/creative/digital-artwork' }
};
---

<CreativeCard project={project} />
```

### Media & Images

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `VercelImage.astro` | `src/components/VercelImage.astro` | Astro Image wrapper using built-in optimization | `src`, `alt?`, `width?`, `quality?`, `class?` | Astro Image component |
| `OptimizedImage.tsx` | `src/components/OptimizedImage.tsx` | React image helper (deprecated) | `src`, `width?`, `quality?`, plus `<img>` attrs | React, deprecated |
| `ScreenshotFrame.astro` | `src/components/ScreenshotFrame.astro` | Premium framed screenshot with neon/scanlines | `src` (req), `alt` (req), `eager?`, `width?`, `height?`, `class?` | global.css holo-frame styles |
| `LightboxGallery.tsx` | `src/components/LightboxGallery.tsx` | React lightbox grid powered by `yet-another-react-lightbox` | `items: { thumbSrc, fullSrc, alt }[]`, `className?` | React, yet-another-react-lightbox |
| `AImage.astro` | `src/components/media/AImage.astro` | Unified image component with responsive optimization | `src`, `alt`, `preset?`, `sizes?`, `loading?`, `width?`, `height?` | Astro Image, image-presets |

#### AImage.astro
**Purpose:** Unified image component with responsive optimization and performance presets.

**Props:**
- `src` (required): ImageMetadata (preferred) or static path string
- `alt` (required): Alt text for accessibility
- `preset` (optional): Responsive preset ('hero', 'card', 'thumb')
- `sizes` (optional): Custom sizes attribute
- `loading` (optional): Loading strategy ('eager', 'lazy')
- `width/height` (optional): Explicit dimensions to prevent CLS

**Usage:**
```astro
---
import AImage from '../components/media/AImage.astro';
import heroImage from '../../assets/images/hero.webp';
---

<!-- Preferred: Imported ImageMetadata -->
<AImage
  src={heroImage}
  alt="Hero image"
  preset="hero"
  loading="eager"
/>

<!-- Legacy: Static path (deprecated) -->
<AImage
  src="/images/hero.webp"
  alt="Hero image"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

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

### UI Components (shadcn/ui)

| Component | Path | Purpose | Key Props | Dependencies |
|-----------|------|---------|-----------|--------------|
| `Button.tsx` | `src/components/ui/button.tsx` | Cyberpunk-styled button with neon glow effects | `variant?`, `size?`, `asChild?` | React, class-variance-authority |
| `Card.tsx` | `src/components/ui/card.tsx` | Glassmorphic card container with cyberpunk styling | — | React, tailwind-merge |
| `Avatar.tsx` | `src/components/ui/avatar.tsx` | Profile avatar component with fallback | `src?`, `alt?`, `fallback?` | React, Radix UI Avatar |
| `Badge.tsx` | `src/components/ui/badge.tsx` | Status and category badges | `variant?`, `className?` | React, class-variance-authority |
| `Dialog.tsx` | `src/components/ui/dialog.tsx` | Modal dialog component | `open?`, `onOpenChange?` | React, Radix UI Dialog |
| `DropdownMenu.tsx` | `src/components/ui/dropdown-menu.tsx` | Dropdown menu component | — | React, Radix UI Dropdown Menu |
| `Form.tsx` | `src/components/ui/form.tsx` | Form components with validation | — | React, React Hook Form |
| `Input.tsx` | `src/components/ui/input.tsx` | Text input component | — | React |
| `Label.tsx` | `src/components/ui/label.tsx` | Form label component | — | React, Radix UI Label |
| `Progress.tsx` | `src/components/ui/progress.tsx` | Progress bar component | `value?`, `className?` | React, Radix UI Progress |
| `Select.tsx` | `src/components/ui/select.tsx` | Select dropdown component | — | React, Radix UI Select |
| `Separator.tsx` | `src/components/ui/separator.tsx` | Visual separator component | `orientation?`, `className?` | React, Radix UI Separator |
| `Textarea.tsx` | `src/components/ui/textarea.tsx` | Multi-line text input | — | React |

#### Button.tsx
**Purpose:** Cyberpunk-styled button with neon glow effects and multiple variants.

**Variants:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
**Sizes:** `default`, `sm`, `lg`, `icon`

**Usage:**
```tsx
import { Button } from '../components/ui/button';

function MyComponent() {
  return (
    <Button variant="default" size="lg">
      Click Me
    </Button>
  );
}
```

#### Card.tsx
**Purpose:** Glassmorphic card container with cyberpunk styling.

**Sub-components:** `CardHeader`, `CardContent`, `CardFooter`, `CardTitle`, `CardDescription`

**Usage:**
```tsx
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/card';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
    </Card>
  );
}
```

## 🔗 Component Dependencies

### Dependency Graph

```mermaid
graph TD
  A[MainLayout.astro] --> B[Navbar.astro]
  A --> C[Footer.astro]
  A --> D[/public/scripts/theme-init.js]
  B --> E[/public/scripts/navbar.js]

  G[Hero.astro] --> H[HeroAnimationController.tsx]
  H --> I[DecryptedText.tsx]
  H --> J[TextType.tsx]
  H --> V[FuzzyText.tsx]
  G --> K[/public/scripts/matrix-rain.js]

  AA[HeroSection.astro] --> AB[GSAP]

  AD[AboutSection.astro] --> AE[ProfileCard.tsx]
  AD --> AF[Structured Data]

  AG[ProjectsSection.astro] --> AH[Centralized Animation System]
  AI[CreativeLabSection.astro] --> AH
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