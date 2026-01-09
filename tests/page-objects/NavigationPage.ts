import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';

export interface NavItem {
  href: string;
  label: string;
  testId: string;
}

export class NavigationPage {
  readonly page: Page;

  // Main navbar elements
  readonly navbar: Locator;
  readonly logo: Locator;

  // Desktop navigation
  readonly desktopMenu: Locator;
  readonly desktopNavLinks: Record<string, Locator>;

  // Mobile navigation
  readonly mobileMenuButton: Locator;
  readonly mobileMenu: Locator;
  readonly mobileMenuClose: Locator;
  readonly mobileNavLinks: Record<string, Locator>;

  // Navigation items configuration
  private readonly navItems: NavItem[] = [
    { href: '/', label: 'Home', testId: 'navbar-link-home' },
    { href: '/about', label: 'About', testId: 'navbar-link-about' },
    { href: '/projects', label: 'Projects', testId: 'navbar-link-projects' },
    { href: '/creative', label: 'Creative', testId: 'navbar-link-creative' },
    { href: '/blog', label: 'Blog', testId: 'navbar-link-blog' },
    { href: '/contact', label: 'Contact', testId: 'navbar-link-contact' },
  ];

  constructor(page: Page) {
    this.page = page;

    // Main navbar elements
    this.navbar = page.getByTestId('navbar');
    this.logo = page.getByTestId('navbar-logo');

    // Desktop navigation
    this.desktopMenu = page.getByTestId('navbar-desktop-menu');

    // Initialize desktop nav links
    this.desktopNavLinks = {};
    for (const item of this.navItems) {
      this.desktopNavLinks[item.label.toLowerCase()] = page.getByTestId(item.testId);
    }

    // Mobile navigation
    this.mobileMenuButton = page.getByTestId('mobile-menu-button');
    this.mobileMenu = page.getByTestId('mobile-menu');
    this.mobileMenuClose = page.getByTestId('mobile-menu-close');

    // Initialize mobile nav links
    this.mobileNavLinks = {};
    for (const item of this.navItems) {
      this.mobileNavLinks[item.label.toLowerCase()] = page.getByTestId(`mobile-nav-link-${item.label.toLowerCase()}`);
    }
  }

  /**
   * Navigate to a page and wait for navbar to load
   */
  async goto(path: string = '/') {
    await this.page.goto(path);
    await this.waitForNavbarToLoad();
  }

  /**
   * Wait for navbar to be visible and ready
   */
  async waitForNavbarToLoad() {
    await expect(this.navbar).toBeVisible({ timeout: 10000 });
    await expect(this.logo).toBeVisible();
  }

  /**
   * Check if navbar is visible
   */
  async isNavbarVisible(): Promise<boolean> {
    return await this.navbar.isVisible();
  }

  /**
   * Check if desktop menu is visible (not mobile)
   */
  async isDesktopMenuVisible(): Promise<boolean> {
    return await this.desktopMenu.isVisible();
  }

  /**
   * Check if mobile menu button is visible
   */
  async isMobileMenuButtonVisible(): Promise<boolean> {
    return await this.mobileMenuButton.isVisible();
  }

  /**
   * Click logo to navigate home
   */
  async clickLogo() {
    await this.logo.click();
    await this.page.waitForURL('/');
  }

  /**
   * Navigate using desktop navigation link
   */
  async navigateDesktop(linkName: string) {
    const link = this.desktopNavLinks[linkName.toLowerCase()];
    if (!link) {
      throw new Error(`Desktop navigation link '${linkName}' not found`);
    }

    await link.click();

    const navItem = this.getNavItemByLabel(linkName);
    // If it's a homepage section, scroll instead of waiting for URL change
    if (this.isHomepageSection(navItem.href)) {
      await this.scrollToSection(linkName.toLowerCase());
    } else {
      await this.page.waitForURL(`**${navItem.href}`);
    }
  }

