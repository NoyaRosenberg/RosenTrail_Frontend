import axios from "axios";

export interface Recommendation {
  name: string;
  description: string;
  image: string;
  categoriesId: number[];
  location?: string;
  category?: string;
  cost?: number;
}

export interface Category {
  id: number;
  name: string;
}

class RecommendationService {
  private categories: Category[] = [
    {
      id: 1,
      name: "Junk Food"
    },
    {
      id: 2,
      name: "Kid Friendly"
    },
    {
      id: 3,
      name: "Amusement Parks"
    },
    {
      id: 4,
      name: "Outdoor Walks"
    },
    {
      id: 5,
      name: "Museums & Theatres"
    },
    {
      id: 6,
      name:  "Fancy Restaurants"
    },
    {
      id: 7,
      name: "View Buildings"
    },
    {
      id: 8,
      name: "Art & Cultural"
    },
    {
      id: 9,
      name: "Parks"
    },
    {
      id: 10,
      name: "Restaurants"
    }
  ];

  private recommendations: Recommendation[] = [
    {
      name: "Central Park",
      description: "Most visited urban park in the United States",
      image: "IMG_0316.jpeg",
      categoriesId: [2, 4, 9],
      cost: 100,
    },
    {
      name: "Bryant Park",
      description: "Relax, play, eat",
      image: "IMG_0037.jpeg",
      categoriesId: [2, 4, 9],
      cost: 100,
    },
    {
      name: "Roof Top Bar",
      description: "Eat and enjoy the view",
      image: "IMG_0129.jpeg",
      categoriesId: [7, 10],
    },
    {
      name: "Vessel",
      description: "Landmark in New York",
      image: "IMG_9899.jpeg",
      categoriesId: [2, 7, 8],
    },
    {
      name: "Pizza Place",
      description: "Best pizza in town",
      image: "IMG_0048.jpeg",
      categoriesId: [1, 2, 10],
    },
    {
      name: "Grand Central",
      description: "Historic train station",
      image: "IMG_9957.jpeg",
      categoriesId: [8],
    },
    {
      name: "Skyline View",
      description: "Beautiful cityscape",
      image: "IMG_9880.jpeg",
      cost: 100,
      categoriesId: [2, 4, 7],
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

  // Simulating categories request
  async getCategories(): Promise<Category[] | void> {
    try {
      const response = await new Promise<{ data: Category[] }>(
        (resolve) => {
          setTimeout(() => {
            resolve({ data: this.categories });
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
