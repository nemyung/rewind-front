import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

function App() {
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
    </Switch>
  );
}

export default App;
