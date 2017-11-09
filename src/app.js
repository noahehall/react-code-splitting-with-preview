import 'firebase/auth';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from "redux-zero/react";

import paths from './shared/paths';
import NProgress from './shared/nprogress';
import firebase from './shared/firebase';
import actions from './shared/actions';
import AsyncLanding from './landing/async';
import AsyncAuth from './auth/async';

import './app.css';

@connect(state => ({
  currentUser: state.currentUser
}),
  actions
)
class App extends Component {
  previewHidden = false;
  
  hidePreview = () => {
    if (this.previewHidden || !this.isReady()) return;
    
    const previewEl = window.document.getElementById('app-preview');

    if (previewEl) {
      this.previewHidden = true;
      previewEl.remove();
    }
  };

  isReady = () => {
    const { currentUser } = this.props;
    
    return typeof currentUser !== 'undefined';
  };

  componentWillMount() {
    const { setCurrentUser } = this.props;
    
    setCurrentUser()
  }

  componentDidMount() {
    this.hidePreview();
  }

  componentDidUpdate() {
    this.hidePreview();
  }

  render() {
    if (!this.isReady()) return null;
    
    return (
      <Switch>
        <Route path={paths.landing} component={AsyncLanding} exact/>
        <Route path={paths.auth} component={AsyncAuth}/>
      </Switch>
    );
  }
}

export default App;
