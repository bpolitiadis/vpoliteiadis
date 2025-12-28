import { test, expect } from '@playwright/test';
import { ProjectsPage } from '../page-objects/ProjectsPage';

test.describe('Projects Page', () => {
  let projectsPage: ProjectsPage;

  test.beforeEach(async ({ page }) => {
    projectsPage = new ProjectsPage(page);
    await projectsPage.goto();
  });

  test.describe('Page Loading', () => {
    test('should load projects page successfully', async () => {
      await expect(projectsPage.page).toHaveURL('/projects');
      await expect(projectsPage.pageContainer).toBeVisible();
    });

    test('should have proper page title', async () => {
      const title = await projectsPage.page.title();
      expect(title).toBeTruthy();
      expect(title.toLowerCase()).toContain('project');
    });

    test('should have navbar visible', async () => {
      await expect(projectsPage.navPage.navbar).toBeVisible();
    });
  });

  test.describe('Projects Grid', () => {
    test('should display projects grid', async () => {
      await expect(projectsPage.projectsGrid).toBeVisible();
    });

    test('should have at least one project card', async () => {
      const projectCards = await projectsPage.getProjectCards();
      expect(projectCards.length).toBeGreaterThan(0);
    });

    test('should display project cards with proper structure', async () => {
      const projectCards = await projectsPage.getProjectCards();

      for (const card of projectCards.slice(0, 3)) { // Test first 3 cards
        await expect(card.learnMoreLink).toBeVisible();
        await expect(card.viewLiveLink).toBeVisible();
      }
    });
  });

  test.describe('Project Navigation', () => {
    test('should navigate to project detail page when learn more is clicked', async () => {
      const projectCards = await projectsPage.getProjectCards();

      if (projectCards.length > 0) {
        const firstCard = projectCards[0];
        await projectsPage.clickLearnMore(firstCard.slug);
        await expect(projectsPage.page).toHaveURL(`/projects/${firstCard.slug}`);
      }
    });

    test('should open external link when view live is clicked', async () => {
      const projectCards = await projectsPage.getProjectCards();

      if (projectCards.length > 0) {
        const firstCard = projectCards[0];
        const newPage = await projectsPage.clickViewLive(firstCard.slug);

        // Verify new page opened
        expect(newPage.url()).not.toBe(projectsPage.page.url());

        // Close the new page
        await newPage.close();
      }
    });

    test('should navigate back to projects page from project detail', async () => {
      const projectCards = await projectsPage.getProjectCards();

      if (projectCards.length > 0) {
        const firstCard = projectCards[0];
        await projectsPage.verifyProjectNavigation(firstCard.slug);
      }
    });
  });

  test.describe('Project Cards', () => {
    test('should have proper accessibility attributes', async () => {
      const projectCards = await projectsPage.getProjectCards();

      for (const card of projectCards.slice(0, 2)) { // Test first 2 cards
        await expect(card.learnMoreLink).toHaveAttribute('aria-label');
        await expect(card.viewLiveLink).toHaveAttribute('aria-label');
      }
    });

    test('should have hover effects', async () => {
      const projectCards = await projectsPage.getProjectCards();

      if (projectCards.length > 0) {
        const firstCard = projectCards[0];
        await firstCard.learnMoreLink.hover();
        await expect(firstCard.learnMoreLink).toBeVisible(); // Should remain visible on hover
      }
    });

    test('should support keyboard navigation', async () => {
      const projectCards = await projectsPage.getProjectCards();

      if (projectCards.length > 0) {
        const firstCard = projectCards[0];

        // Tab to learn more button
        await projectsPage.page.keyboard.press('Tab');
        await expect(firstCard.learnMoreLink).toBeFocused();

        // Tab to view live button
        await projectsPage.page.keyboard.press('Tab');
        await expect(firstCard.viewLiveLink).toBeFocused();
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async () => {
      await projectsPage.testResponsiveGrid({ width: 375, height: 667 });
      const projectCards = await projectsPage.getProjectCards();
      expect(projectCards.length).toBeGreaterThan(0);
    });

    test('should work on tablet viewport', async () => {
      await projectsPage.testResponsiveGrid({ width: 768, height: 1024 });
      const projectCards = await projectsPage.getProjectCards();
      expect(projectCards.length).toBeGreaterThan(0);
    });

    test('should work on desktop viewport', async () => {
      await projectsPage.testResponsiveGrid({ width: 1920, height: 1080 });
      const projectCards = await projectsPage.getProjectCards();
      expect(projectCards.length).toBeGreaterThan(0);
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async () => {
      const h1Elements = projectsPage.page.locator('h1');
      await expect(h1Elements).toHaveCount(1);
    });

    test('should have alt text for all images', async () => {
      const imagesWithoutAlt = await projectsPage.page.locator('img:not([alt])').count();
      expect(imagesWithoutAlt).toBe(0);
    });

    test('should have proper focus management', async () => {
      const focusableElements = await projectsPage.page.locator('a, button').count();
      expect(focusableElements).toBeGreaterThan(0);
    });

    test('should support screen reader navigation', async () => {
      await projectsPage.checkAccessibility();
    });
  });

  test.describe('Performance', () => {
    test('should load within reasonable time', async () => {
      const startTime = Date.now();
      await projectsPage.page.reload();
      await projectsPage.waitForPageToLoad();
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000);
    });

    test('should load project images', async () => {
      const images = projectsPage.page.locator('img');
      const imageCount = await images.count();

      if (imageCount > 0) {
        // Wait for images to load
        await projectsPage.page.waitForTimeout(2000);

        for (let i = 0; i < Math.min(imageCount, 3); i++) {
          const isLoaded = await images.nth(i).evaluate((img) => (img as HTMLImageElement).naturalWidth > 0);
          expect(isLoaded).toBe(true);
        }
      }
    });
  });

  test.describe('SEO Elements', () => {
    test('should have meta description', async () => {
      const metaDescription = await projectsPage.page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription!.length).toBeGreaterThan(0);
    });

    test('should have Open Graph tags', async () => {
      const ogTitle = await projectsPage.page.locator('meta[property="og:title"]').getAttribute('content');
      const ogDescription = await projectsPage.page.locator('meta[property="og:description"]').getAttribute('content');

      expect(ogTitle).toBeTruthy();
      expect(ogDescription).toBeTruthy();
    });
  });
});
