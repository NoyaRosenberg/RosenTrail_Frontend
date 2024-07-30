import axios from "axios";
import { User } from "./user.service";

export interface Trip {
  _id?: string;
  destinations: string[];
  startDate?: Date;
  endDate?: Date;
  ownerId?: string;
  participantsId?: string[];
  description?: string;
  imgUrl?: string;
  public: boolean;
}

class TripService {
  private baseURL: string = "http://localhost:3000/trips/";

  async getCommunityTrips(userId?: string): Promise<Trip[] | void> {
    try {
      const response = userId
        ? await axios.get<Trip[]>(`${this.baseURL}?userId=${userId}`)
        : await axios.get<Trip[]>(this.baseURL);
        
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUserTrips(userId: string): Promise<Trip[] | void> {
    try {
      const response = await axios.get<Trip[]>(
        `${this.baseURL}?participant=${userId}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTripParticipants(tripId: string): Promise<User[] | undefined> {
    try {
      const response = await axios.get<User[]>(
        `${this.baseURL}/${tripId}/participants`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createTrip(trip: Trip): Promise<Trip | undefined> {
    const response = await fetch(`${this.baseURL}/create-trip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trip),
    });
    if (response.ok) {
      return response.json();
    } else {
      this.handleError(response);
    }
  }

  async updateTrip(trip: Trip): Promise<Trip | undefined> {
    try {
      const response = await axios.put<Trip | undefined>(`${this.baseURL}`, {
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
