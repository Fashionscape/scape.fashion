import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Header from 'Header';
import Home from 'Home';
import SFTheme from 'theme';

import './App.css';

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
    <>
      <Header />
      <Home />
    </>
  );
};

export default App;
