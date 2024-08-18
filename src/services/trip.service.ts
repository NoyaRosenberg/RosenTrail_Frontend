import axios from "axios";
import { User } from "./user.service";
import AuthService from "./auth.service";

export interface Trip {
  _id?: string;
  destinations: string[];
  startDate?: Date;
  endDate?: Date;
  ownerId?: string;
  participantsId?: string[];
  description?: string;
  imgUrl?: string;
  isPublic: boolean;
}

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:3000/trips/",
});

// Add a request interceptor to include the token in the headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Assuming the token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

class TripService {
  private apiClient = apiClient;

  async getCommunityTrips(userId?: string): Promise<Trip[] | void> {
    try {
      const response = userId
        ? await this.apiClient.get<Trip[]>(`?userId=${userId}`)
        : await this.apiClient.get<Trip[]>("");
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUserTrips(userId: string): Promise<Trip[] | void> {
    try {
      const response = await this.apiClient.get<Trip[]>(`?participant=${userId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTripParticipants(tripId: string): Promise<User[] | undefined> {
    try {
      const response = await this.apiClient.get<User[]>(`/${tripId}/participants`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createTrip(trip: Trip): Promise<Trip | undefined> {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${this.apiClient.defaults.baseURL}/create-trip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Add token to headers
        },
        body: JSON.stringify(trip),
      });

      if (response.ok) {
        return response.json();
      } else {
        this.handleError(response);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateTrip(trip: Trip): Promise<Trip | undefined> {
    try {
      const response = await this.apiClient.put<Trip | undefined>("", {
        ...trip,
      });
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

export default new TripService();
