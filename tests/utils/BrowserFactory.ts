import { Browser, chromium, firefox, webkit } from '@playwright/test';

export class BrowserFactory {
  static async createBrowser(browserType: string): Promise<Browser> {
    switch (browserType.toLowerCase()) {
      case 'chrome':
        return await chromium.launch();
      case 'firefox':
        return await firefox.launch();
      case 'webkit':
        return await webkit.launch();
      default:
        throw new Error(`Unsupported browser type: ${browserType}`);
    }
  }
}
