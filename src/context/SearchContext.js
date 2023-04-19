import React, { useReducer, createContext, useContext } from 'react'
import { ProfileReducer } from './Reducers';
const SearchContext = createContext();

export const Search_ACTIONS = {
    START: "start",
    SUCCESS: "success",
    ECHEC: "error",
    INIT: "",
}

const initialState = {
    data: [],
    loading: false,
    error: null
}

function SearchContextProvider({ children }) {
    const [searState, searchDispatch] = useReducer(ProfileReducer, initialState);
    return (
        <SearchContext.Provider value={{ searState, searchDispatch }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider;

export const SearchState = () => {
    return useContext(SearchContext);
}
