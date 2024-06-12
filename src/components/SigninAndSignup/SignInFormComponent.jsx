import React,{useState, useEffect,useRef} from "react";
import Style from "./SignInFormComponent.module.css";
import { useSelector } from "react-redux";
import useUser from "../Hook/useUser";
import { setStorage } from "../../Service/StorageService";
import { toast } from "react-toastify";
export default function SignInFormComponent({setIsLoggedIn}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fieldErrors, setFieldErrors] = useState();
    const { userData } = useSelector((state) => state.user);
    const {handleLoginUser}=useUser();
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleSignIn=async()=>{
        const res = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const fieldErrors = {};
        if (!email.trim() || !res.test(email)) {
            fieldErrors.email = true;
        }
        if (!password.trim()) {
            fieldErrors.password = true;
        }
        if (Object.keys(fieldErrors).length > 0) {
            setFieldErrors(fieldErrors);
            return;
        }
        const data={email,password};
        const result=await handleLoginUser(data); 
        if(result?.status===200){
            setIsLoggedIn(true);
            return;
        }       
        if(result.status===404){
            toast.error(result?.data?.message)  
            return; 
        } 
        toast.error("Something went wrong!");        
    }

    useEffect(() => {
        const initial = () => {
            if (userData?.user?.isLoggedIn) {                
                setStorage("accessToken", JSON.stringify(userData.accessToken));
                setStorage("user", JSON.stringify(userData.user));                
            }
        }
        if (userData)
            initial();
    }, [userData]);
    
    return(
        <div className={Style.FormWrapper}>        
        <div className={Style.FieldWrapper}>
            <div className={Style.Label}>Email</div>
            <div>
                <input 
            className={`${Style.InputBox} ${fieldErrors?.email && Style.ErrorMsg}`}
            value={email}
            type="text"
            placeholder="Email"
            onChange={e=>setEmail(e.target.value)}
            ref={inputRef}
            />
            </div>
        </div>
        <div className={Style.FieldWrapper}>
            <div className={Style.Label}>Password</div>
            <div><input 
            className={`${Style.InputBox} ${fieldErrors?.password && Style.ErrorMsg}`} 
            style={{marginRight:"35px"}}
            value={password}
            type="password"
            placeholder="Password"
            onChange={e=>setPassword(e.target.value)}
            /></div>
        </div>        
        <div>
            <button className={Style.Button} onClick={handleSignIn}>Sign In</button>
        </div>
        </div>
    )
}