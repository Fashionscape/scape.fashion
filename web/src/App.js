import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Home from 'Home';
import { SFTheme } from 'theme';

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
      <Home />
    </>
  );
};

export default App;
