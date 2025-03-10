import { APIRequestContext } from '@playwright/test';
import { ConfigManager } from './ConfigManager';

export class APIClient {
  private request: APIRequestContext;
  private baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = ConfigManager.getInstance().getBaseUrl();
  }

  async post(endpoint: string, data: any) {
    const response = await this.request.post(`${this.baseUrl}${endpoint}`, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  }

  async get(endpoint: string) {
    const response = await this.request.get(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  }

  async delete(endpoint: string) {
    const response = await this.request.delete(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  }

  async put(endpoint: string, data: any) {
    const response = await this.request.put(`${this.baseUrl}${endpoint}`, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  }
}
