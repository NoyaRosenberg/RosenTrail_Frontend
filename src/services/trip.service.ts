import axios from "axios";

export interface Trip {
  _id: string;
  destinations: string[];
  startDate?: Date;
  endDate?: Date;
  ownerId?: string;
  participantsId?: string[];
  unregisteredParticipants?: string[];
  activitiesId?: string[];
  description: string;
  imgUrl: string;
}

class TripService {
  private baseURL: string = "http://localhost:3000/trips/";

  async getUserTrips(userId: string): Promise<Trip[]> {
    try {
      const response = await axios.get<Trip[]>(`${this.baseURL}?participant=${userId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || "An error occurred";
        throw new Error(errorMessage);
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
}

export default new TripService();
