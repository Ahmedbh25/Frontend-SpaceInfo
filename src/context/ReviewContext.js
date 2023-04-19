import React, { createContext, useContext, useReducer} from 'react'
import axios from 'axios';
import { ReviewReducer } from './Reducers';
export const ReviewContext = createContext();

export const REVIEW_ACTIONS = {
    PRODUCT: "product",
    RATING: "rating",
    REVIEW: "review",
    INIT: "init_values",
}

/*
    ADD_REVIEW :{
        
        loading: false,
    }
*/

const initialState = {
    product: "",
    rating: 0,
    review: "",
}

function ReviewContextProvider({ children }) {
    const [revState, DispatchReview] = useReducer(ReviewReducer, initialState);
    return (
        <ReviewContext.Provider value={{ revState, DispatchReview }}>
            {children}
        </ReviewContext.Provider>
    )
}

export default ReviewContextProvider;

export const ReviewState = () => {
    return useContext(ReviewContext);
}