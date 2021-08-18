import development from './webpack.development';
import production from './webpack.production';

/**
 * Export CFG
 */
export default (env, { mode }) => {
  return mode !== 'production' ? development : production;
};
