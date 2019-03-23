import React, { Component } from 'react';
import * as firebase from "firebase/app";

class LoginPage extends Component {
  render() {
    return (
      <div>
        Login Page!
        <button
          onClick={() => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleAuthProvider);
          }}
          >
            Sign In with Google
        </button>
      </div>
    );
  }
}

export default LoginPage;
