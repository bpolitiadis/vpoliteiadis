import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import { NavigationPage } from './NavigationPage';

export interface CreativeProjectCard {
  title: string;
  heroLink: Locator;
  ctaButton: Locator;
}

export class CreativePage {
  readonly page: Page;
  readonly navPage: NavigationPage;

  // Page containers
  readonly pageContainer: Locator;
  readonly creativeProjectsGrid: Locator;

  // Creative project cards
  private creativeProjectCards: Map<string, CreativeProjectCard> = new Map();

  constructor(page: Page) {
    this.page = page;
    this.navPage = new NavigationPage(page);

    // Page containers
    this.pageContainer = page.getByTestId('page-creative');
    this.creativeProjectsGrid = page.getByTestId('creative-projects-grid');
  }

  /**
   * Navigate to creative page
   */
  async goto() {
    await this.page.goto('/creative');
    await this.waitForPageToLoad();
  }

  /**
   * Wait for creative page to load completely
   */
  async waitForPageToLoad() {
    await this.navPage.waitForNavbarToLoad();
    await expect(this.pageContainer).toBeVisible({ timeout: 15000 });
    await expect(this.creativeProjectsGrid).toBeVisible();

    // Wait for creative projects to load
    await this.page.waitForTimeout(1000);
  }

  /**
   * Get all creative project cards on the page
   */
  async getCreativeProjectCards(): Promise<CreativeProjectCard[]> {
    const cards: CreativeProjectCard[] = [];

    // Find all creative project card containers
    const cardElements = this.page.locator('[data-testid^="featured-project-card-"]');

    for (let i = 0; i < await cardElements.count(); i++) {
      const cardElement = cardElements.nth(i);
      const testId = await cardElement.getAttribute('data-testid');

      if (testId && testId.startsWith('featured-project-card-')) {
        const title = testId.replace('featured-project-card-', '');

        const card: CreativeProjectCard = {
          title: title.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          heroLink: this.page.getByTestId(`featured-project-hero-${title}`),
          ctaButton: this.page.getByTestId(`featured-project-cta-${title}`),
        };

        cards.push(card);
        this.creativeProjectCards.set(title, card);
      }
    }

    return cards;
  }

  /**
   * Verify creative projects grid layout
   */
  async verifyCreativeProjectsGrid() {
    await expect(this.creativeProjectsGrid).toBeVisible();

    // Check that we have at least one creative project card
    const creativeProjectCards = await this.getCreativeProjectCards();
    expect(creativeProjectCards.length).toBeGreaterThan(0);
  }

  /**
   * Click hero link for a creative project
   */
  async clickProjectHero(title: string) {
    const card = this.creativeProjectCards.get(title) || await this.findCreativeProjectCard(title);
    await card.heroLink.click();
    await this.page.waitForURL(`/creative/${title.toLowerCase().replace(/\s+/g, '-')}`);
  }

  /**
   * Click CTA button for a creative project
   */
  async clickProjectCTA(title: string) {
    const card = this.creativeProjectCards.get(title) || await this.findCreativeProjectCard(title);
    await card.ctaButton.click();
    // CTA might open external link or modal - handle appropriately
  }

  /**
   * Find a creative project card by title
   */
  private async findCreativeProjectCard(title: string): Promise<CreativeProjectCard> {
    const normalizedTitle = title.toLowerCase().replace(/\s+/g, '-');
    const heroLink = this.page.getByTestId(`featured-project-hero-${normalizedTitle}`);
    const ctaButton = this.page.getByTestId(`featured-project-cta-${normalizedTitle}`);

    const card: CreativeProjectCard = {
      title,
      heroLink,
      ctaButton,
    };

    this.creativeProjectCards.set(title, card);
    return card;
  }

  /**
   * Test gallery/modal functionality if present
   */
  async testGalleryFunctionality() {
    // Check for gallery elements
    const galleryElements = this.page.locator('[data-testid*="gallery"], [data-testid*="lightbox"]');
    const hasGallery = await galleryElements.count() > 0;

    if (hasGallery) {
      await expect(galleryElements.first()).toBeVisible();
    }
  }

  /**
   * Test image lazy loading
   */
  async testImageLazyLoading() {
    const images = this.page.locator('img');
    const imageCount = await images.count();

    if (imageCount > 0) {
      // Check for loading="lazy" attribute
      for (let i = 0; i < Math.min(imageCount, 3); i++) {
        const loadingAttr = await images.nth(i).getAttribute('loading');
        // Lazy loading is good practice but not required
        if (loadingAttr) {
          expect(loadingAttr).toBe('lazy');
        }
      }
    }
  }

  /**
   * Test responsive grid layout
   */
  async testResponsiveGrid(viewportSize: { width: number; height: number }) {
    await this.page.setViewportSize(viewportSize);
    await this.page.reload();
    await this.waitForPageToLoad();

    await expect(this.creativeProjectsGrid).toBeVisible();

    // Verify creative project cards are still visible
    const creativeProjectCards = await this.getCreativeProjectCards();
    for (const card of creativeProjectCards.slice(0, 2)) { // Test first 2 cards
      await expect(card.heroLink).toBeVisible();
      await expect(card.ctaButton).toBeVisible();
    }
  }

  /**
   * Check accessibility
   */
  async checkAccessibility() {
    // Check for proper heading hierarchy
    const h1Elements = this.page.locator('h1');
    await expect(h1Elements).toHaveCount(1);

    // Check alt text on images
    const imagesWithoutAlt = await this.page.locator('img:not([alt])').count();
    expect(imagesWithoutAlt).toBe(0);

    // Check creative project card accessibility
    const creativeProjectCards = await this.getCreativeProjectCards();
    for (const card of creativeProjectCards.slice(0, 2)) { // Test first 2 cards
      await expect(card.heroLink).toHaveAttribute('aria-label');
      await expect(card.ctaButton).toHaveAttribute('aria-label');
    }
  }

  /**
   * Verify creative project navigation
   */
  async verifyCreativeProjectNavigation(title: string) {
    const normalizedTitle = title.toLowerCase().replace(/\s+/g, '-');
    await this.clickProjectHero(title);
    await expect(this.page).toHaveURL(`/creative/${normalizedTitle}`);

    // Go back and verify we're back on creative page
    await this.page.goBack();
    await expect(this.page).toHaveURL('/creative');
  }
}
