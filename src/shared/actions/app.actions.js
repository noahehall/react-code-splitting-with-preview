import firebase from '../firebase';
import NProgress from '../nprogress';

const currentUserActions = ({ setState, getState }) => ({
  increaseLoading: state => {
    NProgress.status ? NProgress.inc() : NProgress.start();
    
    setState({ loading: state.loading + 1 });
  },

  descreaseLoading: state => {
    state.loading > 1 ? NProgress.inc() : NProgress.done();
    
    setState({ loading: state.loading - 1 });
  },
  
  setCurrentUser: state => {
    const auth = firebase.auth();
  
    setState({ currentUser: auth.currentUser });
    
    auth.onAuthStateChanged(currentUser => setState({ currentUser }));
  }
});

export default currentUserActions;
