# Components Reference

Who this is for: developers reusing/extending UI blocks.
What you'll learn: inventory, purpose, props, and dependencies.

> TL;DR
> - Astro components are static by default; React used where needed.
> - Prefer existing tokens/utilities for consistent UI.

## Inventory (by domain)

### Layout

| Path | Purpose | Key props |
|---|---|---|
| `src/layouts/MainLayout.astro` | Global shell, meta, backgrounds, navbar/footer | `title`, `description`, `currentPath`, `bgSlug`, `bgEager`, `bgOpacityClass`, `bgOverlayClass` |

### Navigation & chrome

| Path | Purpose | Key props |
|---|---|---|
| `src/components/Navbar.astro` | Compact Matrix-inspired top nav with neon styling | `currentPath?` |
| `src/components/Footer.astro` | Footer with social links | — |

### Sections/Blocks

| Path | Purpose | Key props |
|---|---|---|
| `src/components/Hero.astro` | Home hero with matrix rain and dynamic subtitle | — |
| `src/components/PageHero.astro` | Page hero with optional background | `title` (req), `description?`, `bgSlug?`, `metaText?`, `eager?` |
| `src/components/GlassCard.astro` | Glassmorphic container with neon accent | `accent?`, `ariaLabel?`, `class?` |
| `src/components/HighlightBlock.astro` | Compact highlight tile for impact points | `title` (req), `description?`, `class?` |

### Cards

| Path | Purpose | Key props |
|---|---|---|
| `src/components/ProjectCard.astro` | Project card (from content collection) | `project` (object with `slug`, `data`) |
| `src/components/CreativeCard.astro` | Creative piece card | `creative` (object with `slug`, `data`) |
| `src/components/FeaturedProjectCard.tsx` | Featured, rich project card (React) | see props in file (`title`, `role`, `description`, `hero`, `detailUrl`, `cta`, etc.) |

### Media & embeds

| Path | Purpose | Key props |
|---|---|---|
| `src/components/SpotifyEmbed.astro` | Spotify iframe helper | `src` or (`type`, `id`); `height?`, `title?`, `theme?` |
| `src/components/VercelImage.astro` | Image helper using Vercel optimizer in prod | `src`, `alt?`, `width?`, `quality?`, `class?` |
| `src/components/OptimizedImage.tsx` | React image helper (Vercel optimizer aware) | `src`, `width?`, `quality?`, plus `<img>` attrs |
| `src/components/LightboxGallery.tsx` | React lightbox grid powered by `yet-another-react-lightbox` | `items: { thumbSrc, fullSrc, alt }[]`, `className?` |
| `src/components/ScreenshotFrame.astro` | Premium framed screenshot with neon/scanlines | `src` (req), `alt` (req), `eager?`, `width?`, `height?`, `class?` |
| `src/components/TextType.tsx` | Typing/erasing text rotator with cursor | `text` (string or string[]), `typingSpeed?`, `deletingSpeed?`, `pauseDuration?`, `showCursor?`, `cursorCharacter?`, `cursorClassName?`, `className?`, `startOnVisible?` |

### Modals

| Path | Purpose | Key props |
|---|---|---|
| `src/components/CreativeModal.astro` | Accessible modal/lightbox for creative items (inline script) | `id` |

## Dependencies between components

```mermaid
graph LR
  PageHero --> MainLayout
  ProjectCard --> VercelImage
  CreativeCard --> VercelImage
  FeaturedProjectCard --> OptimizedImage
  Navbar --> /public/scripts/navbar.js
  Hero --> /public/scripts/matrix-rain.js, TextType
```

## Usage examples
### ProjectCard HUD metadata

The `ProjectCard` uses a glassmorphic neon panel with a framed cover image, concise blurb, and a HUD-style metadata block:

- Focus: highlighted in neon
- Tech: first three items from `techStack`

**Dual CTA Layout:**
- **Learn More**: Transparent button with document icon, links to case study page
- **View Live**: Neon holographic button (when `liveUrl` exists), links to external project

Buttons are stacked vertically on mobile, horizontal on larger screens.

### Navbar Component

The redesigned `Navbar` component features a compact, Matrix-inspired design:

**Key Features:**
- **Compact Height**: 60px desktop, 50px mobile
- **Neon Styling**: Dark background with neon-lime accents
- **Active States**: Glowing underline instead of filled buttons
- **Responsive**: Horizontal desktop nav, hamburger mobile menu

**Styling Classes:**
- `.navbar-compact`: Main container with gradient background
- `.nav-link-desktop`: Desktop navigation links with hover effects
- `.nav-active-indicator`: Active page glowing underline
- `.mobile-menu-btn`: Mobile menu button with cyan styling
- `.mobile-menu`: Mobile dropdown with backdrop blur

**Future Enhancements:**
- Background texture support via `.navbar-bg-texture` class
- Matrix glyph patterns or cyber-grid overlays
- Enable by uncommenting texture div in component

Minimal `PageHero`:

```astro
---
import PageHero from '../components/PageHero.astro';
---
<PageHero title="Projects" description="Selected work" bgSlug="projects-bg" eager />
```

Hero with dynamic subtitle:

```astro
---
import Hero from '../components/Hero.astro';
---
<Hero />
<!-- Automatically includes:
- Matrix rain background
- Avatar with neon glow
- DecryptedText headline
- Dynamic subtitle with TextType quotes
- CTA buttons with animations -->
```

Glass card + CTA snippet:

```astro
---
import GlassCard from '../components/GlassCard.astro';
import NeonCTA from '../components/NeonCTA.astro';
---
<GlassCard class="mb-6">
  <p class="text-sm text-text-muted">Concise body copy inside a glass card.</p>
</GlassCard>
<NeonCTA href="https://example.com">View Live Project</NeonCTA>
```
