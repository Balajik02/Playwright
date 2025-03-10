import { PlaywrightTestConfig } from '@playwright/test';
import { ConfigManager } from '../utils/ConfigManager';

const config: PlaywrightTestConfig = {
  testDir: '../specs',
  timeout: ConfigManager.getInstance().getTimeout(),
  reporter: [
    ['list'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
    }]
  ],

  // Global parallel execution config
  workers: process.env.CI ? 4 : 2, // Use 4 workers in CI, 2 locally for better control
  fullyParallel: true, // Run all tests in parallel
  forbidOnly: !!process.env.CI, // Fail if test.only is called in CI
  retries: process.env.CI ? 2 : 0, // Retry failed tests twice in CI

  // Global test configuration
  use: {
    baseURL: ConfigManager.getInstance().getBaseUrl(),
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  // Project configuration for different test types
  projects: [
    {
      name: 'API Tests',
      testMatch: /.*\.api\.spec\.ts/,
      use: {
        browserName: undefined, // No browser needed for API tests
      },
    },
    {
      name: 'UI Chrome Tests',
      testMatch: /.*\.spec\.ts/,
      testIgnore: /.*\.api\.spec\.ts/,
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
      }
    }
  ],

  // Shard configuration for distributed testing
  shard: process.env.CI ? {
    total: 4, // Total number of shards
    current: Number(process.env.TEST_SHARD_INDEX || 0), // Current shard index
  } : undefined,
};

export default config;
