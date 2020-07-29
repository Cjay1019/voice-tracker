import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { makeStyles, Link, Grid, Button, Checkbox, TextField, FormControlLabel } from '@material-ui/core';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
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

function Signin({ setSignin }) {
    const classes = useStyles();
    const history = useHistory();

    const [user, setUser] = useContext(UserContext);
    const [info, setInfo] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "", remember: false });

    useEffect(() => {
        if (user.auth) history.push("/");
    }, [user.auth]);


    const handleChange = e => setInfo({ ...info, [e.target.name]: e.target.checked ? e.target.checked : e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        const newUser = { name: `${info.firstName} ${info.lastName}`, email: info.email, password: info.password };
        newUser.darkModeOn = user.darkModeOn !== null ? user.darkModeOn : false;
        axios.post("/api/signup", newUser).then(res => {
            if (res.data.success) {
                console.log(res.data)
                // handleSignup(res.data.user);
            } else {
                console.error(res.data.message);
                // handleErrors(res.data.error);
            };
        }).catch(err => console.error(err));
    };

    const handleSignup = userData => {
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

    return (
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
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

export default Signin;