# 🛣️ Pages & Routes

**Who this is for:** Developers mapping URLs to code and data, SEO specialists, and content creators.  
**What you'll learn:** Route inventory, data sources, page components, SEO implementation, and content relationships.

> **TL;DR** - File-system routing with dynamic `[slug]` for blog/projects. Utility routes for robots/AI and structured data. All pages use MainLayout.astro with dynamic meta tags and background orchestration.

## 🗺️ Route Map

### Static Routes

| Route | File | Data Source | Key Components | SEO Notes |
|-------|------|-------------|----------------|-----------|
| `/` | `src/pages/index.astro` | — | `Hero`, `MainLayout` | Home hero with immediate TextType animation, background via layout |
| `/about` | `src/pages/about.astro` | — | `MainLayout` | Eager bg image, compact hero pattern |
| `/contact` | `src/pages/contact.astro` | — | `PageHero` | Form markup + `/scripts/contact-form.js` |

### Dynamic Collection Routes

| Route | File | Data Source | Key Components | SEO Notes |
|-------|------|-------------|----------------|-----------|
| `/projects` | `src/pages/projects/index.astro` | `getCollection('projects')` | `PageHero`, `ProjectCard` | Featured filter, bg `projects-bg`, search/filter functionality |
| `/projects/[slug]` | `src/pages/projects/[slug].astro` | Content collections | Page-level components | Dynamic project case study, structured data endpoint |
| `/blog` | `src/pages/blog/index.astro` | `getCollection('blog')` (non-draft) | `PageHero`, card grid | Search/filter via `/scripts/blog-index.js`, tag-based filtering |
| `/blog/[slug]` | `src/pages/blog/[slug].astro` | Content collections | Page-level components | Dynamic blog post, structured data endpoint |

### Creative Portfolio Routes

| Route | File | Data Source | Key Components | SEO Notes |
|-------|------|-------------|----------------|-----------|
| `/creative` | `src/pages/creative/index.astro` | Custom data | Cards/modal | Gallery/lightbox patterns, featured pieces |
| `/creative/arte-imaginari` | `src/pages/creative/arte-imaginari.astro` | — | Page-level | Static showcase page for AI art series |
| `/creative/emmanuelle-silk` | `src/pages/creative/emmanuelle-silk.astro` | — | Page-level | Static showcase page for fashion project |
| `/creative/smoking-two` | `src/pages/creative/smoking-two.astro` | — | Page-level | Static showcase page for creative piece |

**Note:** Creative routes are set up but currently no content is published in the creative collection.

### Utility & SEO Routes

| Route | File | Purpose | Implementation | Notes |
|-------|------|---------|----------------|-------|
| `/404` | `src/pages/404.astro` | Error page | Static generation | Matrix-themed 404 with navigation help |
| `/robots.txt` | `src/pages/robots.txt.ts` | Crawler configuration | Dynamic generation | Allows common AI bots, sitemap links |
| `/ai.txt` | `src/pages/ai.txt.ts` | AI crawling policy | Dynamic generation | Community AI policy declaration |
| `/sitemap-index.xml` | Auto-generated | Sitemap index | Astro sitemap integration | Links to collection-specific sitemaps |
| `/sitemap.xml` | Auto-generated | Main sitemap | Astro sitemap integration | All pages and content |

### Structured Data Routes

| Route | File | Purpose | Data Source | Schema Type |
|-------|------|---------|-------------|-------------|
| `/structured/website.json` | `src/pages/structured/website.json.ts` | Website metadata | Static data | WebSite JSON-LD |
| `/structured/person.json` | `src/pages/structured/person.json.ts` | Personal information | Static data | Person JSON-LD |
| `/structured/blog/[slug].json` | `src/pages/structured/blog/[slug].json.ts` | Blog post metadata | Content collections | BlogPosting JSON-LD |
| `/structured/project/[slug].json` | `src/pages/structured/project/[slug].astro` | Project metadata | Content collections | CreativeWork JSON-LD |

## 🏗️ Route Implementation

