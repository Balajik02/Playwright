export class ConfigManager {
  private static instance: ConfigManager;
  private config: Record<string, any>;

  private constructor() {
    this.config = {
      baseUrl: process.env.BASE_URL || 'http://localhost:5000',
      timeout: parseInt(process.env.TIMEOUT || '30000'),
      retries: parseInt(process.env.RETRIES || '2'),
    };
  }

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  getBaseUrl(): string {
    return this.config.baseUrl;
  }

  getTimeout(): number {
    return this.config.timeout;
  }

  getRetries(): number {
    return this.config.retries;
  }
}
