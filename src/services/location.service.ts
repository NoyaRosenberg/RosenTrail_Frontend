import axios from "axios";

export enum CountryCode {
    FRANCE = "fr",
    USA = "US"
}

export interface Location {
    id: string;
    lon: number;
    lat: number;
    shortName: string;
    popularity: number;
}

class LocationService {
    private key = "pk.727039195b0ffb9e6bfbad01dcb1e090";
    private baseUrl = "https://us1.locationiq.com/v1/search.php";

    async searchLocations(searchValue: string, countryCodes: CountryCode[]) {
        try {
            const response = await axios.get(
                `${this.baseUrl}?key=${
                    this.key
                }&q=${searchValue}&countrycodes=${countryCodes.join(",")}&format=json`
            );

            const results = await response.data;

            return results.map((result: never) => ({
                id: `${result['display_name']}-${result['place_id'] || result['osm_id']}`,
                lon: result['lon'],
                lat: result['lat'],
                shortName: (result['display_name'] as string).split(",")[0],
                popularity: result['popularity']
            } as Location))
        } catch (error) {
            this.handleError(error);
        }
    }

    handleError(error: unknown): void {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status == 429) {
                throw new Error("Too many requests. Please wait a moment and try again");
            }

            if (error.response.status != 404) {
                throw new Error(error.response.data.message || "An unexpected error occurred");
            }
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export default new LocationService();