### File-Based Routing Structure
```
src/pages/
├── index.astro                    # Homepage with hero animation
├── about.astro                    # About page with compact hero
├── contact.astro                  # Contact form with validation
├── 404.astro                     # Matrix-themed 404 error page
├── projects/
│   ├── index.astro               # Projects grid with filtering
│   └── [slug].astro              # Dynamic project case study
├── blog/
│   ├── index.astro               # Blog grid with search/filter
│   └── [slug].astro              # Dynamic blog post
├── creative/
│   ├── index.astro               # Creative portfolio grid
│   ├── arte-imaginari.astro      # AI art showcase
│   ├── emmanuelle-silk.astro     # Fashion project showcase
│   └── smoking-two.astro         # Creative piece showcase
├── robots.txt.ts                  # Dynamic robots.txt
├── ai.txt.ts                      # AI crawling policy
└── structured/                    # JSON-LD endpoints
    ├── website.json.ts
    ├── person.json.ts
    ├── blog/
    │   └── [slug].json.ts
    └── project/
        └── [slug].astro
```

### Dynamic Route Generation

#### Projects Route
```typescript
// src/pages/projects/[slug].astro
export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { slug: project.slug },
    props: { project },
  }));
}

// Generate structured data for each project
export async function GET({ params, request }) {
  const project = await getEntry('projects', params.slug);
  if (!project) return new Response('Not found', { status: 404 });
  
  const structuredData = generateProjectStructuredData(project);
  return new Response(JSON.stringify(structuredData), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

#### Blog Route
```typescript
// src/pages/blog/[slug].astro
export async function getStaticPaths() {
  const blogPosts = await getCollection('blog', ({ data }) => !data.draft);
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
```

### Utility Route Implementation

#### 404 Error Page
```astro
<!-- src/pages/404.astro -->
<MainLayout 
  title="Page Not Found - 404 Error | Vasileios Politeiadis"
  description="The page you're looking for doesn't exist. Navigate back to the main portfolio or explore our projects and blog."
  currentPath="/404"
  structuredData={errorStructuredData}
>
  <!-- Matrix Rain Background Canvas -->
  <canvas id="matrixCanvas" class="w-full h-full opacity-20"></canvas>
  
  <!-- 404 Content with Matrix Theme -->
  <section class="min-h-screen flex items-center justify-center">
    <!-- Large 404 number with neon effects -->
    <!-- Error message with cyberpunk styling -->
    <!-- Action buttons for navigation -->
    <!-- Suggested pages grid -->
    <!-- Technical details for developers -->
  </section>
</MainLayout>
```

**Features:**
- **Matrix Rain Background**: Animated digital rain effect using existing matrix-rain.js
- **Neon Typography**: Large 404 number with gradient and glitch effects
- **Cyberpunk Messaging**: Themed error text with brand colors
- **Navigation Help**: Primary CTA to return home, secondary to report issues
- **Suggested Pages**: Grid of common pages to help users find content
- **Technical Details**: Expandable section with error information for developers
- **Accessibility**: Proper ARIA labels, focus states, and reduced motion support
- **SEO**: Structured data and meta tags for search engines

#### Robots.txt
```typescript
// src/pages/robots.txt.ts
export async function GET() {
  const robotsTxt = `# robots.txt generated by Astro
User-agent: *
Allow: /
Crawl-delay: 1

# Explicit AI/LLM crawlers
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Bytespider
Allow: /

User-agent: Amazonbot
Allow: /

# Sitemaps
Sitemap: https://vpoliteiadis.com/sitemap-index.xml
Sitemap: https://vpoliteiadis.com/sitemap.xml

# AI policy
AI policy: https://vpoliteiadis.com/ai.txt`;

  return new Response(robotsTxt, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
```

#### AI.txt
```typescript
// src/pages/ai.txt.ts
export async function GET() {
  const aiTxt = `# ai.txt — AI crawling and usage policy
# Site: https://vpoliteiadis.com

# Indexing
Allow: *

# Attribution
Require-Attribution: true

# Rate limits
Crawl-Delay: 1

# Contact
Contact: mailto:b.politiadis@gmail.com

# Notes
Purpose: Permit AI crawlers to index public pages and snippets with attribution. No PII is published.`;

  return new Response(aiTxt, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
```

## 🎨 Page Components & Layout

### MainLayout.astro
**Purpose:** Global shell wrapping all pages with consistent navigation, footer, and meta tags.

**Key Features:**
- Dynamic meta tags based on page props
- Background image orchestration with opacity controls
- Font loading and optimization
- SEO meta tags and Open Graph
- Structured data integration

**Usage:**
```astro
---
import MainLayout from '../layouts/MainLayout.astro';

const title = "Projects | Vasileios Politeiadis";
const description = "Selected work and case studies";
const currentPath = "/projects";
const bgSlug = "projects-bg";
---

<MainLayout 
  title={title}
  description={description}
  currentPath={currentPath}
  bgSlug={bgSlug}
  bgEager={true}
>
  <!-- Page content -->
</MainLayout>
```

### PageHero Component
**Purpose:** Consistent page headers with optional backgrounds and metadata.

**Props:**
- `title` (required): Page title
- `description` (optional): Page description
- `bgSlug` (optional): Background image identifier
- `metaText` (optional): Additional metadata text
- `eager` (optional): Load background immediately

**Usage:**
```astro
---
import PageHero from '../components/PageHero.astro';
---

<PageHero 
  title="Projects" 
  description="Selected work and case studies" 
  bgSlug="projects-bg" 
  eager 
/>
```

### Dynamic Page Components

#### Project Case Study Page
```astro
---
// src/pages/projects/[slug].astro
import MainLayout from '../../layouts/MainLayout.astro';
import { getCollection, getEntry } from 'astro:content';
import type { GetStaticPaths } from 'astro';

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { slug: project.slug },
    props: { project },
  }));
};

const { project } = Astro.props;
const { data } = project;
---

<MainLayout 
  title={`${data.title} | Vasileios Politeiadis`}
  description={data.description}
  currentPath="/projects"
  bgSlug="projects-bg"
>
  <!-- Project content -->
</MainLayout>
```

#### Blog Post Page
```astro
---
// src/pages/blog/[slug].astro
import MainLayout from '../../layouts/MainLayout.astro';
import { getCollection } from 'astro:content';

export const getStaticPaths = async () => {
  const blogPosts = await getCollection('blog', ({ data }) => !data.draft);
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
};

const { post } = Astro.props;
const { data } = post;
---

<MainLayout 
  title={`${data.title} | Vasileios Politeiadis`}
  description={data.description}
  currentPath="/blog"
  bgSlug="blog-bg"
>
  <!-- Blog post content -->
</MainLayout>
```

## 🔍 SEO Implementation

### Meta Tags & Open Graph
Each page generates dynamic meta tags based on content:

```astro
<!-- Dynamic meta tags in MainLayout.astro -->
<title>{title}</title>
<meta name="description" content={description} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content="website" />
<meta property="og:url" content={canonicalURL} />
<meta property="og:image" content={ogImage} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />
```

### Structured Data Generation
Structured data is generated for each content type:

```typescript
// Generate project structured data
export function generateProjectStructuredData(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.data.title,
    "description": project.data.description,
    "author": {
      "@type": "Person",
      "name": "Vasileios Politeiadis",
      "url": "https://vpoliteiadis.com"
    },
    "datePublished": project.data.publishedAt,
    "dateModified": project.data.updatedAt || project.data.publishedAt,
    "url": `https://vpoliteiadis.com/projects/${project.slug}`,
    "image": project.data.coverImage,
    "keywords": project.data.tags.join(", "),
    "genre": "Software Development",
    "creator": {
      "@type": "Person",
      "name": "Vasileios Politeiadis"
    }
  };
}
```

### Sitemap Generation
Astro automatically generates sitemaps for all routes:

```typescript
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vpoliteiadis.com',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
```

## 📱 Responsive Design

### Mobile-First Approach
All pages follow mobile-first responsive design:

```css
/* Example responsive pattern */
.container {
  @apply px-4 md:px-6 lg:px-8;
  @apply py-6 md:py-8 lg:py-12;
}

