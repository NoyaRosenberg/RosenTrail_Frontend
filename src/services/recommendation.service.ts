import axios from "axios";
import AuthService from "./auth.service.ts";
import {Place} from "../components/ActivitiesPage/PlaceDetails.tsx";

export interface Category {
  id: number;
  name: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Junk Food"
  },
  {
    id: 2,
    name: "Kid Friendly"
  },
  {
    id: 3,
    name: "Amusement Parks"
  },
  {
    id: 4,
    name: "Outdoor Walks"
  },
  {
    id: 5,
    name: "Museums & Theatres"
  },
  {
    id: 6,
    name: "View Buildings"
  },
  {
    id: 7,
    name: "Fancy Restaurants"
  },
  {
    id: 8,
    name: "Art & Cultural"
  },
  {
    id: 9,
    name: "Parks"
  },
  {
    id: 10,
    name: "Restaurants"
  }
];

const apiClient = axios.create({
  baseURL: "http://localhost:3000/recommendations/",
});

apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
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
        }
      }
      return Promise.reject(error);
    }
);

class RecommendationService {
  private apiClient = apiClient;

  getCategories(): Category[] {
    return categories;
  }
  async getMapCategories(placeName: string | undefined): Promise<string[] | undefined> {
    try {
      const response = await this.apiClient.get(`categories/${placeName}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getRecommendationsFromAI(activityLocation: string): Promise<Place[] | undefined> {
    try {
      const response = await this.apiClient.post("AI", {activityLocation});
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

export default new RecommendationService();