import { test, expect } from '../../fixtures/parallel.fixture';
import { APIClient } from '../../utils/APIClient';
import { APIEndpoints } from '../../utils/APIEndpoints';
import { TestDataBuilder } from '../../utils/TestDataBuilder';

test.describe('Login API Tests', () => {
  let apiClient: APIClient;

  test.beforeEach(async ({ request, parallelContext }) => {
    apiClient = new APIClient(request);
    // Log which worker is running this test
    console.log(`Running test in worker ${parallelContext.workerId}`);
  });

  test('should successfully login with valid credentials', async ({ parallelContext, testStorage }) => {
    // Store test-specific data
    testStorage.data.set('testCase', 'valid-login');

    const response = await apiClient.post(APIEndpoints.LOGIN, {
      username: "testuser",
      password: "password123",
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
  });

  test('should return 401 with invalid credentials', async ({ parallelContext, testStorage }) => {
    testStorage.data.set('testCase', 'invalid-login');

    const response = await apiClient.post(APIEndpoints.LOGIN, {
      username: 'invalid',
      password: 'wrong',
    });

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body).toHaveProperty('message', 'Invalid username or password');
  });

  test('should validate required fields', async ({ parallelContext, testStorage }) => {
    testStorage.data.set('testCase', 'missing-fields');

    const response = await apiClient.post(APIEndpoints.LOGIN, {});

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty('message', 'Username and password are required');
  });

  test.afterEach(async ({ testStorage }) => {
    await testStorage.clear();
  });
});