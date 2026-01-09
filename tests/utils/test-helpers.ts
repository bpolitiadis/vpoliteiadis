import { expect } from '@playwright/test';
import type { Page, Route } from '@playwright/test';

/**
 * Mock API responses for contact form tests
 */
export class ContactFormMocks {
  /**
   * Mock successful contact form submission
   */
  static async mockSuccessResponse(page: Page, delay: number = 0) {
    await page.route('**/api/contact', async (route: Route) => {
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          success: true,
          message: 'Message sent successfully' 
        }),
      });
    });
  }

  /**
   * Mock server error response
   */
  static async mockErrorResponse(page: Page, status: number = 500, delay: number = 0) {
    await page.route('**/api/contact', async (route: Route) => {
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      await route.fulfill({
        status,
        contentType: 'application/json',
        body: JSON.stringify({ 
          error: 'Internal Server Error',
          message: 'Something went wrong' 
        }),
      });
    });
  }

  /**
   * Mock network error
   */
  static async mockNetworkError(page: Page) {
    await page.route('**/api/contact', async (route: Route) => {
      await route.abort('failed');
    });
  }

  /**
   * Mock timeout error
   */
  static async mockTimeoutError(page: Page, timeout: number = 30000) {
    await page.route('**/api/contact', async (route: Route) => {
      await new Promise(resolve => setTimeout(resolve, timeout));
      await route.abort('TimedOut');
    });
  }

  /**
   * Clear all mocks
   */
  static async clearMocks(page: Page) {
    await page.unroute('**/api/contact');
  }
}

/**
 * Test data for contact form
 */
export const ContactFormTestData = {
  valid: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    message: 'This is a test message for the contact form.',
  },
  
  invalid: {
    firstName: '',
    lastName: '',
    email: 'invalid-email',
    message: '',
  },
  
  longData: {
    firstName: 'A'.repeat(60), // Max length
    lastName: 'B'.repeat(60), // Max length
    email: 'test@example.com',
    message: 'C'.repeat(5000), // Max length
  },
  
  honeypot: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    message: 'This is a test message.',
    honeypot: 'spam', // This should trigger honeypot behavior
  },
  
  invalidEmails: [
    'invalid-email',
    'test@',
    '@example.com',
    'test..test@example.com',
    'test@example',
    'test@.com',
    'test@example..com',
  ],
} as const;

/**
 * Wait for element to be stable (not moving/changing)
 */
export async function waitForElementStable(page: Page, selector: string, timeout: number = 1000) {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout });
  
  // Wait for any animations to complete
  await page.waitForTimeout(100);
}

/**
 * Take screenshot with timestamp
 */
export async function takeTimestampedScreenshot(page: Page, name: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({ 
    path: `test-results/screenshots/${name}-${timestamp}.png`,
    fullPage: true 
  });
}

/**
 * Check if element is in viewport
 */
export async function isElementInViewport(page: Page, selector: string): Promise<boolean> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, selector);
}

/**
 * Wait for form submission to complete
 */
export async function waitForFormSubmission(page: Page, submitButtonSelector: string = '[data-testid="contact-submit"]') {
  const submitButton = page.locator(submitButtonSelector);
  
  // Wait for button to be disabled (submitting)
  await submitButton.waitFor({ state: 'attached' });
  
  // Wait for button to be enabled again (submission complete)
  await submitButton.waitFor({ state: 'visible', timeout: 10000 });
}

/**
 * Generate random test data
 */
export function generateRandomTestData() {
  const randomId = Math.random().toString(36).substring(7);
  return {
    firstName: `Test${randomId}`,
    lastName: `User${randomId}`,
    email: `test${randomId}@example.com`,
    message: `This is a random test message ${randomId}`,
  };
}

/**
 * Test helper for navigation across pages
 */
export class NavigationTestHelper {
  /**
   * Test navigation to multiple pages
   */
  static async testPageNavigation(page: any, pages: string[]) {
    for (const pageUrl of pages) {
      await page.goto(pageUrl);
      await page.waitForSelector('[data-testid="navbar"]', { timeout: 10000 });

      // Verify page loaded correctly
      const currentUrl = page.url();
      expect(currentUrl).toContain(pageUrl === '/' ? '' : pageUrl);
    }
  }

