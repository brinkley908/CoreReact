import React, { useState, useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './infrastructure/history';
import { authenticationService } from './service/authenticationService';
import { PrivateRoute } from './components/PrivateRoute';
import { AppLogin } from "./AppLogin";
import { Layout } from './components/Layout';
import { GlobalContext } from './infrastructure/globalContext';
import { Home } from "./components/Home";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ContentContainer } from './components/ContentContainer';


function logout() {
    authenticationService.logout();
    history.push('/');
}


export const AppRouter = props => {


    const [globalSettings, setGlobalSettings] = useState({
        Authorized: false,
        BannerText: "Welcome"
    });

    useEffect(() => {
        checkAuth();
    }, []);


    const checkAuth = async () => {
        var result = await authenticationService.isAuthenticated();
        if (!result) {
            logout();
            setGlobalSettings({...globalSettings, Authorized: false, BannerText: "Login" });
        }
        else {
            setGlobalSettings({...globalSettings, Authorized: true});
        }

    }

    return (

        <Router history={history}>

            <GlobalContext.Provider value={[globalSettings, setGlobalSettings]}>
                <Container>

                    <Typography component="div" className="typography">

                        <Layout>
                            <ContentContainer >
                                <Route exact path="/" component={AppLogin} />
                                <PrivateRoute  path='/home' component={Home} />
                                <PrivateRoute  path='/counter' component={Counter} />
                                <PrivateRoute  path='/fetch-data' component={FetchData} />
                            </ContentContainer>
                        </Layout>
                    </Typography>
                </Container>
            </GlobalContext.Provider>

        </Router>

    );

}