import createStore from "redux-zero";

const initialState = {
  currentUser: undefined,
  loading: 0
}

const store = createStore(initialState);

export default store;
