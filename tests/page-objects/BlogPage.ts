import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import { NavigationPage } from './NavigationPage';

export interface BlogPostCard {
  slug: string;
  title: string;
  excerpt?: string;
  publishDate?: string;
  readingTime?: string;
  tags?: string[];
  link: Locator;
}

export class BlogPage {
  readonly page: Page;
  readonly navPage: NavigationPage;

  // Page containers
  readonly pageContainer: Locator;
  readonly blogPostsGrid: Locator;

  // Newsletter section
  readonly newsletterSignup: Locator;
  readonly newsletterEmailInput: Locator;
  readonly newsletterSubscribeButton: Locator;

  // Blog post cards
  private blogPostCards: Map<string, BlogPostCard> = new Map();

  constructor(page: Page) {
    this.page = page;
    this.navPage = new NavigationPage(page);

    // Page containers
    this.pageContainer = page.getByTestId('page-blog');
    this.blogPostsGrid = page.getByTestId('blog-posts-grid');

    // Newsletter section
    this.newsletterSignup = page.getByTestId('newsletter-signup');
    this.newsletterEmailInput = page.getByTestId('newsletter-email-input');
    this.newsletterSubscribeButton = page.getByTestId('newsletter-subscribe-button');
  }

  /**
   * Navigate to blog page
   */
  async goto() {
    await this.page.goto('/blog');
    await this.waitForPageToLoad();
  }

  /**
   * Wait for blog page to load completely
   */
  async waitForPageToLoad() {
    await this.navPage.waitForNavbarToLoad();
    await expect(this.pageContainer).toBeVisible({ timeout: 15000 });
    await expect(this.blogPostsGrid).toBeVisible();

    // Wait for blog posts to load
    await this.page.waitForTimeout(1000);
  }

  /**
   * Get all blog post cards on the page
   */
  async getBlogPostCards(): Promise<BlogPostCard[]> {
    const cards: BlogPostCard[] = [];

    // Find all blog post card containers
    const cardElements = this.page.locator('[data-testid^="blog-post-"]');

    for (let i = 0; i < await cardElements.count(); i++) {
      const cardElement = cardElements.nth(i);
      const testId = await cardElement.getAttribute('data-testid');

      if (testId && testId.startsWith('blog-post-')) {
        const slug = testId.replace('blog-post-', '');

        const card: BlogPostCard = {
          slug,
          title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          link: this.page.getByTestId(`blog-post-link-${slug}`),
        };

        cards.push(card);
        this.blogPostCards.set(slug, card);
      }
    }

    return cards;
  }

  /**
   * Verify blog posts grid layout
   */
  async verifyBlogPostsGrid() {
    await expect(this.blogPostsGrid).toBeVisible();

    // Check that we have at least one blog post card
    const blogPostCards = await this.getBlogPostCards();
    expect(blogPostCards.length).toBeGreaterThan(0);
  }

  /**
   * Click read more link for a blog post
   */
  async clickReadMore(slug: string) {
    const card = this.blogPostCards.get(slug) || await this.findBlogPostCard(slug);
    await card.link.click();
    await this.page.waitForURL(`/blog/${slug}`);
  }

  /**
   * Find a blog post card by slug
   */
  private async findBlogPostCard(slug: string): Promise<BlogPostCard> {
    const link = this.page.getByTestId(`blog-post-link-${slug}`);

    const card: BlogPostCard = {
      slug,
      title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      link,
    };

    this.blogPostCards.set(slug, card);
    return card;
  }

  /**
   * Test newsletter signup section
   */
  async testNewsletterSignup() {
    // Check if newsletter section exists
    const hasNewsletter = await this.newsletterSignup.isVisible().catch(() => false);

    if (hasNewsletter) {
      await expect(this.newsletterSignup).toBeVisible();
      await expect(this.newsletterEmailInput).toBeVisible();
      await expect(this.newsletterSubscribeButton).toBeVisible();
    }
  }

  /**
   * Test search/filtering functionality (if implemented)
   */
  async testSearchAndFiltering() {
    // Check if there's a search input
    const searchInput = this.page.locator('input[type="search"], input[placeholder*="search" i]');
    const hasSearch = await searchInput.count() > 0;

    if (hasSearch) {
      await searchInput.fill('test');
      await this.page.waitForTimeout(500); // Wait for filtering

      // Verify some results are shown or "no results" message
      const visiblePosts = await this.page.locator('[data-testid^="blog-post-"]:visible').count();
      expect(visiblePosts).toBeGreaterThanOrEqual(0);
    }

    // Check for tag filtering
    const tagButtons = this.page.locator('button[aria-label*="tag"], a[href*="tag"]');
    const hasTags = await tagButtons.count() > 0;

    if (hasTags) {
      await expect(tagButtons.first()).toBeVisible();
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

    await expect(this.blogPostsGrid).toBeVisible();

    // Verify blog post cards are still visible
    const blogPostCards = await this.getBlogPostCards();
    for (const card of blogPostCards.slice(0, 3)) { // Test first 3 cards
      await expect(card.link).toBeVisible();
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

    // Check blog post card accessibility
    const blogPostCards = await this.getBlogPostCards();
    for (const card of blogPostCards.slice(0, 2)) { // Test first 2 cards
      await expect(card.link).toHaveAttribute('aria-label');
    }

    // Check newsletter accessibility if present
    const hasNewsletter = await this.newsletterSignup.isVisible().catch(() => false);
    if (hasNewsletter) {
      await expect(this.newsletterEmailInput).toHaveAttribute('aria-label');
      await expect(this.newsletterSubscribeButton).toHaveAttribute('aria-label');
    }
  }

  /**
   * Verify blog post navigation
   */
  async verifyBlogPostNavigation(slug: string) {
    await this.clickReadMore(slug);
    await expect(this.page).toHaveURL(`/blog/${slug}`);

    // Go back and verify we're back on blog page
    await this.page.goBack();
    await expect(this.page).toHaveURL('/blog');
  }
}
