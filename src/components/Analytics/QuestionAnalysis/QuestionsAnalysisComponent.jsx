import React, { useEffect, useState } from "react";
import Style from "./QuestionsAnalysisComponent.module.css";
import QuestionComponent from "../Questions/QuestionComponent";
import PollQuestionComponent from "../Questions/PollQuestionComponent";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useQuiz from "../../Hook/useQuiz";
export default function QuestionsAnalysisComponent() {
    const [quiz, setQuiz] = useState([]);  
    const [createdOn, setCreatedDate] = useState();
    const[assessment,setAssessment]=useState([]);
    const { quizId } = useParams();
    const { quizByUserId, assessmentDetails} = useSelector(state => state.quiz);
    const {handleGetAssessmentDetails}=useQuiz();
  
    useEffect(() => {
        const initial=async()=>{
        const quizDetails = quizByUserId?.quizzes?.filter(item => item?._id === quizId);
        setQuiz(quizDetails);        
        const data={quizType:quizDetails?.length>0&&quizDetails[0]?.quizType,quizId:quizId};     
        await handleGetAssessmentDetails(data);
        const date = new Date(quizDetails?.length>0&&quizDetails[0]?.createdOn);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
        setCreatedDate(formattedDate);      
        }
        initial();
    }, []);

    useEffect(()=>{
        if(assessmentDetails?.success===true){
            setAssessment(assessmentDetails?.assessmentData);
        }
    },[assessmentDetails]);
  
    return (
        <div className={Style.Wrapper}>
            <div className={Style.Heading}>
                <div style={{ color: "#5076FF" }}><h1>{quiz && quiz[0]?.quizName} Question Analysis</h1></div>
                <div style={{ color: "#FF5D01" }}><p style={{ marginBottom: "-10px" }}>
                    Created On : {createdOn}
                </p>
                    <p>Impressions : {quiz && quiz[0]?.impression}</p>
                </div>
            </div>
            <div>
                {quiz && quiz[0]?.quizType === 'Q&A' && quiz[0].quizQuestions?.map((item,indx) => (
                    <>                    
                        <QuestionComponent item={item} qno={indx+1}/>
                        {quiz[0].quizQuestions?.length!==(indx+1)&&<hr style={{ width: "100%", marginBottom: "40px", size: "16", color: "black" }} />}
                        
                    </>
                ))}
            </div>

            <div>
                {quiz && quiz[0]?.quizType === 'Poll_Type' && quiz[0].quizQuestions.map((item,indx) => (<>
                    <PollQuestionComponent item={item} qno={indx+1} />
                    {quiz[0]?.quizQuestions?.length!==(indx+1)&&<hr style={{width:"100%",  marginBottom:"40px", size:"16", color:"black"}}/>}
                    </>
                ))}
            </div>
        </div>
    )
}