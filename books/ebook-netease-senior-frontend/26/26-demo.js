const ora = require('ora');
const rm = require('rimrif');
const path = require('path');
const chalk = require('chalk');
const webapck = require('webpack');
const config = require('../config.js');
const webpackConfig = require('./webpack.prod.conf.js');

const spinner = ora('building starting');
spinner.start();

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err;
  webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunkModules: false,
    }) + '\n\n');
    if (stats.hasErrors()) {
      console.log(chalk.red('build with error. \n'));
      process.exit(1);
    }
    console.log(chalk.cyan('build complete. \n'));
  });
});

let plugins = [
  new webpack.DefinePlugin({
    'process.env': env
  }),
  new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        warnings: false
      }
    },
    sourceMap: config.build.productionShourceMap,
    parallel: true
  }),
];
