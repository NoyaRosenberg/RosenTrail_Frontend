import axios from "axios";
import AuthService from "./auth.service";

export interface Activity {
  _id: string;
  tripId: string;
  name: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  cost: number;
  participants?: number;
  unregisteredParticipants?: string[];
  categories: string[];
  imageUrl?: string;
}

// Create an Axios instance with token handling
const apiClient = axios.create({
  baseURL: "http://localhost:3000/activities/",
});

// Add a request interceptor to include the token in the headers
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
        // Handle refresh token error (e.g., log out user)
      }
    }
    return Promise.reject(error);
  }
);

class ActivityService {
  private apiClient = apiClient;

  async getTripActivities(tripId: string): Promise<Activity[] | void> {
    try {
      const response = await this.apiClient.get<Activity[]>(`?tripId=${tripId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getActivitiesFromAI(activityLocation: string) {
    try {
      const response = await this.apiClient.post(
        "get-activities-from-ai",
        { activityLocation }
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }



  async addActivity(activity: Activity): Promise<Activity | void> {
    try {
      const response = await this.apiClient.post<Activity>("", activity);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateActivity(activity: Activity): Promise<Activity | void> {
    try {
      const response = await this.apiClient.put<Activity>(`${activity._id}`, activity);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteActivity(activityId: string): Promise<void> {
    try {
      await this.apiClient.delete(`${activityId}`);
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

export default new ActivityService();
