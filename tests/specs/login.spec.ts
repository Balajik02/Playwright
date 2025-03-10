import { test, expect } from '../fixtures/parallel.fixture';
import { LoginPage } from '../page-objects/LoginPage';
import { TestDataBuilder } from '../utils/TestDataBuilder';
import { ReportManager } from '../utils/ReportManager';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  let testUser: TestDataBuilder;

  test.beforeEach(async ({ page, parallelContext, testStorage }) => {
    loginPage = new LoginPage(page);
    testUser = new TestDataBuilder();
    testStorage.data.set('testCase', 'login-test');
    await loginPage.navigateToLogin();
  });

  test('should login successfully with valid credentials', async ({ page, parallelContext }) => {
    const user = testUser
      .withUsername('validUser', parallelContext.workerId)
      .withPassword('validPass123')
      .build();

    await loginPage.login(user.username, user.password);
    await expect(page).toHaveURL('/dashboard');
  });

  test('should show error with invalid credentials', async ({ parallelContext }) => {
    const user = testUser
      .withUsername('invalidUser', parallelContext.workerId)
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

  test.afterEach(async ({ testStorage }) => {
    await testStorage.clear();
  });
});