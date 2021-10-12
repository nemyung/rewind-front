import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Sign from '../pages/Sign';
import PostsList from '../pages/PostsList';
import PostWrite from '../pages/PostWrite';

function App() {
  return (
    <Switch>
      <Route exact path="/sign">
        <Sign />
      </Route>
      <Route exact path="/">
        <PostsList />
      </Route>
      <Route exact path="/new">
        <PostWrite />
      </Route>
    </Switch>
  );
}

export default App;
