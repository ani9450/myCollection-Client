import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import InputField from './Input';
import Icon from './icon';
import useStyles from './styles';
import {signin, signup } from '../../actions/auth';

const initialState = {'firstName' : '', 'lastName' : '', 'email' : '', 'password' : '', 'confirmPassword' : ''}

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory();

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData);

        if(isSignUp){
            dispatch(signup(formData,history))
        }
        else{
            dispatch(signin(formData,history))
        }

    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const switchMode = () => {
        setSignUp((prevSignUp) => !prevSignUp);
        handleShowPassword();
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: "AUTH", data: { result, token } });
            history.push('/')
        } catch (error) {
            console.log(res);
        }

    }
    const googleFailure = (e) => {
        console.log("Google Sign In Unsuccessful !! Try again later..", e)
    }


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {
                            isSignUp && (
                                <>
                                    <InputField name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <InputField name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <InputField name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <InputField name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignUp && <InputField name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}

                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" onSubmit={handleSubmit} className={classes.submit} >
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    {/* <GoogleLogin
                        clientId="1076445876287-vbm8cm4befm7foha75sr77m3rciepf4e.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained">
                                Google SignIn
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_policy"
                    /> */}

                    <Grid container justify="center">
                        <Grid item >
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
