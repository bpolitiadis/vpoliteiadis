# Changelog

All notable changes to the vpoliteiadis portfolio website will be documented in this file.

## [Unreleased]

### Image Strategy Cleanup & Optimization
- **Image Directory Cleanup**: Removed 242 redundant optimized image variants from `public/images/`
  - Deleted all manually optimized variants (`*-480w.webp`, `*-800w.webp`, etc.) as Astro 5 handles optimization automatically
  - Kept only essential files: logo for social sharing and article/blog cover images (needed for OG tags)
  - Reduced `public/images/` from 262 files to 20 essential files (~92% reduction)
- **Image Strategy Documentation**: Created comprehensive `docs/IMAGE_STRATEGY.md` with clear guidelines
  - Clarified when to use `src/assets/images/` vs `public/images/`
  - Explained why article covers must stay in `public/images/` for social sharing (OG tags require static URLs)
  - Documented migration path from legacy static paths to imported ImageMetadata
- **Blog Post Cover Images**: Fixed cover image display issues
  - Updated `BlogPostCard.astro` to use base cover images directly (no variant lookup)
  - Fixed `blog/[slug].astro` to display covers correctly without broken variant references
  - Updated OG tag fallback from `/favicon.png` to `/images/vp-logo-800w.webp` for better social sharing
- **Hero Section**: Removed fallback static paths, now uses imported images exclusively
  - Updated `HeroSection.tsx` to require image data from `HeroIntro.astro` imports
  - Eliminated redundant fallback code that referenced deleted optimized variants
- **Legacy Cleanup**: Removed deprecated `scripts/optimize-images.mjs` and `docs/IMAGE_OPTIMIZATION.md`
  - Astro 5's built-in image optimization makes manual scripts unnecessary
  - Consolidated image strategy documentation into single authoritative source

### Image Optimization System
- **Image Optimization Script**: Created `scripts/optimize-images.mjs` to convert PNG/JPG to optimized WebP and AVIF formats
- **Responsive Image Variants**: Generated multiple width variants (320w, 480w, 800w, 1200w, etc.) for optimal loading
- **Enhanced AImage Component**: Updated to automatically generate `<picture>` elements with AVIF/WebP sources and responsive srcset
- **Performance Improvements**: Optimized 4 large PNG files (~9.5MB → ~1MB, ~90% reduction)
  - `casacapoeira-cover.png`: 2.66MB → 0.16MB AVIF (~94% savings)
  - `vasileios-illustration.png`: 2.35MB → 0.11MB AVIF (~95% savings)
  - `laptop-illustration.png`: 2.31MB → 0.10MB AVIF (~96% savings)
  - `vibe-coding.png`: 2.27MB → 0.14MB AVIF (~95% savings)
- **Code Updates**: Updated all references to use optimized WebP versions with picture elements for modern browsers
- **Documentation**: Added comprehensive `docs/IMAGE_OPTIMIZATION.md` with usage examples and best practices
- **Build Script**: Added `pnpm run optimize:images` command for manual image optimization

### Documentation Suite Restructuring
- **Consolidated Documentation**: Reorganized documentation into focused, maintainable structure
  - Added: `COMPONENTS.md`, `CONTENT.md`, `CONTRIBUTING.md`, `DEPLOYMENT.md`, `DEVELOPMENT.md`, `TROUBLESHOOTING.md`
  - Moved reference docs to `appendices/` directory (branding, motion library, social links, test IDs, hero animations)
  - Removed: Fragmented documentation files (COMPONENTS_REFERENCE.md, CONTENT_MODEL.md, PAGES_ROUTES.md, and 20+ other files)
- **SEO Documentation**: Comprehensive rewrite of `SEO.md` with updated best practices and implementation details
- **README Updates**: Enhanced main documentation index with clear navigation and quick start guides
- **Branding Documentation**: Updated `branding.md` with refined color system and design guidelines

