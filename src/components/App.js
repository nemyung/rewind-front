import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header/Header';
import Sign from '../pages/Sign';
import PostsList from '../pages/PostsList';
import PostWrite from '../pages/PostWrite';

function App() {
  return (
    <>
      <Header />
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
    </>
  );
}

export default App;
