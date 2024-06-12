import React, {useEffect, useState} from "react";
import Style from "./PollQuestionComponent.module.css";
import { useSelector } from "react-redux";
export default function PollQuestionComponent({ item,qno }) {
    const { assessmentDetails} = useSelector(state => state.quiz);
    const[assessment,setAssessment]=useState([]);
    useEffect(()=>{
        const data=assessmentDetails?.assessmentData?.filter(value=>value?.questionId==item?._id);
        setAssessment(data);
    },[]);
    return (
        <>
            <div><h2>Q.{qno} {item?.question}</h2></div>
            <div className={Style.Wrapper1}>
                <div className={Style.Card}>
                    <div className={Style.Details}>
                        <h2>{assessment?.length>0&&assessment[0]?.option1?assessment[0]?.option1:0}</h2>
                        <p className={Style.Text}>Option1</p>
                    </div>
                </div>
                <div className={Style.Card}>
                    <div className={Style.Details}>
                        <h2>{assessment?.length>0&&assessment[0]?.option2?assessment[0]?.option2:0}</h2>
                        <p className={Style.Text}>Option2</p>
                    </div>
                </div>
                <div className={Style.Card}>
                    <div className={Style.Details}>
                        <h2>{assessment?.length>0&&assessment[0]?.option3?assessment[0]?.option3:0}</h2>
                        <p className={Style.Text}>Option3</p>
                    </div>
                </div>
                <div className={Style.Card}>
                    <div className={Style.Details}>
                        <h2>{assessment?.length>0&&assessment[0]?.option4?assessment[0]?.option4:0}</h2>
                        <p className={Style.Text} >Option4</p>
                    </div>
                </div>
            </div>            
        </>
    )
}