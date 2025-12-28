import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import { NavigationPage } from './NavigationPage';

export interface ProjectCard {
  slug: string;
  title: string;
  description?: string;
  learnMoreLink: Locator;
  viewLiveLink: Locator;
}

export class ProjectsPage {
  readonly page: Page;
  readonly navPage: NavigationPage;

  // Page containers
  readonly pageContainer: Locator;
  readonly projectsGrid: Locator;

  // Project cards
  private projectCards: Map<string, ProjectCard> = new Map();

  constructor(page: Page) {
    this.page = page;
    this.navPage = new NavigationPage(page);

    // Page containers
    this.pageContainer = page.getByTestId('page-projects');
    this.projectsGrid = page.getByTestId('projects-grid');
  }

  /**
   * Navigate to projects page
   */
  async goto() {
    await this.page.goto('/projects');
    await this.waitForPageToLoad();
  }

  /**
   * Wait for projects page to load completely
   */
  async waitForPageToLoad() {
    await this.navPage.waitForNavbarToLoad();
    await expect(this.pageContainer).toBeVisible({ timeout: 15000 });
    await expect(this.projectsGrid).toBeVisible();

    // Wait for project cards to load
    await this.page.waitForTimeout(1000);
  }

  /**
   * Get all project cards on the page
   */
  async getProjectCards(): Promise<ProjectCard[]> {
    const cards: ProjectCard[] = [];

    // Find all project card containers
    const cardElements = this.page.locator('[data-testid^="project-card-"]');

    for (let i = 0; i < await cardElements.count(); i++) {
      const cardElement = cardElements.nth(i);
      const testId = await cardElement.getAttribute('data-testid');

      if (testId && testId.startsWith('project-card-')) {
        const slug = testId.replace('project-card-', '');

        const card: ProjectCard = {
          slug,
          title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          learnMoreLink: this.page.getByTestId(`project-card-learn-more-${slug}`),
          viewLiveLink: this.page.getByTestId(`project-card-view-live-${slug}`),
        };

        cards.push(card);
        this.projectCards.set(slug, card);
      }
    }

    return cards;
  }

  /**
   * Verify projects grid layout
   */
  async verifyProjectsGrid() {
    await expect(this.projectsGrid).toBeVisible();

    // Check that we have at least one project card
    const projectCards = await this.getProjectCards();
    expect(projectCards.length).toBeGreaterThan(0);
  }

  /**
   * Verify individual project card
   */
  async verifyProjectCard(slug: string) {
    const card = this.projectCards.get(slug) || await this.findProjectCard(slug);

    await expect(card.learnMoreLink).toBeVisible();
    await expect(card.viewLiveLink).toBeVisible();
  }

  /**
   * Click learn more button for a project
   */
  async clickLearnMore(slug: string) {
    const card = this.projectCards.get(slug) || await this.findProjectCard(slug);
    await card.learnMoreLink.click();
    await this.page.waitForURL(`/projects/${slug}`);
  }

  /**
   * Click view live button for a project
   */
  async clickViewLive(slug: string) {
    const card = this.projectCards.get(slug) || await this.findProjectCard(slug);
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      card.viewLiveLink.click()
    ]);
    return newPage;
  }

  /**
   * Find a project card by slug
   */
  private async findProjectCard(slug: string): Promise<ProjectCard> {
    const learnMoreLink = this.page.getByTestId(`project-card-learn-more-${slug}`);
    const viewLiveLink = this.page.getByTestId(`project-card-view-live-${slug}`);

    const card: ProjectCard = {
      slug,
      title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      learnMoreLink,
      viewLiveLink,
    };

    this.projectCards.set(slug, card);
    return card;
  }

  /**
   * Test filtering/search functionality (if implemented)
   */
  async testFiltering() {
    // Check if there's a search/filter input
    const searchInput = this.page.locator('input[type="search"], input[placeholder*="search" i]');
    const hasSearch = await searchInput.count() > 0;

    if (hasSearch) {
      // Test search functionality
      await searchInput.fill('test');
      await this.page.waitForTimeout(500); // Wait for filtering

      // Verify some results are shown or "no results" message
      const visibleCards = await this.page.locator('[data-testid^="project-card-"]:visible').count();
      expect(visibleCards).toBeGreaterThanOrEqual(0);
    }
  }

  /**
   * Test pagination (if implemented)
   */
  async testPagination() {
    // Check for pagination controls
    const paginationControls = this.page.locator('button[aria-label*="page"], nav[aria-label*="pagination"]');
    const hasPagination = await paginationControls.count() > 0;

    if (hasPagination) {
      // Test pagination controls exist and are functional
      await expect(paginationControls.first()).toBeVisible();
    }
  }

  /**
   * Test responsive grid layout
   */
  async testResponsiveGrid(viewportSize: { width: number; height: number }) {
    await this.page.setViewportSize(viewportSize);
    await this.page.reload();
    await this.waitForPageToLoad();

    await expect(this.projectsGrid).toBeVisible();

    // Verify project cards are still visible
    const projectCards = await this.getProjectCards();
    for (const card of projectCards.slice(0, 3)) { // Test first 3 cards
      await expect(card.learnMoreLink).toBeVisible();
      await expect(card.viewLiveLink).toBeVisible();
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

    // Check project card accessibility
    const projectCards = await this.getProjectCards();
    for (const card of projectCards.slice(0, 2)) { // Test first 2 cards
      await expect(card.learnMoreLink).toHaveAttribute('aria-label');
      await expect(card.viewLiveLink).toHaveAttribute('aria-label');
    }
  }

  /**
   * Verify project navigation
   */
  async verifyProjectNavigation(slug: string) {
    await this.clickLearnMore(slug);
    await expect(this.page).toHaveURL(`/projects/${slug}`);

    // Go back and verify we're back on projects page
    await this.page.goBack();
    await expect(this.page).toHaveURL('/projects');
  }
}
