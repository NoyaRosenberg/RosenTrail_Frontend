import axios from "axios";

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
  participantsId: string[];
  unregisteredParticipants: string[];
}

class ActivityService {
  private baseURL: string = "http://localhost:3000/activities/";

  async getTripActivities(tripId: string): Promise<Activity[] | void> {
    try {
      const response = await axios.get<Activity[]>(`${this.baseURL}?tripId=${tripId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async addActivity(activity: Activity): Promise<Activity | void> {
    try {
      const response = await axios.post<Activity>(this.baseURL, activity);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateActivity(activity: Activity): Promise<Activity | void> {
    try {
      const response = await axios.put<Activity>(`${this.baseURL}${activity._id}`, activity);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteActivity(activityId: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}${activityId}`);
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