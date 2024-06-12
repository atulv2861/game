import { securedAxiosInstance } from "../api";

export const getTrendingQuiz = async () => {    
    try {
      return await securedAxiosInstance.get(`quiz/getTrendingQuizzes`);
    } catch (error) {      
      return error.response;
    }
  };