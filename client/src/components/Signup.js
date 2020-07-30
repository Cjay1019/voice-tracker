import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { makeStyles, Link, Grid, Button, Checkbox, TextField, FormControlLabel } from '@material-ui/core';
import axios from "axios";

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        cursor: "pointer"
    }
}));

function Signup({ setSignin }) {
    const classes = useStyles();
    const history = useHistory();

    const [user, setUser] = useContext(UserContext);
    const [info, setInfo] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "", remember: false });
    const [firstNameError, setFirstNameError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmError, setConfirmError] = useState(null);

    useEffect(() => {
        if (user.auth) history.push("/");
    }, [user.auth]);


    const handleChange = e => setInfo({ ...info, [e.target.name]: e.target.checked ? e.target.checked : e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        if (info.firstName && info.lastName && info.email && info.password && info.confirm && info.password === info.confirm) {
            const newUser = { name: `${info.firstName} ${info.lastName}`, email: info.email, password: info.password };
            newUser.darkModeOn = user.darkModeOn !== null ? user.darkModeOn : false;
            axios.post("/api/signup", newUser).then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    handleSignup();
                } else {
                    console.error(res.data.message);
                    handleErrors(res.data.error);
                };
            }).catch(err => console.error(err));
        } else handleErrors(9999);
    };

    const handleSignup = () => {
        axios.post("/api/signin", info).then(res => {
            if (res.data.success) {
                handleSignin(res.data.user);
            } else {
                console.error(res.data.message);
                handleErrors(res.data.error);
            };
        }).catch(err => console.error(err));
    };

    // TODO: maybe consolidate this duplicate
    const handleSignin = userData => {
        const filter = { _id: userData._id };
        const update = { staySignedIn: info.remember };
        if (user.darkModeOn !== null) update = { ...update, darkModeOn: user.darkModeOn };
        axios.post("/api/updateUser", { filter, update }).catch(err => console.error(err));

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
        // TODO: maybe tidy this up
        info.firstName ? setFirstNameError(null) : setFirstNameError("Enter an first name");
        info.lastName ? setLastNameError(null) : setLastNameError("Enter an last name");
        info.email ? setEmailError(null) : setEmailError("Enter an email");
        if (!info.password) {
            setPasswordError("Enter a password");
            setConfirmError(null);
        } else if (!info.confirm) {
            setPasswordError(null);
            setConfirmError("Please confirm your password");
        } else if (info.password !== info.confirm) {
            setPasswordError(null);
            setConfirmError("Passwords do not match");
        } else {
            setPasswordError(null);
            setConfirmError(null);
        };

        switch (error) {
            case 1003:
                setEmailError("Enter a valid email address");
                break;
            case 1004:
                setPasswordError("Password must have 1 lowercase letter");
                break;
            case 1005:
                setPasswordError("Password must have 1 number");
                break;
            case 1006:
                setPasswordError("Password must be at least 8 characters");
                break;
            case 1007:
                setEmailError("This email address is already registered");
                break;
            case 9999:
                break;
            default:
                return console.error("Unknown error code");
        };
    };

    return (
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={firstNameError ? true : false}
                        helperText={firstNameError ? firstNameError : ""}
                        autoFocus
                        autoComplete="fname"
                        name="firstName"
                        value={info.firstName}
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={lastNameError ? true : false}
                        helperText={lastNameError ? lastNameError : ""}
                        autoComplete="lname"
                        name="lastName"
                        value={info.lastName}
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={emailError ? true : false}
                        helperText={emailError ? emailError : ""}
                        autoComplete="email"
                        name="email"
                        value={info.email}
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={passwordError ? true : false}
                        helperText={passwordError ? passwordError : ""}
                        name="password"
                        value={info.password}
                        variant="outlined"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={confirmError ? true : false}
                        helperText={confirmError ? confirmError : ""}
                        name="confirm"
                        value={info.confirm}
                        variant="outlined"
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        id="confirm"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox name="remember" color="primary" onChange={handleChange} />}
                        label="Keep me signed in"
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign Up
          </Button>
            <Grid container justify="flex-end">
                <Grid item>
                    <Link variant="body2" onClick={() => setSignin(true)} className={classes.link}>
                        Already have an account? Sign in
              </Link>
                </Grid>
            </Grid>
        </form>
    )
};

export default Signup;