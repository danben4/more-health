import React from 'react';	
import { Route, Redirect } from "react-router-dom";	

 const RedirectRoute = (props) => {	
  const { path, component: Component, isSignedIn } = props;	
  return (	
    <Route	
      path={path}	
      exact	
      render={props =>	
        isSignedIn ? (	
          <Redirect	
            to={{	
              pathname: path,	
              state: { from: props.location }	
            }}	
          />	
        ) : (	
          <Component />	
        )	
      }	
    />	
  )	
};	

 export default RedirectRoute;