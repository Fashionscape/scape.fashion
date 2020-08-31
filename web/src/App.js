import React from 'react';
import {Switch,Route} from 'react-router-dom'

import Header from './Header';
import Search from './Search';
import Footer from './Footer';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/colors/:color" component={Search} />
        <Route path="/items/:item" component={Search} />
        <Route path="/" component={Search} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
