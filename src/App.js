import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider, FirebaseAuthConsumer } from "@react-firebase/auth";

import { config } from "./firebaseConfig";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OverviewPage from "./pages/OverviewPage/OverviewPage";

import PrivateRouter from './components/PrivateRoute';
import RedirectRoute from './components/RedirectRoute';

class Router extends Component {
  render() {
    return (
      <div className="root">
        <FirebaseAuthProvider {...config} firebase={firebase}>
          <FirebaseAuthConsumer>
            {({ isSignedIn }) => {
              return (
                <BrowserRouter>
                  <Route path="/" exact component={HomePage} />
                  <RedirectRoute path="/login" exact component={LoginPage} isSignedIn />
                  <PrivateRouter path="/overview/" component={OverviewPage} isSignedIn />
                </BrowserRouter>
              );
            }}
          </FirebaseAuthConsumer>
        </FirebaseAuthProvider>
      </div>
    );
  }
}

export default Router;