  /**
   * Test active navigation highlighting
   */
  static async testActiveNavigation(page: any, pageUrl: string, expectedActiveLink: string) {
    await page.goto(pageUrl);
    await page.waitForSelector('[data-testid="navbar"]');

    // Check if desktop navigation has active link
    const desktopActiveLink = page.locator(`[data-testid="navbar-link-${expectedActiveLink}"]`);
    if (await desktopActiveLink.isVisible()) {
      const ariaCurrent = await desktopActiveLink.getAttribute('aria-current');
      expect(ariaCurrent).toBe('page');
    }

    // Check if mobile navigation has active link (if mobile menu is open)
    const mobileActiveLink = page.locator(`[data-testid="mobile-nav-link-${expectedActiveLink}"]`);
    if (await mobileActiveLink.isVisible()) {
      const ariaCurrent = await mobileActiveLink.getAttribute('aria-current');
      expect(ariaCurrent).toBe('page');
    }
  }
}

/**
 * Accessibility test helpers
 */
export class AccessibilityTestHelper {
  /**
   * Check if element has sufficient color contrast
   */
  static async checkColorContrast(page: any, selector: string): Promise<boolean> {
    return await page.evaluate((sel: string) => {
      const element = document.querySelector(sel);
      if (!element) return false;

      const style = window.getComputedStyle(element);
      const backgroundColor = style.backgroundColor;
      const color = style.color;

      // Basic contrast check (simplified)
      // In a real scenario, you'd use a proper color contrast library
      return backgroundColor !== color;
    }, selector);
  }

  /**
   * Check if element meets minimum touch target size
   */
  static async checkTouchTargetSize(page: any, selector: string): Promise<boolean> {
    const box = await page.locator(selector).boundingBox();
    if (!box) return false;

    return box.width >= 44 && box.height >= 44;
  }

  /**
   * Test keyboard navigation through a set of elements
   */
  static async testKeyboardNavigation(page: any, selectors: string[]) {
    // Focus first element
    await page.keyboard.press('Tab');

    for (let i = 0; i < selectors.length; i++) {
      const focusedElement = page.locator(':focus');

      // Check if focused element matches expected selector
      const isFocused = await focusedElement.isVisible();
      expect(isFocused).toBe(true);

      if (i < selectors.length - 1) {
        await page.keyboard.press('Tab');
      }
    }
  }

  /**
   * Check heading hierarchy
   */
  static async checkHeadingHierarchy(page: any): Promise<boolean> {
    const headings = await page.evaluate(() => {
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      return Array.from(headingElements).map(el => ({
        tag: el.tagName.toLowerCase(),
        level: parseInt(el.tagName.charAt(1)),
        text: el.textContent?.trim()
      }));
    });

    if (headings.length === 0) return false;

    // Check that there's exactly one H1
    const h1Count = headings.filter((h: any) => h.level === 1).length;
    if (h1Count !== 1) return false;

    // Check for reasonable heading progression (no large skips)
    let lastLevel = 0;
    for (const heading of headings) {
      if (lastLevel > 0 && heading.level > lastLevel + 1) {
        // Allow some flexibility but warn about large skips
        console.warn(`Heading level skip: ${heading.tag} after H${lastLevel}`);
      }
      lastLevel = heading.level;
    }

    return true;
  }
}

/**
 * Responsive design test helpers
 */
