# vpoliteiadis - Personal Portfolio & Creative Hub

A modern, performance-optimized personal portfolio built with **Astro**, **TypeScript**, and **Tailwind CSS**, featuring cutting-edge image optimization and responsive design.

## 🚀 Features

- **Modern Tech Stack**: Astro 4.0+, TypeScript, Tailwind CSS 3.4+
- **2025 Image Optimization**: AVIF/WebP with responsive breakpoints
- **Performance First**: 99%+ image compression, Core Web Vitals optimized
- **Responsive Design**: Mobile-first approach with modern breakpoints
- **SEO Optimized**: Structured data, meta tags, and performance metrics
- **Accessibility**: ARIA compliant, screen reader friendly
- **Modern UI**: Glass morphism, neon effects, and smooth animations with optimized text reveal system (no flash, IntersectionObserver-powered)

## 🏗️ Architecture

### Directory Structure

```
src/
├── assets/images/          # Source images (single source of truth)
├── components/             # Reusable UI components
├── content/                # MDX content and data
├── layouts/                # Page layouts and templates
├── lib/                    # Utilities and configurations
├── pages/                  # Astro pages and routes
└── styles/                 # Global CSS and Tailwind

public/                     # Static assets (build artifacts)
├── images/                 # Generated optimized images (git-ignored)
└── scripts/                # Client-side JavaScript

scripts/                    # Build and optimization scripts
docs/                       # Project documentation
```

### Image Workflow (2025)

- **Source of truth**: `src/assets/images/` (imported) and `public/images/` (static URLs)
- **Astro**: use `astro:assets` `<Image />` or `src/components/media/AImage.astro`
- **React (within Astro)**: use static `/images/...` with explicit `width`/`height`, `loading`, `decoding`
- **Responsive presets**: see `src/lib/image-presets.ts` (`hero`, `card`, `thumb`)
- Legacy wrappers removed: `VercelImage`, `OptimizedImage`

## 🛠️ Tech Stack

### Core Technologies
- **Astro 5.0+** - Static site generator with SSR capabilities
- **TypeScript 5.0+** - Type-safe development
- **Tailwind CSS 3.4+** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

### Image Optimization
- **Sharp** - High-performance image processing
- **AVIF/WebP** - Modern image formats
- **Responsive Images** - Art direction and srcset
- **Lazy Loading** - Performance optimization

### Performance & SEO
- **Vercel** - Edge deployment and CDN
- **Core Web Vitals** - Performance metrics
- **Structured Data** - Rich snippets and SEO
- **Meta Tags** - Social media optimization

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0+ (LTS recommended)
- **pnpm** 8.0+ (faster, more efficient than npm)

### Package Manager Policy

```bash
# ✅ Correct
pnpm install
pnpm dev
pnpm build

# ❌ Never use npm
npm install  # Don't do this
npm run dev  # Don't do this
```

### Installation

```bash
# Clone the repository
git clone https://github.com/bpolitiadis/vpoliteiadis.git
cd vpoliteiadis

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Image Optimization

```bash
# Generate optimized images
pnpm run optimize:images

# Images are automatically optimized during build
pnpm run build
```

## 📱 Responsive Design

### Breakpoints

- **Mobile**: 480px and below
- **Tablet**: 481px - 800px
- **Desktop**: 801px - 1200px
- **Large Desktop**: 1201px - 1600px
- **4K**: 1601px and above

### Image Sizes

- **Avatar**: 128px, 160px, 192px, 256px
- **Content**: 480px, 800px, 1200px
- **Hero**: 1200px, 1600px, 2400px, 3840px

## 🎨 Design System

### Components

- **HeroSection** - GSAP-powered hero with floating animations and illustrations
- **AboutSection** - Comprehensive profile showcase with work experience, education, and certifications
- **ProfileCard** - Interactive profile card with tilt effects and social links
- **ProjectsSection** - Featured projects showcase with GSAP animations
- **CreativeLabSection** - Creative portfolio showcase with category-based styling
- **GlassCard** - Modern glass morphism effect
- **ElectricBorder** - Animated neon borders
- **NeonCTA** - Glowing call-to-action buttons
- **AImage** - Canonical image wrapper for astro:assets

### Color Palette

- **Primary**: Modern blues and purples
- **Accent**: Neon greens and cyans
- **Background**: Dark themes with glass effects
- **Text**: High contrast for accessibility

## 📊 Performance

### Core Web Vitals

- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Image Optimization

- **Format**: AVIF (primary), WebP (fallback)
- **Compression**: 99%+ size reduction
- **Loading**: Lazy loading with blur placeholders
- **Caching**: Long-term caching with immutable headers

## 🔍 SEO & Performance

### Target Keywords

- **Primary**: "QA Automation Specialist", "Full-Stack Developer", "Next.js Developer"
- **Secondary**: "European Commission Projects", "Java Selenium Testing", "React Developer"
- **Long-tail**: "Senior QA Automation Specialist European Commission", "Vasileios Politeiadis Portfolio"

### SEO Implementation

- **Structured Data**: Complete Person, WebSite, and AboutPage schemas
- **Meta Tags**: Optimized titles, descriptions, and Open Graph
- **Performance**: Critical CSS inlining, font preloading, image optimization
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

### Verifying PageSpeed.dev Scores

#### 1. **Run Performance Audit**
```bash
# Build the project
pnpm run build

