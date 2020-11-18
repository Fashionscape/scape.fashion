import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Analytics from "Analytics";
import Home from "Home";
import Items from "Items";
import { SFTheme } from "theme";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Analytics>
        <SFTheme>
          <CssBaseline />
          <Main />
        </SFTheme>
      </Analytics>
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
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
