import { test, expect } from '@playwright/test';
import { NavigationPage } from './page-objects/NavigationPage';

test.describe('Global Site Behavior', () => {
  let navPage: NavigationPage;

  test.beforeEach(async ({ page }) => {
    navPage = new NavigationPage(page);
  });

  test.describe('Global Navigation', () => {
    test('should render navbar consistently across all sections', async () => {
      // Test navbar presence on homepage
      await navPage.goto('/');
      await navPage.verifyNavigationStructure();

      // Test navbar on all main sections (scroll-based navigation)
      const sections = ['about', 'projects', 'creative', 'contact'];
      for (const section of sections) {
        await navPage.scrollToSection(section);
        await navPage.verifyNavigationStructure();
      }
    });

    test('should navigate between sections using navbar', async () => {
      await navPage.goto('/');

      // Test navigation to each section - use appropriate navigation method based on viewport
      const sections = ['about', 'projects', 'creative', 'contact'];
      for (const section of sections) {
        const isDesktop = await navPage.isDesktopMenuVisible();
        if (isDesktop) {
          await navPage.navigateDesktop(section);
        } else {
          await navPage.navigateMobile(section);
        }
        await expect(navPage.page.locator(`[data-testid="page-${section}"]`)).toBeInViewport();
      }
    });
  });

  test.describe('Global SEO & Metadata', () => {
    test('should have consistent SEO metadata across pages', async () => {
      await navPage.goto('/');

      // Check core SEO elements
      const title = await navPage.page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);

      const metaDescription = await navPage.page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();

      // Check Open Graph tags
      const ogTitle = await navPage.page.locator('meta[property="og:title"]').getAttribute('content');
      const ogDescription = await navPage.page.locator('meta[property="og:description"]').getAttribute('content');
      const ogType = await navPage.page.locator('meta[property="og:type"]').getAttribute('content');

      expect(ogTitle).toBeTruthy();
      expect(ogDescription).toBeTruthy();
      expect(ogType).toBe('website');

      // Check structured data
      const structuredData = await navPage.page.locator('script[type="application/ld+json"]').count();
      expect(structuredData).toBeGreaterThan(0);
    });
  });

  test.describe('Global Accessibility', () => {
    test('should maintain accessibility standards across sections', async () => {
      await navPage.goto('/');

      // Test homepage accessibility - single-page app may have multiple H1s in sections
      const h1Count = await navPage.page.locator('h1').count();
      expect(h1Count).toBeGreaterThan(0);

      const imagesWithoutAlt = await navPage.page.locator('img:not([alt])').count();
      expect(imagesWithoutAlt).toBe(0);

      // Test navbar accessibility
      await navPage.testAccessibility();

      // Test sections accessibility (sample)
      const sections = ['about', 'projects', 'creative'];
      for (const section of sections) {
        await navPage.scrollToSection(section);
        const sectionH2 = navPage.page.locator(`[data-testid="page-${section}"] h2`);
        await expect(sectionH2).toBeVisible();
      }
    });
  });

  test.describe('Global Responsive Behavior', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 }
    ];

    test('should adapt layout across all breakpoints', async () => {
      await navPage.goto('/');

      for (const viewport of viewports) {
        await navPage.page.setViewportSize({ width: viewport.width, height: viewport.height });
        await navPage.page.reload();
        await navPage.waitForNavbarToLoad();

        // Verify navbar adapts
        if (viewport.width < 768) {
          // Mobile: hamburger menu should be visible
          await expect(navPage.mobileMenuButton).toBeVisible();
        } else {
          // Desktop: nav menu should be visible
          await expect(navPage.desktopMenu).toBeVisible();
        }

        // Verify main content is accessible
        const heroSection = navPage.page.locator('[data-testid="page-home"]');
        await expect(heroSection).toBeVisible();
      }
    });
  });

  test.describe('Global Performance', () => {
    test('should load efficiently across sections', async () => {
      const startTime = Date.now();
      await navPage.goto('/');
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(30000); // 30 second budget (includes dev server startup)

      // Test section navigation performance
      const sections = ['about', 'projects', 'creative', 'contact'];
      for (const section of sections) {
        const sectionStart = Date.now();
        await navPage.scrollToSection(section);
        const sectionTime = Date.now() - sectionStart;
        expect(sectionTime).toBeLessThan(2000); // 2 seconds for section scrolls (includes animation)
      }
    });

    test('should not have console errors', async () => {
      await navPage.goto('/');

      const consoleErrors: string[] = [];
      navPage.page.on('console', msg => {
        // Only capture actual JavaScript errors, not warnings or CSP violations
        if (msg.type() === 'error' && !msg.text().includes('Content Security Policy') && !msg.text().includes('Warning:')) {
          consoleErrors.push(msg.text());
        }
      });

      await navPage.page.reload();
      await navPage.waitForNavbarToLoad();

      // Allow time for any async errors
      await navPage.page.waitForTimeout(2000);

      expect(consoleErrors).toHaveLength(0);
    });
  });
});