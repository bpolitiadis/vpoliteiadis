# Stack Decisions (ADRs)

Who this is for: maintainers making architectural choices.
What you’ll learn: rationale, trade‑offs, and links to implementation.

> TL;DR
> Static Astro site with Tailwind, optional React islands, strict headers/CSP, and first‑party SEO endpoints.

## ADR-001: Choose Astro for static-first site
- Context: Portfolio with content collections, high performance, minimal client JS.
- Decision: Use Astro 5 with `output: 'static'`.
- Consequences: Great Core Web Vitals, simple routing; SSR features not required.
- Links: `astro.config.mjs`, `src/pages/**`.

## ADR-002: TailwindCSS as design system
- Context: Fast iteration on Matrix/cyberpunk styling; custom tokens.
- Decision: Tailwind with custom theme and utilities in `global.css`.
- Trade‑offs: Utility classes in templates; mitigated via components.
- Links: `tailwind.config.js`, `src/styles/global.css`.

## ADR-003: React islands when necessary
- Context: Ergonomic image helper and a rich featured card.
- Decision: Use React islands for `OptimizedImage.tsx`, `FeaturedProjectCard.tsx`.
- Alternatives: Pure Astro images; chosen mix balances DX and control.
- Links: `src/components/OptimizedImage.tsx`, `src/components/FeaturedProjectCard.tsx`.

## ADR-004: shadcn/ui availability (not yet used)
- Context: `@shadcn/ui` present in devDeps but no `components/ui` in repo.
- Decision: Keep ready for future primitives; current UI is custom Tailwind.
- Links: `package.json`.

## ADR-005: Framer Motion and Lucide icons (not installed)
- Context: Scope requested; packages absent.
- Decision: Not used currently. If added later, use sparingly (Framer for complex motion; Lucide for consistent icons).

## ADR-006: Security headers and CSP
- Context: Static hosting on Vercel with strict security posture.
- Decision: Configure strong headers and CSP via `vercel.json`; mirror in middleware.
- Links: `vercel.json`, `src/middleware.ts`.

## ADR-007: First-party structured data endpoints
- Context: JSON-LD should be cacheable and CSP‑friendly.
- Decision: Serve JSON from `/structured/*` routes instead of inline script tags.
- Links: `src/pages/structured/**`, `src/layouts/MainLayout.astro`.
