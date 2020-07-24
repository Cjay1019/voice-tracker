import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { UserContext } from "./contexts/UserContext";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";



function App() {
  const [checked, checkForToken] = useState(false);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    if (userToken) setUser({ ...user, token: userToken });
    checkForToken(true);
  }, []);

  const theme = createMuiTheme({
    palette: {
      type: user.darkModeOn ? "dark" : "light"
    }
  });

  return (
    <>
      {checked ?
        <ThemeProvider theme={theme}>
          < CssBaseline />
          <Navbar />
          <Router>
            <Switch>
              <Route path="/signin">
                <Landing />
              </Route>
              <Route path="/" render={() => (
                user.token ? <Home /> : <Redirect to="/signin"></Redirect>
              )}>
              </Route>
            </Switch>
          </Router>
        </ThemeProvider >
        :
        null
      }
    </>
  );
}

export default App;
