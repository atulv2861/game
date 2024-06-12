import { useDispatch } from "react-redux";
import {userRegistrationLoading,
    userRegistrationSuccess,
    userRegistrationError,
    userLoginSuccess,
    userLoginLoading,
    userLoginError,
    userLogoutLoading,
    userLogoutSuccess,
    userLogoutError} from "../../Store/Slice/UserSlice";
    import handleGetAllQuiz from "../Hook/useQuiz"
    import {registerUser} from "../../Service/user/registerUser";
    import { loginUser } from "../../Service/user/loginUser";
    import { logoutUser } from "../../Service/user/logoutUser";

    const useUser = () => {
        const dispatch = useDispatch();
        
        const handleRegisterUser = async (data) => {
            try {
                dispatch(userRegistrationLoading());                
                const res = await registerUser(data);                           
                dispatch(userRegistrationSuccess(res.data)); 
                return res;                                           
            } catch (error) {              
                dispatch(userRegistrationError(error));                
            }
        };
    
        const handleLoginUser = async (data) => {
            try {
              dispatch(userLoginLoading());
              const res = await loginUser(data);              
              dispatch(userLoginSuccess(res.data)); 
              return res;                                 
            } catch (error) {            
              dispatch(userLoginError(error));
            }
          };

          const handleLogoutUser = async () => {
            try {
              dispatch(userLogoutLoading());
              const res = await logoutUser();
              dispatch(userLogoutSuccess(res.data));                     
            } catch (error) {
              dispatch(userLogoutError(error));
            }
          };
        return{
            handleRegisterUser,
            handleLoginUser,
            handleLogoutUser
        };
    }
    export default useUser;