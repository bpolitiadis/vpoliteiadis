import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';

test.describe('Homepage - Hero Section', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should load homepage successfully', async () => {
    await expect(homePage.page).toHaveURL('/');
    await expect(homePage.pageContainer).toBeVisible();
  });

  test.describe('Hero Section Interactions', () => {
    test('should display hero intro and chat layout', async () => {
      await expect(homePage.heroIntroSection).toBeVisible();
      await expect(homePage.heroChatLayout).toBeVisible();
    });

    test('should render chat elements correctly', async () => {
      await homePage.verifyHeroSection();
      await homePage.verifyChatLayout();

      // Verify we have both message and avatar bubbles
      const messageCount = await homePage.messageBubbles.count();
      const avatarCount = await homePage.avatarBubbles.count();

      expect(messageCount).toBeGreaterThan(0);
      expect(avatarCount).toBeGreaterThan(0);
    });

    test('should support keyboard navigation', async () => {
      await homePage.testKeyboardNavigation();
    });

    test('should handle animations properly', async () => {
      await homePage.waitForAnimationsToComplete();
      // Verify hero section remains interactive after animations
      await expect(homePage.heroSection).toBeVisible();
      await expect(homePage.heroChatLayout).toBeVisible();
    });
  });
});
