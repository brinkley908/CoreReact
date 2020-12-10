import React, { useState, useEffect, useContext } from 'react';
import { authenticationService } from './service/authenticationService';
import * as Models from "./components/models/LoginModel";
import { Input } from './components/controls/Input';
import Button from '@material-ui/core/Button';
import { AuthContext } from './service/authContext';
import './custom.css'

export const AppLogin = props => {
    document.title = "Login";

    const [email, setEmail] = useState("demouser");
    const [password, setPassword] = useState("LetMeIn2020!!");
    const [auth, setAuth] = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 6;
    }

    async function loginClick() {

        let model = new Models.LoginModel(email, password);
        let err = "";

        await authenticationService.login(model).then(
            user => {
                const { from } = props.location.state || { from: { pathname: "/" } };
                props.history.push(from);
                setAuth(true);
            },
            error => {
                setErrorMessage(error.message);
            }
        );

    }

    useEffect(() => {
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }

    });

    return (


        <div className="login-form  ">
            <br />
            <h2>Sign into your company</h2>
            <br />
            <br />
            <br />

            <Input
                label="Username"
                id="username"
                defaultValue={email}
                variant="filled"
                placeholder="Username"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                error={ errorMessage != "" }
            />

            <br />
            <br />

            <Input
                label="password"
                id="outlined-error-helper-text"
                defaultValue={password}
                //  variant="outlined"
                placeholder="Username"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                error={errorMessage != ""}
            />

            <div className="error">
                { errorMessage }
            </div>

            <Button variant="contained" color="primary"
                disabled={!validateForm()}
                onClick={loginClick}
            >Sign In</Button>

        </div>



    );
}

