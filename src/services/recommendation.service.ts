import axios from "axios";

export interface Recommendation {
  name: string;
  description: string;
  image: string;
  cost?: number;
}

class RecommendationService {
  private recommendations: Recommendation[] = [
    {
      name: "Central Park",
      description: "Most visited urban park in the United States",
      image: "IMG_0316.jpeg",
      cost: 100,
    },
    {
      name: "Bryant Park",
      description: "Relax, play, eat",
      image: "IMG_0037.jpeg",
      cost: 100,
    },
    {
      name: "Roof Top Bar",
      description: "Eat and enjoy the view",
      image: "IMG_0129.jpeg",
    },
    {
      name: "Vessel",
      description: "Landmark in New York",
      image: "IMG_9899.jpeg",
    },
    {
      name: "Pizza Place",
      description: "Best pizza in town",
      image: "IMG_0048.jpeg",
    },
    {
      name: "Grand Central",
      description: "Historic train station",
      image: "IMG_9957.jpeg",
    },
    {
      name: "Skyline View",
      description: "Beautiful cityscape",
      image: "IMG_9880.jpeg",
      cost: 100,
    },
  ];

  // Returning the static list of recommendations
  // Later on will be replaced with an actual request to an LLM
  async getRecommendations(): Promise<Recommendation[] | void> {
    try {
      const response = await new Promise<{ data: Recommendation[] }>(
        (resolve) => {
          setTimeout(() => {
            resolve({ data: this.recommendations });
          }, 1000);
        }
      );

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

export default new RecommendationService();
