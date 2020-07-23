import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { makeStyles, Link, Grid, Button, Checkbox, TextField, FormControlLabel } from '@material-ui/core';
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        cursor: "pointer"
    }
}));

function Signin({ setSignin }) {
    const classes = useStyles();
    const history = useHistory();

    const [info, setInfo] = useState({ email: "", password: "" });
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [user, setUser] = useContext(UserContext);

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("/api/signin", info).then(res => {
            if (res.data.success) {
                setUser({
                    ...user,
                    email: res.data.email,
                    userId: res.data._id,
                    token: res.data.token,
                    darkModeOn: res.data.darkModeOn
                });
                history.push("/");
            } else {
                console.error(res.data.message);
                handleErrors(res.data.error);
            };
        });
    };

    const handleErrors = error => {
        info.email ? setEmailError(null) : setEmailError("Enter an email");
        info.password ? setPasswordError(null) : setPasswordError("Enter a password");

        switch (error) {
            case 1000:
                setEmailError("Email address not found");
                break;
            case 1001:
                setPasswordError("Incorrect password");
                break;
            case 1002:
                // TODO: do something with this invalid creds error
                break;
            default:
                return console.error("Unknown error code");
        };
    };

    const handleChange = e => setInfo({ ...info, [e.target.name]: e.target.value });

    return (
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
                error={emailError ? true : false}
                helperText={emailError ? emailError : ""}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={info.email}
                autoComplete="email"
                autoFocus
                onChange={handleChange}
            />
            <TextField
                error={passwordError ? true : false}
                helperText={passwordError ? passwordError : ""}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                value={info.password}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                Sign In
                        </Button>
            <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                                </Link>
                </Grid>
                <Grid item>
                    <Link variant="body2" onClick={() => setSignin(false)} className={classes.link}>
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </form>
    );
};

export default Signin;