import { PlaywrightTestConfig } from '@playwright/test';
import { ConfigManager } from '../utils/ConfigManager';

const config: PlaywrightTestConfig = {
  testDir: '../specs',
  timeout: 30000,
  reporter: [
    ['list'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
    }]  
  ],
  workers: process.env.CI ? 4 : undefined, 
  fullyParallel: true, 
  forbidOnly: !!process.env.CI, 
  retries: process.env.CI ? 2 : 0, 
  use: {
    baseURL: ConfigManager.getInstance().getBaseUrl(),
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
      },
      workers: 2, 
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
        viewport: { width: 1280, height: 720 },
      },
      workers: 2, 
    },
    {
      name: 'API Tests',
      use: { 
        browserName: undefined,
      },
      workers: 3, 
    },
  ],
};

export default config;