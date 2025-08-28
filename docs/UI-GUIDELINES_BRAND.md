# UI Guidelines & Brand

Who this is for: designers/devs ensuring consistent visual identity.
What you’ll learn: tokens, typography, motifs, components, icons, motion.

> TL;DR
> - Matrix/cyberpunk aesthetic: Neon Lime + Digital Emerald on dark.
> - Orbitron for headings; Inter for body.
> - Glows, subtle glass, high contrast; respect reduced motion.

## Design tokens

From `tailwind.config.js` and `src/styles/global.css`:

| Token | Value/Notes |
|---|---|
| Colors | `matrix-black #0A0A0A`, `neon-lime #39FF14`, `digital-emerald #00B86B`, `matrix-white #E8FFE8`, `cyber-gray #222222`, plus accent variants |
| Radius | `--radius: 0.75rem` (rounded cards/buttons) |
| Shadows | custom neon/emerald/cyan/purple/pink/gold shadows |
| Fonts | `Orbitron`, `Inter`; `JetBrains Mono` optional |
| Animations | `glow`, `fadeIn`, `slideUp`, `pulse-slow`, `matrixRain` |

Prefer Tailwind utilities. Keep additional custom classes in `global.css` (e.g., `.btn-*`, `.card`, `.filter-btn`).

## Typography

- Headings: Orbitron, tight leading, tracking default.
- Body: Inter; comfortable line-height.
- Sizes: use responsive Tailwind sizes `text-3xl`→`text-7xl` for hero.

## Matrix/cyberpunk motifs

- Do:
  - Use neon glows sparingly to accent CTAs and headings (`text-shadow-neon`, `shadow-neon`).
  - Use glassmorphism lightly (`bg-card/60`, `backdrop-blur-sm`).
  - Maintain contrast on dark background.
- Don’t:
  - Overuse heavy drop-shadows; avoid illegible low-contrast overlays.

## Page hero sizing (compact-first)

- Prefer compact heroes to maximize above-the-fold content on content-heavy pages.
- Default hero: only for landing pages with strong visuals.
- Compact hero pattern (previous):
  - Section height: `min-h-[28vh]` with vertical padding `py-4 md:py-6 lg:py-8`.
  - Avatar sizes: `w-24 h-24` → `md:w-28 h-28` → `lg:w-32 h-32`.
  - Keep holographic ring subtle; reduce surrounding margins (`mb-3 md:mb-4`).
  - Follow accessibility: `role="img"` and descriptive `aria-label`.
- Ultra-compact hero pattern (current About page):
  - Section height: `min-h-[16vh]` with vertical padding `py-2 md:py-3 lg:py-4`.
  - Avatar sizes: `w-20 h-20` → `md:w-24 h-24` → `lg:w-28 h-28`.
  - Smaller surrounding margins (`mb-2 md:mb-3`).
  - Same accessibility requirements.

Rationale: smaller hero reduces scroll friction and highlights primary content immediately while preserving brand identity.

## Component theming (shadcn/ui)

- Note: `@shadcn/ui` present but not used yet. If adopted:
  - Map `primary`/`secondary` tokens to Tailwind theme.
  - Create `Button` variants: `default`, `outline`, `ghost` with neon focus rings.
  - Dialogs/Forms: keep rounded radius, backdrop blur, neon focus.

## Icon Standards

- **Use Lucide Icons**: All icons come from the Lucide library via our Icon component
- **Naming Convention**: Use PascalCase icon names (e.g., `Menu`, `ChevronRight`)
- **Sizing**: Use predefined sizes: `xs` (12px), `sm` (16px), `md` (20px), `lg` (24px), `xl` (32px), `2xl` (40px)
- **Accessibility**: Always provide `aria-label` for meaningful icons, use `aria-hidden="true"` for decorative ones
- **Styling**: Icons inherit text color via `currentColor`; use Tailwind text color classes
- **Consistency**: All icons use 24x24 viewBox for uniform scaling
- **Performance**: Tree-shaking ensures only used icons are included in the bundle

## Motion principles

- Use CSS keyframes/utilities for most effects. Framer Motion is not installed; if added later, keep durations 200–500ms and apply stagger minimally.
- Respect `prefers-reduced-motion: reduce` (already handled in `global.css`).
