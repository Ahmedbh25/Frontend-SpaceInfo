import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { ShoppingReducer } from './Reducers';
const ShoppingContext = createContext();

export const SHOP_ACTIONS = {
    ADD_TO_CARD: "add product to the basket",
    DELETE_FROM_CARD: "buy product added",
}

const initialADDState = {
    Count: 0,
    totalPrice: 0,
    allProducts: [

    ]
};

function ShoppingContextProvider({ children }) {
    const storedState = JSON.parse(localStorage.getItem("Shopping_card")) || initialADDState;
    const [shopsState, DispatchShop] = useReducer(ShoppingReducer, storedState);

    useEffect(() => {
        localStorage.setItem("Shopping_card", JSON.stringify(shopsState));
    }, [shopsState, typeof window]);

    const deleteProduct = (Product, navigate) => {
        DispatchShop({ type: SHOP_ACTIONS.DELETE_FROM_CARD, payload: Product.data })
        navigate("/cards");
    }

    return (
        <ShoppingContext.Provider value={{ shopsState, DispatchShop, deleteProduct }}>
            {children}
        </ShoppingContext.Provider>
    )
}

export default ShoppingContextProvider

export const ShoppingState = () => {
    return useContext(ShoppingContext);
}
