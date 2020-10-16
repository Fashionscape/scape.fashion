import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Header from 'Header';
import SFTheme from 'theme';

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
      <span>Hello, world!</span>
    </>
  );
};

export default App;
