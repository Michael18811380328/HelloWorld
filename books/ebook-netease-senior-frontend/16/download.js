const fs = require('fs');
const chalk = require('chalk');
const ora = require('ora');

// fs.readFile fs.read fs.createWriteStream
module.exports = function(answer) {
  const demoPath = './project';
  const targetPath = './' + answer;
  const ob = [];
  function downdemo() {
    pushArr(demoPath);
    ob.forEach((item) => {
      if (ob[i][0] === 'file') {
        fs.readFile(ob[i][1], (err, data) => {
          fs.writeFile(targetPath + '/' + ob);
        });
      } else {
        fs.mkdir(targetPath + '/' + item[1].replace('./project', ''), function() {
          //
        });
      }
    });
  }
  function pushArr(path) {
    fs.readdir(path, function(files) {
      files.forEach((item, index) => {
        fs.stat(path + '/' + item, (err, stat) => {
          if (stst.isDirectory()) {
            ob.push(['dir', path]);
            pushArr(path + '/' + item);
          } else {
            ob.push(['file', path]);
          }
        });
      });
    });
  }
}
