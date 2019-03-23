import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { FirebaseAuthProvider, FirebaseAuthConsumer } from "@react-firebase/auth";
import { FirebaseDatabaseProvider } from "@react-firebase/database";

import { config } from "./firebaseConfig";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OverviewPage from "./pages/OverviewPage/OverviewPage";

import Header from './components/Header';
import PrivateRouter from './components/PrivateRoute';
import RedirectRoute from './components/RedirectRoute';

class Router extends Component {
  render() {
    return (
      <div className="root">
        <FirebaseAuthProvider {...config} firebase={firebase}>
          <FirebaseDatabaseProvider {...config} firebase={firebase}>
            <FirebaseAuthConsumer>
              {({ isSignedIn, user }) => {
                return (
                  <>
                    <Header />
                    <BrowserRouter>
                      <Route path="/" exact component={HomePage} />
                      <RedirectRoute path="/login" component={LoginPage} isSignedIn />
                      <PrivateRouter path="/overview/" component={OverviewPage} isSignedIn userId={user ? user.uid : null} />
                    </BrowserRouter>
                  </>
                );
              }}
            </FirebaseAuthConsumer>
          </FirebaseDatabaseProvider>
        </FirebaseAuthProvider>
      </div>
    );
  }
}

export default Router;
