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

  async getUserTrips(userId: string): Promise<Trip[] | void> {
    try {
      const response = await axios.get<Trip[]>(`${this.baseURL}?participant=${userId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async CreateTrip(trip: Trip): Promise<void> {
    const response = await fetch(`${this.baseURL}/create-trip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trip),
      });
      if (response.ok) {
        console.log("Trip details saved:", trip);
      } else {
        this.handleError(response);
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
