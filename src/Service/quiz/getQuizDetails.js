import { securedAxiosInstance } from "../api";

export const getQuizDetails = async () => {    
    try {
      return await securedAxiosInstance.get(`quiz/getQuizDetails`);
    } catch (error) {      
      return error.response;
    }
  };