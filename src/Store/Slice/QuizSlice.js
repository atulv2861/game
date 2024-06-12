import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allQuiz: null,
    isGetAllQuizLoading: false,
    getAllQuizError:null,

    assessmentDetails:null,
    isGetAssessmentDetailsLoading:false,
    getAssessmentDetailsError:null,

    isGetQuizDetailsLoading:false,                     
    quizDetails:null,
    getQuizDetailsError:null,

    isCreateQuizLoading: false,
    createdQuiz:null,
    createQuizError: null,

    quizByUserId:null,
    isGetQuizByUserIdLoading:false,
    getQuizByUserIdError:null,

    quizById:null,
    isQuizByIdLoading:false,
    quizByIdError:null,

    trendingQuiz:null,
    isTrendingQuizLoading:false,
    trendingError:null,

    isDeleteQuizLoading:false,
    deletedQuiz:null,
    deleteQuizError:null

};

const quizSlice = createSlice({
    name: "quizSlice",
    initialState,
    reducers: {
        // Get All Quiz
        startGetAllQuizLoading: (state) => {
            state.isGetAllQuizLoading = true;
            state.getAllQuizError = null;
        },
        getAllQuizSuccess: (state, { payload }) => {
            state.isGetAllQuizLoading = false;                     
            state.allQuiz = payload;
            state.getAllQuizError=null;
        },
        getAllQuizError: (state, { payload }) => {
            state.isGetAllQuizLoading = false;
            state.getAllQuizError = payload;
        },

        // Get Quiz Details
        startGetQuizDetailsLoading: (state) => {
            state.isGetQuizDetailsLoading = true;
            state.getQuizDetailsError = null;
        },
        getQuizDetailsSuccess: (state, { payload }) => {
            state.isGetQuizDetailsLoading = false;                     
            state.quizDetails = payload;
            state.getQuizDetailsError=null;
        },
        getQuizDetailsError: (state, { payload }) => {
            state.isGetQuizDetailsLoading = false;
            state.getQuizDetailsError = payload;
        },

        // Create Quiz
        startCreateQuizLoading: (state) => {
            state.isCreateQuizLoading = true;
            state.createQuizError = null;
        },
        createQuizSuccess: (state,{payload}) => {
            state.isCreateQuizLoading = false;
            state.createdQuiz=payload;
            
        },
        createQuizError: (state, { payload }) => {
            state.isCreateQuizLoading = false;
            state.createQuizError = payload;
        },
      

        // Get Quiz By Userid
        startGetQuizByUserIdLoading: (state) => {
            state.isGetQuizByUserIdLoading = true;
            state.getQuizByUserIdError = null;
        },
        getQuizByUserIdSuccess: (state, { payload }) => {
            state.isGetQuizByUserIdLoading = false;            
            state.quizByUserId = payload;
        },
        getQuizByUserIdError: (state, { payload }) => {
            state.isGetQuizByUserIdLoading = false;
            state.getQuizByUserIdError = payload;
        },       

       //Get quiz by quizId
        startQuizByIdLoading: (state) => {
            state.isQuizByIdLoading = true;
            state.quizByIdError = null;
        },
        quizByIdSuccess: (state,{payload}) => {
            state.isQuizByIdLoading = false;
            state.quizById=payload
            state.quizByIdError=null;
            
        },
        quizByIdError: (state, { payload }) => {
            state.isQuizByIdLoading = true;
            state.quizByIdError = payload;
        },

         //Get trending quiz
         startTrendingQuizLoading: (state) => {
            state.isTrendingQuizLoading = true;
            state.trendingError = null;
        },
        trendingQuizSuccess: (state,{payload}) => {
            state.isTrendingQuizLoading = false;
            state.trendingQuiz=payload;
            state.trendingError=payload;
            
        },
        trendingQuizError: (state, { payload }) => {
            state.isTrendingQuizLoading = true;
            state.trendingError = payload;
        },
        
        // delete quiz
        startDeleteQuizLoading:(state)=>{
            state.isDeleteQuizLoading = true;
            state.deleteQuizError = null;
        },
        deleteQuizSuccess:(state,{payload})=>{
            state.isDeleteQuizLoading = true;
            state.deletedQuiz=payload;
            state.deleteQuizError = null;
        },
        deleteQuizError:(state,{payload})=>{
            state.isDeleteQuizLoading = true;
            state.deleteQuizError = payload;
        },

        //Get assessment details
        startAssessmentDetailsLoading:(state)=>{
            state.isGetAssessmentDetailsLoading=true;
            state.getAssessmentDetailsError=null;
        },
        assessmentDetailsSuccess:(state,{payload})=>{
            state.isGetAssessmentDetailsLoading=false;
            state.assessmentDetails=payload;
            state.getAssessmentDetailsError=null;
        },
        assessmentDetailsError:(state,{payload})=>{
            state.isGetAssessmentDetailsLoading=false;
            state.getAssessmentDetailsError=payload;
        }
    }
});

export default quizSlice.reducer;

export const {
    startAssessmentDetailsLoading,
    assessmentDetailsSuccess,
    assessmentDetailsError,
    startGetAllQuizLoading,
    getAllQuizSuccess,
    getAllQuizError,
    startGetQuizDetailsLoading,
    getQuizDetailsSuccess,
    getQuizDetailsError,
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
    deleteQuizError}=quizSlice.actions;