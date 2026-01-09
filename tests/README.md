# Comprehensive UI Test Suite

This directory contains a comprehensive Playwright test suite for the Vasileios Politeiadis portfolio website, covering navigation, UI components, accessibility, performance, and user experience across all pages and viewports.

## Test Architecture

### Page Object Model
- **NavigationPage**: Global navigation functionality
- **AboutSection**: About content, images, layout (section-based)
- **ProjectsSection**: Project grid, cards, navigation (section-based)
- **CreativeSection**: Creative projects, galleries, media (section-based)
- **HomePage**: Homepage hero, navigation buttons, chat layout
- **BlogPage**: Blog posts, newsletter, search/filtering
- **ContactFormPage**: Contact form (existing)

### Test Categories

#### 1. Navigation Tests (`navigation.spec.ts`)
- Global navigation across all pages
- Mobile hamburger menu behavior
- Active page highlighting
- Direct URL navigation
- Dynamic route navigation
- 404 page handling
- Browser back/forward navigation

#### 2. Page-Level Tests (`pages/`)
- **homepage.spec.ts**: Hero animations, navigation buttons, chat layout
- **about.spec.ts**: Content rendering, image loading, layout
- **projects.spec.ts**: Grid layout, project cards, learn more/view live actions
- **blog.spec.ts**: Post listing, newsletter signup, search/filtering
- **creative.spec.ts**: Project galleries, hero links, CTA buttons

#### 3. Component-Level Tests (`components/`)
- Hero components: Text animations, background images, responsive behavior
- Cards: Project cards, blog post cards, hover effects, image optimization
- Forms: Contact form (existing), validation states, accessibility
- Galleries: Lightbox functionality, image navigation, keyboard controls
- Navigation: Dropdown menus, mobile overlay, focus management

#### 4. Global Tests (`global.spec.ts`)
- Comprehensive global test suite covering critical functionality
- Integration testing across all homepage sections
- End-to-end validation of core user flows
- Cross-section interaction testing and validation

### Test Coverage Summary

#### Pages Covered
- ✅ Homepage (`/`)
- ✅ About page (`/about`)
- ✅ Projects page (`/projects`) + dynamic routes (`/projects/[slug]`)
- ✅ Blog page (`/blog`) + dynamic routes (`/blog/[slug]`)
- ✅ Creative page (`/creative`) + dynamic routes (`/creative/[slug]`)
- ✅ Contact page (`/contact`)
- ✅ 404 page

#### Functionality Covered
- ✅ Navigation (desktop & mobile)
- ✅ Form interactions (contact form)
- ✅ Dynamic content loading
- ✅ Image optimization & lazy loading
- ✅ Search & filtering (where implemented)
- ✅ Newsletter signup
- ✅ External link handling
- ✅ Error states & recovery
- ✅ Loading states & animations

#### Quality Assurance
- ✅ Accessibility (WCAG AA compliance)
- ✅ Responsive design (mobile-first)
- ✅ Cross-browser compatibility
- ✅ Performance optimization
- ✅ SEO best practices
- ✅ Error handling & edge cases

## Test Execution

### Running Tests

```bash
# Run all tests
pnpm exec playwright test

# Run specific test categories
pnpm exec playwright test --grep "navigation"
pnpm exec playwright test --grep "accessibility"
pnpm exec playwright test --grep "performance"
pnpm exec playwright test --grep "responsive"

# Run page-specific tests
pnpm exec playwright test pages/homepage.spec.ts
pnpm exec playwright test pages/about.spec.ts
pnpm exec playwright test pages/projects.spec.ts

# Run tests on specific browser
pnpm exec playwright test --project=chromium
pnpm exec playwright test --project=firefox
pnpm exec playwright test --project=webkit
pnpm exec playwright test --project="Mobile Chrome"

# Run accessibility tests only
TEST_TYPE=accessibility pnpm exec playwright test

# Run performance tests only
TEST_TYPE=performance pnpm exec playwright test

# Run tests in headed mode (see browser)
pnpm exec playwright test --headed

# Run tests in debug mode
pnpm exec playwright test --debug

# Generate test report
pnpm exec playwright show-report
```

### Test Configuration

The tests are configured in `playwright.config.ts` with:
- **Base URL**: `http://localhost:4321`
- **Auto-start dev server**
- **Multiple browser support** (Chrome, Firefox, Safari, Mobile)
- **Mobile viewport testing**
- **Screenshot and video on failure**
- **Trace collection on retry**
- **Test sharding for CI**
- **Parallel execution**