### Phase 3: Deep Architecture Overhaul (Design System + Performance)
- **Design System Rationalization**: Cleaned up Tailwind config from 100+ color variants to 8 semantic colors, standardized spacing scale (xs-xl), removed duplicate color definitions
- **Component Migration**: Updated all major components (Navbar, AboutSection, BlogPostCard, ContactSection, CreativeCard, CreativeLabSection, ProjectsSection, MainLayout) to use new semantic color system (primary/secondary/background/foreground)
- **Image System Consolidation**: Enhanced AImage component to handle both imported and static images, updated all components to use unified image handling
- **Critical CSS Inlining**: Added critical CSS extraction for above-the-fold content to improve initial page load performance
- **Advanced Code Splitting**: Enhanced Astro config with intelligent chunking strategy:
  - Route-specific chunks (home-page, blog-page, projects-page)
  - Component-based chunks (hero-components, contact-components, ui-components)
  - Vendor chunks (react-vendor, radix-ui-vendor, animation-vendor, icons-vendor, forms-vendor)
- **Caching Strategy**: Added comprehensive cache headers in middleware:
  - Static assets: 1 year immutable cache
  - Images: 24h cache + 7 days stale-while-revalidate
  - HTML pages: 1h cache + 24h stale-while-revalidate
  - API routes: no-cache
- **Performance Optimizations**: Reduced bundle sizes through better chunking, improved loading strategies with critical CSS and advanced caching

