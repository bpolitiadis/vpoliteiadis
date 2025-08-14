# Pages & Routes

Who this is for: developers mapping URLs to code and data.
What you’ll learn: route inventory, data sources, SEO notes, relationships.

> TL;DR
> - File-system routing; dynamic `[slug]` for blog/projects.
> - Text/JSON utility routes for robots/AI and structured data.

## Route map

| Route | File | Data source | Key components | SEO notes |
|---|---|---|---|---|
| `/` | `src/pages/index.astro` | — | `Hero`, `MainLayout` | Home hero, background via layout |
| `/about` | `src/pages/about.astro` | — | `MainLayout` | Eager bg image |
| `/contact` | `src/pages/contact.astro` | — | `PageHero` | Form markup + `/scripts/contact-form.js` |
| `/projects` | `src/pages/projects/index.astro` | `getCollection('projects')` | `PageHero`, `ProjectCard` | Featured filter, bg `projects-bg` |
| `/projects/[slug]` | `src/pages/projects/[slug].astro` | Content collections | page-level components | Dynamic details |
| `/blog` | `src/pages/blog/index.astro` | `getCollection('blog')` (non-draft) | `PageHero`, card grid | Search/filter via `/scripts/blog-index.js` |
| `/blog/[slug]` | `src/pages/blog/[slug].astro` | Content collections | page-level components | Dynamic details |
| `/creative` | `src/pages/creative/index.astro` | (custom) | cards/modal | Gallery/lightbox patterns |
| `/creative/*` | `src/pages/creative/*.astro` | — | page-level | Static showcase pages |
| `/robots.txt` | `src/pages/robots.txt.ts` | — | — | Allows common AI bots; sitemap links |
| `/ai.txt` | `src/pages/ai.txt.ts` | — | — | Community AI policy |
| `/structured/website.json` | `src/pages/structured/website.json.ts` | — | — | JSON‑LD WebSite |
| `/structured/person.json` | `src/pages/structured/person.json.ts` | — | — | JSON‑LD Person |
| `/structured/blog/[slug].json` | `src/pages/structured/blog/[slug].json.ts` | Content collections | — | BlogPosting JSON‑LD |
| `/structured/project/[slug].json` | `src/pages/structured/project/[slug].json.ts` | Content collections | — | CreativeWork JSON‑LD |

Notes:
- 404/500: default Astro static 404; customize by adding `src/pages/404.astro` as needed.
- i18n: N/A (single-locale). Language alternates set to `en` in layout.
