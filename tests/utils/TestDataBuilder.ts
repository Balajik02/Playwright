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

  withUsername(username: string): TestDataBuilder {
    this.user.username = username;
    return this;
  }

  withPassword(password: string): TestDataBuilder {
    this.user.password = password;
    return this;
  }

  withEmail(email: string): TestDataBuilder {
    this.user.email = email;
    return this;
  }

  build(): TestUser {
    return { ...this.user };
  }

  static createDefaultUser(): TestUser {
    return new TestDataBuilder()
      .withUsername('testuser')
      .withPassword('password123')
      .withEmail('test@example.com')
      .build();
  }
}
