import React, { createContext, useContext, useReducer } from 'react'
import { ApplyRegisterReducer, RegisterFieldReducer } from './Reducers';
const RegisterContext = createContext();

export const INPUT_ACTION = {
    username : "username",
    email : "email",
    password : "password",
    first_name : "first_name",
    last_name : "last_name",
    address : "address",
    city : "city",
    state : "state",
    country : "country",
    phone : "phone"
}

const initialFieldState = {
    username :"",
    email : "",
    password: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
}
/*
export const REGISTER_ACTIONS = {
    START : "stating register",
    SUCCESS : "success register",
    FAIL : "fail register"
}
*/



export default function RegisterContextProvider({ children }) {
    const [FieldState, DispatchField] = useReducer(RegisterFieldReducer, initialFieldState);
    //const [RegState, DispatchRegister] = useReducer(ApplyRegisterReducer, initialAuthState);
    
    /*
    useEffect(() => {
        console.log("kkkkkkkkkkkkkkkkkk")
        localStorage.setItem("CurrentUser", JSON.stringify(authState.user));
    }, [authState.user]);*/

    return (
        <RegisterContext.Provider value={{FieldState, DispatchField}}>
            {children}
        </RegisterContext.Provider>
    )
}

export const RegisterState = () => {
    return useContext(RegisterContext);
}