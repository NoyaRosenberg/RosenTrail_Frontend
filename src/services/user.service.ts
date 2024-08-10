import axios from "axios";

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

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the token in the headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
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
