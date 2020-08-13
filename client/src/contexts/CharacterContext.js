import React, { useState, createContext } from "react";

export const CharacterContext = createContext();

export const CharacterProvider = props => {
    const [character, setCharacter] = useState({
        name: "",
        description: "",
        blobUrl: "",
        buffer: null,
        _id: ""
    });
    return (
        <CharacterContext.Provider value={[character, setCharacter]}>
            {props.children}
        </CharacterContext.Provider>
    );
}