import axios from "axios";

export interface Position {
    lng: number;
    lat: number;
}

export interface Location {
    position: Position;
    region: string;
}

class GoogleMapsService {
    private readonly baseUrl: string = `https://maps.googleapis.com/maps/api`;
    private readonly apiKey = 'AIzaSyDC7J-IsGSicrRECRUn5H2pYhRm-DpATNo';

    getCoordinatesByAddress = async (address: string): Promise<Location | undefined> => {
        const url = `${this.baseUrl}/geocode/json?key=${this.apiKey}&address=${encodeURIComponent(address)}`;

        try {
            const response = await axios.get(url);

            return {
                position: {
                    lng: response.data.results[0].geometry.location.lng,
                    lat: response.data.results[0].geometry.location.lat
                },
                region: response.data.results[0].address_components.find((component: any) =>
                    component.types.includes('country')
                )?.short_name
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.message || "An error occurred";
                throw new Error(errorMessage);
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    };
}

export default new GoogleMapsService();