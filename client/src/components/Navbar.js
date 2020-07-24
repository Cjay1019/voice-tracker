import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { AppBar, Toolbar, Typography, Button, Tooltip, Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Navbar() {
    const classes = useStyles();
    const [user, setUser] = useContext(UserContext);

    const toggleDarkMode = () => {
        if (user.userId) {
            const filter = { _id: user.userId };
            const update = { darkModeOn: !user.darkModeOn };
            axios.post("/api/updateUser", { filter, update }).catch(err => console.error(err));
        };
        setUser({ ...user, darkModeOn: !user.darkModeOn });
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>Voice Tracker</Typography>
                <Tooltip TransitionComponent={Zoom} title="Toggle light/dark mode" enterDelay={500}>
                    <Button onClick={toggleDarkMode} color="inherit">
                        {user.darkModeOn ? <Brightness7Icon /> : <Brightness4Icon />}
                    </Button>
                </Tooltip>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;