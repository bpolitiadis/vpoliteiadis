import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import { NavigationPage } from './NavigationPage';

export class HomePage {
  readonly page: Page;
  readonly navPage: NavigationPage;

  // Page container
  readonly pageContainer: Locator;

  // Hero section
  readonly heroSection: Locator;
  readonly heroIntroSection: Locator;
  readonly heroChatLayout: Locator;
  readonly heroNavigationButtons: Locator;

  // Navigation buttons
  readonly navigationButtons: Locator;
  readonly aboutButton: Locator;
  readonly projectsButton: Locator;
  readonly creativeButton: Locator;
  readonly blogButton: Locator;
  readonly contactButton: Locator;

  // Chat elements
  readonly messageBubbles: Locator;
  readonly avatarBubbles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navPage = new NavigationPage(page);

    // Page container
    this.pageContainer = page.getByTestId('page-home');

    // Hero section
    this.heroSection = page.getByTestId('hero-intro-section');
    this.heroIntroSection = page.getByTestId('hero-intro-section');
    this.heroChatLayout = page.getByTestId('hero-chat-layout');
    this.heroNavigationButtons = page.getByTestId('hero-navigation-buttons');

    // Navigation buttons
    this.navigationButtons = page.getByTestId('navigation-buttons');
    this.aboutButton = page.getByTestId('nav-button-about');
    this.projectsButton = page.getByTestId('nav-button-projects');
    this.creativeButton = page.getByTestId('nav-button-creative');
    this.blogButton = page.getByTestId('nav-button-blog');
    this.contactButton = page.getByTestId('nav-button-contact');

    // Chat elements
    this.messageBubbles = page.getByTestId('message-bubble');
    this.avatarBubbles = page.getByTestId('avatar-bubble');
  }

  /**
   * Navigate to homepage
   */
  async goto() {
    await this.page.goto('/');
    await this.waitForPageToLoad();
  }

  /**
   * Wait for homepage to load completely
   */
  async waitForPageToLoad() {
    await this.navPage.waitForNavbarToLoad();
    await expect(this.pageContainer).toBeVisible({ timeout: 15000 });

    // Wait for hero section to be visible
    await expect(this.heroSection).toBeVisible();

    // Wait for any animations to complete
    await this.page.waitForTimeout(1000);
  }

  /**
   * Check if hero section is visible and contains expected elements
   */
  async verifyHeroSection() {
    await expect(this.heroIntroSection).toBeVisible();
    await expect(this.heroChatLayout).toBeVisible();
    await expect(this.heroNavigationButtons).toBeVisible();
  }

  /**
   * Verify navigation buttons are present and functional
   */
  async verifyNavigationButtons() {
    // Navigation buttons appear after message sequence completes, so wait for them
    await expect(this.navigationButtons).toBeVisible({ timeout: 15000 });
    await expect(this.aboutButton).toBeVisible();
    await expect(this.projectsButton).toBeVisible();
    await expect(this.creativeButton).toBeVisible();
    await expect(this.blogButton).toBeVisible();
    await expect(this.contactButton).toBeVisible();
  }

  /**
   * Click navigation button and verify navigation
   */
  async clickNavigationButton(buttonName: 'about' | 'projects' | 'creative' | 'blog' | 'contact') {
    const buttonMap = {
      about: this.aboutButton,
      projects: this.projectsButton,
      creative: this.creativeButton,
      blog: this.blogButton,
      contact: this.contactButton,
    };

    const button = buttonMap[buttonName];
    const expectedUrl = buttonName === 'about' ? '/about' :
                       buttonName === 'projects' ? '/projects' :
                       buttonName === 'creative' ? '/creative' :
                       buttonName === 'blog' ? '/blog' : '/contact';

    await button.click();
    await this.page.waitForURL(expectedUrl);
  }

  /**
   * Verify chat layout contains message and avatar bubbles
   */
  async verifyChatLayout() {
    await expect(this.heroChatLayout).toBeVisible();

    // Check for message bubbles (should have at least one)
    const messageCount = await this.messageBubbles.count();
    expect(messageCount).toBeGreaterThan(0);

    // Check for avatar bubbles (should have at least one)
    const avatarCount = await this.avatarBubbles.count();
    expect(avatarCount).toBeGreaterThan(0);
  }

  /**
   * Test keyboard navigation through hero elements
   */
  async testKeyboardNavigation() {
    // Focus the first navigation button directly (since Tab order may vary)
    await this.aboutButton.focus();
    await expect(this.aboutButton).toBeFocused();

    // Tab through all navigation buttons
    await this.page.keyboard.press('Tab');
    await expect(this.projectsButton).toBeFocused();

    await this.page.keyboard.press('Tab');
    await expect(this.creativeButton).toBeFocused();

    await this.page.keyboard.press('Tab');
    await expect(this.blogButton).toBeFocused();

    await this.page.keyboard.press('Tab');
    await expect(this.contactButton).toBeFocused();
  }

  /**
   * Check for any loading states or animations
   */
  async waitForAnimationsToComplete() {
    // Wait for any CSS animations to complete
    await this.page.waitForTimeout(2000);

    // Check if any elements have animation classes
    const animatedElements = await this.page.locator('[class*="animate"], [class*="transition"]').count();
    if (animatedElements > 0) {
      await this.page.waitForTimeout(1000);
    }
  }

  /**
   * Verify page structure and content
   */
  async verifyPageStructure() {
    // Check basic page structure
    await this.verifyHeroSection();
    await this.verifyNavigationButtons();
    await this.verifyChatLayout();

    // Check meta tags
    const title = await this.page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);

    // Check for main content
    const mainContent = this.page.locator('main');
    await expect(mainContent).toBeVisible();
  }

  /**
   * Test responsive behavior
   */
  async testResponsiveBehavior(viewportSize: { width: number; height: number }) {
    await this.page.setViewportSize(viewportSize);
    await this.page.reload();
    await this.waitForPageToLoad();

    // Verify hero section adapts to viewport
    await expect(this.heroSection).toBeVisible();

    // On mobile, check that navigation buttons are still accessible
    if (viewportSize.width < 768) {
      await expect(this.navigationButtons).toBeVisible();
    }
  }

  /**
   * Check for accessibility issues
   */
  async checkAccessibility() {
    // Check for proper heading hierarchy
    const h1Elements = this.page.locator('h1');
    await expect(h1Elements).toHaveCount(1); // Should have exactly one H1

    // Check for alt text on images
    const imagesWithoutAlt = await this.page.locator('img:not([alt])').count();
    expect(imagesWithoutAlt).toBe(0);

    // Check for proper focus management
    const focusableElements = await this.page.locator('button, a, input, select, textarea').count();
    expect(focusableElements).toBeGreaterThan(0);
  }
}
