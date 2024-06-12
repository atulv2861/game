import { useDispatch } from "react-redux";
import {startGetAllQuizLoading,
    getAllQuizSuccess,
    getAllQuizError,
    startCreateQuizLoading,
    createQuizSuccess,
    createQuizError,
    startGetQuizByUserIdLoading,
    getQuizByUserIdSuccess,
    getQuizByUserIdError,
    startQuizByIdLoading,
    quizByIdSuccess,
    quizByIdError,
     startTrendingQuizLoading,
    trendingQuizSuccess,
    trendingQuizError,
    startDeleteQuizLoading,
    deleteQuizSuccess,
    deleteQuizError,
    getQuizDetailsError,
    startGetQuizDetailsLoading,
    getQuizDetailsSuccess,
    assessmentDetailsError,
    startAssessmentDetailsLoading,
    assessmentDetailsSuccess} from "../../Store/Slice/QuizSlice";
import { createQuiz } from "../../Service/quiz/createQuiz";
import { deleteQuiz } from "../../Service/quiz/deleteQuiz";
import { getAllQuiz } from "../../Service/quiz/getAllQuiz";
import { getQuizById } from "../../Service/quiz/getQuizById";
import { getQuizByUserId } from "../../Service/quiz/getQuizByUserId";
import { getTrendingQuiz } from "../../Service/quiz/getTrendingQuiz";
import { getQuizDetails } from "../../Service/quiz/getQuizDetails";
import { getAssessmentDetails } from "../../Service/quiz/getAssessmentDetails";

    const useQuiz = () => {
        const dispatch = useDispatch();
        
        const handleGetAllQuiz = async () => {
            try {
                dispatch(startGetAllQuizLoading());                
                const res = await getAllQuiz();                           
                dispatch(getAllQuizSuccess(res.data));                                            
            } catch (error) {              
                dispatch(getAllQuizError(error));                
            }
        };
    
        const handleDeleteQuiz = async (quizId) => {
             try {
               dispatch(startDeleteQuizLoading());
               const res = await deleteQuiz(quizId);              
               dispatch(deleteQuizSuccess(res.data));                                   
             } catch (error) {            
               dispatch(deleteQuizError(error));
             }
          };

          const handleCreateQuiz = async (data) => {
            try {
              dispatch(startCreateQuizLoading());
              const res = await createQuiz(data);
              dispatch(createQuizSuccess(res.data));                                  
            } catch (error) {
              dispatch(createQuizError(error));
            }
          };

          const handleGetQuizById=async (quizId)=>{
            try{
                dispatch(startQuizByIdLoading());
                const res=await getQuizById(quizId);
                dispatch(quizByIdSuccess(res.data));
            }catch(error){
                dispatch(quizByIdError(error))
            }
          }

          const handleGetQuizByUserId=async(userId)=>{
            try{
                dispatch(startGetQuizByUserIdLoading());
                const res=await getQuizByUserId(userId);
                dispatch(getQuizByUserIdSuccess(res.data));
            }catch(error){
                dispatch(getQuizByUserIdError(error));
            }
          }

          const handleGetTrendingQuiz=async()=>{
            try {
                dispatch(startTrendingQuizLoading());                
                const res = await getTrendingQuiz();                           
                dispatch(trendingQuizSuccess(res.data));                                            
            } catch (error) {              
                dispatch(trendingQuizError(error));                
            }
          }

          const handleGetQuizDetails=async()=>{
            try{
              dispatch(startGetQuizDetailsLoading());
              const res=await getQuizDetails();
              dispatch(getQuizDetailsSuccess(res.data));
            }catch(error){
              dispatch(getQuizDetailsError(error))
            }
          }

          const handleGetAssessmentDetails=async(data)=>{
            try{
              dispatch(startAssessmentDetailsLoading());
              const res=await getAssessmentDetails(data);
              dispatch(assessmentDetailsSuccess(res.data));
            }catch(error){
              dispatch(assessmentDetailsError(error))
            }
          }
        return{
            handleGetAllQuiz,
            handleDeleteQuiz,
            handleCreateQuiz,
            handleGetQuizById,
            handleGetQuizByUserId,
            handleGetTrendingQuiz,
            handleGetQuizDetails,
            handleGetAssessmentDetails
        };
    }
    export default useQuiz;