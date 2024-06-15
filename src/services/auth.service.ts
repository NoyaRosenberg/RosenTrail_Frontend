export interface AuthData {
    userId: string;
    email: string;
    token: string
}

class AuthService {
    private baseURL: string = 'http://localhost:3000/auth/';
  
    async login(email: string, password: string): Promise<AuthData> {
      const response = await fetch(`${this.baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password })
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      const user = await response.json();

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
        const error = await response.json();
        throw new Error(error.message);
      }
    }
  }
  
  export default new AuthService();
  