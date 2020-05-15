#!/usr/bin/env node
const cm = require('commander');
const iq = require('inquirer');
cm.version('1.0.0', '-v --version');
cm.option('-a -atest', 'this is test');
cm.command('init <name>').action((name) => {
  console.log(name);
  iq.prompt([
    {
      type: 'input',
      name: 'author',
      message: 'what is your name'
    }
  ]).then(answers => {
    require('./bin/download.js')(answers.author);
  });
});
cm.parse(process.argv);
