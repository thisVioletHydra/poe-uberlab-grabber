const { resolve } = require('path');

const root = process.cwd();
const dir = resolve(root, 'server');

/**
 * Path
 */
export const _path = {
  cache: resolve(root, 'node_modules/.cache/cache-loader'),
  src: resolve(dir, 'src'),
  entry: resolve(dir, 'src/index'),
  dist: resolve(dir, 'dist'),
  dotEnv: resolve(root, '.access/.env'),
};
export const cacheOptions = { cacheDirectory: _path.cache };

/**
 * Alias
 */
export const aliasSetup = {
  '@root': resolve(root),
  '@access': resolve(root, '.access'),
  '@server': resolve(dir),
  '@models': resolve(dir, 'src/models'),
  '@routes': resolve(dir, 'src/routes'),
  '@app': resolve(dir, 'src/app'),
  '@middleware': resolve(dir, 'src/middleware'),
  '@helper': resolve(dir, 'src/helper'),
  '@pscc': resolve(dir, 'src/assets/postscc'),
};

/**
 * DotEnv
 */
export const confDotenv = {
  path: _path.dotEnv,
  silent: false,
  systemvars: true,
  allowEmptyValues: false,
  expand: true,
  safe: false,
};

export const webpackConf = {
  output: {
    publicPath: '/',
    path: _path.dist,
    filename: '[name].js',
    sourceMapFilename: '.map/[file].map[query]',
    hotUpdateChunkFilename: '.hot/[id].[fullhash:5].hot-update.js',
    hotUpdateMainFilename: '.hot/[fullhash:5].hot-update.json',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
      },
      {
        test: /\.(js|jsx)$/,
        use: [{ loader: 'cache-loader', options: cacheOptions }, 'babel-loader'],
        include: _path.src,
      },
    ],
  },
};
