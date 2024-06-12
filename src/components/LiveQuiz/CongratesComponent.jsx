import React, { useEffect, useState } from "react";
import congrates from "../../assets/congrates.svg";
import Style from "./CongratesComponent.module.css";
import { useSelector } from "react-redux";
export default function CongratesComponent(score) {
    const [congratesPopupPosition, setCongratesPopupPosition] = useState(); 
    const { quizById } = useSelector(state => state.quiz);

    useEffect(() => {
        if (window.innerWidth <= 460) {
            let left = (window.innerWidth - 300) / 2;
            let top = (window.innerHeight - 300) / 2;
            setCongratesPopupPosition({ left: left, top: top });
        } else {
            let left = (window.innerWidth - 400) / 2;
            let top = (window.innerHeight - 400) / 2;
            setCongratesPopupPosition({ left: left, top: top });
        }
    }, [window.innerWidth]);

    return (
        <div className={Style.Wrapper}
            style={{ left: `${congratesPopupPosition?.left}px`, top: `${congratesPopupPosition?.top}px` }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                {quizById?.quiz?.quizType === "Q&A" && <>
                    <div className={Style.Heading}>
                        Congrates Quiz is Completed!
                    </div>
                    <div>
                        <img className={Style.Img} src={congrates} alt="" />
                    </div>
                    <div>Your Score is <span style={{color:"#60B84B"}}>0{score?.score}/0{quizById?.quiz?.quizQuestions?.length}</span></div>
                </>} 
                {quizById?.quiz?.quizType==='Poll_Type'&&<div className={Style.Heading1} style={{paddingLeft:"50px", paddingRight:"50px"}}>
                    Thank you
                        for participating in the Poll!
                </div>}
            </div>
        </div>
    )
}