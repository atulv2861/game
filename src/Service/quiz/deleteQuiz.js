import { securedAxiosInstance } from "../api";

export const deleteQuiz = async quizId => {    
    try {
      return await securedAxiosInstance.delete(`quiz/deleteQuizById/${quizId}`);
    } catch (error) {      
      return error.response;
    }
  };