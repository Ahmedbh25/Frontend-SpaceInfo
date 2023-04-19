import React, { useReducer, createContext, useContext } from 'react'
import { FilterNavReducer, FilterReducer, } from './Reducers';
import useFetch from '../hooks/useFetch';

const FilterSideContext = createContext();

export const ACTIONS = {
  INIT : "SET_COMPUTERS",
  ALL : "ALL",
  PRICE_ASC : "price ascending",
  PRICE_DESC : "price descending",
  IN_STOCK : "in stock",
  DELETE_FILTER : "deleting filter",
  TOGGLE_CATEGORY : "TOGGLE_CATEGORY",
  TOGGLE_TYPE : "TOGGLE_TYPE",
  DELETE_FILTER : "deleting filter",
}

export const initialState = {
  products : [],
  productsSidenav : [],
  productsSelectopt : [],
  toggle: {
    laptop: false,
    desktop: false,
    phone: false,
    other : false,
    asus: false,
    lenovo: true,
    macos: false,
    dell: false,
  },

};


export default function FilterSidebarContext({ children }) {
  const [stateFilter, dispatchFilter] = useReducer(FilterReducer, initialState);
  
  const {loading, error} = useFetch("/products", dispatchFilter, stateFilter);

  const products = stateFilter.products;

  function handleCategoryToggle(category) {
    dispatchFilter({ type: ACTIONS.TOGGLE_CATEGORY, payload: category });
  }

  function handleTypeToggle(type) {
    dispatchFilter({ type: ACTIONS.TOGGLE_TYPE, payload: type });
  }

  return (
    <FilterSideContext.Provider value={{ stateFilter,products, loading, error, handleCategoryToggle, handleTypeToggle, dispatchFilter }}>
      {children}
    </FilterSideContext.Provider>
  )
}

export const FilterSidebarState = () => {
  return useContext(FilterSideContext);
}