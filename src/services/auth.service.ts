import axios from "axios";

export interface AuthData {
  userId: string;
  username: string;
  email: string;
  imageData: string; 
  token: string;
  refreshToken: string;
  gender: string;
  age: number;
  phoneNumber: number;
}

class AuthService {
  private baseURL: string = "http://localhost:3000/auth";

  async login(email: string, password: string): Promise<AuthData | void> {
    try {
      const response = await axios.post<AuthData>(`${this.baseURL}/login`, { email, password });
      this.storeTokens(response.data.token, response.data.refreshToken);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async googleLogin(token: string): Promise<AuthData | void> {
    try {
      const response = await axios.post(`${this.baseURL}/google-login`, { token });
      this.storeTokens(response.data.token, response.data.refreshToken);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async signUp(username: string, email: string, age: string, phoneNumber: string, password: string, imageData: string): Promise<AuthData | void> {
    try {
      const response = await axios.post<AuthData>(`${this.baseURL}/signup`, {
        username,
        email,
        age,
        phoneNumber,
        password,
        imageData
      });
      this.storeTokens(response.data.token, response.data.refreshToken);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private storeTokens(token: string, refreshToken: string) {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refreshToken);
  }

  async refreshToken(): Promise<string | void> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token found");

      const response = await axios.post<{ token: string }>(`${this.baseURL}/refresh-token`, { token: refreshToken });
      const newaccessToken = response.data.token;
      localStorage.setItem("accessToken", newaccessToken);
      return newaccessToken;
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
