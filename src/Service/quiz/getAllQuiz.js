import { securedAxiosInstance } from "../api";

export const getAllQuiz = async () => {    
    try {
      return await securedAxiosInstance.get(`quiz/getAllQuiz`);
    } catch (error) {      
      return error.response;
    }
  };