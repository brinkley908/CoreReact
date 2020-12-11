import React, { useState, useEffect, useContext } from 'react';
import { authenticationService } from './service/authenticationService';
import * as Models from "./components/models/LoginModel";
import { Input } from './components/controls/Input';
import Button from '@material-ui/core/Button';
import { GlobalContext } from './infrastructure/globalContext';
import Loader from 'react-loader-spinner'
import './custom.css'

export const AppLogin = props => {
    document.title = "Login";

    const [globalSettings, setGlobalSettings] = useContext(GlobalContext);

    const [state, setState] = useState({
        Email: "demouser",
        Password: "LetMeIn2020!!",
        ErrorMessage: null,
        Waiting: false
    });

    function validateForm() {
        return state.Email.length > 0 && state.Password.length > 6;
    }

    async function loginClick() {

        setState({ ...state, Waiting: true });

        let model = new Models.LoginModel(state.Email, state.Password);

        await authenticationService.login(model).then(
            user => {
                const { from } = props.location.state || { from: { pathname: "/home" } };
                props.history.push(from);
                setGlobalSettings({ ...globalSettings, Authorized: true });
            },
            error => {
                setState({...state, ErrorMessage: error.message, Waiting: false})
            }
        );

    }

    useEffect(() => {
        if (authenticationService.currentUserValue) {
            props.history.push('/home');
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
                defaultValue={state.Email}
                variant="filled"
                placeholder="Username"
                type="text"
                onChange={(e) => setState({ ...state, Email: e.target.value })}
                error={ state.ErrorMessage !== null }
            />

            <br />
            <br />

            <Input
                label="Password"
                id="outlined-error-helper-text"
                defaultValue={state.Password}
                //  variant="outlined"
                placeholder="Password"
                type="password"
                onChange={(e) => setState({ ...state, Password: e.target.value })}
                error={state.ErrorMessage !== null}
            />

            <div className="error">
                {state.ErrorMessage}
            </div>

            {!state.Waiting &&
                <Button variant="contained" color="primary"
                    disabled={!validateForm()}
                    onClick={loginClick}
                >Sign In</Button>
            }

            {state.Waiting &&
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={20000} //3 secs

                />
            }

        </div>



    );
}

