import { securedAxiosInstance } from "../api";

export const getQuizById = async quizId => {    
    try {
      return await securedAxiosInstance.get(`quiz/getQuizById/${quizId}`);
    } catch (error) {      
      return error.response;
    }
  };