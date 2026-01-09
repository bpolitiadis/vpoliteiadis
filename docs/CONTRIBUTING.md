# 🤝 Contributing

**Who this is for:** Developers contributing code, documentation, or features to the project.

**What you'll learn:** Development workflow, code standards, testing requirements, and contribution process.

> **TL;DR** - Fork, create feature branch, follow conventional commits, ensure tests pass. All contributions welcome!

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:
- Node.js >= 20.10.0
- pnpm >= 9.0.0
- Git configured with your details

```bash
# Verify setup
node -v && pnpm -v
git config --list --show-origin
```

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/yourusername/vpoliteiadis.git
   cd vpoliteiadis
   ```
3. **Install dependencies:**
   ```bash
   pnpm install
   ```
4. **Start development:**
   ```bash
   pnpm dev
   ```

## 🛠️ Development Workflow

### Branching Strategy

Use descriptive branch names with prefixes:

```bash
# Feature branches
git checkout -b feature/add-contact-form-validation
git checkout -b feature/improve-hero-animations

# Bug fixes
git checkout -b fix/image-optimization-errors
git checkout -b fix/mobile-navigation-bug

# Documentation
git checkout -b docs/update-component-api
git checkout -b docs/add-deployment-guide

# Maintenance
git checkout -b chore/update-dependencies
git checkout -b refactor/simplify-component-props
```

### Commit Conventions

Follow [Conventional Commits](https://conventionalcommits.org/) specification:

```bash
# Features
feat: add dark mode toggle component
feat: implement contact form with validation

# Bug fixes
fix: resolve image loading issue on mobile
fix: correct TypeScript error in profile card

# Documentation
docs: update component usage examples
docs: add deployment troubleshooting guide

# Code style
style: format code with prettier
style: fix eslint warnings

# Refactoring
refactor: simplify hero animation logic
refactor: extract reusable form validation

# Testing
test: add accessibility tests for navigation
test: implement e2e tests for contact form