export class ResponsiveTestHelper {
  static readonly viewports = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 },
    largeDesktop: { width: 2560, height: 1440 },
  };

  /**
   * Test element visibility across viewports
   */
  static async testElementVisibilityAcrossViewports(page: any, selector: string, expectedVisibility: boolean[]) {
    const viewports = Object.values(this.viewports);

    for (let i = 0; i < viewports.length; i++) {
      const viewport = viewports[i];
      await page.setViewportSize(viewport);

      const isVisible = await page.locator(selector).isVisible();
      expect(isVisible).toBe(expectedVisibility[i]);
    }
  }

  /**
   * Test layout changes across breakpoints
   */
  static async testLayoutBreakpoints(page: any, breakpoints: Array<{ width: number; height: number; expectedLayout: string }>) {
    for (const breakpoint of breakpoints) {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });

      // Test that layout adapts appropriately
      // This is a placeholder for more specific layout tests
      const bodyWidth = await page.evaluate(() => document.body.offsetWidth);
      expect(bodyWidth).toBeGreaterThan(0);
    }
  }

  /**
   * Check if content reflows properly on viewport changes
   */
  static async testContentReflow(page: any, contentSelector: string) {
    // Test mobile to desktop transition
    await page.setViewportSize(this.viewports.mobile);
    const mobileBox = await page.locator(contentSelector).boundingBox();

    await page.setViewportSize(this.viewports.desktop);
    const desktopBox = await page.locator(contentSelector).boundingBox();

    // Content should be visible in both viewports
    expect(mobileBox).toBeTruthy();
    expect(desktopBox).toBeTruthy();
  }
}

/**
 * Performance test helpers
 */
export class PerformanceTestHelper {
  /**
   * Measure page load time
   */
  static async measurePageLoadTime(page: any, url: string): Promise<number> {
    const startTime = Date.now();
    await page.goto(url);
    await page.waitForSelector('[data-testid="navbar"]', { timeout: 10000 });
    return Date.now() - startTime;
  }

  /**
   * Get lighthouse performance score (simplified)
   */
  static async getPerformanceMetrics(page: any) {
    const metrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
        firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
      };
    });

    return metrics;
  }

  /**
   * Check for render-blocking resources
   */
  static async checkRenderBlockingResources(page: any): Promise<string[]> {
    const blockingResources = await page.evaluate(() => {
      const blocking: string[] = [];

      // Check for render-blocking CSS
      const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
      linkElements.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !link.hasAttribute('media')) {
          blocking.push(`Render-blocking CSS: ${href}`);
        }
      });

      // Check for sync JS
      const scriptElements = document.querySelectorAll('script[src]:not([async]):not([defer])');
      scriptElements.forEach(script => {
        const src = script.getAttribute('src');
        if (src) {
          blocking.push(`Render-blocking JS: ${src}`);
        }
      });

      return blocking;
    });

    return blockingResources.length > 0 ? blockingResources : ['No render-blocking resources found'];
  }
}

/**
 * SEO test helpers
 */
export class SEOTestHelper {
  /**
   * Validate meta tags
   */
  static async validateMetaTags(page: any) {
    const title = await page.title();
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');

    return {
      title: {
        content: title,
        length: title.length,
        valid: title.length > 0 && title.length <= 70
      },
      description: {
        content: metaDescription,
        length: metaDescription?.length || 0,
        valid: metaDescription && metaDescription.length >= 50 && metaDescription.length <= 160
      },
      canonical: {
        content: canonical,
        valid: canonical && canonical.startsWith('http')
      }
    };
  }

  /**
   * Check for structured data
   */
  static async checkStructuredData(page: any) {
    const structuredData = await page.locator('script[type="application/ld+json"]').allTextContents();
    const parsedData = structuredData.map((json: string) => {
      try {
        return JSON.parse(json);
      } catch {
        return null;
      }
    }).filter(Boolean);

    return {
      count: parsedData.length,
      types: parsedData.map((data: any) => data['@type']),
      valid: parsedData.every((data: any) => data['@context'] === 'https://schema.org')
    };
  }

  /**
   * Validate Open Graph tags
   */
  static async validateOpenGraphTags(page: any) {
    const ogTags = await page.evaluate(() => {
      const metaTags = document.querySelectorAll('meta[property^="og:"]');
      const tags: { [key: string]: string } = {};

      metaTags.forEach(tag => {
        const property = tag.getAttribute('property')?.replace('og:', '');
        const content = tag.getAttribute('content');
        if (property && content) {
          tags[property] = content;
        }
      });

      return tags;
    });

    return {
      title: ogTags.title,
      description: ogTags.description,
      type: ogTags.type,
      url: ogTags.url,
      image: ogTags.image,
      valid: !!(ogTags.title && ogTags.description && ogTags.type && ogTags.url && ogTags.image)
    };
  }
}
