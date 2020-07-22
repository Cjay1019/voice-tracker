import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { UserContext } from "./contexts/UserContext";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";



function App() {
  const [user] = useContext(UserContext)

  const theme = createMuiTheme({
    palette: {
      type: user.darkModeOn ? "dark" : "light"
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
}

export default App;
