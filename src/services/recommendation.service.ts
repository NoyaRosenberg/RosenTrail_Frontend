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
      name: "Fancy Restaurants"
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