### Major Refactoring - Homepage Consolidation
- **Page Consolidation**: Merged `/about`, `/projects/*`, `/creative/*`, and `/contact` functionality into homepage sections
- **Navigation Enhancement**: Added scroll-based active state detection and URL hash support for homepage sections (#about, #projects, #creative, #contact)
- **Code Cleanup**: Removed unused components (`AboutHero.tsx`, `ProjectCard.astro`, `ProjectCard.legacy.astro`, `AvatarBubble.tsx`, `MessageBubble.tsx`, `HeroSection.tsx`)
- **Route Simplification**: Eliminated 11 separate pages, reducing complexity while maintaining all functionality
- **API Cleanup**: Removed unused test contact endpoint (`/api/test-contact.ts`)

### Navigation Improvements
- **Scroll Detection**: Navbar now highlights active section while scrolling through homepage
- **URL Hash Support**: Direct links to sections work with smooth scrolling (e.g., `/vpoliteiadis.com/#projects`)
- **Responsive Design**: Section navigation only appears on homepage, maintains clean mobile experience

### Documentation Updates
- **COMPONENTS_REFERENCE.md**: Removed references to deleted components and updated mermaid diagrams
- **PAGES_ROUTES.md**: Updated route inventory and file structure to reflect consolidated architecture
- **ARCHITECTURE.md**: Simplified routing model and updated content collection references

## [0.0.5] - 2026-01-08

### Fixed
- **Build Failure on Vercel**: Fixed "Missing static asset references" error by moving asset check to run after Astro build instead of before
- **Asset Check Script**: Updated to skip `/images/` path validation since these are handled by Vercel's dynamic image optimization
- **Build Order**: Changed build sequence from `astro check && node scripts/asset-check.mjs && astro build` to `astro check && astro build && node scripts/asset-check.mjs`
- **TypeScript Errors**: Resolved conflicting type declarations for `window.va` in analytics.ts that clashed with Vercel Analytics types
- **GSAP Deprecation Warnings**: Updated GSAP timeline.to() calls to use modern API syntax with duration property
- **Lucide Icon Deprecation**: Fixed casing of deprecated Github, Instagram, and Linkedin icons to maintain compatibility

### Added
- **Troubleshooting Documentation**: Comprehensive fixes directory (`docs/fixes/`) with:
  - `BUILD_FAILURES.md`: Complete guide for common build issues and their solutions
  - `README.md`: Index for troubleshooting resources
- **Enhanced Documentation**:
  - Added troubleshooting section to `docs/IMAGE_OPTIMIZATION.md` covering image loading and optimization issues
  - Added troubleshooting section to `docs/README.md` with common Vercel deployment problems
  - Updated main documentation index to reference the fixes directory

### Documentation
- Created `docs/fixes/` directory for common bug fixes and troubleshooting guidelines
- Added comprehensive build failure solutions and prevention strategies
- Enhanced documentation with debug commands and common mistake patterns

## [0.0.4] - 2026-01-08

### Added
- **AboutSection Component**: New Astro-based component showcasing personal profile, work experience, education, and certifications with structured data
- **ProfileCard Component**: React component with tilt effects, social links, and status indicators for enhanced user representation
- **HeroSection Component**: New GSAP-powered hero section with floating animations for illustrations and laptop graphics
- **ProjectsSection Component**: Astro component for showcasing featured projects with GSAP animations and responsive design
- **CreativeLabSection Component**: Astro component for creative portfolio showcase with category-based styling and animations
- **Comprehensive Test Suite**: Full Playwright test coverage including:
  - Navigation tests across all pages
  - Page-level component tests (homepage, about, projects, blog, creative)
  - Accessibility tests with axe-core integration
  - Responsive design tests across breakpoints
  - Performance and SEO validation tests
  - Page Object Model implementation for maintainable tests
- **Hero Animations Documentation**: Added `HERO_ANIMATIONS_EXPLAINED.md` and `HERO_ANIMATIONS_IMPROVEMENTS.md` for animation patterns and best practices
- **Hero Images**: Added vasileios-illustration.png and laptop-illustration.png to public assets
- **Blog Post**: Added "Vibe Coding: AI-Assisted Development" blog post (marked as draft)
- **Component Registry**: Added registries in components.json for better resource management

### Changed
- **Hero Architecture**: Refactored hero section to use new HeroSection component with GSAP animations, replacing old chat layout approach
- **Image Handling**: Updated image imports to use public folder paths for better Astro compatibility
- **Homepage Layout**: Restructured index.astro to include AboutSection, ProjectsSection, and CreativeLabSection for comprehensive homepage experience
- **Profile Updates**: 
  - Updated employment timeline for Upiria Startup (2022-2024 instead of 2022-Present)
  - Enhanced profile presentation to emphasize senior expertise and freelance status
- **About Page**: Enhanced about.astro with new AboutSection integration and improved layout
- **Middleware**: Updated to allow scripts from Vercel Insights for improved performance tracking
- **Fetch Priority**: Adjusted fetch priority attributes in image components to align with React type expectations
- **Hero Height Calculations**: Improved hero section height calculations in index.astro for better layout

### Removed
- **NavigationButtons Component**: Removed navigation buttons from hero intro section to simplify hero focus
- **Old Chat Layout**: Deprecated AvatarBubble and MessageBubble components in favor of new HeroSection approach

### Fixed
- **Profile Card**: Updated Instagram link hover color for improved visibility
- **Blog Content**: Updated Bitcoin price references and timeline references for accuracy
- **Project URLs**: Updated Casa Capoeira live URL to official site
- **SEO Component**: Updated SEO component example to use existing image path
- **TypeScript Errors**: Fixed TypeScript errors in test utilities and components

### Documentation
- Added comprehensive hero animations documentation explaining GSAP animation patterns
- Enhanced test documentation with best practices and Page Object Model guidelines
- Updated component references to reflect new architecture

## [0.0.3] - 2025-12-19

## [0.0.3] - 2025-12-19

### Added
- Comprehensive documentation audit and verification system
- TODO.md tracking document for implementation vs documentation mismatches

### Changed
- Updated COMPONENTS_REFERENCE.md to accurately reflect actual script usage
- Fixed documentation discrepancies across multiple files
- Verified content collection schemas are accurate and complete

### Fixed
- Resolved robots.txt.ts implementation vs documentation mismatch
- Resolved ai.txt.ts implementation vs documentation mismatch
- Fixed sitemap references inconsistency across documentation
- Corrected vercel.json security headers documentation
- Verified shadcn/ui references and setup
- Validated structured data endpoints functionality
- Verified image optimization pipeline functionality
- Resolved component dependency documentation mismatches
- Verified content collection schemas alignment

### Verified
- All documentation accurately reflects actual implementation
- No discrepancies between docs and code
- All documented features are verified working
- Documentation is consistent across all files
- Implementation matches documented architecture
- Content collection schemas are comprehensive and accurate

## [0.0.2] - 2025-08-30

### Added
- Comprehensive image optimization pipeline documentation (IMAGE_OPTIMIZATION.md)
- Structured data endpoints documentation (STRUCTURED_DATA.md)
- Enhanced image optimization script to process source images from `src/assets/images/`

### Changed
- Updated image optimization script to automatically process source images
- Enhanced structured data endpoints with missing URL fields
- Improved JSON-LD schema compliance for blog and project endpoints

### Fixed
- Resolved Tailwind config syntax error in `ringColor` configuration
- Fixed missing `url` field in blog structured data endpoints
- Fixed missing `url` field in project structured data mainEntity
- Verified and documented image optimization pipeline functionality
- Verified and documented structured data endpoints functionality
- Cleaned up TODO.md to reflect completed tasks

### Verified
- Image optimization pipeline: 99%+ size reduction, multiple formats (WebP/AVIF), responsive breakpoints
- Structured data endpoints: 4 endpoint types, full schema.org compliance, valid JSON-LD generation
- Build integration: seamless image optimization and structured data generation during build process

## [0.0.1] - 2024-12-19

### Added
- Initial portfolio website structure
- Astro-based static site generation
- Tailwind CSS for styling
- React integration for interactive components
- Matrix rain background animation
- Responsive design system
- Blog and project showcase pages
- Contact form with validation
- Creative portfolio section
- SEO optimization and structured data
- Performance optimizations and image optimization

## 2025-01-XX — Hero Component v2
- **Hero.astro**: Refactored to use HeroAnimationController for better animation management
- **HeroAnimationController.tsx**: New React component managing headline, subtitle, and TextType sequence
- **Animation Flow**: TextType starts immediately after headline completion (no delay/fade-in)
- **Quotes**: Added 21 rotating quotes with typing/deleting animation
- **Styling**: Reduced text size, changed to Orbitron font for theme consistency
- **Timing**: Typing speed 45ms, deleting speed 25ms, pause 1500ms between quotes
- **CTA Integration**: Buttons animate independently after first quote completes

## 2025-08-11 — Docs v1
- Initial docs suite (10 files): INDEX, GETTING-STARTED, ARCHITECTURE, ADRs, CODE STYLE, UI/BRAND, COMPONENTS REF, PAGES/ROUTES, CONTENT MODEL, CHANGELOG.
- Embedded SEO, accessibility, security, and deployment guidance in relevant docs to respect file limit.

## 2025-12-XX — Documentation Suite v2 (Major Restructuring)
- **README.md**: New comprehensive entrypoint replacing INDEX.md with clear project overview and navigation
- **BRANDING.md**: Merged UI-GUIDELINES_BRAND.md content for comprehensive brand and UI guidelines
- **ARCHITECTURE.md**: Enhanced with technical implementation details, performance optimizations, and security headers
- **COMPONENTS_REFERENCE.md**: Expanded with detailed component inventory, dependencies, usage examples, and development guidelines
- **CONTENT_MODEL.md**: New comprehensive document covering content collections, schemas, data flow, and management workflows
- **PAGES_ROUTES.md**: Enhanced with route implementation details, SEO strategies, and performance considerations
- **Documentation Consolidation**: Eliminated duplicate content across files, improved consistency and flow
- **AI Agent Optimization**: Enhanced documentation structure for better AI indexing and comprehension
- **Developer Experience**: Improved onboarding flow and technical reference materials

### Documentation Improvements
- Added summary sections to all documents ("Who this is for / What you'll learn")
- Enhanced technical accuracy and implementation details
- Improved formatting consistency and accessibility
- Added comprehensive code examples and usage patterns
- Integrated performance, security, and SEO guidance throughout
- Eliminated UI-GUIDELINES_BRAND.md (merged into BRANDING.md)
- Deleted INDEX.md (replaced with comprehensive README.md)

### Unverified Assumptions
- shadcn/ui, Framer Motion, and Lucide are referenced in scope, but the repository currently does not include framer-motion or lucide packages, and does not use shadcn/ui components yet. Guidance is provided as optional future patterns.
- No Playwright/tests or CI workflows are present; testing/CI mentions are lightweight and advisory.

## 2025-12-XX — Documentation Audit & TODO Creation
- **CRITICAL ISSUES IDENTIFIED**: Major discrepancies between documentation and actual implementation
- **TODO.md**: Created comprehensive tracking document for all implementation vs documentation mismatches
- **Critical Discrepancies Found**:
  - robots.txt.ts implementation vs documentation mismatch
  - ai.txt.ts implementation vs documentation mismatch  
  - Sitemap references inconsistent across documentation
  - vercel.json security headers not accurately documented
  - shadcn/ui references without actual setup
- **Action Items**: Immediate fixes required for documentation accuracy
- **Verification Needed**: Structured data endpoints, image optimization pipeline, component dependencies
