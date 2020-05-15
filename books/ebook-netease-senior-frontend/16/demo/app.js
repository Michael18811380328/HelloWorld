const chalk = require('chalk');
const ora = require('ora');
console.log(chalk.red.bgBlue('Hello'));
console.log(chalk.rgb(126,126,126).bgRgb(22,33,89)('hello'));

const spinner = ora('this is a loading').start();
spinner.color = 'yellow';
spinner.text = 'hello nodeJS';
setTimeout(function() {
  spinner.stop();
}, 3000);