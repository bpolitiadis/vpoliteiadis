import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import { NavigationPage } from './NavigationPage';

export class AboutSection {
  readonly page: Page;
  readonly navPage: NavigationPage;

  // Section containers
  readonly sectionContainer: Locator;

  // About content elements
  readonly heroContent: Locator;
  readonly mainContent: Locator;

  // Aliases for backward compatibility with tests
  readonly aboutHeroContent: Locator;
  readonly aboutMainContent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navPage = new NavigationPage(page);

    // Section containers
    this.sectionContainer = page.getByTestId('page-about');

    // About content elements
    this.heroContent = page.getByTestId('about-hero-content');
    this.mainContent = page.getByTestId('about-main-content');

    // Aliases for backward compatibility
    this.aboutHeroContent = this.heroContent;
    this.aboutMainContent = this.mainContent;
  }

  /**
   * Scroll to about section
   */
  async scrollToSection() {
    await this.navPage.scrollToAbout();
    await this.waitForSectionToLoad();
  }

  /**
   * Wait for about section to load completely
   */
  async waitForSectionToLoad() {
    await this.navPage.waitForNavbarToLoad();
    await expect(this.sectionContainer).toBeVisible({ timeout: 15000 });
    await expect(this.sectionContainer).toBeInViewport();

    // Wait for content to load
    await this.page.waitForTimeout(1000);
  }

  /**
   * Verify about section structure and content
   */
  async verifySectionStructure() {
    // Check section container
    await expect(this.sectionContainer).toBeVisible();

    // Check for main content areas
    await expect(this.heroContent).toBeVisible();
    await expect(this.mainContent).toBeVisible();
  }

  /**
   * Test responsive behavior of about section
   */
  async testResponsiveBehavior(viewportSize: { width: number; height: number }) {
    await this.page.setViewportSize(viewportSize);
    await this.scrollToSection();

    // Verify section adapts to viewport
    await expect(this.sectionContainer).toBeVisible();
    await expect(this.sectionContainer).toBeInViewport();
  }

  /**
   * Check for accessibility issues in about section
   */
  async checkAccessibility() {
    // Check heading hierarchy
    const h2Elements = this.sectionContainer.locator('h2');
    await expect(h2Elements).toHaveCount(1); // Should have exactly one H2

    // Check for alt text on images
    const imagesWithoutAlt = this.sectionContainer.locator('img:not([alt])').count();
    expect(await imagesWithoutAlt).toBe(0);
  }

  /**
   * Verify that all images in the section load successfully
   */
  async verifyImagesLoad() {
    const images = this.sectionContainer.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
      // Check that image has loaded (naturalWidth > 0)
      const naturalWidth = await img.evaluate((img: HTMLImageElement) => img.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  }

  /**
   * Verify that all content sections are present and visible
   */
  async verifyContentSections() {
    // Check work experience section
    const workExperienceSection = this.sectionContainer.locator('h3').filter({ hasText: 'Work Experience' });
    await expect(workExperienceSection).toBeVisible();

    // Check education section
    const educationSection = this.sectionContainer.locator('h3').filter({ hasText: 'Education' });
    await expect(educationSection).toBeVisible();

    // Check certifications section
    const certificationsSection = this.sectionContainer.locator('h3').filter({ hasText: 'Certifications' });
    await expect(certificationsSection).toBeVisible();
  }

  /**
   * Get section content for verification
   */
  async getSectionContent() {
    return {
      heroText: await this.heroContent.textContent(),
      mainContent: await this.mainContent.textContent(),
    };
  }
}