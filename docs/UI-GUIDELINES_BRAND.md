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

## Component theming (shadcn/ui)

- Note: `@shadcn/ui` present but not used yet. If adopted:
  - Map `primary`/`secondary` tokens to Tailwind theme.
  - Create `Button` variants: `default`, `outline`, `ghost` with neon focus rings.
  - Dialogs/Forms: keep rounded radius, backdrop blur, neon focus.

## Iconography

- Current: inline SVGs with stroke 2 for consistency.
- If adopting Lucide later: use 20–24px size, `currentColor`, and accessible titles.

## Motion principles

- Use CSS keyframes/utilities for most effects. Framer Motion is not installed; if added later, keep durations 200–500ms and apply stagger minimally.
- Respect `prefers-reduced-motion: reduce` (already handled in `global.css`).
