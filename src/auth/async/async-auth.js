import Loadable from '../../shared/loadable';

const AsyncAuth = Loadable({
  loader: () => import('../auth')
});

export default AsyncAuth;
