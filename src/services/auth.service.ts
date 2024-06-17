import axios from "axios";

export interface AuthData {
  userId: string;
  email: string;
  token: string;
}

class AuthService {
  private baseURL: string = "http://localhost:3000/auth";

  async login(email: string, password: string): Promise<AuthData | void> {
    try {
      const response = await axios.post<AuthData>(`${this.baseURL}/login`, {
        email: email,
        password,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async googleLogin(token: string): Promise<AuthData | void> {
    try {
      const response = await axios.post(`${this.baseURL}/google-login`, { token });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async signUp(email: string, password: string): Promise<void> {
    try {
      await axios.post(`${this.baseURL}/signup`, { email: email, password });
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: unknown): void {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

export default new AuthService();
