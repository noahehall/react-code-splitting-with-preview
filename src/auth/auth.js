import React, { Component } from 'react';
import firebaseui from 'firebaseui';
import firebaseuiStyles from 'firebaseui/dist/firebaseui.css';

import firebase from '../shared/firebase';

const authUI = new firebaseui.auth.AuthUI(firebase.auth());

class Auth extends Component {
  get authUIConfig() {
    return {
      signInFlow: 'popup',
      tosUrl: '',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSucces: currentUser => {
          console.log('signInSuccess');
        },
        uiShown: () => {
          console.log('uiShown');
        }
      }
    }
  }

  componentDidMount() {
    authUI.start(this.authUIEl, this.authUIConfig)
  }

  componentWillUnmount() {
    authUI.reset();
  }
  
  render() {
    return (
      <div>
        <div ref={el => this.authUIEl = el}></div>
      </div>
    )
  }
}

export default Auth;
