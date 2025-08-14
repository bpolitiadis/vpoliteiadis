# Content Model

Who this is for: authors and engineers working with collections.
What you’ll learn: schemas, fields, frontmatter, and editorial workflow.

> TL;DR
> - Collections: `projects`, `creative`, `blog`.
> - Frontmatter validated via Zod in `src/content/config.ts`.

## Collections overview

| Collection | Location | Used by |
|---|---|---|
| `projects` | `src/content/projects/*` | Projects index and detail pages |
| `creative` | `src/content/creative/*` | Creative index/gallery |
| `blog` | `src/content/blog/*` | Blog index and post pages |

## Schemas (Zod)

### projects

| Field | Type | Notes |
|---|---|---|
| `title` | string | — |
| `description` | string | — |
| `excerpt` | string? | card summary |
| `coverImage` | string | path under `/images/...` |
| `coverVideo` | string? | optional mp4 path |
| `tags` | string[] | — |
| `techStack` | string[] | — |
| `featured` | boolean (default false) | index highlight |
| `publishedAt` | string | ISO date string |
| `updatedAt` | string? | — |
| `client` | string? | — |
| `duration` | string? | — |
| `role` | string? | — |
| `team` | string[]? | — |
| `problem` | string | — |
| `solution` | string | — |
| `impact` | string | — |
| `challenges` | string[]? | — |
| `learnings` | string[]? | — |
| `liveUrl` | string? | — |
| `githubUrl` | string? | — |
| `caseStudyUrl` | string? | — |
| `status` | enum('completed','in-progress','archived') | default 'completed' |
| `featuredImage` | string? | — |
| `gallery` | string[]? | — |

### creative

| Field | Type | Notes |
|---|---|---|
| `title` | string | — |
| `description` | string | — |
| `excerpt` | string? | — |
| `mediaType` | enum('image','video','gallery') | — |
| `coverImage` | string | — |
| `coverVideo` | string? | — |
| `gallery` | string[]? | — |
| `tools` | string[] | e.g., Midjourney, Kling AI |
| `tags` | string[] | — |
| `category` | enum('ai-art','digital-art','experiment','commission') | — |
| `featured` | boolean (default false) | — |
| `publishedAt` | string | ISO date string |
| `updatedAt` | string? | — |
| `client` | string? | for commissions |
| `instagramUrl` | string? | external link |
| `aspectRatio` | string? | '16/9', '1/1', etc. |
| `dimensions` | string? | — |
| `prompt` | string? | — |
| `process` | string? | — |

### blog

| Field | Type | Notes |
|---|---|---|
| `title` | string | — |
| `description` | string | — |
| `excerpt` | string? | — |
| `coverImage` | string? | optional cover path |
| `author` | string (default: 'Vasileios Politeiadis') | — |
| `tags` | string[] | — |
| `category` | enum('technology','ai','development','automation','creative','career','tutorial','finance') | — |
| `featured` | boolean (default false) | — |
| `publishedAt` | string | ISO date |
| `updatedAt` | string? | — |
| `readingTime` | string? | e.g., '5 min read' |
| `draft` | boolean (default false) | filtered out on index |
| `seo` | object? | `title?`, `description?`, `keywords?: string[]` |

## Editorial workflow

1) Create a file under the collection folder with appropriate extension (`.md` or `.mdx`).
2) Add frontmatter per schema above.
3) Place images under `public/images/...`; the optimizer will generate responsive variants on build.
4) For blog posts, set `draft: true` to exclude from index.
5) Commit; the indexes/dynamic pages will pick up content automatically.

### Example frontmatter: project

```yaml
---
title: "Casa Capoeira"
description: "Modern CMS platform for capoeira schools"
coverImage: "/images/casa-capoeira-cover.png"
tags: ["Next.js", "Supabase", "Prisma"]
techStack: ["Next.js", "Prisma", "Supabase", "PostgreSQL"]
featured: true
publishedAt: "2025-02-01"
status: "completed"
---
```

### Image optimization guidance

- Source images should be `.png/.jpg/.jpeg` in `public/images/**`.
- The optimizer creates `-480/-800/-1200` WEBP/AVIF. Components use `<picture>` with those sizes.
- Prefer descriptive `alt` text; empty `alt` only for decorative images.
