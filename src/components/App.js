import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header/Header';
import Sign from '../pages/Sign';
import PostsList from '../pages/PostsList';
import PostWrite from '../pages/PostWrite';
import PostEdit from '../pages/PostEdit';
import PostDetail from '../pages/PostDetail';

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
      <Route exact path="/detail/:id" component={PostDetail} />
      <Route exact path="/edit/:id/">
        <PostEdit />
      </Route>
    </Switch>
  );
}

export default App;
