import React, { Component } from 'react';
import * as firebase from "firebase/app";

import Page from '../../components/Page';

class LoginPage extends Component {
  render() {
    return (
      <Page>
        Login Page!
        <button
          onClick={() => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleAuthProvider);
          }}
          >
            Sign In with Google
        </button>
      </Page>
    );
  }
}

export default LoginPage;
