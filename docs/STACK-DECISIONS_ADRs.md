# Stack Decisions (ADRs)

**Who this is for:** Maintainers making architectural choices.

**What you'll learn:** Rationale, trade-offs, and links to implementation.

> **TL;DR** - Static Astro site with Tailwind, optional React islands, strict headers/CSP, and first-party SEO endpoints.

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
- Context: Ergonomic image helper and interactive components.
- Decision: Use React islands for interactive components (`src/components/DecryptedText.tsx`, `src/components/LightboxGallery.tsx`, `src/components/ui/profile-card.tsx`). Project cards use native Astro for better performance.
- Alternatives: Pure Astro images; chosen mix balances DX and control.
- Links: `src/components/DecryptedText.tsx`, `src/components/LightboxGallery.tsx`, `src/components/ui/profile-card.tsx`.

## ADR-004: shadcn/ui availability (not yet used)
- Context: `@shadcn/ui` present in devDeps but no `components/ui` in repo.
- Decision: Keep ready for future primitives; current UI is custom Tailwind.
- Links: `package.json`.

## ADR-005: Motion and Lucide icons
- Context: Motion (successor to framer-motion) is installed and ready for use.
- Decision: **Motion** is available for complex animations; use sparingly. Lucide for consistent icons.
- **2025 Update**: Motion provides better performance and cross-framework support than the legacy framer-motion.

## ADR-006: Security headers and CSP
- Context: Static hosting on Vercel with strict security posture.
- Decision: Configure strong headers and CSP via `vercel.json`; mirror in middleware.
- Links: `vercel.json`, `src/middleware.ts`.

## ADR-007: First-party structured data endpoints
- Context: JSON-LD should be cacheable and CSP‑friendly.
- Decision: Serve JSON from `/structured/*` routes instead of inline script tags.
- Links: `src/pages/structured/**`, `src/layouts/MainLayout.astro`.

## ADR-008: Error Monitoring with Sentry
- Context: Application error tracking and performance monitoring for production reliability.
- Decision: Implement Sentry for client-side and server-side error tracking.
- Rationale:
  - Critical for production error monitoring and debugging
  - Provides detailed error reports with stack traces
  - Enables performance monitoring and user feedback
- Alternatives Considered: Console logging, custom error reporting.
- Links: `src/lib/sentry-client.ts`, `@sentry/browser@^8.45.0`, `@sentry/node@^8.45.0`.

## ADR-009: Analytics with Vercel Analytics
- Context: Web analytics for user behavior tracking and performance insights.
- Decision: Use Vercel Analytics for privacy-focused, performant analytics.
- Rationale:
  - Native Vercel integration with zero-config setup
  - Privacy-compliant with built-in data protection
  - Lightweight and performant compared to Google Analytics
- Alternatives Considered: Google Analytics, custom analytics.
- Links: `src/lib/analytics.ts`, `@vercel/analytics@^1.5.0`.

## ADR-010: Email Service with Resend
- Context: Contact form email delivery with reliable SMTP service.
- Decision: Implement Resend for transactional email delivery.
- Rationale:
  - Reliable email delivery with good deliverability rates
  - Developer-friendly API with TypeScript support
  - Cost-effective for portfolio/contact form use case
- Alternatives Considered: SendGrid, Mailgun, custom SMTP.
- Links: `src/components/contact/ContactForm.tsx`, `resend@^6.0.3`.

## ADR-011: Animation Framework with GSAP
- Context: High-performance animations for hero sections and interactive elements.
- Decision: Use GSAP (GreenSock Animation Platform) for complex animations.
- Rationale:
  - Industry-leading animation performance and reliability
  - Cross-browser compatibility and hardware acceleration
  - Extensive feature set for complex animation sequences
  - Better performance than CSS animations for complex timelines
- Alternatives Considered: CSS animations, Framer Motion, native Web Animations API.
- Links: `src/lib/animations/heroAnimations.ts`, `gsap@^3.13.0`.

## ADR-012: Unique Identifier Generation with UUID
- Context: Generating unique identifiers for forms, sessions, and data tracking.
- Decision: Use UUID library for RFC-compliant unique identifier generation.
- Rationale:
  - Standards-compliant UUID generation (v4)
  - Cryptographically secure random generation
  - Widely adopted and battle-tested library
