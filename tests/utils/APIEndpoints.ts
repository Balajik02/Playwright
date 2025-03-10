export class APIEndpoints {
  static readonly LOGIN = '/api/login';
  static readonly USERS = '/api/users';
  
  // Helper method to build user-specific endpoints
  static userById(id: string | number): string {
    return `${this.USERS}/${id}`;
  }
}
