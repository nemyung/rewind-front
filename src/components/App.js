import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header/Header';
import Sign from '../pages/Sign';
import PostsList from '../pages/PostsList';
import PostsListResponsive from '../pages/PostsListResponsive';
import PostWrite from '../pages/PostWrite';
import PostEdit from '../pages/PostEdit';
import PostDetail from '../pages/PostDetail';
import NotFound from '../pages/NotFound';
import Permit from './Permit';

import { useUserAuthentication } from '../hooks';

function App() {
  useUserAuthentication();
  const isWebView = window.matchMedia('(min-width: 1200px)').matches;
  return (
    <>
      <Switch>
        <Route exact path="/sign">
          <Sign />
        </Route>
        <>
          <Header />
          <Route exact path="/">
            {isWebView ? <PostsList /> : <PostsListResponsive />}
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
          <Route>
            <NotFound />
          </Route>
        </>
      </Switch>
    </>
  );
}

export default App;
