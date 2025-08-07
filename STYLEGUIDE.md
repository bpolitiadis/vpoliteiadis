# 🎨 Style Guide - vpoliteiadis

A comprehensive guide to the design system, component patterns, and development standards for the vpoliteiadis portfolio project.

## 📋 Table of Contents

- [Design System](#design-system)
- [Typography](#typography)
- [Color Palette](#color-palette)
- [Component Patterns](#component-patterns)
- [Layout Guidelines](#layout-guidelines)
- [Animation Standards](#animation-standards)
- [Accessibility Guidelines](#accessibility-guidelines)
- [Code Style](#code-style)
- [Content Guidelines](#content-guidelines)

## 🎨 Design System

### Brand Identity

The vpoliteiadis portfolio embodies a **Matrix-inspired cyberpunk aesthetic** that reflects:

- **Technical Excellence:** Clean, precise, and professional
- **Creative Innovation:** Bold, futuristic, and imaginative
- **Digital Mastery:** Sophisticated, tech-forward, and cutting-edge

### Design Principles

1. **Clarity First:** Information hierarchy and readability above all
2. **Consistency:** Unified visual language across all components
3. **Accessibility:** Inclusive design that works for everyone
4. **Performance:** Optimized for speed and user experience
5. **Responsiveness:** Seamless experience across all devices

## 🔤 Typography

### Font Stack

```css
/* Headings */
font-family: 'Orbitron', sans-serif;

/* Body Text */
font-family: 'Inter', system-ui, sans-serif;

/* Code/Mono */
font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
```

### Type Scale

| Element | Font Size | Line Height | Font Weight | Font Family |
|---------|-----------|-------------|-------------|-------------|
| H1 | 2.5rem - 4rem | 1.1 | 700-900 | Orbitron |
| H2 | 2rem - 2.5rem | 1.2 | 700 | Orbitron |
| H3 | 1.5rem - 1.75rem | 1.3 | 600 | Orbitron |
| H4 | 1.25rem - 1.5rem | 1.4 | 600 | Orbitron |
| Body | 1rem | 1.6 | 400 | Inter |
| Small | 0.875rem | 1.5 | 400 | Inter |
| Caption | 0.75rem | 1.4 | 400 | Inter |

### Typography Classes

```css
/* Heading Classes */
.text-heading-1 { /* H1 styles */ }
.text-heading-2 { /* H2 styles */ }
.text-heading-3 { /* H3 styles */ }

/* Body Text Classes */
.text-body { /* Body text styles */ }
.text-body-small { /* Small text styles */ }
.text-caption { /* Caption styles */ }

/* Special Effects */
.text-glow { /* Neon glow effect */ }
.text-matrix { /* Matrix-style text */ }
```

## 🎨 Color Palette

### Primary Colors

```css
/* Matrix Black - Background */
--background: #0A0A0A;
--card: #222222;
--muted: #222222;

/* Neon Lime - Primary */
--primary: #39FF14;
--primary-foreground: #0A0A0A;

/* Digital Emerald - Secondary */
--secondary: #00B86B;
--secondary-foreground: #0A0A0A;

/* Matrix White - Text */
--foreground: #E8FFE8;
--card-foreground: #E8FFE8;
```

### Extended Palette

```css
/* Additional Cyberpunk Colors */
--neon-cyan: #00FFFF;
--neon-purple: #8A2BE2;
--neon-pink: #FF1493;
--cyber-blue: #0066CC;
--matrix-gold: #FFD700;

/* Semantic Colors */
--success: #00B86B;
--warning: #FFAA00;
--destructive: #FF4444;
--info: #39FF14;
```

### Color Usage Guidelines

- **Primary (#39FF14):** Interactive elements, CTAs, highlights
- **Secondary (#00B86B):** Secondary actions, accents, success states
- **Background (#0A0A0A):** Main background, cards, containers
- **Foreground (#E8FFE8):** Primary text, headings
- **Muted (#222222):** Secondary backgrounds, borders, dividers

## 🧩 Component Patterns

### Button Components

#### Primary Button
```astro
<button class="btn-primary">
  <span class="btn-content">Button Text</span>
</button>
```

#### Secondary Button
```astro
<button class="btn-secondary">
  <span class="btn-content">Button Text</span>
</button>
```

#### Button Variants
- **Default:** Transparent background with colored border
- **Hover:** Filled background with glow effect
- **Active:** Pressed state with reduced opacity
- **Disabled:** Muted colors with reduced opacity

### Card Components

#### Project Card
```astro
<article class="card project-card">
  <div class="card-image">
    <img src={coverImage} alt={title} />
  </div>
  <div class="card-content">
    <h3 class="card-title">{title}</h3>
    <p class="card-description">{description}</p>
    <div class="card-tags">
      {tags.map(tag => <span class="tag">{tag}</span>)}
    </div>
  </div>
</article>
```

#### Creative Card
```astro
<article class="card creative-card">
  <div class="card-media">
    <img src={coverImage} alt={title} />
    <div class="card-overlay">
      <button class="view-button">View</button>
    </div>
  </div>
  <div class="card-content">
    <h3 class="card-title">{title}</h3>
    <p class="card-description">{description}</p>
    <div class="card-tools">
      {tools.map(tool => <span class="tool">{tool}</span>)}
    </div>
  </div>
</article>
```

### Navigation Components

#### Navbar
```astro
<nav class="navbar" role="navigation">
  <div class="navbar-brand">
    <a href="/" class="logo">VP</a>
  </div>
  <div class="navbar-menu">
    {navItems.map(item => (
      <a href={item.href} class="nav-link">{item.label}</a>
    ))}
  </div>
  <div class="navbar-actions">
    <button class="theme-toggle">🌙</button>
  </div>
</nav>
```

### Form Components

#### Input Field
```astro
<div class="form-field">
  <label for="email" class="form-label">Email</label>
  <input 
    type="email" 
    id="email" 
    class="form-input" 
    placeholder="Enter your email"
    required
  />
  <div class="form-error" aria-live="polite"></div>
</div>
```

#### Form Validation States
- **Default:** Border with primary color
- **Focus:** Enhanced border with glow effect
- **Error:** Red border with error message
- **Success:** Green border with success indicator

## 📐 Layout Guidelines

### Grid System

```css
/* Container */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Grid Layouts */
.grid-1 { grid-template-columns: 1fr; }
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive Grid */
@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
}
```

### Spacing Scale

```css
/* Spacing Variables */
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
```

### Layout Components

#### Hero Section
```astro
<section class="hero">
  <div class="hero-background">
    <!-- Animated background elements -->
  </div>
  <div class="hero-content">
    <h1 class="hero-title">Full-Stack Developer & AI Visionary</h1>
    <p class="hero-subtitle">Bridging cutting-edge technology with surreal creativity</p>
    <div class="hero-actions">
      <a href="/projects" class="btn-primary">Explore My Work</a>
      <a href="/about" class="btn-secondary">Learn More</a>
    </div>
  </div>
</section>
```

#### Content Section
```astro
<section class="content-section">
  <div class="container">
    <header class="section-header">
      <h2 class="section-title">Section Title</h2>
      <p class="section-description">Section description</p>
    </header>
    <div class="section-content">
      <!-- Content goes here -->
    </div>
  </div>
</section>
```

## ✨ Animation Standards

### Animation Principles

1. **Purposeful:** Every animation serves a function
2. **Smooth:** 60fps performance with easing functions
3. **Accessible:** Respects `prefers-reduced-motion`
4. **Consistent:** Unified timing and easing across components

### Animation Utilities

Use Tailwind utilities and project CSS keyframes defined in `src/styles/global.css`:

```html
<div class="animate-fade-in"></div>
<div class="animate-slide-up"></div>
<div class="animate-glow"></div>
<div class="animate-pulse-slow"></div>
```

### Keyframe Definitions

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    transform: translateY(10px);
    opacity: 0;
  }
  to { 
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes glow {
  0% { box-shadow: 0 0 5px rgba(57, 255, 20, 0.3); }
  100% { box-shadow: 0 0 20px rgba(57, 255, 20, 0.6); }
}
```

### Hover Effects

```css
/* Prefer Tailwind utilities for hover transforms and shadow utilities */

/* Link Hover */
.link:hover {
  color: var(--primary);
  text-shadow: 0 0 10px rgba(57, 255, 20, 0.5);
}
```

## ♿ Accessibility Guidelines

### WCAG 2.1 AA Compliance

#### Color Contrast
- **Normal text:** 4.5:1 minimum contrast ratio
- **Large text:** 3:1 minimum contrast ratio
- **UI components:** 3:1 minimum contrast ratio

#### Keyboard Navigation
- **Tab order:** Logical and intuitive
- **Focus indicators:** Visible and clear
- **Skip links:** Available for main content

#### Screen Reader Support
- **Semantic HTML:** Proper heading hierarchy
- **ARIA labels:** Descriptive and helpful
- **Alt text:** Meaningful image descriptions

### Accessibility Classes

```css
/* Screen Reader Only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus Styles */
.focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .text-primary { color: #00ff00 !important; }
  .border-primary { border-color: #00ff00 !important; }
}
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 💻 Code Style

### Astro Component Structure

```astro
---
// 1. Imports
import type { Project } from '../content/config';
import ProjectCard from '../components/ProjectCard.astro';

// 2. Props interface
export interface Props {
  projects: Project[];
  title?: string;
}

// 3. Props destructuring with defaults
const { projects, title = "Projects" } = Astro.props;
---

<!-- 4. Semantic HTML structure -->
<section class="projects-grid" aria-labelledby="projects-title">
  <h2 id="projects-title" class="section-title">{title}</h2>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {projects.map(project => (
      <ProjectCard project={project} />
    ))}
  </div>
</section>

<!-- 5. Component-specific styles -->
<style>
  .projects-grid {
    padding: var(--space-2xl) 0;
  }
  
  .section-title {
    margin-bottom: var(--space-xl);
    text-align: center;
  }
</style>
```

### TypeScript Guidelines

```typescript
// Use interfaces for object shapes
interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  className?: string;
}

// Use type for unions and primitives
type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

// Use const assertions for static data
const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
] as const;
```

### CSS Organization

```css
/* 1. CSS Custom Properties */
:root {
  --primary: #39FF14;
  --secondary: #00B86B;
  /* ... other variables */
}

/* 2. Base styles */
@layer base {
  html { /* base styles */ }
  body { /* base styles */ }
}

/* 3. Component styles */
@layer components {
  .btn-primary { /* component styles */ }
  .card { /* component styles */ }
}

/* 4. Utility styles */
@layer utilities {
  .text-glow { /* utility styles */ }
  .animate-fade-in { /* utility styles */ }
}
```

## 📝 Content Guidelines

### Writing Style

#### Tone and Voice
- **Professional but approachable**
- **Technical but accessible**
- **Confident but humble**
- **Creative but purposeful**

#### Content Structure
- **Clear headings** with proper hierarchy
- **Concise paragraphs** (2-3 sentences max)
- **Bullet points** for lists and features
- **Code examples** when relevant

### Content Types

#### Project Descriptions
- **Problem:** What challenge was solved
- **Solution:** How it was approached
- **Impact:** What results were achieved
- **Technologies:** Tools and frameworks used

#### Blog Posts
- **Introduction:** Hook and context
- **Main content:** Detailed explanation
- **Examples:** Code snippets and demos
- **Conclusion:** Summary and next steps

#### Creative Pieces
- **Inspiration:** What inspired the work
- **Process:** How it was created
- **Tools:** AI tools and techniques used
- **Outcome:** Final result and reception

### SEO Guidelines

#### Meta Tags
```html
<meta name="description" content="Clear, compelling description">
<meta name="keywords" content="relevant, specific, keywords">
<meta property="og:title" content="Title for social sharing">
<meta property="og:description" content="Description for social sharing">
<meta property="og:image" content="Image for social sharing">
```

#### Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Vasileios Politeiadis",
  "jobTitle": "Full-Stack Developer",
  "description": "Full-Stack Developer & AI Visionary"
}
```

## 🔧 Development Standards

### File Organization

```
src/
├── components/          # Reusable components
│   ├── ui/             # Basic UI components
│   ├── layout/         # Layout components
│   └── content/        # Content-specific components
├── layouts/            # Page layouts
├── pages/              # Route pages
├── content/            # Content collections
├── styles/             # Global styles
├── utils/              # Utility functions
└── types/              # TypeScript type definitions
```

### Naming Conventions

- **Components:** PascalCase (`ProjectCard.astro`)
- **Files:** kebab-case (`project-card.astro`)
- **Variables:** camelCase (`projectTitle`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_PROJECTS`)
- **CSS Classes:** kebab-case (`project-card`)

### Performance Guidelines

- **Lazy load** images and components
- **Optimize** bundle size
- **Minimize** re-renders
- **Use** appropriate image formats
- **Implement** proper caching

---

**This style guide ensures consistency and quality across the vpoliteiadis portfolio project. Follow these guidelines to maintain the cyberpunk aesthetic and professional standards.** 