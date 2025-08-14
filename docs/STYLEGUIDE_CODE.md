# Code Style & Conventions

Who this is for: contributors adding/modifying code.
What you’ll learn: linting/formatting, TS style, components, commits, and security.

> TL;DR
> - TypeScript strict, descriptive names, early returns.
> - DRY/KISS/YAGNI; accessibility first.
> - Conventional Commits.

## Tooling

- Lint: `pnpm lint`, `pnpm lint:fix`
- Format: `pnpm format`, `pnpm format:check`
- Typecheck: part of `pnpm build` via `astro check`

## Folder & imports

- Keep pages in `src/pages/**`, layout in `src/layouts/**`, shared components in `src/components/**`.
- No path aliases configured; use relative imports.

## TypeScript

- Strict types via `astro/tsconfigs/strict`.
- Avoid `any`; prefer explicit props types and return types for exported APIs.
- Name things descriptively (no 1–2 letter names).

## Components

- Prefer Astro components for static rendering; use React only when needed.
- Props must be typed; document accessible labels and roles.
- Follow A11y: proper headings, labels, focus management, ARIA where needed.
- Keep client JS minimal; prefer CSS animations and progressive enhancement.

## Accessibility

- Respect reduced motion (`prefers-reduced-motion`).
- Ensure focus-visible styles; keyboard navigability.
- Color contrast: neon accents over dark background must meet WCAG AA.

## Security & Privacy

- No secrets in client code. All secrets via environment variables/server only.
- CSP/Headers are configured in `vercel.json` and `src/middleware.ts`.
- Third‑party iframes limited to Spotify per CSP.

## Commits & branching

- Conventional Commits:
  - `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
- Branches: `feature/*`, `fix/*`, `docs/*` (lightweight flow).
- Pull Requests: include screenshots for UI changes and Lighthouse numbers when relevant.

## Testing (lightweight)

- Linting and build should pass before PR.
- Manual checks: A11y, responsiveness, performance (Lighthouse), route verification.
