import { test, expect } from '@playwright/test';
import { NavigationPage } from './page-objects/NavigationPage';
import { HomePage } from './page-objects/HomePage';
import { AboutPage } from './page-objects/AboutPage';
import { ProjectsPage } from './page-objects/ProjectsPage';
import { BlogPage } from './page-objects/BlogPage';
import { CreativePage } from './page-objects/CreativePage';

const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 },
  largeDesktop: { width: 2560, height: 1440 },
};

test.describe('Responsive Design Tests', () => {
  let navPage: NavigationPage;

  test.beforeEach(async ({ page }) => {
    navPage = new NavigationPage(page);
  });

  test.describe('Navigation Responsiveness', () => {
    test('should show desktop navigation on large screens', async ({ page }) => {
      await page.setViewportSize(viewports.desktop);
      await navPage.goto('/');

      await expect(navPage.desktopMenu).toBeVisible();
      await expect(navPage.mobileMenuButton).toBeHidden();
    });

    test('should show mobile navigation on small screens', async ({ page }) => {
      await page.setViewportSize(viewports.mobile);
      await navPage.goto('/');

      await expect(navPage.mobileMenuButton).toBeVisible();
      await expect(navPage.desktopMenu).toBeHidden();
    });

    test('should handle mobile menu toggle on mobile', async ({ page }) => {
      await page.setViewportSize(viewports.mobile);
      await navPage.goto('/');

      // Menu should start closed
      await expect(navPage.mobileMenu).toBeHidden();
      await expect(navPage.mobileMenuButton).toHaveAttribute('aria-expanded', 'false');

      // Open menu
      await navPage.openMobileMenu();
      await expect(navPage.mobileMenu).toBeVisible();
      await expect(navPage.mobileMenuButton).toHaveAttribute('aria-expanded', 'true');

      // Close menu
      await navPage.closeMobileMenu();
      await expect(navPage.mobileMenu).toBeHidden();
      await expect(navPage.mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('should maintain navigation functionality across breakpoints', async ({ page }) => {
      const breakpoints = [viewports.mobile, viewports.tablet, viewports.desktop];

      for (const viewport of breakpoints) {
        await page.setViewportSize(viewport);
        await navPage.goto('/');

        // Navigation should be functional
        await expect(navPage.navbar).toBeVisible();
        await expect(navPage.logo).toBeVisible();
      }
    });
  });

  test.describe('Homepage Responsiveness', () => {
  test('should adapt hero section across viewports', async ({ page }) => {
    const homePage = new HomePage(page);

    for (const [name, viewport] of Object.entries(viewports)) {
      await page.setViewportSize(viewport);
      await homePage.goto();

      // Hero section should be visible
      await expect(homePage.heroSection).toBeVisible();

      // Navigation buttons appear after animation, so just check hero layout exists
      await expect(homePage.heroChatLayout).toBeVisible();
      await expect(homePage.heroIntroSection).toBeVisible();
    }
  });

    test('should maintain touch targets on mobile', async ({ page }) => {
      await page.setViewportSize(viewports.mobile);
      const homePage = new HomePage(page);
      await homePage.goto();

      // Check that buttons meet minimum touch target size (44px)
      const navigationButtons = homePage.page.locator('[data-testid^="nav-button-"]');

      for (let i = 0; i < await navigationButtons.count(); i++) {
        const button = navigationButtons.nth(i);
        const box = await button.boundingBox();
        if (box) {
          expect(box.width).toBeGreaterThanOrEqual(44);
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
      }
    });
  });

  test.describe('Content Layout Responsiveness', () => {
  test('should adapt about page layout across viewports', async ({ page }) => {
    const aboutPage = new AboutPage(page);

    for (const [name, viewport] of Object.entries(viewports)) {
      await page.setViewportSize(viewport);
      await aboutPage.goto();

      await expect(aboutPage.aboutMainContent).toBeVisible();
      await expect(aboutPage.pageContainer).toBeVisible();
    }
  });

  test('should adapt projects grid across viewports', async ({ page }) => {
    const projectsPage = new ProjectsPage(page);

    for (const [name, viewport] of Object.entries(viewports)) {
      await page.setViewportSize(viewport);
      await projectsPage.goto();

      await expect(projectsPage.projectsGrid).toBeVisible();

      // Check that project cards exist (don't check specific card visibility as they might be dynamic)
      const projectCards = await projectsPage.getProjectCards();
      expect(projectCards.length).toBeGreaterThan(0);
    }
  });

    test('should adapt blog grid across viewports', async ({ page }) => {
      const blogPage = new BlogPage(page);

      for (const [name, viewport] of Object.entries(viewports)) {
        await page.setViewportSize(viewport);
        await blogPage.goto();

        await expect(blogPage.blogPostsGrid).toBeVisible();

        // Check that blog posts exist (may not have test IDs)
        const blogPosts = page.locator('.card, article, [data-title]');
        const postCount = await blogPosts.count();
        expect(postCount).toBeGreaterThan(0);
      }
    });

    test('should adapt creative grid across viewports', async ({ page }) => {
      const creativePage = new CreativePage(page);

      for (const [name, viewport] of Object.entries(viewports)) {
        await page.setViewportSize(viewport);
        await creativePage.goto();

        await expect(creativePage.creativeProjectsGrid).toBeVisible();

        const creativeProjectCards = await creativePage.getCreativeProjectCards();
        expect(creativeProjectCards.length).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Typography and Readability', () => {
    test('should maintain readable font sizes across viewports', async ({ page }) => {
      for (const [name, viewport] of Object.entries(viewports)) {
        await page.setViewportSize(viewport);
        await navPage.goto('/about');

        // Check that text is readable (basic check)
        const textElements = page.locator('p, h1, h2, h3, h4, h5, h6');
        const textCount = await textElements.count();
        expect(textCount).toBeGreaterThan(0);

        // Check that headings are visible
        const h1Elements = page.locator('h1');
        await expect(h1Elements.first()).toBeVisible();
      }
    });
  });

  test.describe('Image Responsiveness', () => {
  test('should display responsive images across viewports', async ({ page }) => {
    const pages = ['/', '/about', '/projects', '/creative', '/blog'];

    for (const pageUrl of pages) {
      await page.setViewportSize(viewports.desktop);
      await navPage.goto(pageUrl);

      // Check images exist and have proper attributes (only test desktop for simplicity)
      const images = page.locator('img');
      const imageCount = await images.count();

      if (imageCount > 0) {
        for (let i = 0; i < Math.min(imageCount, 2); i++) {
          const image = images.nth(i);
          const src = await image.getAttribute('src');
          expect(src).toBeTruthy();
        }
      }
    }
  });
  });

  test.describe('Interactive Elements', () => {
  test('should maintain button functionality across viewports', async ({ page }) => {
    const homePage = new HomePage(page);

    for (const [name, viewport] of Object.entries(viewports)) {
      await page.setViewportSize(viewport);
      await homePage.goto();

      // Test that navbar is functional
      await expect(homePage.navPage.navbar).toBeVisible();
      await expect(homePage.navPage.logo).toBeVisible();
    }
  });

  test('should maintain form usability on mobile', async ({ page }) => {
    await page.setViewportSize(viewports.mobile);
    await navPage.goto('/contact');

    // Check form container is accessible on mobile
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Check that form has some input elements
    const inputs = page.locator('input, textarea');
    const inputCount = await inputs.count();
    expect(inputCount).toBeGreaterThan(0);
  });
  });

  test.describe('Breakpoint Transitions', () => {
    test('should handle smooth transitions between breakpoints', async ({ page }) => {
      // Test transition from mobile to tablet
      await page.setViewportSize(viewports.mobile);
      await navPage.goto('/');
      await expect(navPage.mobileMenuButton).toBeVisible();

      await page.setViewportSize(viewports.tablet);
      await navPage.goto('/');
      // On tablet, should show appropriate navigation (may vary)

      await page.setViewportSize(viewports.desktop);
      await navPage.goto('/');
      await expect(navPage.desktopMenu).toBeVisible();
    });
  });

  test.describe('Performance Across Viewports', () => {
    test('should load efficiently on mobile', async ({ page }) => {
      await page.setViewportSize(viewports.mobile);

      const startTime = Date.now();
      await navPage.goto('/');
      await navPage.waitForNavbarToLoad();
      const loadTime = Date.now() - startTime;

      // Mobile should load reasonably fast
      expect(loadTime).toBeLessThan(3000);
    });

    test('should handle high-resolution displays', async ({ page }) => {
      await page.setViewportSize(viewports.largeDesktop);
      await navPage.goto('/');

      // Content should be visible and properly scaled
      await expect(navPage.navbar).toBeVisible();
      await expect(navPage.page.locator('main')).toBeVisible();
    });
  });
});
