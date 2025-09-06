# Hero Intro Components

## Usage

```astro
---
import HeroIntro from '../components/hero/HeroIntro.astro';
---

<HeroIntro />
```

The intro hero renders a left `AvatarBubble` and a centered `MessageBubble` over the existing glitch background.

## Props

- AvatarBubble (internal):
  - `alt?: string` — accessible alt text. Default: "Vasileios Politeiadis portrait".
  - `size?: number` — pixel size for the circular avatar (default 96).

- MessageBubble (internal):
  - `heading?: string` — Main heading text
  - `body?: string` — Description text with warm tech-sarcastic welcome message

## Accessibility

- Focus rings are visible on all interactive elements.
- `role="dialog"` and `aria-labelledby="intro-heading"` on the message bubble.
- Test IDs: `hero-intro-section`, `avatar-bubble`, `message-bubble`, `intro-heading`, `intro-body`.

## Notes

- Motion respects `prefers-reduced-motion`.
- Uses shadcn/ui `Card` and `Badge` components.
- **AvatarBubble**: Features glowing border pulse effect with neon lime (#39FF14) glow
- **MessageBubble**: Chat bubble with glassy glitch edges, subtle neon glow, and scanline effects
- Subtle CSS-only glare effect on hover (no external dependencies).
- Backdrop blur is reduced on mobile for performance.
- Custom `.chat-bubble-glitch` class provides animated glitch edge effects.

