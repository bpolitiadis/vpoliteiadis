# 🛠️ Development

**Who this is for:** Developers working on the codebase, setting up environments, and contributing to the project.

**What you'll learn:** Project setup, development workflow, coding standards, environment configuration, and contribution guidelines.

> **TL;DR** - Astro portfolio with TypeScript, TailwindCSS, and React islands. Strict linting, comprehensive testing, and Vercel deployment.

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20.10.0
- **pnpm** >= 9.0.0
- **macOS/Linux/Windows**

```bash
# Verify installations
node -v    # >= 20.10.0
pnpm -v    # >= 9.0.0
```

### Installation & Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
# → http://localhost:4321

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Development Scripts

| Script | Purpose |
|--------|---------|
| `pnpm dev` | Start dev server with hot reload |
| `pnpm build` | Typecheck, optimize images, build static site |
| `pnpm preview` | Serve built site from `dist/` |
| `pnpm lint` | Run ESLint on `.js,.ts,.astro` files |
| `pnpm lint:fix` | ESLint with auto-fix |
| `pnpm format` | Prettier write |
| `pnpm format:check` | Prettier check |
| `pnpm optimize:images` | Run Sharp-based image optimization |

## 🔧 Environment Configuration

### Quick Setup

1. **Copy environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure variables:**
   ```bash
   # Development logging
   LOG_LEVEL=debug

   # Optional: Error tracking
   SENTRY_DSN=https://your-key@sentry.io/project
   PUBLIC_SENTRY_DSN=https://your-client-key@sentry.io/project

   # Required for contact form
   RESEND_API_KEY=re_1234567890abcdef
   FROM_EMAIL=noreply@yourdomain.com
   CONTACT_EMAIL=contact@yourdomain.com
   ```

3. **Restart dev server:**
   ```bash
   pnpm dev
   ```

### Environment Variables Reference

#### Core Variables
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | No | `development` | Runtime environment |
| `LOG_LEVEL` | No | `info` (prod), `debug` (dev) | Logging verbosity |

#### Logging & Observability
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `LOG_LEVEL` | No | `info`/`debug` | Log level: `trace`, `debug`, `info`, `warn`, `error`, `fatal` |
| `SENTRY_DSN` | No | - | Server-side Sentry DSN |
| `PUBLIC_SENTRY_DSN` | No | - | Client-side Sentry DSN (must start with `PUBLIC_`) |
| `SENTRY_ENV` | No | `NODE_ENV` | Environment name in Sentry |
| `SENTRY_TRACES_SAMPLE_RATE` | No | `0.1` | Performance monitoring sample rate (0.0-1.0) |

#### Email Service (Resend)
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `RESEND_API_KEY` | Yes | - | Resend API key for sending emails |
| `FROM_EMAIL` | Yes | - | Sender email address (must be verified in Resend) |
| `CONTACT_EMAIL` | No | `FROM_EMAIL` | Email to receive contact form submissions |

#### Vercel Auto-Variables
| Variable | Auto-Set | Description |
|----------|----------|-------------|
| `VERCEL_ENV` | ✅ | `development`, `preview`, or `production` |
| `VERCEL_URL` | ✅ | Public deployment URL |

## 🏗️ Development Workflow

### Code Quality Tools

```bash
# Linting and formatting
pnpm lint          # Check code quality
pnpm lint:fix      # Auto-fix issues
pnpm format        # Format code
pnpm format:check  # Check formatting
```

### Project Structure

```
src/
├── components/    # Astro + React components
├── content/       # MDX collections (blog, projects, creative)
├── layouts/       # MainLayout.astro
├── lib/           # Utilities (analytics, social, spotify)
├── pages/         # File-based routing
├── styles/        # global.css + Tailwind
└── types/         # TypeScript definitions
```

### Build Process

1. **Content Processing**: MDX files parsed and validated against Zod schemas
2. **Image Optimization**: Sharp generates responsive variants during build
3. **Static Generation**: All pages pre-rendered to HTML
4. **Asset Optimization**: CSS/JS bundled and optimized

## 📝 Coding Standards

### TypeScript

- **Strict mode** enabled via `astro/tsconfigs/strict`
- **Explicit types** for all function parameters and return values
- **Descriptive naming** - no single-letter variables except loops
- **Interface over type** for object shapes
- **Avoid `any`** - use proper types or `unknown`

```typescript
// ✅ Good
interface Project {
  title: string;
  description: string;
  publishedAt: string;
}

function getProjects(): Project[] {
  // implementation
}

// ❌ Avoid
function getData(): any[] {
  // implementation
}
```

### Components

