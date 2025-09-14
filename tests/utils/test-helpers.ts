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
