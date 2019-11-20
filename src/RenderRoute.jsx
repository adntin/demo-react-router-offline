import React, { lazy, Suspense } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// webpackPrefetch: true
const Login = lazy(() => import(/* webpackChunkName: "Login" */ './Login'));
const About = lazy(() => import(/* webpackChunkName: "About" */ './About'));
const Home = lazy(() => import(/* webpackChunkName: "Home" */ './Home'));
const Product = lazy(() => import(/* webpackChunkName: "Product" */ './Product'));
const NoMatch = lazy(() => import(/* webpackChunkName: "NoMatch" */ './NoMatch'));

const RenderRoute = () => {
  const location = useLocation(); // 注意：必须放到Router里面才能拿到location
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch location={location}>
        <PrivateRoute path="/" exact>
          <Home />
        </PrivateRoute>
        <PrivateRoute path="/product">
          <Product />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default RenderRoute;
