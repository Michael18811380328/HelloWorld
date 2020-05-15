const path = require('path');
const utils = require('utils');
const webpack = require('webpack');
const config = require('../config.js');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = require('../config/prod.env');

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.produuctSourceMap,
      extract: true,
      usePostCSS: true,
    })
  },
  devtool: false,
  output: {
    path: config.build-assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  optimization: {
    runtimeChunk: {
      name: 'nanifest'
    },
    splitChunk: {
      //
    }
  },
  plugins: [
    new weback.DefinePlugin({
      'process.env': env
    }),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..'),
      manifest： require('./vender-manifest.json'),
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      Regular: 'Regular',
      $: 'jquery',
      axios: 'axios',
    }),
    ...utils.htmlPlugin(),
    new HappyPach({
      id: 'happybabel',
      loader: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*'],
      }
    ]),
  ],
});













