import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
};

const Main = () => {
  return 'Hello, world';
};

export default App;
