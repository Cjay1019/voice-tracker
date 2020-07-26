import React, { useState, useEffect, useContext } from "react";
import List from "../components/List";
import { TextField, Container, makeStyles, CircularProgress, Fab, Tooltip, Zoom } from '@material-ui/core/';
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    searchBar: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing()
    },
    spinner: {
        width: "80px !important",
        height: "80px !important",
        position: "absolute",
        top: "50%",
        left: "50%"
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

function Home() {
    const [searchTerm, setSearch] = useState("");
    // const [auth, setAuth] = useState(false);
    const [characters, setCharacters] = useState(null);
    const [filteredCharacters, setFilteredCharacters] = useState(characters);
    const [user, setUser] = useContext(UserContext);

    const history = useHistory();
    const classes = useStyles();

    // const tokenIsValid = async () => {
    //     const results = await axios.get(`/verifyToken`);
    //     if (results.data.success) {
    //         console.log(results.data.message);
    //         // setUser({
    //         //     ...user,
    //         //     name: results.data.user.name,
    //         //     email: results.data.user.email,
    //         //     userId: results.data.user._id,
    //         //     darkModeOn: user.darkModeOn !== null ? user.darkModeOn : results.data.user.darkModeOn
    //         // });
    //         setAuth(true);
    //     } else {
    //         console.error(results.data.message)
    //         history.push("/signin");
    //     };
    // };

    const getCharacters = () => {
        axios.post("/api/getCharacters", { userId: user.userId }).then(res => {
            console.log(res)
            setCharacters(res.data);
        }).catch(err => console.error(err));
    };

    const handleChange = e => setSearch(e.target.value);

    // useEffect(() => tokenIsValid(), []);

    useEffect(() => {
        if (characters) setFilteredCharacters(characters.filter(character => (
            character.name.toLowerCase().includes(searchTerm.toLowerCase()))));
    }, [searchTerm]);

    useEffect(() => getCharacters(), []);

    return (
        <Container maxWidth="md">
            {characters ?
                <>
                    <TextField onChange={handleChange} value={searchTerm} className={classes.searchBar} id="outlined-search" label="Search by name" variant="outlined" />
                    <List characters={searchTerm ? filteredCharacters : characters} getCharacters={getCharacters} />
                    <Tooltip TransitionComponent={Zoom} title="Add character" placement="left">
                        <Fab color="primary" aria-label="add" className={classes.fab} ><AddIcon /></Fab>
                    </Tooltip>
                </>
                :
                <CircularProgress className={classes.spinner} />}
        </Container>
    );
};

export default Home;