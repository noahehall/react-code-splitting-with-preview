import appActions from './app.actions';

const actions = store => ({
  ...appActions(store)
})

export default actions;
