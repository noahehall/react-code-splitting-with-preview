import React, { Component } from 'react';
import ReactLoadable from 'react-loadable';
import { connect } from 'redux-zero/react';

import actions from './actions';

@connect(state => ({
  loading: state.loading
}),
  actions
)
class LoadableLoading extends Component {
  componentWillMount() {
    const { increaseLoading } = this.props;

    increaseLoading();
  }

  componentWillUnmount() {
    const { descreaseLoading } = this.props;

    descreaseLoading();
  }

  render() {
    return null;
  }
}

const Loadable = options => ReactLoadable({
  loading: LoadableLoading,
  delay: 50,
  timeout: 10000,
  ...options
});

export default Loadable;
