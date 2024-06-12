import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./SignInComponent.module.css";
import SignUpFormComponent from "./SignUpFormComponent";
import SignInFormComponent from "./SignInFormComponent";
import getStorage from "../../Service/StorageService";
import { useSelector } from "react-redux";
export default function SignInComponent(){
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [isRegistered,setIsRegistered]=useState(false);
    const {userData}=useSelector(state=>state.user);
    const navigate=useNavigate();

    useEffect(() => {
        const initial = () => {
            const user=JSON.parse(getStorage("user"));
            if (user?.isLoggedIn) {                
                navigate("/dashboard-panel");
            }
        }        
            initial();
    }, [userData]);


    const handleSignUp=()=>{
        setIsRegistered(false);          
    }

    return(
        <div className={Style.Wrapper}>
            <div className={Style.Heading}>
                <h1>Quizzie</h1>
            </div>
            <div className={Style.Btn}>
            <div><button className={`${Style.Button} ${!isRegistered&& Style.BoxShadow}` } onClick={e=>handleSignUp()}>Sign Up</button></div>
                <div><button className={`${Style.Button} ${isRegistered&& Style.BoxShadow}` } onClick={e=>{setIsRegistered(true)}}>Sign In</button></div>            
            </div>
            <div className={Style.Form}>
            {isRegistered?<SignInFormComponent setIsLoggedIn={setIsLoggedIn}/>:<SignUpFormComponent isRegistered={isRegistered} setIsRegistered={setIsRegistered}/>}
            </div>       
        </div>
    )
}