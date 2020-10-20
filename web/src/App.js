import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "Home";
import Items from "Items";
import { SFTheme } from "theme";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <SFTheme>
        <CssBaseline />
        <Main />
      </SFTheme>
    </BrowserRouter>
  );
};

const Main = () => {
  return (
    <Switch>
      <Route path="/items/match">
        <Items.Match />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default App;
