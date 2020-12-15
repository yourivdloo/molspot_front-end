import React, {Component, useState} from "react";
import Button from "@material-ui/core/Button";
import {Input, Typography} from "@material-ui/core";
import * as classes from "react-dom/test-utils";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import * as axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        height: '91.1vh',
    },

    image: {
        backgroundImage: 'url(https://trends365.net/images/article/2020/10/24/57d30ba8-19aa-3c4f-8a8a-336fc4c31a11.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    paper: {
        marginTop: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.light,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        color: 'red',
    },
}));


export default function Register() {
    const [error, setError] = useState([]);

    const classes = useStyles();

    const localhost = "http://localhost:8080"

    function register() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var email = document.getElementById('email').value;
        var encodedCreds = window.btoa(username + ":" + password + ":" + email);

        axios.post(localhost + '/users/new?encodedCredentials=' + encodedCreds)
            .then(result => {
                if (result.ok) {
                    localStorage.setItem("credentials", window.btoa(username + ":" + password));
                }
            })
            .catch((e => {
                setError("* " + e.response.data.message);
            }))

    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div id="login" style={{display: 'block'}}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Register
                            </Typography>
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    autoComplete="username"
                                    name="username"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    autoFocus
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={register}
                                >
                                    Register
                                </Button>
                                <p className={classes.error}>{error} </p>

                            </form>
                        </div>
                    </Container>
                </div>
            </Grid>
        </Grid>
    );
}
