import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { FirebaseAuthProvider, FirebaseAuthConsumer } from "@react-firebase/auth";
import { FirebaseDatabaseProvider } from "@react-firebase/database";

import { config } from "./firebaseConfig";

import Loading from './components/Loading'
import LoginPage from "./pages/LoginPage/LoginPage";
import OverviewPage from "./pages/OverviewPage/OverviewPage";
import GoalsPage from "./pages/GoalsPage/GoalsPage";

import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import RedirectRoute from './components/RedirectRoute'

class Router extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="root">
          <FirebaseAuthProvider {...config} firebase={firebase}>
            <FirebaseDatabaseProvider {...config} firebase={firebase}>
              <FirebaseAuthConsumer>
                {({ isSignedIn, providerId, user }) => {
                  return providerId ?
                    <BrowserRouter>
                      <RedirectRoute path="/" component={LoginPage} />
                      <Route path="/login" component={LoginPage}/>
                      <PrivateRoute path="/overview/" component={OverviewPage} isSignedIn={isSignedIn} userId={user ? user.uid : null} />
                      <PrivateRoute path="/goals/" component={GoalsPage} isSignedIn={isSignedIn} userId={user ? user.uid : null} />
                  </BrowserRouter> :
                  <Loading/>
                }}
              </FirebaseAuthConsumer>
            </FirebaseDatabaseProvider>
          </FirebaseAuthProvider>
        </div>
      </>
    );
  }
}

export default Router;
