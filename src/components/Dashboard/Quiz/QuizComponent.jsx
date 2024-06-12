import React, { useEffect, useState } from "react";
import Style from "./QuizComponent.module.css";
import eyes from "../../../assets/eyes.svg";
export default function QuizComponent({item }) {
    const [createdDate,setCreatedDate]=useState();
    useEffect(() => {        
        const date = new Date(item?.createdOn);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
        setCreatedDate(formattedDate);
    }, []);
    return (
        <div className={Style.Wrapper} key={item?._id}>
            <div className={Style.Heading}>
                <div><h3>{item?.quizName}</h3></div>
                <div style={{ display: "flex", color: "#FF5D01", flexDirection: "row", justifyContent: "center", alignItems: "center" }}><span>{item?.impression}</span><img src={eyes} alt="" /></div>
            </div>
            <div style={{ color: "#60B84B" }}>
                Created on : {createdDate}
            </div>
        </div>
    )
}