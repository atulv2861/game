import { securedAxiosInstance } from "../api";

export const createQuiz = async data => {    
    try {
      return await securedAxiosInstance.post(`quiz/createQuiz`, data);
    } catch (error) {      
      return error.response;
    }
  };