- Alternatives Considered: Custom ID generation, nanoid.
- Links: `src/lib/utils.ts`, `uuid@^10.0.0`.

## ADR-013: Astro Build Tools
- Context: Essential Astro integrations for development, content processing, and deployment.
- Decision: Use `@astrojs/check`, `@astrojs/mdx`, `@astrojs/react`, `@astrojs/rss`, `@astrojs/sitemap`, `@astrojs/vercel`.
- Rationale:
  - `@astrojs/check`: TypeScript type checking for Astro components and content collections
  - `@astrojs/mdx`: MDX support for rich content with JSX in markdown
  - `@astrojs/react`: React islands integration for interactive components
  - `@astrojs/rss`: Automatic RSS feed generation for blog content
  - `@astrojs/sitemap`: Automatic XML sitemap generation for SEO
  - `@astrojs/vercel`: Vercel-specific optimizations and deployment integration
- Alternatives Considered: Manual TypeScript checking, custom MDX setup, vanilla JavaScript.
- Links: `astro.config.mjs`, `src/content/`, `package.json`.

## ADR-014: Radix UI Component Primitives
- Context: Accessible, unstyled component primitives for complex UI interactions.
- Decision: Use `@radix-ui/*` packages (avatar, dialog, dropdown-menu, label, progress, select, slot).
- Rationale:
  - Industry-standard accessibility and keyboard navigation
  - WCAG 2.1 AA compliant with proper ARIA attributes
  - Unstyled primitives that work seamlessly with Tailwind CSS
  - Comprehensive component ecosystem for complex interactions
- Alternatives Considered: Custom accessible components, other UI libraries.
- Links: `src/components/ui/`, `docs/COMPONENTS.md`.

## ADR-015: Form State Management
- Context: Robust form handling with validation and accessibility.
- Decision: Use `react-hook-form` with `@hookform/resolvers` for Zod validation.
- Rationale:
  - Performant form library with minimal re-renders
  - Strong TypeScript support and type safety
  - Zod integration for schema-based validation
  - Accessible form components with proper ARIA labels
- Alternatives Considered: Vanilla React forms, Formik, other form libraries.
- Links: `src/components/contact/ContactForm.tsx`, `src/lib/schemas/`.

## ADR-016: CSS Utility Optimization
- Context: Efficient Tailwind CSS class management and component variants.
- Decision: Use `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss-animate`.
- Rationale:
  - `class-variance-authority`: Type-safe component variants and conditional styling
  - `clsx`: Conditional CSS class concatenation with TypeScript support
  - `tailwind-merge`: Automatic Tailwind class conflict resolution
  - `tailwindcss-animate`: Tailwind-compatible animation utilities
- Alternatives Considered: Manual class management, CSS modules.
- Links: `src/components/ui/button.tsx`, `tailwind.config.js`.

## ADR-017: Image Processing Pipeline
- Context: High-performance image optimization and processing.
- Decision: Use `sharp` for image transformations and optimization.
- Rationale:
  - Industry-leading image processing performance
  - Comprehensive format support (WebP, AVIF, JPEG, PNG)
  - Native Node.js implementation with zero external dependencies
  - Used by Astro's image optimization pipeline
- Alternatives Considered: ImageMagick, GraphicsMagick, canvas-based processing.
- Links: `astro.config.mjs`, `src/components/media/AImage.astro`.

## ADR-018: Lightbox Gallery Component
- Context: Accessible, performant image gallery with lightbox functionality.
- Decision: Use `yet-another-react-lightbox` for image galleries.
- Rationale:
  - Modern, accessible lightbox with keyboard navigation
  - Touch gesture support for mobile devices
  - Lightweight and performant React component
  - Customizable styling and animation options
- Alternatives Considered: Custom lightbox implementation, other React lightbox libraries.
- Links: `src/components/LightboxGallery.tsx`, `docs/COMPONENTS.md`.

## ADR-019: Logging Infrastructure
- Context: Structured logging for debugging and monitoring.
- Decision: Use `pino` for application logging.
- Rationale:
  - High-performance JSON logging with structured data
  - Child logger support for request correlation
  - Built-in log level filtering and transport options
  - Compatible with Vercel and production logging services
- Alternatives Considered: Console logging, winston, bunyan.
- Links: `src/lib/logger.ts`, `src/middleware.ts`.
