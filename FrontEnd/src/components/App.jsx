import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import BrewerySearch from './components/Brewery/BrewerySearch';
import BreweryDetails from './components/Brewery/BreweryDetails';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/search" component={BrewerySearch} />
          <Route path="/brewery/:id" component={BreweryDetails} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
