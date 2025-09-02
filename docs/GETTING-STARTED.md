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

The project includes a comprehensive logging and observability system. For quick setup:

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure required variables:**
   ```bash
   # Basic logging (optional for development)
   LOG_LEVEL=debug
   
   # Error tracking (optional but recommended)
   SENTRY_DSN=https://your-key@sentry.io/project
   PUBLIC_SENTRY_DSN=https://your-client-key@sentry.io/project
   ```

3. **Restart the dev server:**
   ```bash
   pnpm dev
   ```

**📚 For complete environment variables documentation, see:**
- **[ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)** - Complete reference guide
- **[LOGGING.md](./LOGGING.md)** - Logging system documentation

Security:
- Never commit real secrets (`.env.local` is gitignored)
- Use Vercel environment variables for production
- All sensitive data is automatically redacted from logs

## Project layout

See the high-level map in [ARCHITECTURE.md](./ARCHITECTURE.md#project-layout).

## Troubleshooting

- Port busy: change dev port via `astro dev --port 4322`.
- Missing Sharp deps on macOS: `brew install vips` may help; reinstall deps after.
- Images not generated: ensure inputs in `public/images` end with `.png/.jpg/.jpeg`.
