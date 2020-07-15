import React, { useState, useEffect } from "react";
import List from "../components/List";
import { TextField, Container, makeStyles, Button } from '@material-ui/core/';
import axios from "axios";

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

    // TODO: delete this later after reused
    // const testMethod = () => {
    //     const newUser = {
    //         darkModeOn: true,
    //         userInfo: {
    //             name: "Ya Boi",
    //             email: "test@testing.com",
    //             password: "Pass1234"
    //         },
    //         characters: [
    //             {
    //                 id: "1111",
    //                 name: "Katla",
    //                 description: "Super Kewl",
    //                 fileUrl: "http://google.com"
    //             }
    //         ]
    //     }
    //     axios.post("/api/create", newUser).then(res => {
    //         console.log("success?", res.data);
    //     });
    // }

    return (
        <Container maxWidth="md">
            {/* <Button onClick={testMethod}>Testing</Button> */}
            <TextField onChange={handleChange} value={searchTerm} className={classes.searchBar} id="outlined-search" label="Search field" variant="outlined" />
            <List characters={characters} />
        </Container>
    );
}

export default Home;