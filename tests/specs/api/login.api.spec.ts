import { test, expect } from '@playwright/test';
import { APIClient } from '../../utils/APIClient';
import { APIEndpoints } from '../../utils/APIEndpoints';
import { TestDataBuilder } from '../../utils/TestDataBuilder';

test.describe('Login API Tests', () => {
  let apiClient: APIClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new APIClient(request);
  });

  test('should successfully login with valid credentials', async () => {
    const testUser = TestDataBuilder.createDefaultUser();
    
    const response = await apiClient.post(APIEndpoints.LOGIN, {
      username: testUser.username,
      password: testUser.password,
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('token');
  });

  test('should return 401 with invalid credentials', async () => {
    const response = await apiClient.post(APIEndpoints.LOGIN, {
      username: 'invalid',
      password: 'wrong',
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(401);
  });

  test('should validate required fields', async () => {
    const response = await apiClient.post(APIEndpoints.LOGIN, {});

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
    
    const body = await response.json();
    expect(body).toHaveProperty('message');
    expect(body.message).toContain('required');
  });
});
