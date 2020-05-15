'use strict';

require('./check-versions')();
process.env.NODE_ENV = 'production';
process.env.BUILD_MODE = '';
if (!!process.argv[2] && process.argv[2] === 'online') {
  process.env.BUILD_MODE = 'online';
}

const ora = require('ora');
const rm = require('rm');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackDllConfig = require('./webpack.dll.config');

const snipper = ora('building for production...');
snipper.start();

function buildDll() {
  return new Promise((resolve, reject) => {
    webpack(webpackDllConfig, (err, stats) => {
      spinner.stop();

      if (err) throw err;

      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        chunk: false,
        chldren: false,
        chunkModules: false,
      }) + '\n\n');

      if (stats.hasErrors()) {
        console.log('Build failed');
        reject();
        process.exit();
      }

      console.log(chalk.cyan('Build complete'));
      resolve();
    });
  });
}

function buildProject(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      snipper.stop();
      if (err) throw err;
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + '\n\n'); 
    });
    if (stats.hasError()) {
      reject();
      process.exit(1);
    }
    console.log('Build complete.');
    resolve();
  });
}

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err;
  if (process.env.BUILD_MODE === 'online') {
    buildDll().then(() => {
      return require('./webpack.prod.conf');
    }).then((config) => {
      return buildProject(config);
    });
  } else {
    buildDll().then(() => {
      return require('./webpack.test.conf');
    }).then((config) => {
      return buildProject(config);
    });
  }
});