## Test Data & Selectors

### Test ID Registry

The tests use data-testid selectors defined in `docs/TEST_ID_REGISTRY.md`:

#### Navigation Elements
- `navbar` - Main navigation bar
- `navbar-logo` - Logo link
- `navbar-desktop-menu` - Desktop navigation menu
- `navbar-link-{name}` - Desktop navigation links
- `mobile-menu-button` - Mobile menu toggle
- `mobile-menu` - Mobile navigation menu
- `mobile-nav-link-{name}` - Mobile navigation links

#### Page Containers
- `page-home` - Homepage container
- `page-about` - About page container
- `page-projects` - Projects page container
- `page-blog` - Blog page container
- `page-creative` - Creative page container
- `page-contact` - Contact page container

#### Component Elements
- `hero-intro-section` - Hero intro section
- `hero-chat-layout` - Chat bubble layout
- `hero-navigation-buttons` - Navigation buttons container
- `nav-button-{name}` - Individual navigation buttons
- `projects-grid` - Projects grid container
- `project-card-{slug}` - Project card containers
- `blog-posts-grid` - Blog posts grid
- `blog-post-{slug}` - Blog post containers

### Test Data Management

Test data is managed through helper utilities:

```typescript
// Contact form test data
import { ContactFormTestData } from './utils/test-helpers';

// Navigation test helpers
import { NavigationTestHelper } from './utils/test-helpers';

// Accessibility test helpers
import { AccessibilityTestHelper } from './utils/test-helpers';

// Responsive design helpers
import { ResponsiveTestHelper } from './utils/test-helpers';

// Performance test helpers
import { PerformanceTestHelper } from './utils/test-helpers';

// SEO test helpers
import { SEOTestHelper } from './utils/test-helpers';
```

## API Mocking

Tests use `page.route()` for lightweight API mocking:

```typescript
// Mock successful response
await page.route('**/api/contact', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ success: true }),
  });
});
```

## Page Object Model

Each page has a dedicated Page Object class providing:
- Strongly typed selectors using `getByTestId()`
- Helper methods for common actions
- State management and validation
- Accessibility testing utilities
- Responsive behavior testing

## Best Practices

1. **Stable Selectors**: All tests use data-testid selectors only
2. **Explicit Waits**: Tests wait for elements to be visible/attached
3. **No Flakiness**: Tests use proper waiting strategies
4. **Accessibility First**: Tests verify ARIA attributes and screen reader support
5. **Cross-Browser**: Tests run on multiple browsers and viewports
6. **Performance Aware**: Tests include performance and SEO validation
7. **Comprehensive Coverage**: Tests cover happy paths, error cases, and edge cases
8. **Maintainable**: Page objects and helpers promote DRY principles

## Debugging

### Common Issues

1. **Element not found**: Check that data-testid selectors exist in the component
2. **Timeout errors**: Increase timeout or check for proper waiting
3. **Flaky tests**: Use explicit waits instead of fixed timeouts
4. **API mocking issues**: Verify route patterns match actual API calls
5. **Viewport issues**: Ensure tests account for responsive behavior

### Debug Commands

```bash
# Run with debug output
DEBUG=pw:api pnpm exec playwright test

# Run single test with trace
pnpm exec playwright test --trace on

# Open trace viewer
pnpm exec playwright show-trace trace.zip

# Run accessibility tests in isolation
TEST_TYPE=accessibility pnpm exec playwright test --debug

# Run performance tests with network logging
TEST_TYPE=performance DEBUG=pw:network pnpm exec playwright test
```

## Extending Tests

To add new test scenarios:

1. **Add data-testid selectors** to components in `docs/TEST_ID_REGISTRY.md`
2. **Create/update Page Objects** for new pages or components
3. **Add test helpers** to `utils/test-helpers.ts` for common functionality
4. **Create new test files** following the established patterns
5. **Update Playwright config** for new test categories if needed
6. **Document new coverage** in this README

## CI/CD Integration

Tests are optimized for CI environments with:
- **Retry logic** (2 retries on CI, 1 locally)
- **Parallel execution** (2 workers on CI)
- **Test sharding** for faster execution
- **Screenshot and video collection** on failure
- **GitHub Actions reporting** for CI
- **Environment-specific configuration**
- **Performance regression detection**
