import React, { useState, useEffect } from "react";
import List from "../components/List";
import { TextField, Container, makeStyles } from '@material-ui/core/';

const useStyles = makeStyles((theme) => {
    return ({
        searchBar: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing()
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
    const [characters, setCharacters] = useState(listData);

    const classes = useStyles();

    const handleChange = e => setSearch(e.target.value);

    useEffect(() => {
        setCharacters(listData.filter(character => character.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm]);


    return (
        <Container maxWidth="md">
            <TextField onChange={handleChange} value={searchTerm} className={classes.searchBar} id="outlined-search" label="Search field" variant="outlined" />
            <List characters={characters} />
        </Container>
    );
}

export default Home;