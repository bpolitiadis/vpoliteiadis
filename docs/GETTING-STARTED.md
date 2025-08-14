# Getting Started

Who this is for: new developers setting up the project locally.
What you’ll learn: prerequisites, environment setup, commands, and where variables live.

> TL;DR
> - Node 20.10+, pnpm 9.
> - `pnpm install` → `pnpm dev`.
> - Build runs image optimization via Sharp.

## Prerequisites

- Node.js >= 20.10.0
- pnpm >= 9.0.0
- macOS/Linux/Windows

Verify versions:

```bash
node -v
pnpm -v
```

## Installation

```bash
pnpm install
```

## Development server

```bash
pnpm dev
# Open http://localhost:4321
```

- Hot reload for `.astro`, `.ts/.tsx`, `.md/.mdx`, and Tailwind classes.

## Build & preview

```bash
# Build (typecheck + optimize images + build)
pnpm build

# Preview static output from dist/
pnpm preview
```

Build script pipeline:
- `astro check`
- `node scripts/optimize-images.mjs` (Sharp-based responsive assets under `public/images` and `public/creative`)
- `astro build` (static export)

## Scripts

| Script | What it does |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Typecheck, optimize images, build static site |
| `pnpm preview` | Serve built site from `dist/` |
| `pnpm lint` | Run ESLint on `.js,.ts,.astro` |
| `pnpm lint:fix` | ESLint with `--fix` |
| `pnpm format` | Prettier write |
| `pnpm format:check` | Prettier check |
| `pnpm optimize:images` | Run the image optimizer only |

## Environment variables

This project is mostly static. A helper in `src/lib/spotify.ts` expects the following when used:

| Name | Purpose |
|---|---|
| `SPOTIFY_CLIENT_ID` | Spotify app client ID (server-side requests) |
| `SPOTIFY_CLIENT_SECRET` | Spotify app client secret |

Setup a local `.env` (values are examples only):

```dotenv
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

Security:
- Never commit real secrets. Use Vercel/host env manager for production.
- Code never prints secrets. Do not expose them in client code.

## Project layout

See the high-level map in [ARCHITECTURE.md](./ARCHITECTURE.md#project-layout).

## Troubleshooting

- Port busy: change dev port via `astro dev --port 4322`.
- Missing Sharp deps on macOS: `brew install vips` may help; reinstall deps after.
- Images not generated: ensure inputs in `public/images` end with `.png/.jpg/.jpeg`.
