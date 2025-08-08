# 🧠 Vasileios Politeiadis - Portfolio

**Full-Stack Developer & AI Visionary** - A cyberpunk-inspired portfolio showcasing the intersection of technology and creativity.

## 🚀 Tech Stack

- **Framework:** [Astro](https://astro.build) v5.12.8
- **Styling:** [TailwindCSS](https://tailwindcss.com) v3.4.1
- **UI Components:** [shadcn/ui](https://ui.shadcn.com) v0.0.4
- **Package Manager:** [pnpm](https://pnpm.io)
- **Linting:** [ESLint](https://eslint.org) v8.57.0
- **Formatting:** [Prettier](https://prettier.io) v3.2.5
- **Language:** TypeScript v5.9.2
- **Animations:** CSS keyframes & Tailwind utilities

## 🎨 Design System

This portfolio features a **Matrix-inspired cyberpunk aesthetic** with:

- **Primary Colors:** Matrix Black (#0A0A0A), Neon Lime (#39FF14)
- **Secondary Colors:** Digital Emerald (#00B86B), Cyber Gray (#222222)
- **Typography:** Orbitron (headings), Inter (body text)
- **Effects:** Neon glows, gradient backgrounds, animated elements
- **Accessibility:** WCAG 2.1 AA compliant with proper contrast ratios

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
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

### Development Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm format       # Format code with Prettier
pnpm format:check # Check formatting
```

## 📁 Project Structure

```
vpoliteiadis/
├── src/
│   ├── components/
│   │   ├── Hero.astro           # Hero section component
│   │   ├── Navbar.astro         # Navigation component
│   │   ├── ProjectCard.astro    # Reusable project card component
│   │   ├── CreativeCard.astro   # Creative portfolio card component
│   │   └── CreativeModal.astro  # Modal for creative pieces
│   ├── content/
│   │   ├── config.ts            # Content collections configuration
│   │   ├── projects/            # Project case studies (MDX)
│   │   │   ├── casa-capoeira.md # Casa Capoeira case study
│   │   │   └── upiria.md        # Upiria case study
│   │   ├── blog/                # Blog posts (MDX)
│   │   │   ├── ai-assisted-creativity.mdx
│   │   │   ├── casa-capoeira-journey.mdx
│   │   │   └── playwright-testing-strategies.mdx
│   │   └── creative/            # Creative portfolio pieces
│   │       ├── cyberpunk-portrait.md
│   │       └── neon-dreams-video.md
   │   ├── layouts/
   │   │   └── MainLayout.astro     # Main layout with navigation & SEO
│   ├── pages/
│   │   ├── index.astro          # Homepage
│   │   ├── about.astro          # About page
│   │   ├── contact.astro        # Contact form
│   │   ├── projects/
│   │   │   ├── index.astro      # Projects grid with filtering
│   │   │   └── [slug].astro     # Dynamic project case study pages
│   │   ├── blog/
│   │   │   ├── index.astro      # Blog grid with filtering
│   │   │   └── [slug].astro     # Dynamic blog post pages
│   │   └── creative/
│   │       ├── index.astro           # Creative Lab page (featured projects grid)
│   │       ├── emmanuelle-silk.astro # Emmanuelle Silk detail page
│   │       ├── smoking-two.astro     # Smoking Two detail page
│   │       └── arte-imaginari.astro  # Arte Imaginari detail page
│   └── styles/
│       └── global.css           # Global styles & Tailwind config
├── docs/
│   ├── branding.md              # Brand identity guidelines
│   └── professional-identity.md # Professional background
├── public/                      # Static assets
│   ├── images/
│   │   └── creative/            # Creative portfolio images
│   └── favicon.svg              # Site favicon
├── astro.config.mjs            # Astro configuration
├── tailwind.config.js          # TailwindCSS configuration
├── .eslintrc.cjs               # ESLint configuration
├── .prettierrc                 # Prettier configuration
└── .editorconfig               # Editor configuration
```

## 🎯 Features

### Core Features
- **Responsive Design:** Mobile-first approach with TailwindCSS
- **Performance Optimized:** Astro's static site generation
- **SEO Ready:** Meta tags, Open Graph, and structured data
- **Accessibility:** WCAG 2.1 AA compliant with proper contrast ratios
- **Modern Development:** TypeScript, ESLint, Prettier
- **Brand Consistency:** Custom design system based on cyberpunk aesthetics

### Content Management
- **Dynamic Content:** MDX-based content collections for projects, case studies, and blog posts
- **Advanced Filtering:** Search and filter projects and blog posts by tags, categories, and keywords
- **Interactive UI:** Neon glow effects, micro-animations, and cyberpunk aesthetics
- **Blog System:** Complete blog with MDX support, syntax highlighting, and SEO optimization

### Accessibility Features
- **Keyboard Navigation:** Full keyboard accessibility
- **Screen Reader Support:** Proper ARIA labels and semantic HTML
- **High Contrast Mode:** Support for high contrast preferences
- **Reduced Motion:** Respects user's motion preferences
- **Focus Management:** Clear focus indicators and logical tab order

### Performance Features
- **Static Generation:** Fast loading with Astro's static site generation
- **Image Optimization:** Optimized images with proper alt text
- **Code Splitting:** Automatic code splitting for optimal performance
- **Lazy Loading:** Images and components load as needed
- **Caching:** Optimized caching strategies

## 🔧 Configuration Files

### TailwindCSS (`tailwind.config.js`)

Custom color palette and typography based on the cyberpunk branding:

- Matrix Black, Neon Lime, Digital Emerald, Cyber Gray
- Orbitron and Inter font families
- Custom component classes for buttons and cards
- Responsive breakpoints and animations

### ESLint (`.eslintrc.cjs`)

Configured for Astro + TypeScript with:

- TypeScript-specific rules
- Astro plugin integration
- Prettier compatibility
- Accessibility rules

### Prettier (`.prettierrc`)

Standard formatting rules:

- Single quotes, semicolons
- 2-space indentation
- 80-character line width
- Consistent formatting across all file types

## 📚 Documentation

- **`docs/branding.md`** - Complete brand identity and design guidelines
- **`docs/professional-identity.md`** - Professional background and experience

## 📝 Content Management

### Adding New Projects

To add a new project case study:

1. Create a new `.md` file in `src/content/projects/`
2. Use the following frontmatter structure:

```yaml
---
title: "Project Title"
description: "Brief project description"
excerpt: "Short excerpt for cards"
coverImage: "/images/projects/project-cover.jpg"
coverVideo: "/videos/project-preview.mp4" # Optional
tags: ["Tag1", "Tag2", "Tag3"]
techStack: ["Tech1", "Tech2", "Tech3"]
featured: true # Set to true for featured projects
  publishedAt: "2025-08-01"
  updatedAt: "2025-08-02" # Optional
client: "Client Name" # Optional
duration: "6 months" # Optional
role: "Full-Stack Developer" # Optional
team: ["Team Member 1", "Team Member 2"] # Optional
problem: "Problem description"
solution: "Solution description"
impact: "Impact description"
challenges: ["Challenge 1", "Challenge 2"] # Optional
learnings: ["Learning 1", "Learning 2"] # Optional
liveUrl: "https://project.com" # Optional
githubUrl: "https://github.com/project" # Optional
status: "completed" # completed, in-progress, archived
featuredImage: "/images/projects/project-hero.jpg" # Optional
gallery: ["/images/projects/screenshot1.jpg"] # Optional
---

# Project Content

Your project content goes here in Markdown format.
```

3. The project will automatically appear in the projects grid and generate a case study page
4. Images should be placed in `public/images/projects/`

### Adding New Blog Posts

To add a new blog post:

1. Create a new `.mdx` file in `src/content/blog/`
2. Use the following frontmatter structure:

```yaml
---
title: "Blog Post Title"
description: "Brief blog post description"
excerpt: "Short excerpt for cards"
coverImage: "/images/blog/post-cover.jpg" # Optional
author: "Vasileios Politeiadis"
tags: ["Tag1", "Tag2", "Tag3"]
category: "technology" # technology, ai, development, automation, creative, career, tutorial
featured: false # Set to true for featured posts
  publishedAt: "2025-08-03"
  updatedAt: "2025-08-04" # Optional
readingTime: "5 min read" # Optional
draft: false # Set to true for draft posts
seo:
  title: "SEO Title" # Optional
  description: "SEO description" # Optional
  keywords: ["keyword1", "keyword2"] # Optional
---

# Blog Post Content

Your blog post content goes here in MDX format with full Markdown support.
```

3. The blog post will automatically appear in the blog grid and generate a detail page
4. Images should be placed in `public/images/blog/`
5. MDX supports React components, code blocks, and advanced formatting

### Adding New Creative Pieces

To add a new creative piece:

1. Create a new `.md` file in `src/content/creative/`
2. Use the following frontmatter structure:

```yaml
---
title: "Creative Piece Title"
description: "Description of the creative work"
excerpt: "Short excerpt for cards"
mediaType: "image" # image, video, gallery
coverImage: "/images/creative/piece-cover.jpg"
coverVideo: "/videos/creative/piece-preview.mp4" # Optional
gallery: ["/images/creative/piece1.jpg"] # Optional
tools: ["Midjourney", "Kling AI"] # AI tools used
tags: ["Tag1", "Tag2", "Tag3"]
category: "ai-art" # ai-art, digital-art, experiment, commission
featured: false # Set to true for featured pieces
  publishedAt: "2025-08-05"
  updatedAt: "2025-08-06" # Optional
client: "Client Name" # Optional for commissioned work
instagramUrl: "https://instagram.com/post" # Optional
aspectRatio: "16/9" # Optional for responsive layout
dimensions: "1920x1080" # Optional
prompt: "AI prompt used" # Optional
process: "Creative process description" # Optional
---

# Creative Piece Content

Description of your creative work and process.
```

3. The creative piece will automatically appear in the creative grid
4. Images should be placed in `public/images/creative/`

### Content Collections

The site uses Astro's content collections for type-safe content management:

- **Projects**: `src/content/projects/` - Project case studies and portfolio items
- **Blog**: `src/content/blog/` - Blog posts with MDX support and syntax highlighting
- **Creative**: `src/content/creative/` - AI art and creative portfolio pieces
- **Schema**: Defined in `src/content/config.ts` with full TypeScript support
- **Filtering**: Projects and blog posts can be filtered by tags, categories, and search terms
- **Related Content**: Automatically suggests related projects and blog posts based on shared tags/categories

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel
   ```

2. **Environment Variables:**
   - No environment variables required for basic deployment
   - Add any API keys or configuration as needed

3. **Build Settings:**
   - **Framework Preset:** Astro
   - **Build Command:** `pnpm build`
   - **Output Directory:** `dist`
   - **Install Command:** `pnpm install`

### Netlify Deployment

1. **Connect Repository:**
   - Connect your GitHub repository to Netlify
   - Set build command: `pnpm build`
   - Set publish directory: `dist`

2. **Build Settings:**
   ```toml
   # netlify.toml
   [build]
     command = "pnpm build"
     publish = "dist"
   
   [build.environment]
     NODE_VERSION = "18"
   ```

### GitHub Pages Deployment

1. **Add GitHub Actions:**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm install -g pnpm
         - run: pnpm install
         - run: pnpm build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

### Other Static Hosting

This project is optimized for deployment on any static hosting service:

- **AWS S3 + CloudFront**
- **Firebase Hosting**
- **Cloudflare Pages**
- **Surge.sh**

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Setup

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Install dependencies:**
   ```bash
   pnpm install
   ```
4. **Make your changes**
5. **Run quality checks:**
   ```bash
   pnpm lint
   pnpm format:check
   pnpm build
   ```
6. **Commit your changes:**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **Push to your branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Submit a pull request**

### Code Style Guidelines

- **TypeScript:** Use strict typing, avoid `any`
- **Accessibility:** Follow WCAG 2.1 AA guidelines
- **Performance:** Optimize for Core Web Vitals
- **Testing:** Add tests for new features
- **Documentation:** Update docs for API changes

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add tests
chore: maintenance tasks
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] **Responsive Design:** Test on mobile, tablet, desktop
- [ ] **Accessibility:** Screen reader compatibility, keyboard navigation
- [ ] **Performance:** Lighthouse scores, Core Web Vitals
- [ ] **Cross-browser:** Chrome, Firefox, Safari, Edge
- [ ] **Content:** All pages load correctly, links work
- [ ] **Forms:** Contact form validation and submission
- [ ] **Animations:** Respect reduced motion preferences
- [ ] **Theme:** Dark/light mode toggle works

### Automated Testing

```bash
# Run linting
pnpm lint

# Check formatting
pnpm format:check

# Build test
pnpm build

# Preview build
pnpm preview
```

## 📊 Performance

### Lighthouse Scores Target

- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 95+

### Optimization Features

- **Static Generation:** All pages pre-rendered
- **Image Optimization:** WebP format, lazy loading
- **Code Splitting:** Automatic by Astro
- **Minification:** CSS, JS, and HTML minified (Vite defaults)
- **Caching:** Optimized cache headers

## 🔒 Security

- **Content Security Policy:** Configured for security
- **HTTPS Only:** All deployments use HTTPS
- **No Sensitive Data:** No API keys in client code
- **Dependency Scanning:** Regular security updates

## 📈 Analytics & Monitoring

### Recommended Tools

- **Google Analytics 4:** For user behavior tracking
- **Google Search Console:** For SEO monitoring
- **Vercel Analytics:** For performance monitoring
- **Sentry:** For error tracking (optional)

### Setup Instructions

1. **Google Analytics:**
   ```html
   <!-- Add to Layout.astro -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```

2. **Google Search Console:**
   - Verify ownership
   - Submit sitemap
   - Monitor search performance

## 🎨 Customization

### Branding

Update colors and fonts in `tailwind.config.js`:

```javascript
colors: {
  'matrix-black': '#0A0A0A',
  'neon-lime': '#39FF14',
  'digital-emerald': '#00B86B',
  // Add your custom colors
}
```

### Content

- **Projects:** Add to `src/content/projects/`
- **Blog Posts:** Add to `src/content/blog/`
- **Creative Pieces:** Add to `src/content/creative/`

### Components

- **Layout:** Modify `src/layouts/`
- **Components:** Update `src/components/`
- **Styles:** Customize `src/styles/global.css`

## 📞 Support

For questions or issues:

- **Issues:** [GitHub Issues](https://github.com/yourusername/vpoliteiadis/issues)
- **Email:** [b.politiadis@gmail.com](mailto:b.politiadis@gmail.com)
- **LinkedIn:** [Vasileios Politeiadis](https://linkedin.com/in/vpoliteiadis)

## 📄 License

This project is private and proprietary. All rights reserved.

## 🙏 Credits

### Design & Development
- **Vasileios Politeiadis** - Full-stack developer and designer
- **Astro Team** - Amazing static site framework
- **TailwindCSS Team** - Utility-first CSS framework
- **shadcn/ui** - Beautiful component library

### Inspiration
- **Matrix Trilogy** - Cyberpunk aesthetic inspiration
- **Cyberpunk 2077** - Visual design references
- **Blade Runner** - Sci-fi atmosphere

### Tools & Resources
- **Figma** - Design and prototyping
- **VS Code** - Development environment
- **GitHub** - Version control and hosting
- **Vercel** - Deployment platform

---

**Built with ❤️ and ☕ by Vasileios Politeiadis**

*Last updated: December 2025* 