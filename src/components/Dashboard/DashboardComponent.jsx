import React, { useEffect} from "react";
import Style from "./DashboardComponent.module.css";
import QuizComponent from "./Quiz/QuizComponent";
import { useSelector } from "react-redux";
import useQuiz from "../Hook/useQuiz";
export default function DashboardComponent() {
    const { trendingQuiz, quizDetails } = useSelector(state => state.quiz);    
    const { handleGetTrendingQuiz, handleGetQuizDetails } = useQuiz();   

    useEffect(() => {
        const initial = async () => {
            await handleGetQuizDetails();
            await handleGetTrendingQuiz();            
        }
        initial();
    }, []);

    const impression= ()=> {
        const num=quizDetails?.quizDetails?.length>0&&quizDetails?.quizDetails[0]?quizDetails?.quizDetails[0]?.totalImpressions:0;
        if (num < 1000) {
          return num.toString();
        } else {
          return (num / 1000).toFixed(2) + 'K';
        }
      }

    return (
        <div className={Style.Wrapper}>
            <div className={Style.Wrapper1}>
                <div className={Style.Card} style={{ color: "#FF5D01" }}>
                    <div className={Style.Details}>
                        <h1>{quizDetails?.quizDetails?.length>0&&quizDetails?.quizDetails[0]?quizDetails?.quizDetails[0]?.totalQuizzes:0}</h1>
                        <h3>Quiz</h3>
                    </div>
                    <div><h3>Created</h3></div>
                </div>
                <div className={Style.Card} style={{ color: "#60B84B" }}>
                    <div className={Style.Details}>
                        <h1>{quizDetails?.quizDetails?.length>0&&quizDetails?.quizDetails[0]?quizDetails?.quizDetails[0]?.totalQuestions:0}</h1>
                        <h3>Questions</h3>
                    </div>
                    <div><h3>Created</h3></div>
                </div>
                <div className={Style.Card} style={{ color: "#5076FF" }}>
                    <div className={Style.Details}>
                        <h1>{impression()}</h1>
                        <h3>Total</h3>
                    </div>
                    <div><h3>Impressions</h3></div>
                </div>
            </div>
            <div className={Style.Quiz}>
                <h2>Trending Quizs</h2>
                <div className={Style.QuizContainer}>
                    {trendingQuiz?.quizzes?.length>0&&trendingQuiz?.quizzes?.map((item,indx) => <QuizComponent item={item} key={indx}/>)}
                </div>
            </div>
        </div>
    )
}