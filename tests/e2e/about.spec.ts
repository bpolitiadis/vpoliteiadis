import { test, expect } from '@playwright/test';
import { AboutSection } from '../page-objects/AboutSection';

test.describe('About Section', () => {
  let aboutSection: AboutSection;

  test.beforeEach(async ({ page }) => {
    aboutSection = new AboutSection(page);
    await aboutSection.scrollToSection();
  });

  test('should load about section successfully', async () => {
    await expect(aboutSection.sectionContainer).toBeVisible();
    await expect(aboutSection.sectionContainer).toBeInViewport();
  });

  test.describe('About Content', () => {
    test('should display about content sections', async () => {
      await aboutSection.verifySectionStructure();

      // Verify main content areas are present
      await expect(aboutSection.heroContent).toBeVisible();
      await expect(aboutSection.mainContent).toBeVisible();
    });

    test('should contain expected about information', async () => {
      const content = await aboutSection.getSectionContent();

      // Verify we have meaningful content
      expect(content.heroText).toBeTruthy();
      expect(content.heroText!.length).toBeGreaterThan(10);
      expect(content.mainContent).toBeTruthy();
    });
  });

  test('should load images and content properly', async () => {
    // Verify section has meaningful content
    const content = await aboutSection.getSectionContent();
    expect(content.heroText).toBeTruthy();
    expect(content.mainContent).toBeTruthy();

    // Verify accessibility compliance
    await aboutSection.checkAccessibility();
  });
});
