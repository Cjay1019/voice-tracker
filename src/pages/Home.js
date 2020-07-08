import React from "react";
import List from "../components/List";
import TextField from '@material-ui/core/TextField';

function Home() {
    return (
        <>
            <TextField id="outlined-search" label="Search field" variant="outlined" />
            <List />
        </>
    );
}

export default Home;