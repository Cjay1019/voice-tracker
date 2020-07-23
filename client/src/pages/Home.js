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

function Home() {
    const [searchTerm, setSearch] = useState("");
    const [auth, setAuth] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState(characters);
    const [user] = useContext(UserContext);

    const history = useHistory();
    const classes = useStyles();

    const tokenIsValid = async () => {
        const results = await axios.get(`/test?secret_token=${user.token || ""}`);
        if (results.data.success) {
            console.log(results.data.message);

            const characterList = await axios.post("/api/getCharacters", { userId: user.userId });

            setCharacters(characterList.data);
            setAuth(true);
        } else {
            console.error(results.data.message)
            history.push("/signin");
        };
    }

    const handleChange = e => setSearch(e.target.value);

    useEffect(() => tokenIsValid(), []);

    useEffect(() => {
        setFilteredCharacters(characters.filter(character => character.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm]);

    return (
        <Container maxWidth="md">
            {auth ?
                <>
                    <TextField onChange={handleChange} value={searchTerm} className={classes.searchBar} id="outlined-search" label="Search field" variant="outlined" />
                    <List characters={filteredCharacters.length > 0 ? filteredCharacters : characters} />
                </>
                :
                <CircularProgress className={classes.spinner} />}
        </Container>
    );
};

export default Home;