.hero-content {
  @apply text-center md:text-left;
  @apply space-y-4 md:space-y-6;
}

.grid-layout {
  @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
  @apply gap-4 md:gap-6 lg:gap-8;
}
```

### Touch-Friendly Design
- **Touch Targets**: Minimum 44px for interactive elements
- **Navigation**: Hamburger menu for mobile devices
- **Forms**: Optimized for touch input
- **Images**: Responsive with proper aspect ratios

## 🚀 Performance Optimization

### Static Generation Benefits
- **Zero JavaScript**: Pages load without client-side processing
- **Fast TTFB**: Pre-rendered HTML served immediately
- **CDN Friendly**: Static assets easily cached and distributed
- **SEO Optimized**: Content immediately available to crawlers

### Image Optimization
- **Astro Image Component**: Built-in optimization with Vercel
- **Modern Formats**: Automatic AVIF/WebP with fallbacks
- **Lazy Loading**: Images load as they enter viewport
- **Dynamic Optimization**: On-demand processing

### Code Splitting
- **Automatic Splitting**: Astro handles code splitting automatically
- **Route-Based**: Each route gets its own bundle
- **Component-Based**: React islands split by component
- **CSS Optimization**: Critical CSS inlined, rest split

## 🔒 Security & Headers

### Content Security Policy & Security Headers
Comprehensive security headers configured via `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; script-src-elem 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; frame-src https://open.spotify.com; upgrade-insecure-requests"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=(), interest-cohort=()"
        },
        {
          "key": "Cross-Origin-Opener-Policy",
          "value": "same-origin-allow-popups"
        },
        {
          "key": "Cross-Origin-Embedder-Policy",
          "value": "unsafe-none"
        },
        {
          "key": "Cross-Origin-Resource-Policy",
          "value": "cross-origin"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        }
      ]
    }
  ]
}
```

### Security Headers
- **HSTS**: Strict transport security with preload and subdomain inclusion
- **X-Frame-Options**: Prevent clickjacking attacks
- **X-Content-Type-Options**: Prevent MIME type sniffing
- **Referrer Policy**: Control referrer information
- **Permissions Policy**: Feature policy for modern browsers
- **Cross-Origin Policies**: Comprehensive CORS protection
- **Content Security Policy**: Strict CSP with Spotify frame exception

## 🔄 Content Relationships

### Related Content
Pages can suggest related content based on tags and categories:

```typescript
// Get related projects
const getRelatedProjects = async (currentSlug: string, tags: string[]) => {
  const allProjects = await getCollection('projects');
  
  return allProjects
    .filter(project => project.slug !== currentSlug)
    .filter(project => 
      project.data.tags.some(tag => tags.includes(tag))
    )
    .slice(0, 3);
};
```

### Navigation State
Active page highlighting in navigation:

```astro
<!-- Navbar with active state -->
<nav class="navbar-compact">
  <a 
    href="/projects" 
    class={`nav-link-desktop ${currentPath === '/projects' ? 'active' : ''}`}
  >
    Projects
  </a>
</nav>
```

## 🧪 Testing & Validation

### Route Testing
```bash
# Build validation
pnpm build

# Type checking
pnpm astro check

# Preview routes
pnpm preview

# Manual testing checklist
- [ ] All routes load correctly
- [ ] Dynamic routes generate properly
- [ ] Meta tags are correct
- [ ] Structured data is valid
- [ ] Responsive design works
- [ ] SEO elements are present
```

### Validation Tools
- **Astro Check**: TypeScript and content validation
- **Build Process**: Validates all routes and content
- **Lighthouse**: Performance and SEO testing
- **Schema Validation**: JSON-LD validation

---

**This routing system provides a robust, SEO-friendly foundation for the portfolio website with excellent performance and developer experience.**