# Preview the build
pnpm run preview

# Visit PageSpeed.dev and test your local URL
# Or deploy to Vercel and test the live URL
```

#### 2. **Performance Targets**
- **Performance Score**: 90+ (aim for 95+)
- **SEO Score**: 100% (all meta tags and structured data)
- **Accessibility Score**: 95+ (ARIA compliance)
- **Best Practices Score**: 95+ (modern web standards)

#### 3. **Core Web Vitals**
- **LCP**: < 2.5s (hero image/avatar optimization)
- **FID**: < 100ms (minimal JavaScript execution)
- **CLS**: < 0.1 (stable layout, no shifts)

#### 4. **SEO Audit Checklist**
- [ ] All pages have unique titles and meta descriptions
- [ ] Structured data (JSON-LD) is valid and complete
- [ ] Open Graph and Twitter Card tags are present
- [ ] Canonical URLs prevent duplicate content
- [ ] Sitemap.xml and robots.txt are accessible
- [ ] Images have descriptive alt text with keywords

### Running Regular Audits

#### **Monthly Checks**
- Google Search Console performance
- PageSpeed Insights scores
- Core Web Vitals monitoring

#### **Quarterly Audits**
- Comprehensive SEO review
- Structured data validation
- Performance optimization review

#### **Tools for Monitoring**
- **PageSpeed Insights**: Performance metrics
- **Google Search Console**: Search performance
- **Lighthouse**: Comprehensive auditing
- **Schema.org Validator**: Structured data testing
- **Rich Results Test**: Google rich snippet preview

## 🔧 Development

### Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm optimize:images  # Optimize images manually
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checks
pnpm test         # Run Playwright E2E tests
pnpm test:unit    # Run Vitest unit tests
pnpm test:unit:watch  # Run unit tests in watch mode
pnpm test:unit:ui # Run unit tests with UI
pnpm test:unit:coverage  # Generate unit test coverage
pnpm test:ui      # Run tests with Playwright UI
pnpm test:headed  # Run tests in headed mode
```

### Code Quality

- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript** - Type safety and IntelliSense
- **Vitest** - Unit testing framework for component testing
- **Playwright** - E2E testing, accessibility, responsive, and performance tests
- **Page Object Model** - Maintainable test architecture

## 📚 Documentation

- **[Getting Started](./docs/GETTING-STARTED.md)** - Development setup guide
- **[Environment Variables](./docs/ENVIRONMENT_VARIABLES.md)** - Complete environment configuration reference
- **[Logging](./docs/LOGGING.md)** - Server-only logging and observability system
- **[Architecture](./docs/ARCHITECTURE.md)** - System overview and design decisions
- **[SEO Guide](./docs/SEO.md)** - Complete SEO implementation and optimization
- **[Image Optimization](./docs/IMAGE_OPTIMIZATION.md)** - 2025 best practices
- **[Components](./docs/COMPONENTS_REFERENCE.md)** - Component library and usage
- **[Performance](./docs/PERFORMANCE_OPTIMIZATIONS.md)** - Optimization strategies

## 🌐 Deployment

### Vercel (Recommended)

- **Automatic deployments** from Git
- **Edge functions** for dynamic content
- **Global CDN** for fast loading
- **Image optimization** with WebP/AVIF

### Environment Variables

For quick setup:

```bash
# Copy the example file
cp .env.example .env.local

# Configure logging and error tracking (optional)
LOG_LEVEL=debug
SENTRY_DSN=https://your-key@sentry.io/project
PUBLIC_SENTRY_DSN=https://your-client-key@sentry.io/project
```

**📚 Complete reference:** See [Environment Variables Guide](./docs/ENVIRONMENT_VARIABLES.md)

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow **TypeScript** best practices
- Use **Tailwind CSS** utility classes
- Implement **responsive design** principles
- Ensure **accessibility** compliance
- Write **comprehensive tests**
- Maintain **SEO optimization** standards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Astro Team** - Amazing static site generator
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel** - Deployment and hosting platform
- **Sharp** - High-performance image processing

## 📞 Contact

- **Website**: [vpoliteiadis.dev](https://vpoliteiadis.dev) (primary), [vpoliteiadis.com](https://vpoliteiadis.com) (secondary)
- **Email**: [contact@vpoliteiadis.dev](mailto:contact@vpoliteiadis.dev)
- **LinkedIn**: [vpoliteiadis](https://linkedin.com/in/vpoliteiadis)
- **GitHub**: [bpolitiadis](https://github.com/bpolitiadis)

---

**Built with ❤️ using modern web technologies**

*Last updated: January 2026* 