'use strict';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <BestBooks />
            </Route>
            <Route exact path="/About">
              <About />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
