export interface TestUser {
  username: string;
  password: string;
  email: string;
}

export class TestDataBuilder {
  private user: TestUser = {
    username: '',
    password: '',
    email: ''
  };

  withUsername(username: string, workerId?: number): TestDataBuilder {
    // Add worker ID to username for parallel execution isolation
    this.user.username = workerId !== undefined ? `${username}-worker${workerId}` : username;
    return this;
  }

  withPassword(password: string): TestDataBuilder {
    this.user.password = password;
    return this;
  }

  withEmail(email: string, workerId?: number): TestDataBuilder {
    // Add worker ID to email for parallel execution isolation
    const [localPart, domain] = email.split('@');
    this.user.email = workerId !== undefined ? 
      `${localPart}-worker${workerId}@${domain}` : 
      email;
    return this;
  }

  build(): TestUser {
    if (!this.user.username || !this.user.password || !this.user.email) {
      throw new Error('TestUser must have username, password, and email');
    }
    return { ...this.user };
  }

  static createTestUser(workerId: number): TestUser {
    return new TestDataBuilder()
      .withUsername('testuser', workerId)
      .withPassword('password123')
      .withEmail('test@example.com', workerId)
      .build();
  }

  static createDefaultUser(): TestUser {
    return new TestDataBuilder()
      .withUsername('testuser')
      .withPassword('password123')
      .withEmail('test@example.com')
      .build();
  }
}