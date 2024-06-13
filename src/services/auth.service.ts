export interface AuthData {
    userId: string;
    email: string;
    token: string
}

class AuthService {
    private baseURL: string = 'http://localhost:3000/auth/';
    private static currentUserKey: string = 'currentUser'; 
  
    async login(email: string, password: string): Promise<AuthData> {
      const response = await fetch(`${this.baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password })
      });
  
      if (!response.ok) {
        throw new Error('Login failed: ' + response.json());
      }
  
      const user = await response.json();
      this.saveCurrentUser(user);

      return user;
    }

    async signUp(email: string, password: string): Promise<void> {
      const response = await fetch(`${this.baseURL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password })
      });
  
      if (!response.ok) {
        throw new Error('Sign Up failed: ' + response.json());
      }
    }
  
    saveCurrentUser(authData: AuthData): void {
      localStorage.setItem(AuthService.currentUserKey, JSON.stringify(authData));
    }
  
    getCurrentUser(): AuthData {
      const user = localStorage.getItem(AuthService.currentUserKey);
      return user ? JSON.parse(user) : null;
    }
  
    logout(): void {
      localStorage.removeItem(AuthService.currentUserKey);
    }
  
    isAuthenticated(): boolean {
      return this.getCurrentUser() !== null;
    }
  }
  
  export default new AuthService();
  