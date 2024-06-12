import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    isUserRegistrationLoading: false,
    isUserLoginLoading: false,
    isUserLogoutLoading: false,
    userRegistrationError: null,
    userLoginError: null,
    userLogoutError: null,
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        //User Registrtion      
        userRegistrationLoading: (state) => {
            state.isUserRegistrationLoading = true;
            state.userRegistrationError = null;
        },
        userRegistrationSuccess: (state, { payload }) => {
            state.isUserRegistrationLoading = false;            
            state.userData = payload;
            state.userRegistrationError = null;
        },
        userRegistrationError: (state, { payload }) => {
            state.isUserRegistrationLoading = false;
            state.userRegistrationError = payload;
        },
        // User Login
        userLoginLoading: (state) => {
            state.isUserLoginLoading = true;
            state.userLoginError = null;
        },
        userLoginSuccess: (state, { payload }) => {
            state.isUserLoginLoading = false;
            state.userData = payload;
            state.userLoginError = null;
        },
        userLoginError: (state, { payload }) => {
            state.isUserLoginLoading = false;
            state.userLoginError = payload;
        },

        // User Logout
        userLogoutLoading: (state) => {
            state.isUserLogoutLoading = true;
            state.userLogoutError = null;
        },
        userLogoutSuccess: (state,{ payload }) => {
            state.isUserLogoutLoading = false;
            state.userData = payload;
            state.userLogoutError = null;
        },
        userLogoutError: (state, { payload }) => {
            state.isUserLogoutLoading = false;
            state.userLogoutError = payload;
        },
    }
});

export default userSlice.reducer;

export const {
    userRegistrationLoading,
    userRegistrationSuccess,
    userRegistrationError,
    userLoginSuccess,
    userLoginLoading,
    userLoginError,
    userLogoutLoading,
    userLogoutSuccess,
    userLogoutError } = userSlice.actions;