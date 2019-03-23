import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props) => {
  const { path, component: Component, isSignedIn, userId } = props;
  return (
    <Route
      path={path}
      exact
      render={props =>
        isSignedIn ? (
          <Component userId={userId} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
};

export default PrivateRoute;