# Maintenance
chore: update dependencies to latest versions
chore: remove unused utility functions
```

### Commit Best Practices

- **Write clear, descriptive messages**
- **Keep commits focused** - one logical change per commit
- **Reference issues** when applicable: `fix: resolve login bug (#123)`
- **Use present tense**: "Add feature" not "Added feature"
- **Capitalize first word**: "Fix bug" not "fix bug"

## 🧪 Testing Requirements

### Pre-commit Checks

All contributions must pass these checks:

```bash
# Run all quality checks
pnpm lint      # ESLint - code quality
pnpm format    # Prettier - code formatting
pnpm build     # TypeScript compilation + build
pnpm test      # Unit and integration tests
```

### Manual Testing Checklist

Before submitting a PR, verify:

- [ ] **Accessibility**: axe-core tests pass, keyboard navigation works
- [ ] **Responsive**: Works on mobile, tablet, and desktop
- [ ] **Performance**: Lighthouse scores ≥ 90 (Performance), ≥ 95 (SEO/Accessibility)
- [ ] **Cross-browser**: Tested in Chrome, Firefox, Safari
- [ ] **SEO**: Meta tags present, structured data valid

### Test Coverage

- **Critical user journeys** must have Playwright E2E tests
- **Component interactions** should have unit tests
- **Accessibility** requirements must be tested
- **Performance budgets** must be maintained

### QA Automation Standards

#### data-testid Naming Conventions
All interactive elements must have `data-testid` attributes for reliable test automation:

```tsx
// ✅ Good: Semantic naming with component context
<button data-testid="hero-cta-primary">Get Started</button>
<div data-testid="blog-post-card" data-title="Article Title">
<a data-testid="blog-post-link" href="/blog/article-slug">

// ❌ Avoid: Generic or inconsistent naming
<button data-testid="button">Click</button>
<div data-testid="card">
```

#### Component Test IDs
- **Navigation:** `nav-`, `navbar-`, `footer-` prefixes
- **Cards:** `{component}-card` (e.g., `blog-post-card`, `project-card`)
- **Forms:** `{field}-input`, `{field}-error`, `form-submit`
- **Interactive:** `cta-`, `link-`, `button-` prefixes
- **Content:** `content-`, `section-` prefixes for major sections

#### Playwright Test Structure
Following the Page Object Model (POM) pattern for maintainable test automation:

```typescript
// Page Object Model pattern
export class BlogPage {
  readonly page: Page;
  readonly blogPostsGrid: Locator;
  readonly newsletterSignup: Locator;

  constructor(page: Page) {
    this.page = page;
    this.blogPostsGrid = page.getByTestId('blog-posts-grid');
    this.newsletterSignup = page.getByTestId('newsletter-signup');
  }

  async goto() {
    await this.page.goto('/blog');
    await this.waitForPageToLoad();
  }

  async getBlogPostCards() {
    return this.page.locator('[data-testid^="blog-post-"]');
  }

  async clickReadMore(slug: string) {
    await this.page.getByTestId(`blog-post-link-${slug}`).click();
  }

  async waitForPageToLoad() {
    await expect(this.blogPostsGrid).toBeVisible({ timeout: 15000 });
  }
}
```

#### Test Execution Workflow
```bash
# Development testing
pnpm test:debug          # Debug mode with inspector
pnpm test:ui            # Visual test runner
pnpm test:headed        # Run tests with browser visible

# CI/CD testing
pnpm test               # Run all tests headless
pnpm test:report        # View detailed test reports
pnpm test:contact       # Run specific test suite

# Cross-browser testing
pnpm test --project=chromium
pnpm test --project=firefox
pnpm test --project=webkit
```

## 📝 Pull Request Process

### Creating a Pull Request

1. **Ensure your branch is up to date:**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Run final checks:**
   ```bash
   pnpm lint && pnpm build && pnpm test
   ```

3. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create PR on GitHub:**
   - Use descriptive title
   - Fill out PR template
   - Add screenshots/videos for UI changes
   - Include Lighthouse scores for performance changes

### PR Template Requirements

**Title:** Clear, descriptive summary
**Description:** Detailed explanation including:
- What problem does this solve?
- How was it implemented?
- Breaking changes (if any)
- Testing approach

**Checklist:**
- [ ] Tests pass locally
- [ ] Code follows style guide
- [ ] Documentation updated
- [ ] Performance maintained
- [ ] Accessibility verified

### Code Review Process

**Reviewers will check:**
- Code quality and style compliance
- Test coverage adequacy
- Performance impact assessment
- Security implications
- Documentation completeness

**Common feedback areas:**
- TypeScript strictness
- Component prop interfaces
- Error handling robustness
- Bundle size impact
- SEO/accessibility compliance

## 🎨 Code Standards

### TypeScript Guidelines

- **Strict mode** enabled - no `any` types allowed
- **Explicit types** for all function parameters and returns
- **Descriptive naming** - avoid single-letter variables
- **Interface over type** for object shapes

```typescript
// ✅ Good
interface ProjectProps {
  title: string;
  description: string;
  featured?: boolean;
}

function ProjectCard({ title, description, featured }: ProjectProps) {
  // implementation
}

// ❌ Avoid
function ProjectCard(props: any) {
  // implementation
}
```

### Component Guidelines

- **Prefer Astro** for static content, **React for interactivity**
- **Typed props** with clear interfaces
- **Accessibility first** - ARIA labels, focus management
- **Responsive design** - mobile-first approach
- **Performance conscious** - lazy loading where appropriate

### Styling Standards

- **Tailwind utility classes** in templates
- **Matrix-inspired theme** - neon lime (#39FF14) and digital emerald (#00B86B)
- **WCAG AA compliance** - sufficient color contrast
- **Reduced motion support** - respect `prefers-reduced-motion`

## 📚 Documentation Updates

### When to Update Documentation

- **New features**: Add usage examples and API documentation
- **Breaking changes**: Update migration guides
- **Bug fixes**: Document workarounds in troubleshooting
- **Performance changes**: Update performance guidelines

### Documentation Standards

- **Clear audience** identification in each document
- **Practical examples** over theoretical explanations
- **Up-to-date code samples** that actually work
- **Cross-references** between related documents

## 🔒 Security Considerations

### Code Security

- **Never commit secrets** - use environment variables
- **Validate all inputs** - especially user-generated content
- **Sanitize HTML** - prevent XSS attacks
- **Content Security Policy** - restrict resource loading

### Review Checklist

- [ ] No sensitive data exposed in client code
- [ ] Environment variables properly configured
- [ ] Input validation implemented
- [ ] CSP headers maintained
- [ ] Dependency updates reviewed for vulnerabilities

## 🚀 Deployment Impact

### Performance Budgets

**JavaScript Bundle:** <90KB total
**Core Web Vitals:** All green scores
**Lighthouse:** ≥90 Performance, ≥95 SEO/Accessibility

### Deployment Checklist

- [ ] Environment variables configured in Vercel
- [ ] Build succeeds in staging
- [ ] Performance metrics maintained
- [ ] Monitoring alerts set up
- [ ] Rollback plan documented

## 🤔 Getting Help

### Communication Channels

- **Issues**: Bug reports and feature requests
- **Discussions**: Questions and general discussion
- **Pull Request comments**: Code review feedback

### Support Guidelines

- **Search existing issues** before creating new ones
- **Use issue templates** when available
- **Provide reproduction steps** for bugs
- **Include environment details** (Node version, OS, etc.)

## 🎯 Recognition

Contributors are recognized through:
- **GitHub contributor statistics**
- **Changelog entries** for significant contributions
- **Author credits** in relevant documentation
- **Community recognition** in project communications

---

**Thank you for contributing!** Your efforts help make this project better for everyone. Check the [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) if you encounter any issues during development.