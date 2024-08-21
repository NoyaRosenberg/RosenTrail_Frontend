export interface Recommendation {
  name: string;
  description: string;
  image: string;
  categoriesId: number[];
  location?: string;
  categories?: string[];
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
      name: "View Buildings"
    },
    {
      id: 7,
      name: "Fancy Restaurants"
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

  getCategories(): Category[] {
    return this.categories;
  }
}

export default new RecommendationService();