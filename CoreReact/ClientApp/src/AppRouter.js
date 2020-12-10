import React, { useState, useEffect } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { history } from './service/history';
import { authenticationService } from './service/authenticationService';
import { PrivateRoute } from './components/PrivateRoute';
import { AppLogin } from "./AppLogin";
import { Layout } from './components/Layout';
import { AuthContext } from './service/authContext';
import { Home } from "./components/Home";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ContentContainer } from './components/ContentContainer';


function logout() {
    authenticationService.logout();
    history.push('/login');
}


export const AppRouter = props => {

    const [BannerText, setBannerText] = useState("Welcome");

    const [auth, setAuth] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);


    const checkAuth = async () => {
        var result = await authenticationService.isAuthenticated();
        if (!result) {
            logout();
            setBannerText("Login");
            setAuth(false);
        }
        else {
            setAuth(true);
        }

    }

    return (

        <Router history={history}>

            <AuthContext.Provider value={[BannerText, setBannerText], [auth, setAuth]}>
                <Container>
                    <Typography component="div" className="typography">
                        <Layout>
                            <ContentContainer >
                                <Route path="/login" component={AppLogin} />

                                <PrivateRoute exact path='/' component={Home} />
                                <PrivateRoute path='/counter' component={Counter} />
                                <PrivateRoute path='/fetch-data' component={FetchData} />
                            </ContentContainer>
                        </Layout>
                    </Typography>
                </Container>
            </AuthContext.Provider>

        </Router>

    );

}