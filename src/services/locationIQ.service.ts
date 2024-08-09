import axios from "axios";

export enum CountryCode {
  FRANCE = "fr",
}

class LocationIQService {
  private key = "pk.727039195b0ffb9e6bfbad01dcb1e090";
  private baseUrl = "https://us1.locationiq.com/v1/search.php";

  async searchLocations(searchValue: string, countryCodes: CountryCode[]) {
    try {
      const response = await axios.get(
        `${this.baseUrl}?key=${
          this.key
        }&q=${searchValue}&countrycodes=${countryCodes.join(",")}&format=json`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: unknown): void {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.status === 404
          ? "Location Not Found"
          : error.response.data.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

export default new LocationIQService();