  /**
   * Navigate using mobile navigation link
   */
  async navigateMobile(linkName: string) {
    // Open mobile menu first
    await this.openMobileMenu();

    const link = this.mobileNavLinks[linkName.toLowerCase()];
    if (!link) {
      throw new Error(`Mobile navigation link '${linkName}' not found`);
    }

    await link.click();

    const navItem = this.getNavItemByLabel(linkName);
    // If it's a homepage section, scroll instead of waiting for URL change
    if (this.isHomepageSection(navItem.href)) {
      await this.closeMobileMenu(); // Close mobile menu first
      await this.scrollToSection(linkName.toLowerCase());
    } else {
      await this.page.waitForURL(`**${navItem.href}`);
    }
  }

  /**
   * Open mobile navigation menu
   */
  async openMobileMenu() {
    if (!(await this.isMobileMenuOpen())) {
      await this.mobileMenuButton.click();
      await expect(this.mobileMenu).toBeVisible();
      await expect(this.mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
    }
  }

  /**
   * Close mobile navigation menu
   */
  async closeMobileMenu() {
    if (await this.isMobileMenuOpen()) {
      await this.mobileMenuClose.click();
      await expect(this.mobileMenu).toBeHidden();
      await expect(this.mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
    }
  }

  /**
   * Check if mobile menu is open
   */
  async isMobileMenuOpen(): Promise<boolean> {
    return await this.mobileMenu.isVisible();
  }

  /**
   * Scroll to a specific section on the homepage
   */
  async scrollToSection(sectionName: string) {
    const sectionSelectors: Record<string, string> = {
      'home': 'body',
      'about': '[data-testid="page-about"]',
      'projects': '[data-testid="page-projects"]',
      'creative': '[data-testid="page-creative"]',
      'contact': '[data-testid="page-contact"]'
    };

    const selector = sectionSelectors[sectionName.toLowerCase()];
    if (!selector) {
      throw new Error(`Unknown section '${sectionName}'. Available sections: ${Object.keys(sectionSelectors).join(', ')}`);
    }

    const sectionElement = this.page.locator(selector);
    await expect(sectionElement).toBeVisible();

    // Scroll to the section with smooth behavior
    await sectionElement.scrollIntoViewIfNeeded();

    // Wait for scroll to complete and any animations
    await this.page.waitForTimeout(1000);

    // Verify the section is in viewport
    await expect(sectionElement).toBeInViewport();
  }

  /**
   * Scroll to About section
   */
  async scrollToAbout() {
    await this.scrollToSection('about');
  }

  /**
   * Scroll to Projects section
   */
  async scrollToProjects() {
    await this.scrollToSection('projects');
  }

  /**
   * Scroll to Creative section
   */
  async scrollToCreative() {
    await this.scrollToSection('creative');
  }

  /**
   * Scroll to Contact section
   */
  async scrollToContact() {
    await this.scrollToSection('contact');
  }

  /**
   * Get current active section based on scroll position
   */
  async getActiveSection(): Promise<string | null> {
    const sections = [
      { name: 'contact', selector: '[data-testid="page-contact"]' },
      { name: 'creative', selector: '[data-testid="page-creative"]' },
      { name: 'projects', selector: '[data-testid="page-projects"]' },
      { name: 'about', selector: '[data-testid="page-about"]' },
      { name: 'home', selector: 'body' }
    ];

    for (const section of sections) {
      try {
        const element = this.page.locator(section.selector);
        const isInViewport = await element.isVisible();
        if (isInViewport) {
          // Check if the section is actually in the viewport (top part visible)
          const boundingBox = await element.boundingBox();
          if (boundingBox && boundingBox.y <= 100) { // Within 100px of top
            return section.name;
          }
        }
      } catch {
        // Continue to next section
      }
    }

    return null;
  }

  /**
   * Get current active navigation item
   */
  async getActiveNavItem(): Promise<string | null> {
    for (const item of this.navItems) {
      const desktopLink = this.desktopNavLinks[item.label.toLowerCase()];
      const mobileLink = this.mobileNavLinks[item.label.toLowerCase()];

      try {
        // Check desktop link first
        if (await desktopLink.getAttribute('aria-current') === 'page') {
          return item.label;
        }
      } catch {
        // Desktop link not visible, check mobile
        try {
          if (await mobileLink.getAttribute('aria-current') === 'page') {
            return item.label;
          }
        } catch {
          // Neither visible, continue
        }
      }
    }
    return null;
  }

  /**
   * Verify navigation structure is correct
   */
  async verifyNavigationStructure() {
    // Check navbar presence
    await expect(this.navbar).toBeVisible();

    // Check logo presence
    await expect(this.logo).toBeVisible();

    // Check desktop or mobile navigation is present
    const isDesktop = await this.isDesktopMenuVisible();
    const isMobile = await this.isMobileMenuButtonVisible();

    expect(isDesktop || isMobile).toBeTruthy();

    if (isDesktop) {
      // Verify all desktop nav links are present
      for (const item of this.navItems) {
        await expect(this.desktopNavLinks[item.label.toLowerCase()]).toBeVisible();
      }
    }

    if (isMobile) {
      // Verify mobile menu button is present
      await expect(this.mobileMenuButton).toBeVisible();
      await expect(this.mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
    }
  }

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation() {
    // Focus logo
    await this.logo.focus();
    await expect(this.logo).toBeFocused();

    // Test Tab navigation through desktop links (if visible)
    if (await this.isDesktopMenuVisible()) {
      for (const item of this.navItems) {
        await this.page.keyboard.press('Tab');
        const link = this.desktopNavLinks[item.label.toLowerCase()];
        await expect(link).toBeFocused();
      }
    }

    // Test mobile menu button keyboard navigation (if visible)
    if (await this.isMobileMenuButtonVisible()) {
      await this.mobileMenuButton.focus();
      await expect(this.mobileMenuButton).toBeFocused();

      // Open menu with keyboard
      await this.page.keyboard.press('Enter');
      await expect(this.mobileMenu).toBeVisible();

      // Navigate through mobile menu items
      for (const item of this.navItems) {
        await this.page.keyboard.press('Tab');
        const link = this.mobileNavLinks[item.label.toLowerCase()];
        await expect(link).toBeFocused();
      }

      // Close menu with Escape
      await this.page.keyboard.press('Escape');
      await expect(this.mobileMenu).toBeHidden();
    }
  }

  /**
   * Test accessibility attributes
   */
  async testAccessibility() {
    // Main navbar accessibility
    await expect(this.navbar).toHaveAttribute('role', 'navigation');
    await expect(this.navbar).toHaveAttribute('aria-label', 'Main navigation');

    // Logo accessibility
    await expect(this.logo).toHaveAttribute('aria-label', /Vasileios Politeiadis - Home/);

    // Desktop navigation accessibility
    if (await this.isDesktopMenuVisible()) {
      await expect(this.desktopMenu).toHaveAttribute('role', 'menubar');

      for (const item of this.navItems) {
        const link = this.desktopNavLinks[item.label.toLowerCase()];
        await expect(link).toHaveAttribute('role', 'menuitem');
        await expect(link).toHaveAttribute('aria-label');
      }
    }

    // Mobile navigation accessibility
    if (await this.isMobileMenuButtonVisible()) {
      await expect(this.mobileMenuButton).toHaveAttribute('aria-label', 'Toggle mobile navigation menu');
      await expect(this.mobileMenuButton).toHaveAttribute('aria-expanded');
      await expect(this.mobileMenuButton).toHaveAttribute('aria-controls', 'mobile-menu');

      // Test mobile menu attributes when closed
      await expect(this.mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
      await expect(this.mobileMenu).toHaveAttribute('aria-labelledby', 'mobile-menu-button');
    }
  }

  /**
   * Check if a navigation href is a homepage section (scroll-based)
   */
  private isHomepageSection(href: string): boolean {
    const homepageSections = ['/', '/about', '/projects', '/creative', '/contact'];
    return homepageSections.includes(href);
  }

  /**
   * Get navigation item by label
   */
  private getNavItemByLabel(label: string): NavItem {
    const item = this.navItems.find(item =>
      item.label.toLowerCase() === label.toLowerCase()
    );
    if (!item) {
      throw new Error(`Navigation item '${label}' not found`);
    }
    return item;
  }

  /**
   * Get all navigation items
   */
  getNavItems(): NavItem[] {
    return [...this.navItems];
  }
}
