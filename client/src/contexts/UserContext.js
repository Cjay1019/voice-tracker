import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = props => {
    const [user, setUser] = useState({
        email: "",
        userId: "",
        darkModeOn: null,
        auth: null
    });
    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}