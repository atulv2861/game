import React,{useEffect,useState} from "react";
import SidebarComponent from "../Sidebar/SidebarComponent";
import DashboardComponent from "../Dashboard/DashboardComponent";
import AnalyticsComponent from "../Analytics/AnalyticsComponent";
import CreateQuizComponent from "../CreateQuiz/CreateQuizComponent";
import QuestionsAnalysisComponent from "../Analytics/QuestionAnalysis/QuestionsAnalysisComponent";
import Style from "./DashboardPanelComponent.module.css";
import QuizPopupComponent from "../QuizPopup/QuizPopupComponent";
import ConfirmQuizComponent from "../ConfirmQuizPopup/ConfirmQuizPopupComponent";
import { Routes, Route,useNavigate } from "react-router-dom";
export default function DashboardPanelComponent() {
    const[isQuizPopupOpen,setIsQuizPopupOpen]=useState(false);
    const [ quizPopupPosition, setQuizPopupPosition]=useState();
    const [ iscreateQuizPopupOpen, setIsCreateQuizPopupOpen]=useState(false);
    const [isConfirmQuizPopupOpen,setIsConfirmQuizPopupOpen]=useState(false);
    const [quizzieType,setQuizzieType]=useState("Q&A");
    const [quizId,setQuizId]=useState(null);
    const [quizName,setQuizName]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        let left = (window.innerWidth - 450) / 2;
        let top = (window.innerHeight - 350) / 2;
        setQuizPopupPosition({ left: left, top: top });
    },[isQuizPopupOpen,iscreateQuizPopupOpen,window.innerWidth])

    useEffect(()=>{
        
    },[isConfirmQuizPopupOpen])

    useEffect(()=>{       
            navigate("/dashboard-panel/dashboard");
    },[]);

    return (
    <>
        {isQuizPopupOpen&&<QuizPopupComponent 
    quizPopupPosition={quizPopupPosition} 
    setIsQuizPopupOpen={setIsQuizPopupOpen}
    setIsCreateQuizPopupOpen={setIsCreateQuizPopupOpen}
    setQuizzieType={setQuizzieType}
    quizzieType={quizzieType}
    setQuizName={setQuizName}
    quizName={quizName}/>}
   {iscreateQuizPopupOpen&&<CreateQuizComponent
   setIsCreateQuizPopupOpen={setIsCreateQuizPopupOpen}
   setIsConfirmQuizPopupOpen={setIsConfirmQuizPopupOpen}
   quizzieType={quizzieType}
   quizName={quizName}
   setQuizId={setQuizId}
   setQuizName={setQuizName}/>}
   {isConfirmQuizPopupOpen&&<ConfirmQuizComponent
   setIsConfirmQuizPopupOpen={setIsConfirmQuizPopupOpen}
   quizId={quizId}/>}
    <div style={{opacity:isQuizPopupOpen||iscreateQuizPopupOpen||isConfirmQuizPopupOpen?'0.4':'1'}}
    className={(isQuizPopupOpen||iscreateQuizPopupOpen||isConfirmQuizPopupOpen)&&Style.BackOpacity}
    >

        <div className={Style.Wrapper}
        >
            <SidebarComponent setIsQuizPopupOpen={setIsQuizPopupOpen}/>
        </div>
        <div>
            <Routes>
                <Route path="dashboard" element={<DashboardComponent />} />
                <Route path="analytics" element={<AnalyticsComponent />} />                
                <Route path="question-wise-analysis/:quizId" element={<QuestionsAnalysisComponent/>}/>                
            </Routes>
        </div>
    </div>
    </>
    )
}