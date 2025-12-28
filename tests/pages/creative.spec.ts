import { test, expect } from '@playwright/test';
import { CreativePage } from '../page-objects/CreativePage';

test.describe('Creative Page', () => {
  let creativePage: CreativePage;

  test.beforeEach(async ({ page }) => {
    creativePage = new CreativePage(page);
    await creativePage.goto();
  });

  test.describe('Page Loading', () => {
    test('should load creative page successfully', async () => {
      await expect(creativePage.page).toHaveURL('/creative');
      await expect(creativePage.pageContainer).toBeVisible();
    });

    test('should have proper page title', async () => {
      const title = await creativePage.page.title();
      expect(title).toBeTruthy();
      expect(title.toLowerCase()).toContain('creative');
    });

    test('should have navbar visible', async () => {
      await expect(creativePage.navPage.navbar).toBeVisible();
    });
  });

  test.describe('Creative Projects Grid', () => {
    test('should display creative projects grid', async () => {
      await expect(creativePage.creativeProjectsGrid).toBeVisible();
    });

    test('should have at least one creative project', async () => {
      const creativeProjectCards = await creativePage.getCreativeProjectCards();
      expect(creativeProjectCards.length).toBeGreaterThan(0);
    });

    test('should display creative project cards with hero links and CTAs', async () => {
      const creativeProjectCards = await creativePage.getCreativeProjectCards();

      for (const card of creativeProjectCards.slice(0, 3)) { // Test first 3 cards
        await expect(card.heroLink).toBeVisible();
        await expect(card.ctaButton).toBeVisible();
      }
    });
  });

  test.describe('Creative Project Navigation', () => {
    test('should navigate to creative project detail page when hero is clicked', async () => {
      const creativeProjectCards = await creativePage.getCreativeProjectCards();

      if (creativeProjectCards.length > 0) {
        const firstCard = creativeProjectCards[0];
        await creativePage.clickProjectHero(firstCard.title);
        const expectedUrl = `/creative/${firstCard.title.toLowerCase().replace(/\s+/g, '-')}`;
        await expect(creativePage.page).toHaveURL(expectedUrl);
      }
    });

    test('should navigate back to creative page from project detail', async () => {
      const creativeProjectCards = await creativePage.getCreativeProjectCards();

      if (creativeProjectCards.length > 0) {
        const firstCard = creativeProjectCards[0];
        await creativePage.verifyCreativeProjectNavigation(firstCard.title);
      }
    });
  });

  test.describe('CTA Functionality', () => {
    test('should have functional CTA buttons', async () => {
      const creativeProjectCards = await creativePage.getCreativeProjectCards();

      if (creativeProjectCards.length > 0) {
        const firstCard = creativeProjectCards[0];
        // CTA buttons might open modals, external links, or navigate
        await expect(firstCard.ctaButton).toBeEnabled();
      }
    });
  });

  test.describe('Gallery and Media', () => {
    test('should have gallery functionality if implemented', async () => {
      await creativePage.testGalleryFunctionality();
    });

    test('should load images with lazy loading', async () => {
      await creativePage.testImageLazyLoading();
    });

    test('should have alt text for all images', async () => {
      const images = creativePage.page.locator('img');
      const imageCount = await images.count();

      for (let i = 0; i < imageCount; i++) {
        const altText = await images.nth(i).getAttribute('alt');
        expect(altText).toBeTruthy();
        expect(altText!.length).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Creative Project Cards', () => {
    test('should have proper accessibility attributes', async () => {
      const creativeProjectCards = await creativePage.getCreativeProjectCards();

      for (const card of creativeProjectCards.slice(0, 2)) { // Test first 2 cards
        await expect(card.heroLink).toHaveAttribute('aria-label');
        await expect(card.ctaButton).toHaveAttribute('aria-label');
      }
    });

    test('should have hover effects', async () => {
      const creativeProjectCards = await creativePage.getCreativeProjectCards();

      if (creativeProjectCards.length > 0) {
        const firstCard = creativeProjectCards[0];
        await firstCard.heroLink.hover();
        await expect(firstCard.heroLink).toBeVisible(); // Should remain visible on hover
      }
    });

    test('should support keyboard navigation', async () => {
      const creativeProjectCards = await creativePage.getCreativeProjectCards();

      if (creativeProjectCards.length > 0) {
        const firstCard = creativeProjectCards[0];

        // Tab to hero link
        await creativePage.page.keyboard.press('Tab');
        await expect(firstCard.heroLink).toBeFocused();

        // Tab to CTA button
        await creativePage.page.keyboard.press('Tab');
        await expect(firstCard.ctaButton).toBeFocused();
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async () => {
      await creativePage.testResponsiveGrid({ width: 375, height: 667 });
      const creativeProjectCards = await creativePage.getCreativeProjectCards();
      expect(creativeProjectCards.length).toBeGreaterThan(0);
    });

    test('should work on tablet viewport', async () => {
      await creativePage.testResponsiveGrid({ width: 768, height: 1024 });
      const creativeProjectCards = await creativePage.getCreativeProjectCards();
      expect(creativeProjectCards.length).toBeGreaterThan(0);
    });

    test('should work on desktop viewport', async () => {
      await creativePage.testResponsiveGrid({ width: 1920, height: 1080 });
      const creativeProjectCards = await creativePage.getCreativeProjectCards();
      expect(creativeProjectCards.length).toBeGreaterThan(0);
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async () => {
      const h1Elements = creativePage.page.locator('h1');
      await expect(h1Elements).toHaveCount(1);
    });

    test('should have alt text for all images', async () => {
      const imagesWithoutAlt = await creativePage.page.locator('img:not([alt])').count();
      expect(imagesWithoutAlt).toBe(0);
    });

    test('should have proper focus management', async () => {
      const focusableElements = await creativePage.page.locator('a, button').count();
      expect(focusableElements).toBeGreaterThan(0);
    });

    test('should support screen reader navigation', async () => {
      await creativePage.checkAccessibility();
    });
  });

  test.describe('Performance', () => {
    test('should load within reasonable time', async () => {
      const startTime = Date.now();
      await creativePage.page.reload();
      await creativePage.waitForPageToLoad();
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000);
    });

    test('should load creative project images', async () => {
      const images = creativePage.page.locator('img');
      const imageCount = await images.count();

      if (imageCount > 0) {
        // Wait for images to load
        await creativePage.page.waitForTimeout(2000);

        for (let i = 0; i < Math.min(imageCount, 3); i++) {
          const isLoaded = await images.nth(i).evaluate((img) => (img as HTMLImageElement).naturalWidth > 0);
          expect(isLoaded).toBe(true);
        }
      }
    });
  });

  test.describe('SEO Elements', () => {
    test('should have meta description', async () => {
      const metaDescription = await creativePage.page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription!.length).toBeGreaterThan(0);
    });

    test('should have Open Graph tags', async () => {
      const ogTitle = await creativePage.page.locator('meta[property="og:title"]').getAttribute('content');
      const ogDescription = await creativePage.page.locator('meta[property="og:description"]').getAttribute('content');

      expect(ogTitle).toBeTruthy();
      expect(ogDescription).toBeTruthy();
    });
  });
});
