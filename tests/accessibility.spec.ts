import { test, expect } from '@playwright/test';
import { NavigationPage } from './page-objects/NavigationPage';

test.describe('Accessibility Tests', () => {
  let navPage: NavigationPage;

  test.beforeEach(async ({ page }) => {
    navPage = new NavigationPage(page);
  });

  test('homepage should have proper heading hierarchy', async ({ page }) => {
    await navPage.goto('/');
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
  });

  test('homepage should have semantic structure', async ({ page }) => {
    await navPage.goto('/');
    const mainElement = page.locator('main');
    await expect(mainElement).toBeVisible();
  });

  test('homepage should have accessible navigation', async ({ page }) => {
    await navPage.goto('/');
    await navPage.testAccessibility();
  });

  test('homepage should have alt text for images', async ({ page }) => {
    await navPage.goto('/');
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const altText = await images.nth(i).getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText!.length).toBeGreaterThan(0);
    }
  });

  test('all pages should have accessible navigation', async ({ page }) => {
    const pages = ['/', '/about', '/projects', '/creative', '/blog', '/contact'];

    for (const pageUrl of pages) {
      await navPage.goto(pageUrl);
      await navPage.testAccessibility();
    }
  });

  test('should support keyboard navigation on homepage', async ({ page }) => {
    await navPage.goto('/');
    await page.keyboard.press('Tab');
    let focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('contact form should be accessible', async ({ page }) => {
    await navPage.goto('/contact');
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('all pages should have proper heading hierarchy', async ({ page }) => {
    const pages = ['/', '/about', '/projects', '/creative', '/blog'];

    for (const pageUrl of pages) {
      await navPage.goto(pageUrl);
      const h1Elements = page.locator('h1');
      await expect(h1Elements).toHaveCount(1);
    }
  });

  test('all pages should have alt text for images', async ({ page }) => {
    const pages = ['/', '/about', '/projects', '/creative', '/blog'];

    for (const pageUrl of pages) {
      await navPage.goto(pageUrl);
      const images = page.locator('img');
      const imageCount = await images.count();

      for (let i = 0; i < imageCount; i++) {
        const altText = await images.nth(i).getAttribute('alt');
        expect(altText).toBeTruthy();
        expect(altText!.length).toBeGreaterThan(0);
      }
    }
  });

  test('should maintain accessibility on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navPage.goto('/');

    // Mobile menu should be accessible
    if (await navPage.isMobileMenuButtonVisible()) {
      await expect(navPage.mobileMenuButton).toHaveAttribute('aria-expanded');
      await expect(navPage.mobileMenuButton).toHaveAttribute('aria-controls');
    }
  });

  test('should respect reduced motion preferences', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await navPage.goto('/');

    // Check that page loads and is functional
    await expect(navPage.navbar).toBeVisible();
  });
});
