import React,{useEffect, useState} from "react";
import Style from "./SidebarComponent.module.css";
import useUser from "../Hook/useUser";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeStorage } from "../../Service/StorageService";
export default function SidebarComponent({ setIsQuizPopupOpen }) {
    const[selected,setSelected]=useState('Dashboard');
    const { handleLogoutUser } = useUser();
    const { userData } = useSelector((state) => state.user);
    const navigate=useNavigate();
    const handleQuizPopup = () => {
        setIsQuizPopupOpen(true);
    }

    const handleLogout=async()=>{
        await handleLogoutUser();
        
    }

    useEffect(() => {
        const initial = () => {
            if (userData?.isLogout) {                 
                removeStorage("accessToken");
                removeStorage("user");
                navigate("/");
            }
        }       
            initial();
    }, [userData]);

    const handleClick=(e)=>{        
        setSelected(e.currentTarget.textContent)
    }
    return (
        <div className={Style.Sidebar}>
            <div>
                <h1>QUIZZIE</h1>
            </div>
            <div className={Style.Container} >
                <div className={selected==='Dashboard'?Style.Highlited:Style.CliklableLink} onClick={e=>handleClick(e)}><Link className={Style.Link} to="/dashboard-panel/dashboard">Dashboard</Link></div>
                <div className={selected==='Analytics'?Style.Highlited:Style.CliklableLink} onClick={e=>handleClick(e)}><Link className={Style.Link} to="/dashboard-panel/analytics">Analytics</Link></div>
                <div className={selected==='Create Quiz'?Style.Highlited:Style.CliklableLink} style={{cursor:"pointer"}} onClick={e=>{handleClick(e); handleQuizPopup()}}>Create Quiz</div>
            </div>

            <div>
                <hr style={{ width: "80%", marginRight: "50px", marginBottom: "-20px", size: "8", color: "black" }} />
                <h3 onClick={e=>handleLogout()} style={{cursor:"pointer"}}>LOGOUT</h3></div>
        </div>
    );
}