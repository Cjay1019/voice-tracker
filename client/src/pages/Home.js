import React, { useState, useEffect, useContext } from "react";
import List from "../components/List";
import { TextField, Container, makeStyles, CircularProgress } from '@material-ui/core/';
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const useStyles = makeStyles((theme) => {
    return ({
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
        }
    })
});

const listData = [
    {
        name: "Itzel Goldberger",
        description: "Lives in Dracan"
    },
    {
        name: "Roe Vask",
        description: "Wandering Half-Orc"
    },
    {
        name: "Senechal O'Brien",
        description: "Badass dude"
    }
];


function Home() {
    const [searchTerm, setSearch] = useState("");
    const [auth, setAuth] = useState(false);
    const [characters, setCharacters] = useState(listData);
    const [user] = useContext(UserContext);

    const history = useHistory();
    const classes = useStyles();

    const tokenIsValid = async () => {
        const results = await axios.get(`/test?secret_token=${user.token || ""}`);
        if (results.data.success) {
            console.log(results.data.message);
            setAuth(true);
        } else {
            console.error(results.data.message)
            history.push("/signin");
        };
    }

    const handleChange = e => setSearch(e.target.value);

    useEffect(() => {
        tokenIsValid();
    }, []);

    useEffect(() => {
        setCharacters(listData.filter(character => character.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm]);

    return (
        <Container maxWidth="md">
            {auth ?
                <>
                    <TextField onChange={handleChange} value={searchTerm} className={classes.searchBar} id="outlined-search" label="Search field" variant="outlined" />
                    <List characters={characters} />
                </>
                :
                <CircularProgress className={classes.spinner} />}
        </Container>
    );
}

export default Home;