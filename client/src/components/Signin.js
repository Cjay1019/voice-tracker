import React, { useState, useContext, useEffect } from "react";
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

    const [info, setInfo] = useState({ email: "", password: "", remember: false });
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        if (user.auth) history.push("/");
    }, [user.auth]);

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("/api/signin", info).then(res => {
            if (res.data.success) {
                handleSignin(res.data.user);
            } else {
                console.error(res.data.message);
                handleErrors(res.data.error);
            };
        }).catch(err => console.error(err));
    };

    const handleSignin = userData => {
        const filter = { _id: userData._id };
        const update = { staySignedIn: info.remember };
        if (user.darkModeOn !== null) update = { ...update, darkModeOn: user.darkModeOn };
        axios.post("/api/updateUser", { filter, update }).catch(err => console.error(err));

        // TODO: handle name here, don't need spread
        setUser({
            ...user,
            name: userData.name,
            userId: userData._id,
            email: userData.email,
            auth: true,
            darkModeOn: user.darkModeOn !== null ? user.darkModeOn : userData.darkModeOn
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

    const handleChange = e => setInfo({ ...info, [e.target.name]: e.target.checked ? e.target.checked : e.target.value });

    return (
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
                error={emailError ? true : false}
                helperText={emailError ? emailError : ""}
                autoFocus
                autoComplete="email"
                name="email"
                value={info.email}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                onChange={handleChange}
            />
            <TextField
                error={passwordError ? true : false}
                helperText={passwordError ? passwordError : ""}
                autoComplete="current-password"
                name="password"
                value={info.password}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
            />
            <FormControlLabel
                control={<Checkbox name="remember" color="primary" onChange={handleChange} />}
                label="Keep me signed in"
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