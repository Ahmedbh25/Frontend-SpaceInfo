import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { AuthenticateReducer } from './Reducers';
const AuthContext = createContext();

export const AUTH_ACTIONS = {
    START: "LOGIN_START",
    SUCCESS: "LOGIN_SUCCESS",
    ECHEC: "LOGIN_FAILURE",
    LOGOUT: "LOGOUT",
}

const initialAuthState = {
    user: JSON.parse(localStorage.getItem("CurrentUser")) || null,
    loading: false,
    error: null,
}



export default function AuthContextProvider({ children }) {
    const [authState, authDispatch] = useReducer(AuthenticateReducer, initialAuthState);
    
    useEffect(() => {
        console.log("kkkkkkkkkkkkkkkkkk")
        localStorage.setItem("CurrentUser", JSON.stringify(authState.user));
    }, [authState.user]);

    return (
        <AuthContext.Provider value={{ user: authState.user, loading: authState.loading, error: authState.error, authDispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthState = () => {
    return useContext(AuthContext);
}
