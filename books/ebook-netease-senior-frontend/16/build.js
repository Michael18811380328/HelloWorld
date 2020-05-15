process.env.NODE_ENV = 'production';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');

const spinner = ora('building for production...');
spinner.start();

const { assetsRoot, assetsSubDirectory } = config.build;
rm(path.join(assetsRoot, assetsSubDirectory), err => {
  if (err) throw err;
  webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModule: false,
    }) + '\n\n');
    if (stats.hasErrors()) {
      console.log(chalk.red('Build failed'));
      process.exit(1);
    }
    console.log(chalk.cyan('Build complete'));
  });
});
