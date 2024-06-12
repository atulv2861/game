import { securedAxiosInstance } from "../api";

export const getQuizByUserId = async userId => {    
    try {
      return await securedAxiosInstance.get(`quiz/getQuizByUserId/${userId}`);
    } catch (error) {      
      return error.response;
    }
  };