import React, { useState } from 'react';
import {
    createStyles,
    fade,
    Theme,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const InputField = withStyles({
    //root: {



    //    '& input:valid + fieldset': {
    //        borderColor: '#fff',
    //        borderWidth: 2,
    //    },

    //    '& input:hover + fieldset': {
    //        borderColor: '#fff',
    //        borderWidth: 2,
    //    },

    //    '& input:invalid + fieldset': {
    //        borderColor: 'red',
    //        borderWidth: 2,
    //    },
    //    '& input:valid:focus + fieldset': {
    //        borderLeftWidth: 6,
    //        padding: '4px !important', // override inline-style
    //    },

    //    '& .MuiInput-underline:after': {
    //        borderBottomColor: '#fff',
    //    },
    //    '& .MuiOutlinedInput-root': {
    //        '& fieldset': {
    //            borderColor: '#fff',
    //        },
    //        '&:hover fieldset': {
    //            borderColor: '#fff',
    //        },
    //        '&.Mui-focused fieldset': {
    //            borderColor: '#fff',
    //        },
    //    },
    //},
})(TextField);


export const Input = (props) => {
    //const classes = useStyles();

    const [values, setValues] = useState({
        showPassword: false
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <InputField

            {...props}


            //endAdornment={
            //    <InputAdornment position="end">
            //        <IconButton
            //            aria-label="toggle password visibility"
            //            onClick={handleClickShowPassword}
            //            onMouseDown={handleMouseDownPassword}
            //            edge="end"
            //        >
                  
            //            {props.type == "password" ? <Visibility /> : <VisibilityOff />}
            //        </IconButton>
            //    </InputAdornment>
            //}


            //className={classes.root}
            //label={props.label}
            //required={props.required}
            //error={ props.error }
            //variant="outlined"
            //defaultValue={props.defaultValue}
            //value={props.value}
            //id={props.id}
            //type={props.type}
            //placeholder={props.placeholder}

            //InputLabelProps={{
            //    classes: {
            //        root: classes.label,
            //        focused: classes.focusedLabel,
            //        error: classes.erroredLabel
            //    },
            //}}

            //InputProps={{
            //    className: classes.input,


            //}}

        />
    )

};

