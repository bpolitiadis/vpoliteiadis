import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import { NavigationPage } from './NavigationPage';

export class AboutPage {
  readonly page: Page;
  readonly navPage: NavigationPage;

  // Page containers
  readonly pageContainer: Locator;
  readonly aboutMainContent: Locator;
  readonly aboutHeroContent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navPage = new NavigationPage(page);

    // Page containers
    this.pageContainer = page.getByTestId('page-about');
    this.aboutMainContent = page.getByTestId('about-main-content');
    this.aboutHeroContent = page.getByTestId('about-hero-content');
  }

  /**
   * Navigate to about page
   */
  async goto() {
    await this.page.goto('/about');
    await this.waitForPageToLoad();
  }

  /**
   * Wait for about page to load completely
   */
  async waitForPageToLoad() {
    await this.navPage.waitForNavbarToLoad();
    await expect(this.pageContainer).toBeVisible({ timeout: 15000 });
    await expect(this.aboutMainContent).toBeVisible();

    // Wait for any content to load
    await this.page.waitForTimeout(1000);
  }

  /**
   * Verify about page structure
   */
  async verifyPageStructure() {
    await expect(this.pageContainer).toBeVisible();
    await expect(this.aboutMainContent).toBeVisible();
    await expect(this.aboutHeroContent).toBeVisible();
  }

  /**
   * Check for images and verify they load
   */
  async verifyImagesLoad() {
    const images = this.page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      await expect(image).toBeVisible();

      // Check if image has loaded (naturalWidth > 0)
      const isLoaded = await image.evaluate((img) => (img as HTMLImageElement).naturalWidth > 0);
      expect(isLoaded).toBe(true);
    }
  }

  /**
   * Verify content sections are present
   */
  async verifyContentSections() {
    // Check for headings
    const headings = this.page.locator('h1, h2, h3, h4, h5, h6');
    await expect(headings.first()).toBeVisible();

    // Check for paragraphs
    const paragraphs = this.page.locator('p');
    await expect(paragraphs.first()).toBeVisible();
  }

  /**
   * Test responsive layout
   */
  async testResponsiveBehavior(viewportSize: { width: number; height: number }) {
    await this.page.setViewportSize(viewportSize);
    await this.page.reload();
    await this.waitForPageToLoad();

    // Verify content is still accessible
    await expect(this.aboutMainContent).toBeVisible();
  }

  /**
   * Check accessibility
   */
  async checkAccessibility() {
    // Check heading hierarchy
    const h1Elements = this.page.locator('h1');
    await expect(h1Elements).toHaveCount(1);

    // Check alt text on images
    const imagesWithoutAlt = await this.page.locator('img:not([alt])').count();
    expect(imagesWithoutAlt).toBe(0);

    // Check for proper semantic structure
    const mainElement = this.page.locator('main');
    await expect(mainElement).toBeVisible();
  }
}
