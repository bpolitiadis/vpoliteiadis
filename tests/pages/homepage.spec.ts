import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';

test.describe('Homepage', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test.describe('Page Loading', () => {
    test('should load homepage successfully', async () => {
      await expect(homePage.page).toHaveURL('/');
      await expect(homePage.pageContainer).toBeVisible();
    });

    test('should have proper page title', async () => {
      const title = await homePage.page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
    });

    test('should have navbar visible', async () => {
      await expect(homePage.navPage.navbar).toBeVisible();
    });
  });

  test.describe('Hero Section', () => {
    test('should display hero intro section', async () => {
      await expect(homePage.heroIntroSection).toBeVisible();
    });

    test('should display hero chat layout', async () => {
      await expect(homePage.heroChatLayout).toBeVisible();
    });

    test('should display navigation buttons section', async () => {
      await expect(homePage.heroNavigationButtons).toBeVisible();
    });

    test('should contain message bubbles in chat layout', async () => {
      await homePage.verifyChatLayout();
      const messageCount = await homePage.messageBubbles.count();
      expect(messageCount).toBeGreaterThan(0);
    });

    test('should contain avatar bubbles in chat layout', async () => {
      await homePage.verifyChatLayout();
      const avatarCount = await homePage.avatarBubbles.count();
      expect(avatarCount).toBeGreaterThan(0);
    });
  });

  test.describe('Navigation Buttons', () => {
    test('should display all navigation buttons', async () => {
      await homePage.verifyNavigationButtons();
    });

    test('should navigate to about page when about button is clicked', async () => {
      await homePage.clickNavigationButton('about');
      await expect(homePage.page).toHaveURL('/about');
    });

    test('should navigate to projects page when projects button is clicked', async () => {
      await homePage.clickNavigationButton('projects');
      await expect(homePage.page).toHaveURL('/projects');
    });

    test('should navigate to creative page when creative button is clicked', async () => {
      await homePage.clickNavigationButton('creative');
      await expect(homePage.page).toHaveURL('/creative');
    });

    test('should navigate to blog page when blog button is clicked', async () => {
      await homePage.clickNavigationButton('blog');
      await expect(homePage.page).toHaveURL('/blog');
    });

    test('should navigate to contact page when contact button is clicked', async () => {
      await homePage.clickNavigationButton('contact');
      await expect(homePage.page).toHaveURL('/contact');
    });
  });

  test.describe('Keyboard Navigation', () => {
    test.skip('should support keyboard navigation through navigation buttons', async () => {
      // TODO: Implement keyboard navigation test once StarBorder component focus behavior is clarified
      await homePage.testKeyboardNavigation();
    });

    test('should allow Enter key activation on navigation buttons', async () => {
      await homePage.aboutButton.focus();
      await homePage.page.keyboard.press('Enter');
      await homePage.page.waitForURL('/about');
    });

    test('should allow Space key activation on navigation buttons', async () => {
      await homePage.projectsButton.focus();
      await homePage.page.keyboard.press('Space');
      await homePage.page.waitForURL('/projects');
    });
  });

  test.describe('Animations and Interactions', () => {
    test('should complete animations before allowing interactions', async () => {
      await homePage.waitForAnimationsToComplete();
      // Verify buttons are still clickable after animations
      await expect(homePage.aboutButton).toBeEnabled();
    });

    test('should handle hover effects on navigation buttons', async () => {
      // Test hover on about button
      await homePage.aboutButton.hover();
      await expect(homePage.aboutButton).toBeVisible(); // Button should remain visible on hover
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async () => {
      const h1Elements = homePage.page.locator('h1');
      await expect(h1Elements).toHaveCount(1);
    });

    test('should have alt text for all images', async () => {
      const imagesWithoutAlt = await homePage.page.locator('img:not([alt])').count();
      expect(imagesWithoutAlt).toBe(0);
    });

    test('should have proper focus management', async () => {
      const focusableElements = await homePage.page.locator('button, a, input, select, textarea').count();
      expect(focusableElements).toBeGreaterThan(0);
    });

    test('should support screen reader navigation', async () => {
      // Check for ARIA labels and roles
      await expect(homePage.heroSection).toHaveAttribute('role');
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async () => {
      await homePage.testResponsiveBehavior({ width: 375, height: 667 });
      await expect(homePage.heroSection).toBeVisible();
      await expect(homePage.navigationButtons).toBeVisible();
    });

    test('should work on tablet viewport', async () => {
      await homePage.testResponsiveBehavior({ width: 768, height: 1024 });
      await expect(homePage.heroSection).toBeVisible();
      await expect(homePage.navigationButtons).toBeVisible();
    });

    test('should work on desktop viewport', async () => {
      await homePage.testResponsiveBehavior({ width: 1920, height: 1080 });
      await expect(homePage.heroSection).toBeVisible();
      await expect(homePage.navigationButtons).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test('should load within reasonable time', async () => {
      const startTime = Date.now();
      await homePage.page.reload();
      await homePage.waitForPageToLoad();
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
    });

    test('should not have console errors', async () => {
      const errors: string[] = [];
      homePage.page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      await homePage.page.reload();
      await homePage.waitForPageToLoad();

      // Allow some time for any async errors
      await homePage.page.waitForTimeout(2000);

      expect(errors.length).toBe(0);
    });
  });

  test.describe('SEO Elements', () => {
    test('should have meta description', async () => {
      const metaDescription = await homePage.page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription!.length).toBeGreaterThan(0);
    });

    test('should have Open Graph tags', async () => {
      const ogTitle = await homePage.page.locator('meta[property="og:title"]').getAttribute('content');
      const ogDescription = await homePage.page.locator('meta[property="og:description"]').getAttribute('content');
      const ogType = await homePage.page.locator('meta[property="og:type"]').getAttribute('content');

      expect(ogTitle).toBeTruthy();
      expect(ogDescription).toBeTruthy();
      expect(ogType).toBe('website');
    });

    test('should have structured data', async () => {
      const structuredData = await homePage.page.locator('script[type="application/ld+json"]').count();
      expect(structuredData).toBeGreaterThan(0);
    });
  });
});
