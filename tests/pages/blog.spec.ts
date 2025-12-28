import { test, expect } from '@playwright/test';
import { BlogPage } from '../page-objects/BlogPage';

test.describe('Blog Page', () => {
  let blogPage: BlogPage;

  test.beforeEach(async ({ page }) => {
    blogPage = new BlogPage(page);
    await blogPage.goto();
  });

  test.describe('Page Loading', () => {
    test('should load blog page successfully', async () => {
      await expect(blogPage.page).toHaveURL('/blog');
      await expect(blogPage.pageContainer).toBeVisible();
    });

    test('should have proper page title', async () => {
      const title = await blogPage.page.title();
      expect(title).toBeTruthy();
      expect(title.toLowerCase()).toContain('blog');
    });

    test('should have navbar visible', async () => {
      await expect(blogPage.navPage.navbar).toBeVisible();
    });
  });

  test.describe('Blog Posts Grid', () => {
    test('should display blog posts grid', async () => {
      await expect(blogPage.blogPostsGrid).toBeVisible();
    });

    test('should have at least one blog post', async () => {
      const blogPostCards = await blogPage.getBlogPostCards();
      expect(blogPostCards.length).toBeGreaterThan(0);
    });

    test('should display blog post cards with read more links', async () => {
      const blogPostCards = await blogPage.getBlogPostCards();

      for (const card of blogPostCards.slice(0, 3)) { // Test first 3 cards
        await expect(card.link).toBeVisible();
      }
    });
  });

  test.describe('Blog Post Navigation', () => {
    test('should navigate to blog post detail page when read more is clicked', async () => {
      const blogPostCards = await blogPage.getBlogPostCards();

      if (blogPostCards.length > 0) {
        const firstCard = blogPostCards[0];
        await blogPage.clickReadMore(firstCard.slug);
        await expect(blogPage.page).toHaveURL(`/blog/${firstCard.slug}`);
      }
    });

    test('should navigate back to blog page from blog post detail', async () => {
      const blogPostCards = await blogPage.getBlogPostCards();

      if (blogPostCards.length > 0) {
        const firstCard = blogPostCards[0];
        await blogPage.verifyBlogPostNavigation(firstCard.slug);
      }
    });
  });

  test.describe('Newsletter Signup', () => {
    test('should display newsletter signup section if present', async () => {
      await blogPage.testNewsletterSignup();
    });

    test('should have functional newsletter form if present', async () => {
      const hasNewsletter = await blogPage.newsletterSignup.isVisible().catch(() => false);

      if (hasNewsletter) {
        await expect(blogPage.newsletterEmailInput).toBeVisible();
        await expect(blogPage.newsletterSubscribeButton).toBeVisible();

        // Test basic form interaction
        await blogPage.newsletterEmailInput.fill('test@example.com');
        await expect(blogPage.newsletterEmailInput).toHaveValue('test@example.com');
      }
    });
  });

  test.describe('Search and Filtering', () => {
    test('should support search functionality if implemented', async () => {
      await blogPage.testSearchAndFiltering();
    });

    test('should have tag filtering if implemented', async () => {
      const tagElements = blogPage.page.locator('[data-testid*="tag"], button[aria-label*="tag"], a[href*="tag"]');
      const hasTags = await tagElements.count() > 0;

      if (hasTags) {
        await expect(tagElements.first()).toBeVisible();
      }
    });
  });

  test.describe('Blog Post Cards', () => {
    test('should have proper accessibility attributes', async () => {
      const blogPostCards = await blogPage.getBlogPostCards();

      for (const card of blogPostCards.slice(0, 2)) { // Test first 2 cards
        await expect(card.link).toHaveAttribute('aria-label');
      }
    });

    test('should have hover effects', async () => {
      const blogPostCards = await blogPage.getBlogPostCards();

      if (blogPostCards.length > 0) {
        const firstCard = blogPostCards[0];
        await firstCard.link.hover();
        await expect(firstCard.link).toBeVisible(); // Should remain visible on hover
      }
    });

    test('should support keyboard navigation', async () => {
      const blogPostCards = await blogPage.getBlogPostCards();

      if (blogPostCards.length > 0) {
        const firstCard = blogPostCards[0];

        // Tab to read more link
        await blogPage.page.keyboard.press('Tab');
        await expect(firstCard.link).toBeFocused();
      }
    });
  });

  test.describe('Pagination', () => {
    test('should have pagination controls if needed', async () => {
      await blogPage.testPagination();
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async () => {
      await blogPage.testResponsiveGrid({ width: 375, height: 667 });
      const blogPostCards = await blogPage.getBlogPostCards();
      expect(blogPostCards.length).toBeGreaterThan(0);
    });

    test('should work on tablet viewport', async () => {
      await blogPage.testResponsiveGrid({ width: 768, height: 1024 });
      const blogPostCards = await blogPage.getBlogPostCards();
      expect(blogPostCards.length).toBeGreaterThan(0);
    });

    test('should work on desktop viewport', async () => {
      await blogPage.testResponsiveGrid({ width: 1920, height: 1080 });
      const blogPostCards = await blogPage.getBlogPostCards();
      expect(blogPostCards.length).toBeGreaterThan(0);
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async () => {
      const h1Elements = blogPage.page.locator('h1');
      await expect(h1Elements).toHaveCount(1);
    });

    test('should have alt text for all images', async () => {
      const imagesWithoutAlt = await blogPage.page.locator('img:not([alt])').count();
      expect(imagesWithoutAlt).toBe(0);
    });

    test('should have proper focus management', async () => {
      const focusableElements = await blogPage.page.locator('a, button, input').count();
      expect(focusableElements).toBeGreaterThan(0);
    });

    test('should support screen reader navigation', async () => {
      await blogPage.checkAccessibility();
    });
  });

  test.describe('Performance', () => {
    test('should load within reasonable time', async () => {
      const startTime = Date.now();
      await blogPage.page.reload();
      await blogPage.waitForPageToLoad();
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000);
    });

    test('should load blog post images', async () => {
      const images = blogPage.page.locator('img');
      const imageCount = await images.count();

      if (imageCount > 0) {
        // Wait for images to load
        await blogPage.page.waitForTimeout(2000);

        for (let i = 0; i < Math.min(imageCount, 3); i++) {
          const isLoaded = await images.nth(i).evaluate((img) => (img as HTMLImageElement).naturalWidth > 0);
          expect(isLoaded).toBe(true);
        }
      }
    });
  });

  test.describe('SEO Elements', () => {
    test('should have meta description', async () => {
      const metaDescription = await blogPage.page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription!.length).toBeGreaterThan(0);
    });

    test('should have Open Graph tags', async () => {
      const ogTitle = await blogPage.page.locator('meta[property="og:title"]').getAttribute('content');
      const ogDescription = await blogPage.page.locator('meta[property="og:description"]').getAttribute('content');

      expect(ogTitle).toBeTruthy();
      expect(ogDescription).toBeTruthy();
    });
  });
});
