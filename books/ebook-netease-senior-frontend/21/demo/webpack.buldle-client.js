'use strict'
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const utils = require('./utils');
const config = require('./config');
// plugins: copy-webpack-plugin html-webpack-plugin 
// extract-text-webpack-plugin optimize-css-assets-webpack-plugin
// uglifyjs-webpack-plugin
const VueSSRClientPlugin = require('vue-ssr-client-plugin');

const env = require('../config/prod.dev');

const webpackConfig = merge(baseWebpackConfiging, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true,
    })
  },
  entry: {
    app: './src/client.js'
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.buildassetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
  },
  plugins: [
    new VueSSRClientPlugin(),
    new webpack.DefinePlugin({'process.env': env}),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true,
    }),
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
    }),
  ],
});
