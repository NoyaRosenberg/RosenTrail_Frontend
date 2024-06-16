export interface TripData {
    startDate:Date,
    endDate: Date,
    destinations: string[],
    activitiesId?: string[];
    participants: string[],
    ownerId: string;
}

class TripService {
    private baseURL: string = 'http://localhost:3000/trips/';
    private static currentUserKey: string = 'currentUser'; 
  
    async CreateTrip(trip: TripData): Promise<void> {
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
            console.error("Failed to save trip details");
          }
    }

    
  }
  
  export default new TripService();
  