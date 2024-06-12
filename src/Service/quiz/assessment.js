import { securedAxiosInstance } from "../api";

export const quizAssessment = async data => {    
    try {
      return await securedAxiosInstance.post(`quiz/assessment`, data);
    } catch (error) {      
      return error.response;
    }
  };