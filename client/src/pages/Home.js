import React, { useState, useEffect, useContext } from "react";
import List from "../components/List";
import CharacterForm from "../components/CharacterForm";
import { TextField, Container, makeStyles, CircularProgress, Fab, Tooltip, Zoom } from '@material-ui/core/';
import AddIcon from "@material-ui/icons/Add";
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
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

function Home() {
    const [searchTerm, setSearch] = useState("");
    const [characters, setCharacters] = useState(null);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [formIsOpen, setFormOpen] = useState(false);
    const [user] = useContext(UserContext);

    const classes = useStyles();

    const getCharacters = () => {
        axios.post("/api/getCharacters", { userId: user.userId }).then(res => {
            setCharacters(res.data);
        }).catch(err => console.error(err));
    };

    const handleChange = e => setSearch(e.target.value);

    const openForm = () => setFormOpen(true);

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
                    <List characters={searchTerm ? filteredCharacters : characters} getCharacters={getCharacters} formIsOpen={formIsOpen} setFormOpen={setFormOpen} />
                    <Tooltip TransitionComponent={Zoom} title="Add character" placement="left">
                        <Fab color="primary" aria-label="add" className={classes.fab} onClick={openForm}><AddIcon /></Fab>
                    </Tooltip>
                    <CharacterForm formIsOpen={formIsOpen} setFormOpen={setFormOpen} getCharacters={getCharacters} />
                </>
                :
                <CircularProgress className={classes.spinner} />}
        </Container>
    );
};

export default Home;