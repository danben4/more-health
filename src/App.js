import React, { Component } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import { config } from "./firebaseConfig";
import './App.css';

class App extends Component {
  render() {
    return (
      <FirebaseAuthProvider {...config} firebase={firebase}>
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
