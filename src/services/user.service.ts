import axios from "axios";

export interface User {
  _id: string;
  username: string;
  email: string;
  imageData: string;
  gender: string;
  age: number;
  phoneNumber: number;
}

class UserService {
    private baseURL: string = "http://localhost:3000/users/";
  
    async getByEmail(email: string): Promise<User | undefined> {
      try {
        const response = await axios.get<User | undefined>(
          `${this.baseURL}/email/${email}`
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
  
  export default new UserService();