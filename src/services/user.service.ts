import axios from "axios";
import AuthService from "./auth.service";

export interface User {
  _id: string;
  username: string;
  email: string;
  imageData: string;
  gender: string;
  age: number;
  phoneNumber: number;
}

const API_BASE_URL = "http://localhost:3000/users/";

const apiClient = axios.create({ baseURL: API_BASE_URL });

apiClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("Interceptor error:", error);
    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("Attempting to refresh token with:", refreshToken);
        const response = await AuthService.refreshToken();
        console.log("Received new token:", response);
        localStorage.setItem("accessToken", response as string);
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${response}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError);
        // Handle refresh token error (e.g., log out user)
      }
    }
    return Promise.reject(error);
  }
);

class UserService {
  private apiClient = apiClient;

  async getByEmail(email: string): Promise<User | undefined> {
    try {
      const response = await this.apiClient.get<User | undefined>(`/email/${email}`);
      return response.data;
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

export default new UserService();
