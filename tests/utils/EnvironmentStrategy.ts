export interface EnvironmentConfig {
  baseUrl: string;
  apiUrl: string;
  credentials: {
    username: string;
    password: string;
  };
}

export abstract class Environment {
  abstract getConfig(): EnvironmentConfig;
}

export class CIEnvironment extends Environment {
  getConfig(): EnvironmentConfig {
    return {
      baseUrl: process.env.CI_BASE_URL || 'http://localhost:5000',
      apiUrl: process.env.CI_API_URL || 'http://localhost:5000/api',
      credentials: {
        username: process.env.CI_TEST_USERNAME || 'testuser',
        password: process.env.CI_TEST_PASSWORD || 'password123',
      },
    };
  }
}

export class ProductionEnvironment extends Environment {
  getConfig(): EnvironmentConfig {
    return {
      baseUrl: 'https://production.app',
      apiUrl: 'https://api.production.app',
      credentials: {
        username: process.env.PROD_USERNAME || '',
        password: process.env.PROD_PASSWORD || '',
      },
    };
  }
}

export class StagingEnvironment extends Environment {
  getConfig(): EnvironmentConfig {
    return {
      baseUrl: 'https://staging.app',
      apiUrl: 'https://api.staging.app',
      credentials: {
        username: 'staging_user',
        password: 'staging_pass',
      },
    };
  }
}

export class DevelopmentEnvironment extends Environment {
  getConfig(): EnvironmentConfig {
    return {
      baseUrl: 'http://localhost:5000',
      apiUrl: 'http://localhost:5000/api',
      credentials: {
        username: 'testuser',
        password: 'password123',
      },
    };
  }
}

export class EnvironmentFactory {
  static getEnvironment(envType: string): Environment {
    switch (envType.toLowerCase()) {
      case 'ci':
        return new CIEnvironment();
      case 'production':
        return new ProductionEnvironment();
      case 'staging':
        return new StagingEnvironment();
      case 'development':
        return new DevelopmentEnvironment();
      default:
        return new DevelopmentEnvironment();
    }
  }
}