import React, { useEffect, useState } from "react";
import Style from "./ConfirmDeletePopupComponent.module.css";
import cross from "../../assets/cross.svg"
import { toast } from "react-toastify";
import useQuiz from "../Hook/useQuiz";
import { useSelector } from "react-redux";
import getStorage from "../../Service/StorageService";
export default function ConfirmDeletePopupComponent({ setIsConfirmDeletePopupOpen, quizId }) {
    const [confirmQuizPopupPosition, setConfirmQuizPopupPosition] = useState();
    const { handleGetQuizByUserId, handleDeleteQuiz } = useQuiz();
    const {deletedQuiz}=useSelector(state=>state.quiz);


    const handleCancel = () => {
        setIsConfirmDeletePopupOpen(false);
    }

    useEffect(()=>{
        const initial=async()=>{
            if(deletedQuiz?.success){
                
                const user = JSON.parse(getStorage("user"));
                if (user) {
                    await handleGetQuizByUserId(user?._id);
                }                
            }
        }
        initial();
    },[deletedQuiz]);

    const handleDelete = async () => {
        await handleDeleteQuiz(quizId);  
        setIsConfirmDeletePopupOpen(false); 
        toast.success('Quiz deleted successfully!');     
    }

    useEffect(() => {
        let left = (window.innerWidth - 450) / 2;
        let top = (window.innerHeight - 200) / 2;
        setConfirmQuizPopupPosition({ left: left, top: top });
    }, [window.innerWidth])
    return (
        <div className={Style.Wrapper}
            style={{ left: `${confirmQuizPopupPosition?.left}px`, top: `${confirmQuizPopupPosition?.top}px` }}>

            <div className={Style.DeleteConfirmation}>
                <div className={Style.Message}>
                    <h2 style={{textAlign:"center"}}>Are you confirm you want to delete?</h2>
                </div>
                <div className={Style.CancelnDeleteBtn}>
                    <button className={Style.Button} style={{ background: "#FF4B4B", color: "white" }} onClick={handleDelete}>Confirm Delete</button>
                    <button className={Style.Button} onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}