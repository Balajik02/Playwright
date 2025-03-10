import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  protected async click(locator: string): Promise<void> {
    await this.page.click(locator);
  }

  protected async type(locator: string, text: string): Promise<void> {
    await this.page.fill(locator, text);
  }

  protected async getText(locator: string): Promise<string | null> {
    return await this.page.textContent(locator);
  }

  protected async isVisible(locator: string): Promise<boolean> {
    return await this.page.isVisible(locator);
  }

  protected async waitForElement(locator: string): Promise<Locator> {
    return await this.page.waitForSelector(locator);
  }

  protected async getTitle(): Promise<string> {
    return await this.page.title();
  }

  protected async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
