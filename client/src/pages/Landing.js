import React, { useState } from "react";
import { makeStyles, Box, Grid, Paper, Avatar, Typography } from '@material-ui/core';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Copyright from "../components/Copyright";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh"
    },
    image: {
        backgroundImage: 'url(https://s3.amazonaws.com/files.d20.io/images/88678395/3x2hzJidAn9egM4u5wED5A/max.jpg?1565327959)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    formCol: {
        transition: "background-color 0.5s ease"
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    }
}));


function Landing() {
    const classes = useStyles();
    const [signin, setSignin] = useState(true);

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} className={classes.formCol} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    {signin ? <Signin setSignin={setSignin} /> : <Signup setSignin={setSignin} />}
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
};

export default Landing;