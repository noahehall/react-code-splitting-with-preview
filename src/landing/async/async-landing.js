import Loadable from '../../shared/loadable';

const AsyncLanding = Loadable({
  loader: () => import('../landing')
});

export default AsyncLanding;
