import axios from "axios";

export interface Review {
  _id: string;
  tripId: string;
  userName: string;
  date: Date;
  comment: string;
  rating: number;
}

class ReviewService {
  private baseURL: string = "http://localhost:3000/reviews/";

  async getTripReviews(tripId: string): Promise<Review[]> {
    try {
      const response = await axios.get<Review[]>(`${this.baseURL}?tripId=${tripId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
      return []
    }
  }


  async addReview(review: Review): Promise<Review | void> {
    try {
      const response = await axios.post<Review>(this.baseURL, review);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateReview(review: Review): Promise<Review | void> {
    try {
      const response = await axios.put<Review>(`${this.baseURL}${review._id}`, review);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteReview(reviewId: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}${reviewId}`);
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

export default new ReviewService();