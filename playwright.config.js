const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright Test Configuration for E-Commerce SUT
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
  use: {
    baseURL: 'http://127.0.0.1:8085',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure'
  },

  /* Automatically spin up local SUT web server before running tests */
  webServer: {
    command: 'python -m http.server 8085 --directory ecommerce-app',
    url: 'http://127.0.0.1:8085',
    reuseExistingServer: true,
    timeout: 15 * 1000
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
