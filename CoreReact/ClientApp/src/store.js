import React, { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext();

const initialState = {

    Authenticated: false,

    CurrentUser: null,

    Loading: {
        Status: false,
        Message: "Loading..."
    },

    UseStickyHeader: false,
    BannerText: "Welcome"
};

const reducer = (state, action) => {
    switch (action.type) {

        case "authenticationflag":
            return {
                ...state,
                Authenticated: action.value
            }

        case "currentuser":
            return {
                ...state,
                CurrentUser: {
                    Username: action.value
                }
            }
        

        case "loading":
            return {
                ...state,
                Loading: {
                    Status: action.value,
                    Message: action.message
                }
            }

        case "usestickyheader":
            return {
                ...state,
                UseStickyHeader: action.value
            }

        case "bannertext":
            return {
                ...state,
                BannerText: action.value
            }
    }
}

export function Authenticated(status) {
    return { type: "authenticationflag", value: status };
}

export function UseStickyHeader(status) {
    return { type: "usestickyheader", value: status };
}

export function BannerText(status) {
    return { type: "bannertext", value: status };
}

export function CurrentUser(username) {
    return { type: "currentuser", value: username };
}

export const StoreProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => useContext(StoreContext);