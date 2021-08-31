import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { resolve } from 'path';

import Dotenv from 'dotenv-webpack';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import notifier from 'node-notifier';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import WebpackBar from 'webpackbar';

import { _path, cacheOptions, aliasSetup, confDotenv, webpackConf } from './config';

console.log('webpack PRODUCTION');

/**
 * Variable
 */
const mode = 'production';

/**
 * pluginsArray
 */
const pluginsArray = [
  new CleanWebpackPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru|en/),
  new Dotenv(confDotenv),
  new webpack.EnvironmentPlugin({
    NODE_TLS_REJECT_UNAUTHORIZED: '0',
    NODE_ENV: mode,
    NODE_HOST: 'localhost',
    NODE_PORT: 4004,
    NODE_API: 4004,
    DEBUG: false,
  }),
];

/**
 * Export CFG
 */
export default {
  name: mode,
  entry: _path.entry,
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
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: false,
        },
      }),
    ],

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
