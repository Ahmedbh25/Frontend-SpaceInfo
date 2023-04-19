import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import FilterSidebarContext from './context/FilterSidebarContext';
import AuthContextProvider from './context/AuthContext';
import RegisterContextProvider from './context/RegisterContext';
import ReviewContextProvider from './context/ReviewContext';
import ProfileContextProvider from './context/ProfileContext';
import SearchContextProvider from './context/SearchContext';
import ShoppingContextProvider from './context/ShoppingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RegisterContextProvider>
      <AuthContextProvider>
        <FilterSidebarContext>
          <ReviewContextProvider>
            <ProfileContextProvider>
              <SearchContextProvider>
                <ShoppingContextProvider>
                  <App />
                </ShoppingContextProvider>
              </SearchContextProvider>
            </ProfileContextProvider>
          </ReviewContextProvider>
        </FilterSidebarContext>
      </AuthContextProvider>
    </RegisterContextProvider>
  </React.StrictMode>
);
