import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/UserSlice";
import quizSlice from "./Slice/QuizSlice";
export const store = configureStore({
    reducer: {        
        user:userSlice,
        quiz:quizSlice
    }
});