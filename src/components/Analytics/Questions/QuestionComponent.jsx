import React, { useEffect,useState } from "react";
import Style from "./QuestionComponent.module.css";
import { useSelector } from "react-redux";
export default function QuestionComponent({item,qno}){
    const { assessmentDetails} = useSelector(state => state.quiz);
    const[assessment,setAssessment]=useState([]);
    useEffect(()=>{
        const data=assessmentDetails?.assessmentData?.filter(value=>value?.questionId==item?._id);
        setAssessment(data);
    },[assessmentDetails]);

    return(
        <>
        <div><h2>Q.{qno} {item?.question}</h2></div>
        <div className={Style.Wrapper1}>
                <div className={Style.Card}>
                    <div className={Style.Details}>
                        <h2>{assessment?.length>0&&assessment[0]?.attemptedPeople?assessment[0]?.attemptedPeople:0}</h2>
                        <p className={Style.Text}>People Attempted the question</p>
                    </div>                    
                </div>
                <div className={Style.Card}>
                    <div className={Style.Details}>
                        <h1>{assessment?.length>0&&assessment[0]?.correctAnswered?assessment[0]?.correctAnswered:0}</h1>
                        <p className={Style.Text}>People Answered Correctly</p>
                    </div>                    
                </div>
                <div className={Style.Card}>
                    <div className={Style.Details}>
                        <h1>{assessment?.length>0&&assessment[0]?.incorrectAnswered?assessment[0]?.incorrectAnswered:0}</h1>
                        <p className={Style.Text}>People Answered Incorrectly</p>
                    </div>                    
                </div>                
            </div>            
        </>
    )
}