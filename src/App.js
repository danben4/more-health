import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import { config } from "./firebaseConfig";
import './App.css';

import LoginPage from "./pages/LoginPage/LoginPage";
import OverviewPage from "./pages/OverviewPage/OverviewPage";

class App extends Component {
  render() {
    return (
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <BrowserRouter>
          <Route path="/" exact component={LoginPage} />
          <Route path="/overview/" component={OverviewPage} />
          <Link to="/">Login Page</Link>
          <Link to="/overview/">Overview Page</Link>
        </BrowserRouter>
        <div className="root">
          <button
            onClick={() => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
              firebase.auth().signInWithPopup(googleAuthProvider);
            }}
          >
            Sign In with Google
          </button>
          <div>Inside FirebaseAuthProvider</div>
          <FirebaseAuthConsumer>
            {({ isSignedIn }) => {
              if (isSignedIn === true) {
                return "Signed in";
              } else {
                return "Not signed in";
              }
            }}
          </FirebaseAuthConsumer>
        </div>
      </FirebaseAuthProvider>
    );
  }
}

export default App;
