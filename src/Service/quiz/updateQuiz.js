import { securedAxiosInstance } from "../api";

export const updateQuiz = async (quizId,data) => {    
    try {
      return await securedAxiosInstance.post(`quiz/updateQuiz/${quizId}`,data);
    } catch (error) {      
      return error.response;
    }
  };