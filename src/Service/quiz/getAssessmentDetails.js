import { securedAxiosInstance } from "../api";

export const getAssessmentDetails = async (data) => {    
    try {
      return await securedAxiosInstance.post(`quiz/getAssessmentDetails`,data);
    } catch (error) {      
      return error.response;
    }
  };