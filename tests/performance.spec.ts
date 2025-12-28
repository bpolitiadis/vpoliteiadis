import { test, expect } from '@playwright/test';
import { NavigationPage } from './page-objects/NavigationPage';

test.describe('Performance & SEO Tests', () => {
  let navPage: NavigationPage;

  test.beforeEach(async ({ page }) => {
    navPage = new NavigationPage(page);
  });

  test('should load homepage within 3 seconds', async ({ page }) => {
    const startTime = Date.now();
    await navPage.goto('/');
    await navPage.waitForNavbarToLoad();
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(3000);
    console.log(`Homepage load time: ${loadTime}ms`);
  });

  test('should load all pages within reasonable time', async ({ page }) => {
    const pages = [
      { url: '/', name: 'Home' },
      { url: '/about', name: 'About' },
      { url: '/projects', name: 'Projects' },
      { url: '/creative', name: 'Creative' },
      { url: '/blog', name: 'Blog' },
      { url: '/contact', name: 'Contact' },
    ];

    for (const { url, name } of pages) {
      const startTime = Date.now();
      await navPage.goto(url);
      await navPage.waitForNavbarToLoad();
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000);
      console.log(`${name} page load time: ${loadTime}ms`);
    }
  });

  test('should load dynamic routes efficiently', async ({ page }) => {
    // Test project pages
    const startTime = Date.now();
    await page.goto('/projects/casa-capoeira');
    await navPage.waitForNavbarToLoad();
    const projectLoadTime = Date.now() - startTime;

    expect(projectLoadTime).toBeLessThan(3000);
    console.log(`Project page load time: ${projectLoadTime}ms`);

    // Test blog post pages
    const blogStartTime = Date.now();
    await page.goto('/blog/vibe-coding-ai-assisted-development');
    await navPage.waitForNavbarToLoad();
    const blogLoadTime = Date.now() - blogStartTime;

    expect(blogLoadTime).toBeLessThan(3000);
    console.log(`Blog post load time: ${blogLoadTime}ms`);
  });

  test('should have proper meta tags on all pages', async ({ page }) => {
    const pages = [
      { url: '/', name: 'Home' },
      { url: '/about', name: 'About' },
      { url: '/projects', name: 'Projects' },
      { url: '/creative', name: 'Creative' },
      { url: '/blog', name: 'Blog' },
      { url: '/contact', name: 'Contact' },
    ];

    for (const { url, name } of pages) {
      await navPage.goto(url);

      // Check title
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
      expect(title.length).toBeLessThan(70);

      // Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription!.length).toBeGreaterThan(50);
      expect(metaDescription!.length).toBeLessThan(160);

      console.log(`${name} page - Title: "${title}" (${title.length} chars)`);
      console.log(`${name} page - Description: "${metaDescription}" (${metaDescription!.length} chars)`);
    }
  });

  test('should have proper Open Graph tags', async ({ page }) => {
    await navPage.goto('/');

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');

    expect(ogTitle).toBeTruthy();
    expect(ogDescription).toBeTruthy();
    expect(ogType).toBe('website');
    expect(ogUrl).toBeTruthy();
    expect(ogImage).toBeTruthy();
  });

  test('should have structured data', async ({ page }) => {
    await navPage.goto('/');

    const structuredDataElements = page.locator('script[type="application/ld+json"]');
    const structuredDataCount = await structuredDataElements.count();

    expect(structuredDataCount).toBeGreaterThan(0);

    for (let i = 0; i < structuredDataCount; i++) {
      const scriptContent = await structuredDataElements.nth(i).textContent();
      expect(scriptContent).toBeTruthy();

      // Try to parse as JSON
      try {
        const jsonData = JSON.parse(scriptContent!);
        expect(jsonData).toBeDefined();
        expect(jsonData['@context']).toBe('https://schema.org');

        console.log(`Structured data ${i + 1} type: ${jsonData['@type']}`);
      } catch (error) {
        throw new Error(`Invalid JSON-LD structured data: ${error}`);
      }
    }
  });

  test('should load images efficiently', async ({ page }) => {
    await navPage.goto('/');

    const images = page.locator('img');
    const imageCount = await images.count();

    if (imageCount > 0) {
      // Wait for images to load
      await page.waitForTimeout(2000);

      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const image = images.nth(i);
        const isLoaded = await image.evaluate((img) => (img as HTMLImageElement).naturalWidth > 0);
        expect(isLoaded).toBe(true);

        // Check for lazy loading
        const loading = await image.getAttribute('loading');
        if (loading === 'lazy') {
          console.log(`Lazy loading enabled for image ${i + 1}`);
        }
      }
    }
  });
});
