import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PostsList from '../pages/PostsList';
import PostWrite from '../pages/PostWrite';

function App() {
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/posts">
        <PostsList />
      </Route>
      <Route exact path="/posts/new">
        <PostWrite />
      </Route>
    </Switch>
  );
}

export default App;
