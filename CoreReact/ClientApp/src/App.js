import React, { Component } from 'react';
import { StoreProvider } from "./store";
import { AppRouter } from "./AppRouter";


const App = () => {

    return (
        <StoreProvider>
            <AppRouter />
        </StoreProvider>
    )

}

export default App;
