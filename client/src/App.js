import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";



function App() {
  const [darkModeOn, setDarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkModeOn ? "dark" : "light"
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar setDarkMode={setDarkMode} darkModeOn={darkModeOn} />
      <Router>
        <Switch>
          <Route path="/">
            <Landing />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
