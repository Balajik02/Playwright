import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { TestDataBuilder } from '../utils/TestDataBuilder';
import { ReportManager } from '../utils/ReportManager';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  let testUser: TestDataBuilder;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    testUser = new TestDataBuilder();
    await loginPage.navigateToLogin();
  });

  test('should login successfully with valid credentials', async () => {
    const user = testUser
      .withUsername('validUser')
      .withPassword('validPass123')
      .build();

    await loginPage.login(user.username, user.password);
    await expect(page).toHaveURL('/dashboard');
  });

  test('should show error with invalid credentials', async () => {
    const user = testUser
      .withUsername('invalidUser')
      .withPassword('invalidPass')
      .build();

    await loginPage.login(user.username, user.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Invalid username or password');
  });

  test('should validate required fields', async () => {
    await loginPage.login('', '');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Username and password are required');
  });
});
