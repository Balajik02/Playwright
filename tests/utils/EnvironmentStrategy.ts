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

export class EnvironmentFactory {
  static getEnvironment(envType: string): Environment {
    switch (envType.toLowerCase()) {
      case 'production':
        return new ProductionEnvironment();
      case 'staging':
        return new StagingEnvironment();
      default:
        throw new Error(`Unsupported environment: ${envType}`);
    }
  }
}
