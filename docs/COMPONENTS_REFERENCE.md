# Components Reference

Who this is for: developers reusing/extending UI blocks.
What you’ll learn: inventory, purpose, props, and dependencies.

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
| `src/components/Navbar.astro` | Top nav with mobile menu script | `currentPath?` |
| `src/components/Footer.astro` | Footer with social links | — |

### Sections/Blocks

| Path | Purpose | Key props |
|---|---|---|
| `src/components/Hero.astro` | Home hero with matrix rain | — |
| `src/components/PageHero.astro` | Page hero with optional background | `title` (req), `description?`, `bgSlug?`, `metaText?`, `eager?` |

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
  Hero --> /public/scripts/matrix-rain.js
```

## Usage examples

Minimal `PageHero`:

```astro
---
import PageHero from '../components/PageHero.astro';
---
<PageHero title="Projects" description="Selected work" bgSlug="projects-bg" eager />
```

### Compact hero guidance

- For profile/about or detail pages, use a compact hero or small avatar-only intro rather than a full-bleed visual.
- See `src/pages/about.astro` for the compact pattern: reduced section height and a 24–32px avatar scale with subtle holographic ring.

Rendering projects (from content collection):

```astro
---
import ProjectCard from '../components/ProjectCard.astro';
import { getCollection } from 'astro:content';
const projects = await getCollection('projects');
---
{projects.map((p) => (<ProjectCard project={p} />))}
```

### LightboxGallery

Minimal usage in an Astro page:

```astro
---
import LightboxGallery from '../components/LightboxGallery.tsx';
// Build items using astro:assets for thumbs and full-size
const items = [
  { thumbSrc: '/path/thumb.webp', fullSrc: '/path/full.webp', alt: 'Artwork 1' },
];
---
<LightboxGallery items={items} client:visible />
```

Notes:
- Opens full-screen, with keyboard (Esc/arrow) and touch gestures enabled.
- Preserves original image aspect ratios in the grid (`aspect-auto`, `object-contain`).
- Theme adapts to Matrix neon via local `.yarl__*` CSS overrides in the page.
- Reuse across pages by passing `items` arrays. Large images should be optimized via `astro:assets`.
