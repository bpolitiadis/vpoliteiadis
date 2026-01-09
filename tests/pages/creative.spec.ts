import { test, expect } from '@playwright/test';
import { CreativeSection } from '../page-objects/CreativeSection';

test.describe('Creative Section', () => {
  let creativeSection: CreativeSection;

  test.beforeEach(async ({ page }) => {
    creativeSection = new CreativeSection(page);
    await creativeSection.scrollToSection();
  });

  test('should load creative section successfully', async () => {
    await expect(creativeSection.sectionContainer).toBeVisible();
    await expect(creativeSection.sectionContainer).toBeInViewport();
  });

  test.describe('Creative Projects Display', () => {
    test('should display creative projects grid with cards', async () => {
      await expect(creativeSection.creativeProjectsGrid).toBeVisible();

      const creativeProjectCards = await creativeSection.getCreativeProjectCards();
      expect(creativeProjectCards.length).toBeGreaterThan(0);

      // Verify first few creative project cards have proper structure
      for (const card of creativeProjectCards.slice(0, Math.min(3, creativeProjectCards.length))) {
        await expect(card.heroLink).toBeVisible();
        await expect(card.ctaButton).toBeVisible();
      }
    });

    test('should have working creative project links', async () => {
      const creativeProjectCards = await creativeSection.getCreativeProjectCards();

      // Test that creative project links are functional
      for (const card of creativeProjectCards.slice(0, Math.min(2, creativeProjectCards.length))) {
        await expect(card.heroLink).toHaveAttribute('href');
        await expect(card.ctaButton).toHaveAttribute('href');
      }
    });
  });
});
