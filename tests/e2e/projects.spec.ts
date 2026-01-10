import { test, expect } from '@playwright/test';
import { ProjectsSection } from '../page-objects/ProjectsSection';

test.describe('Projects Section', () => {
  let projectsSection: ProjectsSection;

  test.beforeEach(async ({ page }) => {
    projectsSection = new ProjectsSection(page);
    await projectsSection.scrollToSection();
  });

  test('should load projects section successfully', async () => {
    await expect(projectsSection.sectionContainer).toBeVisible();
    await expect(projectsSection.sectionContainer).toBeInViewport();
  });

  test.describe('Projects Display', () => {
    test('should display projects grid with cards', async () => {
      await expect(projectsSection.projectsGrid).toBeVisible();

      const projectCards = await projectsSection.getProjectCards();
      expect(projectCards.length).toBeGreaterThan(0);

      // Verify first few project cards have proper structure
      for (const card of projectCards.slice(0, Math.min(3, projectCards.length))) {
        await expect(card.learnMoreLink).toBeVisible();
        await expect(card.viewLiveLink).toBeVisible();
      }
    });

    test('should have working project links', async () => {
      const projectCards = await projectsSection.getProjectCards();

      // Test that project links are functional (don't navigate, just check they're present)
      for (const card of projectCards.slice(0, Math.min(2, projectCards.length))) {
        await expect(card.learnMoreLink).toHaveAttribute('href');
        await expect(card.viewLiveLink).toHaveAttribute('href');
      }
    });
  });
});
