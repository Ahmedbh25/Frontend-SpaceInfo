import React, { useReducer, createContext, useContext } from 'react'
import { ProfileReducer } from './Reducers';
const ProfileContext = createContext();

export const PRO_ACTIONS = {
    START : "start",
    SUCCESS : "success",
    ECHEC : "error",
}

const initialState ={
    data : [],
    loading: false,
    error : null
}

function ProfileContextProvider({ children }) {
    const [proState, proDispatch] = useReducer(ProfileReducer, initialState);
    return (
        <ProfileContext.Provider value={{proState, data : proState.data, loading: proState.loading, error :proState.error , proDispatch}}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContextProvider;

export const  ProfileState = ()=>{
    return useContext(ProfileContext);
}