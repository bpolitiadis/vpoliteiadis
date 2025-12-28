import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [['github'], ['html']] : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4321',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Take screenshot on failure */
    screenshot: 'only-on-failure',

    /* Record video on failure */
    video: 'retain-on-failure',

    /* Increase timeout for React hydration */
    actionTimeout: 15000,
    navigationTimeout: 30000,

    /* Test metadata */
    testIdAttribute: 'data-testid',
  },

  /* Global test timeout */
  timeout: 60000, // Increased for comprehensive tests

  /* Global setup and teardown */
  globalSetup: './tests/global-setup.ts',

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      metadata: {
        browser: 'chromium',
        viewport: 'desktop',
      },
    },

    {
      name: 'chromium-mobile',
      use: {
        ...devices['Pixel 5'],
        contextOptions: {
          reducedMotion: 'reduce', // Test reduced motion
        }
      },
      metadata: {
        browser: 'chromium',
        viewport: 'mobile',
      },
    },

    // Firefox tests for cross-browser compatibility
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      metadata: {
        browser: 'firefox',
        viewport: 'desktop',
      },
    },

    // WebKit tests for Safari compatibility
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      metadata: {
        browser: 'webkit',
        viewport: 'desktop',
      },
    },

    /* Comprehensive mobile testing */
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
      metadata: {
        browser: 'webkit',
        viewport: 'mobile',
      },
    },

    /* Accessibility-focused tests */
    {
      name: 'accessibility',
      use: {
        ...devices['Desktop Chrome'],
        contextOptions: {
          reducedMotion: 'no-preference',
        }
      },
      grep: /accessibility/,
      metadata: {
        type: 'accessibility',
      },
    },

    /* Performance-focused tests */
    {
      name: 'performance',
      use: {
        ...devices['Desktop Chrome'],
        contextOptions: {
          // Disable images for performance tests
          permissions: [],
        }
      },
      grep: /performance/,
      metadata: {
        type: 'performance',
      },
    },
  ],

  /* Test groups for different test types */
  grepInvert: process.env.TEST_TYPE ? undefined : /accessibility|performance/, // Run accessibility and performance separately
  grep: process.env.TEST_TYPE === 'accessibility' ? /accessibility/ :
        process.env.TEST_TYPE === 'performance' ? /performance/ :
        process.env.TEST_TYPE === 'smoke' ? /smoke/ : undefined,

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  /* Test metadata */
  metadata: {
    project: 'Vasileios Politeiadis Portfolio',
    version: '1.0.0',
    testSuite: 'UI Automation Suite',
  },

  /* Output configuration */
  outputDir: 'test-results/',
  snapshotDir: 'tests/snapshots/',

  /* Test execution configuration */
  expect: {
    timeout: 10000,
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.05, // Allow small visual differences
    },
  },

  /* Test sharding for CI */
  shard: process.env.CI ? { current: 1, total: 2 } : undefined,
});
