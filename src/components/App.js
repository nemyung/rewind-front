import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header/Header';
import Sign from '../pages/Sign';
import PostsList from '../pages/PostsList';
import PostWrite from '../pages/PostWrite';
import PostEdit from '../pages/PostEdit';
import PostDetail from '../pages/PostDetail';
import Permit from './Permit';

function App() {
  return (
    <Switch>
      <Route exact path="/sign">
        <Sign />
      </Route>
      <>
        <Header />
        <Route exact path="/">
          <PostsList />
        </Route>
        <Route exact path="/new">
          <Permit>
            <PostWrite />
          </Permit>
        </Route>
        <Route exact path="/post/:id">
          <Permit>
            <PostDetail />
          </Permit>
        </Route>
        <Route exact path="/post/:id/edit">
          <Permit>
            <PostEdit />
          </Permit>
        </Route>
      </>
    </Switch>
  );
}

export default App;
