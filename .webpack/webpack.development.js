import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { resolve } from 'path';

import Dotenv from 'dotenv-webpack';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import notifier from 'node-notifier';
import webpack from 'webpack';
import WebpackBar from 'webpackbar';

import { _path, cacheOptions, aliasSetup, confDotenv, webpackConf } from './config';

console.log('webpack DEVELOPMENT');

/**
 * Variable
 */
const mode = 'development';

/**
 * pluginsArray
 */
const pluginsArray = [
  new CleanWebpackPlugin(),
  new webpack.EnvironmentPlugin({
    NODE_TLS_REJECT_UNAUTHORIZED: '0',
    NODE_ENV: mode,
    NODE_HOST: 'localhost',
    NODE_PORT: 4004,
    NODE_API: 4004,
    DEBUG: true,
  }),
  new Dotenv(confDotenv),

  new WebpackBar(),
  new FriendlyErrorsWebpackPlugin(),

  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }),
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru|en/),
];

/**
 * Export CFG
 */
export default {
  name: mode,
  devtool: 'inline-source-map',
  entry: _path.entry,
  watch: !!mode,
  watchOptions: { ignored: ['node_modules'] },
  output: webpackConf.output,
  target: 'async-node',
  externals: [nodeExternals()],
  node: { __dirname: false, __filename: false },
  module: webpackConf.module,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: aliasSetup,
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
    },
  },
  plugins: pluginsArray,
};
