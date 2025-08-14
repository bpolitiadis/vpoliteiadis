# INDEX

Who this is for: developers onboarding to this Astro project and AI agents indexing the repo.
What you’ll learn: where things live, how to start, and where to find deeper docs.

> TL;DR
> - Tech: Astro 5, TailwindCSS 3, TypeScript, static export, Vercel headers/CSP.
> - Content: Astro Content Collections for `blog`, `projects`, `creative`.
> - SEO: dynamic `robots.txt`, `ai.txt`, structured data JSON endpoints.
> - Start: pnpm install → pnpm dev → open http://localhost:4321.

## Documentation map

- Getting started: see [GETTING-STARTED.md](./GETTING-STARTED.md)
- Architecture overview: see [ARCHITECTURE.md](./ARCHITECTURE.md)
- ADRs (stack decisions): see [STACK-DECISIONS_ADRs.md](./STACK-DECISIONS_ADRs.md)
- Code style and conventions: see [STYLEGUIDE_CODE.md](./STYLEGUIDE_CODE.md)
- UI/Brand guidelines and motion: see [UI-GUIDELINES_BRAND.md](./UI-GUIDELINES_BRAND.md)
- Components reference: see [COMPONENTS_REFERENCE.md](./COMPONENTS_REFERENCE.md)
- Pages and routes: see [PAGES_ROUTES.md](./PAGES_ROUTES.md)
- Content model (collections, frontmatter): see [CONTENT_MODEL.md](./CONTENT_MODEL.md)
- Changelog and assumptions: see [CHANGELOG.md](./CHANGELOG.md)

Note: To stay within 10 files, SEO, performance, accessibility, security, and deployment guidance are embedded inside the above docs at relevant sections.

## Quick start (developers)

1) Prereqs: Node 20.10+, pnpm 9.
2) Install: `pnpm install`
3) Dev: `pnpm dev` → http://localhost:4321
4) Build: `pnpm build` (runs image optimization) → `dist/`
5) Preview: `pnpm preview`

Common scripts are listed in [GETTING-STARTED.md](./GETTING-STARTED.md#scripts).

## Quick start (AI agents)

- Prefer these entrypoints for retrieval: `docs/ARCHITECTURE.md`, `docs/CONTENT_MODEL.md`, `docs/PAGES_ROUTES.md`, `src/content/config.ts`.
- Chunk by headings (h2/h3) and store frontmatter tables as metadata.
- Respect security: never print secret values; see env names in [GETTING-STARTED.md](./GETTING-STARTED.md#environment-variables).

## Top-level architecture

```mermaid
flowchart LR
  A[Astro 5] --> B[Pages & Routes]
  B --> C[Components (Astro + React islands)]
  C --> D[Styles: Tailwind + global.css]
  B --> E[Data: Content Collections (blog, projects, creative)]
  A --> F[Build: static export]
  F --> G[Vercel/Static hosting]
  A --> H[SEO: robots.txt, ai.txt, structured JSON]
```

## Where to find things

- Config: `astro.config.mjs`, `tailwind.config.js`, `tsconfig.json`, `vercel.json`, `postcss.config.js`
- Pages: `src/pages/**`, Layout: `src/layouts/MainLayout.astro`
- Components: `src/components/**`
- Content model: `src/content/config.ts` and markdown in `src/content/*`
- Styles: `src/styles/global.css`
- Scripts: `public/scripts/**`, build-tooling `scripts/optimize-images.mjs`