- **Prefer Astro** for static content, **React only for interactivity**
- **Typed props** with descriptive names
- **Accessibility first** - proper ARIA labels, focus management, semantic HTML
- **Responsive design** - mobile-first with Tailwind utilities
- **Component composition** over complex props

```astro
---
// ✅ Astro component with typed props
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<article class="card">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</article>
```

### Styling

- **Tailwind utility classes** in templates
- **Custom utilities** in `global.css` for repeated patterns
- **Matrix-inspired theme** - neon lime (#39FF14) on dark backgrounds
- **WCAG AA compliance** - sufficient color contrast
- **Reduced motion support** - respect `prefers-reduced-motion`

### File Organization

- **Relative imports** only (no path aliases configured)
- **Group by feature** within component directories
- **Index files** for clean imports
- **Consistent naming** - PascalCase for components, camelCase for utilities

## 🧪 Testing

### Test Categories

- **Accessibility tests** with axe-core integration
- **E2E tests** with Playwright for critical user journeys
- **Performance tests** with Lighthouse CI
- **Responsive design** tests across breakpoints

### Test Structure

```typescript
// Page Object Model for maintainable tests
export class HomepagePage {
  async goto() {
    await this.page.goto('/');
  }

  async heroAnimationCompletes() {
    // Wait for hero text animation
  }
}
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run specific test suites
pnpm test:e2e      # End-to-end tests
pnpm test:unit     # Unit tests
pnpm test:accessibility  # Accessibility tests

# Debug tests
pnpm test:debug
```

## 🔒 Security & Privacy

### Environment Variables

- **Never commit secrets** - `.env.local` is gitignored
- **Vercel environment variables** for production deployment
- **Automatic PII redaction** in logs for sensitive fields
- **CSP headers** configured in `vercel.json` and middleware

### Code Security

- **Input validation** with Zod schemas
- **Content sanitization** via rehype plugins
- **External link handling** with security attributes
- **No sensitive data** exposure in client-side code

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel

# Production deployment
vercel --prod
```

### Build Optimization

- **Static site generation** for optimal performance
- **Image optimization** with Sharp pipeline
- **CSS inlining** and code splitting
- **Long-term caching** for immutable assets
- **CDN distribution** via Vercel Edge Network

## 🤝 Contributing

### Development Process

1. **Fork** the repository
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes** following coding standards
4. **Test thoroughly**: `pnpm lint && pnpm build && pnpm test`
5. **Commit conventionally**: See commit conventions below
6. **Submit pull request** with description and screenshots

### Commit Conventions

```bash
# Types: feat, fix, docs, style, refactor, test, chore
feat: add new hero animation component
fix: resolve image optimization bug on Vercel
docs: update component API documentation
style: format code with prettier
refactor: simplify component props interface
test: add accessibility tests for navigation
chore: update dependencies
```

### Pull Request Guidelines

- **Descriptive title** and detailed description
- **Screenshots/videos** for UI changes
- **Lighthouse scores** for performance changes
- **Test coverage** maintained or improved
- **Breaking changes** clearly documented

### Code Review Checklist

- [ ] **Linting passes**: `pnpm lint`
- [ ] **TypeScript compiles**: `pnpm build`
- [ ] **Tests pass**: `pnpm test`
- [ ] **Performance maintained**: Lighthouse scores not degraded
- [ ] **Accessibility compliant**: axe-core tests pass
- [ ] **Mobile responsive**: Tested on multiple breakpoints
- [ ] **Security reviewed**: No sensitive data exposure

## 🔧 Troubleshooting

### Common Development Issues

**Port already in use:**
```bash
# Use different port
pnpm dev --port 4322
```

**Sharp installation issues on macOS:**
```bash
brew install vips
rm -rf node_modules && pnpm install
```

**Image optimization not working:**
- Ensure source images exist in `public/images/`
- Check file extensions (.png, .jpg, .jpeg supported)

**Environment variables not loading:**
- Restart dev server after adding variables
- Check for typos in variable names
- Ensure no spaces around `=` in `.env` files

### Build Issues

**Build failing with missing assets:**
```bash
# Clear caches and rebuild
rm -rf node_modules/.cache dist .astro
pnpm install
pnpm build
```

**Vercel deployment failures:**
- Check Vercel dashboard for specific error logs
- Compare with local build: `pnpm build`
- Verify environment variables set in Vercel project settings

## 📚 Related Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design and data flow
- **[CONTENT.md](./CONTENT.md)** - Content collections and schemas
- **[COMPONENTS.md](./COMPONENTS.md)** - Component library and usage patterns
- **[SEO.md](./SEO.md)** - Search engine optimization
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Hosting and operations
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues and fixes

---

**Ready to contribute?** Start with the [contributing guidelines](#-contributing) above, or check the [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common setup issues.