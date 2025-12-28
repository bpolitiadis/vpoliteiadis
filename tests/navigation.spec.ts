import { test, expect } from '@playwright/test';
import { NavigationPage } from './page-objects/NavigationPage';

test.describe('Navigation - Global Tests', () => {
  let navPage: NavigationPage;

  test.beforeEach(async ({ page }) => {
    navPage = new NavigationPage(page);
  });

  test.describe('Navbar Structure', () => {
    test('should render navbar on homepage', async () => {
      await navPage.goto('/');
      await navPage.verifyNavigationStructure();
    });

    test('should render navbar on about page', async () => {
      await navPage.goto('/about');
      await navPage.verifyNavigationStructure();
    });

    test('should render navbar on projects page', async () => {
      await navPage.goto('/projects');
      await navPage.verifyNavigationStructure();
    });

    test('should render navbar on creative page', async () => {
      await navPage.goto('/creative');
      await navPage.verifyNavigationStructure();
    });

    test('should render navbar on blog page', async () => {
      await navPage.goto('/blog');
      await navPage.verifyNavigationStructure();
    });

    test('should render navbar on contact page', async () => {
      await navPage.goto('/contact');
      await navPage.verifyNavigationStructure();
    });
  });

  test.describe('Logo Navigation', () => {
    test('should navigate to home when clicking logo', async () => {
      await navPage.goto('/about');
      await navPage.clickLogo();
      await expect(navPage.page).toHaveURL('/');
    });

    test('should have proper accessibility attributes for logo', async () => {
      await navPage.goto('/');
      await expect(navPage.logo).toHaveAttribute('aria-label', /Vasileios Politeiadis - Home/);
    });
  });

  test.describe('Desktop Navigation', () => {
    test.skip('should navigate to all pages using desktop menu', async ({ isMobile }) => {
      // Skip on mobile viewports
      if (isMobile) return;

      await navPage.goto('/');

      const navItems = navPage.getNavItems();
      for (const item of navItems) {
        await navPage.navigateDesktop(item.label);
        expect(navPage.page.url()).toContain(item.href);
      }
    });

    test.skip('should highlight active page in desktop navigation', async ({ isMobile }) => {
      // Skip on mobile viewports
      if (isMobile) return;

      const navItems = navPage.getNavItems();
      for (const item of navItems) {
        await navPage.goto(item.href);
        const activeItem = await navPage.getActiveNavItem();
        expect(activeItem).toBe(item.label);
      }
    });

    test.skip('should have proper ARIA attributes for desktop navigation', async ({ isMobile }) => {
      // Skip on mobile viewports
      if (isMobile) return;

      await navPage.goto('/');
      await navPage.testAccessibility();
    });
  });

  test.describe('Mobile Navigation', () => {
    test.skip('should toggle mobile menu on mobile viewports', async ({ isMobile }) => {
      // Skip on desktop viewports
      if (!isMobile) return;

      await navPage.goto('/');

      // Menu should be closed initially
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

    test.skip('should navigate to all pages using mobile menu', async ({ isMobile }) => {
      // Skip on desktop viewports
      if (!isMobile) return;

      await navPage.goto('/');

      const navItems = navPage.getNavItems();
      for (const item of navItems) {
        await navPage.navigateMobile(item.label);
        expect(navPage.page.url()).toContain(item.href);
        // Go back to home for next iteration
        await navPage.goto('/');
      }
    });

    test.skip('should highlight active page in mobile navigation', async ({ isMobile }) => {
      // Skip on desktop viewports
      if (!isMobile) return;

      const navItems = navPage.getNavItems();
      for (const item of navItems) {
        await navPage.goto(item.href);
        await navPage.openMobileMenu();
        const activeItem = await navPage.getActiveNavItem();
        expect(activeItem).toBe(item.label);
        await navPage.closeMobileMenu();
      }
    });

    test.skip('should have proper ARIA attributes for mobile navigation', async ({ isMobile }) => {
      // Skip on desktop viewports
      if (!isMobile) return;

      await navPage.goto('/');
      await navPage.testAccessibility();
    });
  });

  test.describe('Keyboard Navigation', () => {
    test.skip('should support keyboard navigation on desktop', async ({ isMobile }) => {
      // Skip on mobile viewports
      if (isMobile) return;

      await navPage.goto('/');
      await navPage.testKeyboardNavigation();
    });

    test.skip('should support keyboard navigation on mobile', async ({ isMobile }) => {
      // Skip on desktop viewports
      if (!isMobile) return;

      await navPage.goto('/');
      await navPage.testKeyboardNavigation();
    });
  });

  test.describe('Direct URL Navigation', () => {
    test('should handle direct navigation to homepage', async () => {
      await navPage.goto('/');
      await expect(navPage.page).toHaveURL('/');
      const activeItem = await navPage.getActiveNavItem();
      expect(activeItem).toBe('Home');
    });

    test('should handle direct navigation to about page', async () => {
      await navPage.goto('/about');
      await expect(navPage.page).toHaveURL('/about');
      const activeItem = await navPage.getActiveNavItem();
      expect(activeItem).toBe('About');
    });

    test('should handle direct navigation to projects page', async () => {
      await navPage.goto('/projects');
      await expect(navPage.page).toHaveURL('/projects');
      const activeItem = await navPage.getActiveNavItem();
      expect(activeItem).toBe('Projects');
    });

    test('should handle direct navigation to creative page', async () => {
      await navPage.goto('/creative');
      await expect(navPage.page).toHaveURL('/creative');
      const activeItem = await navPage.getActiveNavItem();
      expect(activeItem).toBe('Creative');
    });

    test('should handle direct navigation to blog page', async () => {
      await navPage.goto('/blog');
      await expect(navPage.page).toHaveURL('/blog');
      const activeItem = await navPage.getActiveNavItem();
      expect(activeItem).toBe('Blog');
    });

    test('should handle direct navigation to contact page', async () => {
      await navPage.goto('/contact');
      await expect(navPage.page).toHaveURL('/contact');
      const activeItem = await navPage.getActiveNavItem();
      expect(activeItem).toBe('Contact');
    });
  });

  test.describe('Dynamic Route Navigation', () => {
    test('should handle navigation to blog post pages', async () => {
      // Test navigation to a specific blog post
      await navPage.page.goto('/blog/vibe-coding-ai-assisted-development');
      await navPage.waitForNavbarToLoad();
      await expect(navPage.navbar).toBeVisible();
    });

    test('should handle navigation to project pages', async () => {
      // Test navigation to a specific project
      await navPage.page.goto('/projects/casa-capoeira');
      await navPage.waitForNavbarToLoad();
      await expect(navPage.navbar).toBeVisible();
    });

    test('should handle navigation to creative project pages', async () => {
      // Test navigation to a specific creative work
      await navPage.page.goto('/creative/arte-imaginari');
      await navPage.waitForNavbarToLoad();
      await expect(navPage.navbar).toBeVisible();
    });
  });

  test.describe('404 Page Navigation', () => {
    test('should display navbar on 404 page', async () => {
      await navPage.page.goto('/nonexistent-page');
      await navPage.waitForNavbarToLoad();
      await expect(navPage.navbar).toBeVisible();
    });

    test('should allow navigation from 404 page', async () => {
      await navPage.page.goto('/nonexistent-page');
      await navPage.clickLogo();
      await expect(navPage.page).toHaveURL('/');
    });
  });

  test.describe('Browser Navigation', () => {
    test('should handle back/forward browser navigation', async () => {
      // Navigate through pages and test browser back/forward
      await navPage.goto('/');
      await navPage.page.goto('/about');
      await navPage.page.goto('/projects');

      // Go back
      await navPage.page.goBack();
      await expect(navPage.page).toHaveURL('/about');

      // Go back again
      await navPage.page.goBack();
      await expect(navPage.page).toHaveURL('/');

      // Go forward
      await navPage.page.goForward();
      await expect(navPage.page).toHaveURL('/about');
    });
  });
});
