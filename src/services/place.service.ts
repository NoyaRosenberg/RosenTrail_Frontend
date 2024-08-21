import axios from 'axios';

export interface PlaceDetails {
    id: string;
    name: string;
    description: string;
    coordinates: { lon: number, lat: number }
}

class PlaceService {
    private readonly baseUrl: string = 'http://localhost:3000/places';

    public async fetchPlaces(query: string, coordinates: string): Promise<PlaceDetails[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/autocomplete`, {
                params: {
                    query,
                    coordinates,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching attractions:', error);
            return [];
        }
    }
}

export default new PlaceService();
