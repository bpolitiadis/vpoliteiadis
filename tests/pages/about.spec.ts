import { test, expect } from '@playwright/test';
import { AboutPage } from '../page-objects/AboutPage';

test.describe('About Page', () => {
  let aboutPage: AboutPage;

  test.beforeEach(async ({ page }) => {
    aboutPage = new AboutPage(page);
    await aboutPage.goto();
  });

  test.describe('Page Loading', () => {
    test('should load about page successfully', async () => {
      await expect(aboutPage.page).toHaveURL('/about');
      await expect(aboutPage.pageContainer).toBeVisible();
    });

    test('should have proper page title', async () => {
      const title = await aboutPage.page.title();
      expect(title).toBeTruthy();
      expect(title.toLowerCase()).toContain('about');
    });

    test('should have navbar visible', async () => {
      await expect(aboutPage.navPage.navbar).toBeVisible();
    });
  });

  test.describe('Page Structure', () => {
    test('should display main content section', async () => {
      await expect(aboutPage.aboutMainContent).toBeVisible();
    });

    test('should display hero content', async () => {
      await expect(aboutPage.aboutHeroContent).toBeVisible();
    });

    test('should have proper content sections', async () => {
      await aboutPage.verifyContentSections();
    });
  });

  test.describe('Content Loading', () => {
    test('should load all images successfully', async () => {
      await aboutPage.verifyImagesLoad();
    });

    test('should have alt text for all images', async () => {
      const images = aboutPage.page.locator('img');
      const imageCount = await images.count();

      for (let i = 0; i < imageCount; i++) {
        const altText = await images.nth(i).getAttribute('alt');
        expect(altText).toBeTruthy();
        expect(altText!.length).toBeGreaterThan(0);
      }
    });

    test('should display text content', async () => {
      const textContent = await aboutPage.aboutMainContent.textContent();
      expect(textContent).toBeTruthy();
      expect(textContent!.length).toBeGreaterThan(0);
    });
  });

  test.describe('Layout and Design', () => {
    test('should have proper heading hierarchy', async () => {
      const h1Elements = aboutPage.page.locator('h1');
      await expect(h1Elements).toHaveCount(1);

      const h2Elements = aboutPage.page.locator('h2');
      const h3Elements = aboutPage.page.locator('h3');

      // Should have some headings but not too many H1s
      expect(await h2Elements.count() + await h3Elements.count()).toBeGreaterThan(0);
    });

    test('should have readable text content', async () => {
      const paragraphs = aboutPage.page.locator('p');
      const paragraphCount = await paragraphs.count();
      expect(paragraphCount).toBeGreaterThan(0);

      // Check that paragraphs have substantial content
      for (let i = 0; i < Math.min(paragraphCount, 3); i++) {
        const text = await paragraphs.nth(i).textContent();
        expect(text!.length).toBeGreaterThan(10);
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async () => {
      await aboutPage.testResponsiveBehavior({ width: 375, height: 667 });
      await expect(aboutPage.aboutMainContent).toBeVisible();
    });

    test('should work on tablet viewport', async () => {
      await aboutPage.testResponsiveBehavior({ width: 768, height: 1024 });
      await expect(aboutPage.aboutMainContent).toBeVisible();
    });

    test('should work on desktop viewport', async () => {
      await aboutPage.testResponsiveBehavior({ width: 1920, height: 1080 });
      await expect(aboutPage.aboutMainContent).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper semantic structure', async () => {
      const mainElement = aboutPage.page.locator('main');
      await expect(mainElement).toBeVisible();
    });

    test('should have no images without alt text', async () => {
      const imagesWithoutAlt = await aboutPage.page.locator('img:not([alt])').count();
      expect(imagesWithoutAlt).toBe(0);
    });

    test('should have proper focus management', async () => {
      const focusableElements = await aboutPage.page.locator('a, button').count();
      expect(focusableElements).toBeGreaterThan(0);
    });
  });

  test.describe('Performance', () => {
    test('should load within reasonable time', async () => {
      const startTime = Date.now();
      await aboutPage.page.reload();
      await aboutPage.waitForPageToLoad();
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000);
    });
  });

  test.describe('SEO Elements', () => {
    test('should have meta description', async () => {
      const metaDescription = await aboutPage.page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription!.length).toBeGreaterThan(0);
    });

    test('should have Open Graph tags', async () => {
      const ogTitle = await aboutPage.page.locator('meta[property="og:title"]').getAttribute('content');
      const ogDescription = await aboutPage.page.locator('meta[property="og:description"]').getAttribute('content');

      expect(ogTitle).toBeTruthy();
      expect(ogDescription).toBeTruthy();
    });
  });
});
